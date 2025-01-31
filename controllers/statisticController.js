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
import fs from 'fs';
import axios from 'axios';

const logFilePath = 'update_logs.txt'; 

const writeLog = (message) => {
  fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
};



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
  



// export const fromHundredThousand = async (req, res) => {
  
 
//   const orders = await Order.getWhereIn('o.sub_status_id', [21])
//   console.log(orders.length)
//   for (const order of orders) {
//     const items = await OrderItem.getWhereIn('oi.order_id', [order.id]);
//     const goods = Array.isArray(items) && items.length > 0
//       ? items.map((item, index) => ({
//         goodID: item.product_id,
//         quantity: item.quantity || 1,
//         price: item.price || 0,
//       }))
//       : [];


//     let updateData = {
//       webmasterID: order.webmaster_id,
//       operatorID: order.operator_id,
//       fio: order.fio,
//       phone: order.phone,
//       price: items[0]?.price ? items[0]?.price : 1650,
//       total: order?.total_sum ? parseFloat(order?.total_sum) : 1650,
//       quantity: Array.isArray(items) && items.length > 0 ? items.reduce((acc, item) => +acc + +item.quantity) : 1,
//       additional8: order.additional8,
//       additional13: order.utm_term,
//       utm_term: order.utm_term,

//       comment: order.comment,
//       domain: order.additional1,
//       goods: goods
//     }

  

//     const response = await axios({
//       method: 'POST',
//       url: 'https://talkcall-kz.leadvertex.ru/api/admin/addOrder.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa',
//       headers: {
//         "Content-Type": 'application/x-www-form-urlencoded'
//       },
//       data: updateData,
//     });

//     if (response.status == 200){
//       const datas = response.data
//       console.log(`OK ${JSON.stringify(datas, null, 2)}`)
       
//       }  else {
//         console.log('oshibka pri update order')
//       }

//     }
//   }


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





