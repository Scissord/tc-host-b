import { parse } from 'comma-separated-tokens';
import * as Order from '#models/order.js';
import * as Webmaster from '#models/webmaster.js';
import * as Product from '#models/product.js';
import * as Operator from '#models/operator.js';
import * as SubStatus from '#models/sub_status.js';
import * as City from '#models/city.js';
import * as Gender from '#models/gender.js';
import * as Payment from '#models/payment.js';
import * as Delivery from '#models/delivery.js';
import ERRORS from '#constants/errors.js';

export const getStatusList = async (req, res) => {
  try {
    const sub_statuses = await SubStatus.getAll();

    const transformedStatuses = sub_statuses.reduce((acc, ss) => {
      acc[ss.id] = {
        name: ss.name,
        status_id: ss.status_id,
      };
      return acc;
    }, {});

    res.status(200).json(transformedStatuses);
  } catch (err) {
    console.log("Error in getStatusList dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getWebmasters = async (req, res) => {
  try {
    const webmasters = await Webmaster.get();

    const transformedWebmasters = webmasters.reduce((acc, w) => {
      acc[w.id] = w.name;
      return acc;
    }, {});

    res.status(200).json(transformedWebmasters);
  } catch (err) {
    console.log("Error in getWebmasters dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOfferGoods = async (req, res) => {
  try {
    const products = await Product.get();

    const transformedProducts = products.reduce((acc, p) => {
      acc[p.id] = {
        name: p.name,
        price: p.price,
      };

      return acc;
    }, {});

    res.status(200).json(transformedProducts);
  } catch (err) {
    console.log("Error in getWebmasters dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCities = async (req, res) => {
  try {
    const cities = await City.get();

    const transformedCities = cities.reduce((acc, c) => {
      acc[c.id] = {
        name: c.name,
      };

      return acc;
    }, {});

    res.status(200).json(transformedCities);
  } catch (err) {
    console.log("Error in getCities dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.get();

    const transformedPayments = payments.reduce((acc, p) => {
      acc[p.id] = {
        name: p.name,
      };

      return acc;
    }, {});

    res.status(200).json(transformedPayments);
  } catch (err) {
    console.log("Error in getPayments dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.get();

    const transformedDeliveries = deliveries.reduce((acc, d) => {
      acc[d.id] = {
        name: d.name,
      };

      return acc;
    }, {});

    res.status(200).json(transformedDeliveries);
  } catch (err) {
    console.log("Error in getDeliveries dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGenders = async (req, res) => {
  try {
    const genders = await Gender.get();

    const transformedGenders = genders.reduce((acc, g) => {
      acc[g.id] = {
        name: g.name,
      };

      return acc;
    }, {});

    res.status(200).json(transformedGenders);
  } catch (err) {
    console.log("Error in getGenders dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;

    if (!id) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_ID
      });
    };

    if (Object.keys(data).length === 0) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_FIELDS
      });
    };

    const order = await Order.update(id, data);

    res.status(200).json(order);
  } catch (err) {
    console.log("Error in updateOrder dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderIdsInSubStatus = async (req, res) => {
  try {
    const { status } = req.query;
    if (!status) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_STATUS,
      });
    };
    const ids = await Order.getOrderIdsInSubStatus(status);

    res.status(200).json(ids);
  } catch (err) {
    console.log("Error in getOrderIdsInSubStatus dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrdersByIds = async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_ID,
      });
    };

    const parsed_ids = parse(ids);

    const orders = await Order.getWhereIn('o.id', parsed_ids);

    const [
      products,
      webmasters,
      operators,
      cities,
      subStatuses,
      genders,
      payments,
      deliveries,
    ] = await Promise.all([
      Product.get(),
      Webmaster.get(),
      Operator.get(),
      City.get(),
      SubStatus.get(),
      Gender.get(),
      Payment.get(),
      Delivery.get(),
    ]);

    const transformedStatuses = orders.reduce((acc, order) => {
      acc[order.id] = {
        ...order,
        webmaster: webmasters.find((w) => +w.id === +order.webmaster_id)?.name ?? '-',
        operator: operators.find((o) => +o.id === +order.operator_id)?.name ?? '-',
        city: cities.find((c) => +c.id === +order.city_id) || null,
        status: subStatuses.find((ss) => +ss.id === +order.sub_status_id) || null,
        items: order.items.map((item) => {
          const product = products.find((p) => +p.id === +item.product_id);
          return {
            ...item,
            name: product ? product.name : '-',
            price: product ? product.price : '-',
          };
        }),
        gender: genders.find((g) => +g.id === +order.gender_id)?.name ?? '-',
        payment: payments.find((p) => +p.id === order.payment_id)?.name ?? '-',
        delivery: deliveries.find((d) => +d.id === +order.delivery_id)?.name ?? '-',
      };
      return acc;
    }, {});

    res.status(200).json(transformedStatuses);
  } catch (err) {
    console.log("Error in getOrderIdsInSubStatus dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
