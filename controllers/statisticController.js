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
    const { start, end, operator_id} = req.query;

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


// function excelDateToFormattedDate(serialDate) {
//   const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Excel epoch starts on 30 Dec 1899
//   const jsDate = new Date(excelEpoch.getTime() + serialDate * 24 * 60 * 60 * 1000); // Add days in milliseconds

//   // Форматирование даты
//   const year = jsDate.getUTCFullYear();
//   const month = String(jsDate.getUTCMonth() + 1).padStart(2, '0'); // Месяцы от 0 до 11
//   const day = String(jsDate.getUTCDate()).padStart(2, '0');
//   const hours = String(jsDate.getUTCHours()).padStart(2, '0');
//   const minutes = String(jsDate.getUTCMinutes()).padStart(2, '0');
//   const seconds = String(jsDate.getUTCSeconds()).padStart(2, '0');
//   const milliseconds = String(jsDate.getUTCMilliseconds()).padStart(3, '0');

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
// }

// export const uploadFileForStatistic = async (req, res) => {
//   const apiUrl = 'https://talkcall-kz.leadvertex.ru/api/admin/addOrder.html';
//   const apiKey = 'kjsdaKRhlsrk0rjjekjskaaaaaaaa'; // Замените на ваш API-ключ
//   const apiUrlToUpdate = 'https://talkcall-kz.leadvertex.ru/api/admin/updateOrder.html';

//   if (!req.files || !req.files.file) {
//     return res.status(400).send('Файл не загружен.');
//   }

//   const uploadedFile = req.files.file;
  
//     const order = Order.find(crmOrderId);
//     if (order.city) {
//       const city_name = City.find(order.city);
//       order.city = city_name.name;
//     }

//     const order_items = OrderItem.getWhereIn('oi.order_id', [order.id]);
//     if (order_items) {
//       order.goods = order_items.map((item) => ({
//         goodID: item.product_id,
//         quantity: item.quantity,
//         price: parseFloat(item?.price).toFixed(2) || 1650,
//       }));
//     }

//     if (order.gender_id) {
//       const gender = Gender.find(order.gender_id);
//       order.gender = gender.name;
//     }
//     if (order.payment_method_id) {
//       const payment_method = Payment.find(order.payment_method_id);
//       order.payment = payment_method.name;
//     }
//     if (order.delivery_method_id) {
//       const delivery_method = Delivery.find(order.delivery_method_id);
//       order.delivery = delivery_method.name;
//     }
//     if (order.order_cancel_reason_id) {
//       const reason = CancelReason.find(order.order_cancel_reason_id);
//       order.reason = reason.name;
//     }

//     if (order) {
//       try {
//         const response = await axios.post(
//           `${apiUrl}?token=${apiKey}`,
//           new URLSearchParams({
//             webmasterID: order.webmaster_id || 0,
//             operatorID: userId || null,
//             externalID: order.additional6 || '',
//             additional5: order.additional6 || '',
//             region: order.region || '',
//             city: order.city || '',
//             postIndex: order.postal_code || '',
//             address: order.address || '',
//             fio: order.fio,
//             phone: order.phone,
//             price: order_items[0]?.price || 1650,
//             total: order.total_sum ? parseFloat(order.total_sum).toFixed(2) : undefined,
//             quantity: order_items[0]?.quantity || 1,
//             comment: order.comment || '',
//             goods: JSON.stringify(order.goods),
//             utm_term: order.utm_term || '',
//             additional6: order.age,
//             additional4: order.gender || '',
//             additional12: order.payment,
//             additional2: order.delivery,
//             domain: additional1,
//             additional7: order.reason,
//             additional8: order.additional8,
//             additional19: order.id,
//             kazpostTrack: order.additional4,
//             additional1: order.delivery_at,
//             additional10: order.additional9,
//           }),
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//             },
//           }
//         );

//         if (response.status === 200) {
//           console.log('Order successfully added:', response.data);
          
//           const updateResponse = await axios.post(
//             `${apiUrlToUpdate}?token=${apiKey}&id=${order.id}`,
//             new URLSearchParams({
//               status: subStatusId,
//             }),
//             {
//               headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//               },
//             }
//           );

//           if (updateResponse.status === 200) {
//             console.log('Order successfully updated:', updateResponse.data);
//             break; // Прекращаем цикл, если заказ успешно отправлен
//           }
//         }  else {
//           console.log('oshibka pri update order')
//           break
//         }

//       } catch (error) {
//         console.error('Error adding or updating order:', error.response ? error.response.data : error.message);
//       }
//     }
//   }
  



export const fromHundredThousand = async (req, res) => {
  try {
    console.log("Начинаем обработку заказов с ID 100000...");
    const orders = await Order.getFrom(40001, 50000);

    if (!orders || orders.length === 0) {
      console.log("Заказы не найдены.");
      return res.status(200).send("Нет заказов для обработки.");
    }

    console.log(`Найдено ${orders.length} заказов. Начинаю обработку...`);

    const promises = orders.map(async (order, index) => {
      try {
        console.log(`Получение Leadvertex ID для заказа ID: ${order.id}...`);
        

        // const response = await axios({
        //   method: "GET",
        //   url: `https://talkcall-kz.leadvertex.ru/api/admin/getOrdersIdsByCondition.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa&additional19=${order.id}`,
        // });

        // const data = response.data;
        // if (!data || data.length === 0) {
        //   console.log(`Нет данных для заказа ID: ${order.id}`);
        //   return;
        // }
        // let leadvertex_id = null
        // if (data.length > 0) {
        //   leadvertex_id = data[data.length - 1];
        // }
        // leadvertex_id = data[0];

        // console.log(`Данные ответа для заказа ID ${order.id}:`, data);
        // console.log(
        //   `Leadvertex ID ${leadvertex_id} найден для заказа ID: ${order.id}. Обновляем статус...`
        // );

        const updateResponse = await axios({
          method: "POST",
          url: `https://talkcall-kz.leadvertex.ru/api/admin/updateOrder.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa&id=${order.id}`,
          data: new URLSearchParams({
            status: order.sub_status_id,
          }).toString(),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        });

        if (updateResponse.status === 200) {
          console.log(
            `Заказ ID: ${order.id} успешно обновлен. Ответ:`,
            updateResponse.data
          );
        } else {
          console.error(
            `Ошибка обновления заказа ID: ${order.id}. Статус ответа: ${updateResponse.status}`
          );
        }
      } catch (error) {
        if (error.response) {
          console.error(
            `Ошибка при обработке заказа ID: ${order.id}. ${JSON.stringify(order, null, 2)}Код ответа: ${error.response.status}, Детали ответа:`,
            error.response.data
          );
        } else if (error.code === "ECONNABORTED") {
          console.error(
            `Тайм-аут запроса для заказа ID: ${order.id}. Проверьте сервер.`
          );
        } else if (error.message.includes("EPIPE")) {
          console.error(
            `Сбой соединения для заказа ID: ${order.id}. Сервер закрыл соединение.`
          );
        } else {
          console.error(
            `Неизвестная ошибка при обработке заказа ID: ${order.id}. Детали:`,
            error.message
          );
        }
      }

    });

    await Promise.all(promises);

    console.log("Обработка всех заказов завершена.");
    res.status(200).send("Обработка завершена.");
  } catch (error) {
    console.error("Общая ошибка:", error.message);
    res.status(500).send("Ошибка сервера.");
  }
};