const statuses_dict = {
    "УТОЧНИТЬ": {"status_in_leadvertex": 3},
    "НД": {"status_in_leadvertex": 28},
    "ОЖИДАЕТ": {"status_in_leadvertex": 3},
    "СЛЕДУЮЩИЙ": {"status_in_leadvertex": 3},
    "ВЫЕХАЛ": {"status_in_leadvertex": 3},
    "сделать замену": {"status_in_leadvertex": null},
    "сделать возврат денег": {"status_in_leadvertex": null},
    "нет товара": {"status_in_leadvertex": null},
    "ОТКАЗ": {"status_in_leadvertex": 40},
    "ОД": {"status_in_leadvertex": 29},
    "сделан возврат денег": {"status_in_leadvertex": null},
    "замена сделана": {"status_in_leadvertex": null},
    "Перенос оплатить": {"status_in_leadvertex": 29},
    "отказ проплатить": {"status_in_leadvertex": null},
    "выезд дважды": {"status_in_leadvertex": null},
    "ОПЛ располовинен": {"status_in_leadvertex": 5},
    "ОПЛ дальний располовинен": {"status_in_leadvertex": 5},
    "ОПЛ дальний": {"status_in_leadvertex": 5},
    "ОПЛ": {"status_in_leadvertex": 5},
    "ОД оплатить": {"status_in_leadvertex": 29},
    "перенос сделать возврат денег (0)": {"status_in_leadvertex": 29},
    "Замена сделана клиент оплатил (0)": {"status_in_leadvertex": null},
    "ПЕРЕНОС": {"status_in_leadvertex": 29},
    "Перезвонить": {"status_in_leadvertex": null},
    "Опл транспортировка": {"status_in_leadvertex": 27},
    "Выезд дважды. Распол": {"status_in_leadvertex": null},
    "ОПЛ ДОП": {"status_in_leadvertex": 5},
    "Продажа курьер": {"status_in_leadvertex": null},
    "ОПЛ карта": {"status_in_leadvertex": 5},
    "ОПЛ тс Карта": {"status_in_leadvertex": 27},
    "Продажа курьер распол": {"status_in_leadvertex": null},
    "Не упакован": {"status_in_leadvertex": null},
    "ОПЛ ДОП РАСПОЛ": {"status_in_leadvertex": 5},
    "Продажа карта выезд дважды": {"status_in_leadvertex": null},
    "Продажа карта выезд дважды распол": {"status_in_leadvertex": null},
    "Прозвон админа": {"status_in_leadvertex": null},
    "ОПЛ карта дальний": {"status_in_leadvertex": 5},
    "Вручить подарок": {"status_in_leadvertex": null},
    "Подарок вручен": {"status_in_leadvertex": null},
    "Опл нал/без нал": {"status_in_leadvertex": 5},
    "ОПЛ Lucem": {"status_in_leadvertex": 5},
    "ОПЛ Lucem Выезд дважды": {"status_in_leadvertex": 5},
    "Замена перенос": {"status_in_leadvertex": 29},
    "Замена невыкуп": {"status_in_leadvertex": null},
    "опл карта партнер": {"status_in_leadvertex": 5},
    "Замена сделана за счёт склада": {"status_in_leadvertex": null},
    "Обработка": {"status_in_leadvertex": null},
    "опл тс дубль": {"status_in_leadvertex": 5},
    "ОПЛ карта дальний распол": {"status_in_leadvertex": 5},
    "Опл карта тс партнер": {"status_in_leadvertex": 5},
    "Опл карта располов партнер": {"status_in_leadvertex": 5},
    "замена сделана за счёт партнёра": {"status_in_leadvertex": null},
    "опл нал/без нал дальний": {"status_in_leadvertex": 5},
    "опл нал/без нал дважды": {"status_in_leadvertex": 5},
    "выезд дважды PAY": {"status_in_leadvertex": 5},
    "опл дальний PAY": {"status_in_leadvertex": 5},
    "Опл транспортировка PAY": {"status_in_leadvertex": 5},
    "Опл располовинен PAY": {"status_in_leadvertex": 5},
    "Опл дальний располовинен PAY": {"status_in_leadvertex": 5},
    "Опл тс дубль PAY": {"status_in_leadvertex": 5},
    "Опл доп PAY": {"status_in_leadvertex": 5},
    "Опл доп распол PAY": {"status_in_leadvertex": 5},
    "выезд дважды располовинен PAY": {"status_in_leadvertex": 5},
    "Выезд 2 карта партнер": {"status_in_leadvertex": null},
    "Опл карта партнер дальний": {"status_in_leadvertex": 5},
    "Опл нал/безнал PAY": {"status_in_leadvertex": 5},
    "Подтвержден": {"status_in_leadvertex": null},
    "Подтвержден CLUB": {"status_in_leadvertex": null},
    "ВЫВОД денег": {"status_in_leadvertex": null},
    "ОПЛ PAY удаленно": {"status_in_leadvertex": 5},
    "ОПЛ PAY удаленно дальний": {"status_in_leadvertex": 5},
    "ОПЛ PAY удаленно дальний распол": {"status_in_leadvertex": 5},
    "ОПЛ PAY удаленно распол": {"status_in_leadvertex": 5},
    "ОПЛ PAY удаленно дважды": {"status_in_leadvertex": 5},
    "ОПЛ PAY удаленно дважды распол": {"status_in_leadvertex": 5},
    "ОПЛ Lucem дальний": {"status_in_leadvertex": 5},
    "ОПЛ Lucem распол": {"status_in_leadvertex": 5},
    "ОПЛ Lucem дальний распол": {"status_in_leadvertex": 5},
    "ОПЛ Lucem выезд дважды распол": {"status_in_leadvertex": 5},
    "ОПЛ JPay Располовинен": {"status_in_leadvertex": 5},
    "Выезд дважды JPay распол": {"status_in_leadvertex": null},
    "ОПЛ Терминал": {"status_in_leadvertex": 5},
    "ОПЛ располовинен Терминал": {"status_in_leadvertex": 5},
    "ОПЛ b2 Терминал": {"status_in_leadvertex": 5},
    "ОПЛ дальний Терминал": {"status_in_leadvertex": 5},
    "ОПЛ транспортировка Терминал": {"status_in_leadvertex": 5},
    "Замена за счёт партнёра ALFA trade": {"status_in_leadvertex": null},
    "Опл тасматат": {"status_in_leadvertex": 5},
    "Опл люцем пэй": {"status_in_leadvertex": 5},
    "Опл люцем пэй распол": {"status_in_leadvertex": 5},
    "Опл люцем пэй выезд дважды": {"status_in_leadvertex": 5},
    "Опл люцем пэй дальний": {"status_in_leadvertex": 5},
    "Опл люцем пэй нал без нал": {"status_in_leadvertex": 5},
    "Опл люцем пэй нал без нал дважды распол": {"status_in_leadvertex": 5},
    "Опл люцем пэй дальний располов": {"status_in_leadvertex": 5},
};

