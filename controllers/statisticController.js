import XLSX from 'xlsx';
import * as Order from '#models/order.js';
import * as OrderItem from '#models/order_item.js';
import * as Webmaster from '#models/webmaster.js';
import * as Operator from '#models/operator.js';

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
        shippedOrders: parseInt(result.shipped_orders, 10),
        buyoutOrders: parseInt(result.buyout_orders, 10),
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

export const uploadFileForStatistic = async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('Файл не загружен.');
  }

  const uploadedFile = req.files.file;
  const workbook = XLSX.read(uploadedFile.data, { type: 'buffer' });

  // Обходим все листы
  workbook.SheetNames.forEach(sheetName => {
      console.log(`Обработка листа: ${sheetName}`);
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      sheet.forEach((row, index) => {
          const recordNumber = row["#"];
          const campaign = row["campaign"];
          const crmOrderId = row["crm_order_id"];
          const userId = row["user_id"];
          const username = row["username"];
          const subStatusName = row["sub_status_name"];
          const subStatusId = row["sub_status_id"];
          const processedDate = row["processed_date"];
          const processedStatus = row["processed_status"];

          // Вывод значений
          console.log(`Лист: ${sheetName}, Строка ${index + 1}:`);
          console.log(`#: ${recordNumber}`);
          console.log(`campaign: ${campaign}`);
          console.log(`crm_order_id: ${crmOrderId}`);
          console.log(`user_id: ${userId}`);
          console.log(`username: ${username}`);
          console.log(`sub_status_name: ${subStatusName}`);
          console.log(`sub_status_id: ${subStatusId}`);
          console.log(`processed_date: ${processedDate}`);
          console.log(`processed_status: ${processedStatus}`);
          console.log('--------------------------');
      });
  });

  res.send('Файл обработан. Данные выведены в консоль.');
};
