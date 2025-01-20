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

    const statistic = await Order.getOrderStatisticForWebmaster(start, end, webmaster_id);
    const result = calculateStatistics(statistic);

    return res.status(200).send({ message: 'ok', result })
  } catch (err) {
    console.log("Error in getWebmasterStatistic statistic controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  };
};

export const getOperatorStatistic = async (req, res) => {
  try {
    const { start, end, operator_id } = req.query;
    const orders = await Order.getOrderStatisticForOperator(start, end, operator_id);
    const operators = await Operator.get();

    const statistics = groupOperators(orders, operators);

    return res.status(200).send({ message: 'ok', statistics });
  } catch (err) {
    console.log("Error in getOperatorStatistic statistic controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  };
};
