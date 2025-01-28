import XLSX from 'xlsx';
import * as Order from '#models/order.js';
import * as OrderItem from '#models/order_item.js';
import * as Webmaster from '#models/webmaster.js';
import * as Operator from '#models/operator.js';
import * as Gender from '#models/gender.js'
import * as City from '#models/city.js'
import * as Payment from '#models/payment_method.js'
import * as Delivery from '#models/delivery_method.js'
import * as CancelReason from '#models/order_cancel_reason.js'
import axios from 'axios';

import {
  groupByDate,
  groupByRegion,
  groupByCity,
  groupByProduct,
  calculateStatistics,
  groupOperators,
} from '#services/order/group.js';

export const getUserStatistic = async (req, res) => {
  try {
    const { start, end, group, webmaster_id, operator_id } = req.query;
    const orders = await Order.getOrdersStatisticForUser(start, end, webmaster_id, operator_id);

    let statistics = [];

    switch (group) {
      case 'by_date':
        statistics = groupByDate(orders);
        break;
      case 'by_region':
        statistics = groupByRegion(orders);
        break;
      case 'by_city':
        statistics = groupByCity(orders);
        break;
      case 'by_product':
        const items = await OrderItem.getWhereIn('order_id', orders.map((order) => order.id));
        statistics = groupByProduct(orders, items);
        break;
      default:
        statistics = groupByDate(orders);
        break;
    };

    return res.status(200).send({ message: 'ok', statistics });
  } catch (err) {
    console.log("Error in getUserStatistic statistic controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  };
};

export const getWebmasterStatistic = async (req, res) => {
  try {
    const { start, end, webmaster_id } = req.query;
    const by_date = req.query.by_date === 'true';
    console.log(start, end, webmaster_id, by_date)
    const statistic = await Order.getOrderStatisticForWebmaster(start, end, webmaster_id, by_date);
    const result = calculateStatistics(statistic, by_date);
    return res.status(200).send({ message: 'ok', result })
  } catch (err) {
    console.log("Error in getWebmasterStatistic statistic controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  };
};

export const getOperatorStatistic = async (req, res) => {
  try {
    const { start, end, operator_id } = req.query;

    const by_date = req.query.by_date === 'true';

    const orders = await Order.getOrderStatisticForOperator(start, end, operator_id, by_date);

    const statistics = {};

    orders.forEach((result) => {
      const operatorId = result.operator_id || 'Unknown';

      if (!statistics[operatorId]) {
        statistics[operatorId] = [];
      }

      const stats = {
        date: by_date ? result.date : undefined,
        totalOrders: parseInt(result.total_orders, 10),
        acceptedOrders: parseInt(result.accepted_orders, 10),
        cancelledOrders: parseInt(result.cancelled_orders, 10),
        refundedOrders: parseInt(result.refunded_orders, 10),
        shippedOrders: parseInt(result.shipped_orders, 10),
        buyoutOrders: parseInt(result.buyout_orders, 10),
        spamOrders: parseInt(result.spam_orders, 10),
        holdOrders: parseInt(result.hold_orders, 10),
        avgTotalSum: result.avg_total_sum ? parseFloat(result.avg_total_sum) : 0,
        operatorName: result.operator_name || 'Unknown',
      };

      if (by_date) {
        statistics[operatorId].push(stats);
      } else {
        statistics[operatorId] = stats;
      }
    });

    const result = calculateStatistics(statistics, by_date);
    console.log(result)
    return res.status(200).send({ message: 'ok', result });
  } catch (err) {
    console.log("Error in getOperatorStatistic statistic controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  };
};


function excelDateToFormattedDate(serialDate) {
  const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Excel epoch starts on 30 Dec 1899
  const jsDate = new Date(excelEpoch.getTime() + serialDate * 24 * 60 * 60 * 1000); // Add days in milliseconds

  // Форматирование даты
  const year = jsDate.getUTCFullYear();
  const month = String(jsDate.getUTCMonth() + 1).padStart(2, '0'); // Месяцы от 0 до 11
  const day = String(jsDate.getUTCDate()).padStart(2, '0');
  const hours = String(jsDate.getUTCHours()).padStart(2, '0');
  const minutes = String(jsDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(jsDate.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(jsDate.getUTCMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
}

export const uploadFileForStatistic = async (req, res) => {
  const apiUrl = 'https://talkcall-kz.leadvertex.ru/api/admin/addOrder.html';
  const apiKey = 'kjsdaKRhlsrk0rjjekjskaaaaaaaa'; // Замените на ваш API-ключ
  const apiUrlToUpdate = 'https://talkcall-kz.leadvertex.ru/api/admin/updateOrder.html';

  if (!req.files || !req.files.file) {
    return res.status(400).send('Файл не загружен.');
  }

  const uploadedFile = req.files.file;
  const workbook = XLSX.read(uploadedFile.data, { type: 'buffer' });

  for (const sheetName of workbook.SheetNames) {
    console.log(`Обработка листа: ${sheetName}`);
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (let index = 0; index < sheet.length; index++) {
      const row = sheet[index];

      const recordNumber = row["#"];
      const campaign = row["campaign"];
      const crmOrderId = row["crm_order_id"];
      const userId = row["user_id"];
      const username = row["username"];
      const subStatusName = row["sub_status_name"];
      const subStatusId = row["sub_status_id"];
      const processedDate = row["processed_date"];
      const processedStatus = row["processed_status"];

      const formattedDate = excelDateToFormattedDate(processedDate);
      console.log(`Лист: ${sheetName}, Строка ${index + 1}:`);
      console.log(`#: ${recordNumber}`);
      console.log(`campaign: ${campaign}`);
      console.log(`crm_order_id: ${crmOrderId}`);
      console.log(`user_id: ${userId}`);
      console.log(`username: ${username}`);
      console.log(`sub_status_name: ${subStatusName}`);
      console.log(`sub_status_id: ${subStatusId}`);
      console.log(`processed_date: ${formattedDate}`);
      console.log(`processed_status: ${processedStatus}`);
      console.log('--------------------------');

      const data = {
        operator_id: userId
      }
      if (+subStatusId === 12) {
        data.cancelled_at = formattedDate
      }

      if (+subStatusId === 1 || +subStatusId === 4) {
        data.approved_at = formattedDate
      }
      const updated_order = await Order.update(crmOrderId, data)

      console.log(updated_order)



      // const order = Order.find(crmOrderId);
      // if (order.city) {
      //   const city_name = City.find(order.city);
      //   order.city = city_name.name;
      // }

      // const order_items = OrderItem.getWhereIn('oi.order_id', [order.id]);
      // if (order_items) {
      //   order.goods = order_items.map((item) => ({
      //     goodID: item.product_id,
      //     quantity: item.quantity,
      //     price: parseFloat(item?.price).toFixed(2) || 1650,
      //   }));
      // }

      // if (order.gender_id) {
      //   const gender = Gender.find(order.gender_id);
      //   order.gender = gender.name;
      // }
      // if (order.payment_method_id) {
      //   const payment_method = Payment.find(order.payment_method_id);
      //   order.payment = payment_method.name;
      // }
      // if (order.delivery_method_id) {
      //   const delivery_method = Delivery.find(order.delivery_method_id);
      //   order.delivery = delivery_method.name;
      // }
      // if (order.order_cancel_reason_id) {
      //   const reason = CancelReason.find(order.order_cancel_reason_id);
      //   order.reason = reason.name;
      // }

      // if (order) {
      //   try {
      //     const response = await axios.post(
      //       `${apiUrl}?token=${apiKey}`,
      //       new URLSearchParams({
      //         webmasterID: order.webmaster_id || 0,
      //         operatorID: userId || null,
      //         externalID: order.additional6 || '',
      //         additional5: order.additional6 || '',
      //         region: order.region || '',
      //         city: order.city || '',
      //         postIndex: order.postal_code || '',
      //         address: order.address || '',
      //         fio: order.fio,
      //         phone: order.phone,
      //         price: order_items[0]?.price || 1650,
      //         total: order.total_sum ? parseFloat(order.total_sum).toFixed(2) : undefined,
      //         quantity: order_items[0]?.quantity || 1,
      //         comment: order.comment || '',
      //         goods: JSON.stringify(order.goods),
      //         utm_term: order.utm_term || '',
      //         additional6: order.age,
      //         additional4: order.gender || '',
      //         additional12: order.payment,
      //         additional2: order.delivery,
      //         domain: additional1,
      //         additional7: order.reason,
      //         additional8: order.additional8,
      //         additional19: order.id,
      //         kazpostTrack: order.additional4,
      //         additional1: order.delivery_at,
      //         additional10: order.additional9,
      //       }),
      //       {
      //         headers: {
      //           'Content-Type': 'application/x-www-form-urlencoded',
      //         },
      //       }
      //     );

      // if (response.status === 200) {
      //   console.log('Order successfully added:', response.data);

      //   const updateResponse = await axios.post(
      //     `${apiUrlToUpdate}?token=${apiKey}&id=${order.id}`,
      //     new URLSearchParams({
      //       status: subStatusId,
      //     }),
      //     {
      //       headers: {
      //         'Content-Type': 'application/x-www-form-urlencoded',
      //       },
      //     }
      //   );

      //   if (updateResponse.status === 200) {
      //     console.log('Order successfully updated:', updateResponse.data);
      //     break; // Прекращаем цикл, если заказ успешно отправлен
      //   }
      // }  else {
      //   console.log('oshibka pri update order')
      //   break
      // }

      //   } catch (error) {
      //     console.error('Error adding or updating order:', error.response ? error.response.data : error.message);
      //     break
      //   }
      // }
    }
  }

  res.send('Файл обработан. Данные выведены в консоль.');
};



export const fromHundredThousand = async (req, res) => {
  const cities = await City.get();
  const genders = await Gender.get();
  const payment_methods = await Payment.get();
  const delivery_methods = await Delivery.get();
  const order_cancel_reasons = await CancelReason.get();
  const orders = await Order.getFrom(100000);

  for (const order of orders) {
    const items = await OrderItem.getWhereIn('oi.order_id', [order.id]);
    const goods = Array.isArray(items) && items.length > 0
      ? [
        {
          add: items.map((item) => ({
            "goodID": `${item.product_id}`,
            "quantity": `${item.quantity}`,
            "price": `${item.price}`,
          })),
        }
      ]
      : [{ add: [] }];

    const res = await axios({
      method: 'GET',
      url: `https://talkcall-kz.leadvertex.ru/api/admin/getOrdersIdsByCondition.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa&additional19=${order.id}`,
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
    });

    if (res.status == 200) {
      const check_data = res.data;
      if (check_data?.length > 0) {
        const respo = await axios({
          method: 'POST',
          url: `https://talkcall-kz.leadvertex.ru/api/admin/updateOrder.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa&id=${check_data[0]}`,
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
          },
          data: {
            goods: goods
          }
        });

        if (respo.status == 200) {
          console.log(`${order.id} updated succesfully`)
          continue;
        };
      };
    } else {
      console.log('oshibka pri check order');
      break;
    };

    const response = await axios({
      method: 'POST',
      url: 'https://talkcall-kz.leadvertex.ru/api/admin/addOrder.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        webmasterID: order.webmaster_id,
        operatorID: order.operator_id,
        externalWebmaster: order.additional3,
        region: order.region,
        city: cities.find((c) => +c.id === +order.city_id)?.name,
        postIndex: order.postal_code,
        address: order.address,
        fio: order.fio,
        phone: order.phone,
        price: items[0]?.price ? items[0]?.price : 1650,
        total: order?.total_sum ? order?.total_sum : 1650,
        quantity: Array.isArray(items) && items.length > 0 ? items.reduce((acc, item) => +acc + +item.quantity) : 1,
        additional1: order.delivery_at,
        additional2: delivery_methods.find((dm) => +dm.id === +order.delivery_method_id)?.name,
        additional3: order.logist_recall_at ? order.logist_recall_at : null,
        additional4: genders.find((g) => +g.id === +order.gender_id)?.name,
        additional5: order.additional6,
        additional6: order.age,
        additional8: order.additional8,
        additional10: order.additional9,
        additional12: payment_methods.find((pm) => +pm.id === order.payment_method_id)?.name,
        additional13: order.utm_term,
        additional14: order_cancel_reasons.find((ocr) => +ocr.id === +order.order_cancel_reason_id)?.name,
        additional19: order.id,
        comment: order.comment,
        kazpostTrack: order.additional4,
        utm_term: order.utm_term,
        domain: order.additional1,
        goods: goods,
      },
    });

    if (response.status == 200) {
      console.log(`OK ${order.id}`)
    } else {
      console.log('oshibka pri update order')
      break;
    };

    break;
  };
};


// const apiUrl = 'https://talkcall-kz.leadvertex.ru/api/admin/addOrder.html';
// const apiKey = 'kjsdaKRhlsrk0rjjekjskaaaaaaaa'; // Замените на ваш API-ключ
// const apiUrlToUpdate = 'https://talkcall-kz.leadvertex.ru/api/admin/updateOrder.html';


// const updateResponse = await axios({
//   method: 'POST',
//   url: `https://talkcall-kz.leadvertex.ru/api/admin/updateOrder.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa&id=${order.id}`,
//   data: {
//     status: order.sub_status_id,
//   },
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   }
// });

// if (updateResponse.status === 200) {
//   console.log('Order successfully updated:', updateResponse.data);
//   break; // Прекращаем цикл, если заказ успешно отправлен
// }