// export const updateOrderIdsFile = async (req, res) => {
//   console.log('Started processing file upload')
//   writeLog('Started processing file upload');
  
//   if (!req.files || !req.files.file) {
//     writeLog('Файл не загружен.');
//     return res.status(400).send('Файл не загружен.');
//   }

//   const uploadedFile = req.files.file;
//   const workbook = XLSX.read(uploadedFile.data, { type: 'buffer' });
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];
//   const jsonData = XLSX.utils.sheet_to_json(sheet);
//   let procc = 0;
  
//   try {
//     for (const row of jsonData) {
//       const payload = {
//         id: row['ID'],
//         external_id: row['ID внешний'],
//         send_status: row['Статус отправки'],
//         cur_status: row['Статус курьера'],
//         delivery_type: row['Тип доставки']
//       };
//       console.log(`Processing row: ${JSON.stringify(payload)}`)
//       writeLog(`Processing row: ${JSON.stringify(payload)}`);
//       let data_to_update = {};

//       if (payload.delivery_type === 'Почта') {
//         if (payload.send_status === 'Отправлен' || payload.send_status === 'На отправку') {
//           data_to_update.status = 13;
//         } else if (payload.send_status === 'Оплачен') {
//           data_to_update.status = 6;
//         } else if (payload.send_status === 'Отказ') {
//           data_to_update.status = 46;
//         }
//       } else {
//         const statusInfo = statuses_dict[payload.cur_status];
//         if (statusInfo) {
//           data_to_update.status = statusInfo.status_in_leadvertex;
//         } else {
//           console.log(`Status not found for row: ${JSON.stringify(payload)}`)
//           writeLog(`Status not found for row: ${JSON.stringify(payload)}`);
//           continue;
//         }
//       }
      
//       if (!data_to_update.status) {
//         procc++;
//         continue;
//       }
      
//       try {
//         if (+payload.external_id > 0 && +payload.external_id <= 100000) {
//           const data = new URLSearchParams();
//           data.append('status', data_to_update.status);

//           const updateResponse = await axios.post(
//             `https://talkcall-kz.leadvertex.ru/api/admin/updateOrder.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa&id=${payload.external_id}`,
//             data,
//             { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//           );
          
//           if (updateResponse.status === 200) {
//             console.log(`Order ${payload.external_id} updated to status ${data_to_update.status}`)
//             writeLog(`Order ${payload.external_id} updated to status ${data_to_update.status}`);
//           }
//         } else {
//           const response = await axios.get(
//             `https://talkcall-kz.leadvertex.ru/api/admin/getOrdersIdsByCondition.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa`,
//             { params: { additional19: payload.external_id } }
//           );
//           let last_id 
//           if (response.data && response.data.length > 0) {
//             last_id = response.data[response.data.length - 1];
//             console.log(`Found last order ID: ${last_id} for external ID: ${payload.external_id}`)
//             writeLog(`Found last order ID: ${last_id} for external ID: ${payload.external_id}`);

//           } 

//           if (!last_id){
//             last_id = payload.external_id
//           }
//           const data = new URLSearchParams();
//             data.append('status', data_to_update.status);

//             const updateResponse = await axios.post(
//               `https://talkcall-kz.leadvertex.ru/api/admin/updateOrder.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa&id=${last_id}`,
//               data,
//               { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//             );

//             if (updateResponse.status === 200) {
//               console.log(`Order ${last_id} updated to status ${data_to_update.status}`)
//               writeLog(`Order ${last_id} updated to status ${data_to_update.status}`);
//             }

//         }
//       } catch (error) {
//         console.log(`Error updating order ${payload.external_id}: ${error.message}`)
//         writeLog(`Error updating order ${payload.external_id}: ${error.message}`);
//       }
//     }
    
//     writeLog(`${procc} rows were skipped`);
//     console.log(`${procc} rows were skipped`)
//     res.send('Данные успешно загружены и отправлены.');
//   } catch (error) {
//     console.log(`Ошибка при обработке файла: ${error.message}`)
//     writeLog(`Ошибка при обработке файла: ${error.message}`);
//     res.status(500).send('Ошибка при обработке файла.');
//   }
// };


export const updateOrdersWithKet = async (req, res) => {
  try {
    const response = await axios.get(
      `https://talkcall-kz.leadvertex.ru/api/admin/getOrdersIdsByCondition.html`,
      { params: { token: "kjsdaKRhlsrk0rjjekjskaaaaaaaa", status: 13 } }
    );

    const orders = response.data; // Массив ID заказов
    if (!orders || orders.length === 0) {
      console.log("⚠️ Нет заказов со статусом 13");
      return res.json({ success: true, message: "Нет заказов для обработки" });
    }

    let notFoundOrders = []; // Заказы, которых нет в KET
    let postDeliveryOrders = []; // Заказы, у которых доставка "почта"

    for (const orderId of orders) {
      const resOrder = await axios.get(
        `https://talkcall-kz.leadvertex.ru/api/admin/getOrdersByIds.html`,
        { params: { token: "kjsdaKRhlsrk0rjjekjskaaaaaaaa", ids: orderId } }
      );

      const orderInfo = resOrder.data[orderId];
      if (!orderInfo) {
        console.log(`⚠️ Заказ ${orderId} не найден в LeadVertex`);
        continue;
      }

      let lvIdToSearch = orderInfo.additional19 || orderId;
      let keyToUse = "ext_id"; 

      const fetchFromKet = async (idValue, idType) => {
        const data = {
          data: JSON.stringify([{ [idType]: idValue }])
        };

        try {
          const ketResponse = await axios.post(
            `https://ketkz.com/api/get_orders.php`,
            data,
            {
              params: { uid: "99770715", s: "OFxMG6K9" },
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
          );

          return ketResponse.data;
        } catch (ketError) {
          console.error(`❌ Ошибка запроса к KET API для ${idValue} (${idType}):`, ketError.message);
          return null;
        }
      };

      let ketOrderInfos = await fetchFromKet(lvIdToSearch, keyToUse);

      if (!ketOrderInfos || Object.keys(ketOrderInfos).length === 0) {
        console.log(`⚠️ Данных по ${keyToUse} (${lvIdToSearch}) не найдено, пробуем по orderId (${orderId})`);
        ketOrderInfos = await fetchFromKet(orderId, "id");
      }

      if (!ketOrderInfos || Object.keys(ketOrderInfos).length === 0) {
        console.log(`❌ Заказ ${orderId} не найден в KET`);
        notFoundOrders.push(orderId);
        continue;
      }
      console.log(ketOrderInfos)
      const latestOrder = Object.values(ketOrderInfos).pop();
      console.log(`✅ Ответ от ketkz.com для заказа ${lvIdToSearch} (или ${orderId}):`, latestOrder);

      // Проверяем дату доставки
      if (latestOrder.delivery_date) {
        const deliveryYear = new Date(latestOrder.delivery_date).getFullYear();
        if (deliveryYear !== 2025 && deliveryYear !== 2024) {
          console.log(`❌ Заказ ${orderId} имеет старую дату доставки (${latestOrder.delivery_date}), пропускаем`);
          notFoundOrders.push(orderId);
          continue;
        }
      }

      if (latestOrder && latestOrder.kz_delivery !== "Почта") {
        console.log(`📦 Заказ ${orderId} отправляется курьер`);
        console.log(latestOrder)
        postDeliveryOrders.push(orderId);
      }
    }

    console.log("📌 Заказы, которых нет в KET:", notFoundOrders);
    console.log("📬 Заказы с доставкой 'почта':", postDeliveryOrders);

    return res.json({
      success: true,
      message: "Обновление заказов завершено",
      notFoundOrders,
      postDeliveryOrders
    });

  } catch (error) {
    console.error("❌ Ошибка обработки заказов:", error.message);
    return res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

