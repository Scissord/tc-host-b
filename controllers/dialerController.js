import { parse } from 'comma-separated-tokens';
import * as User from '#models/user.js';
import * as Order from '#models/order.js';
import * as OrderItem from '#models/order_item.js';
import * as Webmaster from '#models/webmaster.js';
import * as Product from '#models/product.js';
import * as Operator from '#models/operator.js';
import * as SubStatus from '#models/sub_status.js';
import * as City from '#models/city.js';
import * as Gender from '#models/gender.js';
import * as PaymentMethod from '#root/models/payment_method.js';
import * as DeliveryMethod from '#root/models/delivery_method.js';
import * as OrderCancelReason from '#root/models/order_cancel_reason.js';
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

export const getPaymentMethods = async (req, res) => {
  try {
    const payment_methods = await PaymentMethod.get();

    const transformedPaymentMethods = payment_methods.reduce((acc, pm) => {
      acc[pm.id] = {
        name: pm.name,
      };

      return acc;
    }, {});

    res.status(200).json(transformedPaymentMethods);
  } catch (err) {
    console.log("Error in getPaymentMethods dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDeliveryMethods = async (req, res) => {
  try {
    const delivery_methods = await DeliveryMethod.get();

    const transformedDeliveryMethods = delivery_methods.reduce((acc, dm) => {
      acc[dm.id] = {
        name: dm.name,
      };

      return acc;
    }, {});

    res.status(200).json(transformedDeliveryMethods);
  } catch (err) {
    console.log("Error in getDeliveryMethods dialer controller", err.message);
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

export const getOperators = async (req, res) => {
  try {
    const operators = await Operator.get();

    const transformedOperators = operators.reduce((acc, o) => {
      acc[o.id] = o.name;
      return acc;
    }, {});

    res.status(200).json(transformedOperators);
  } catch (err) {
    console.log("Error in getOperators dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderCancelReasons = async (req, res) => {
  try {
    const order_cancel_reasons = await OrderCancelReason.get();

    const transformedOrderCancelReasons = order_cancel_reasons.reduce((acc, ocr) => {
      acc[ocr.id] = {
        name: ocr.name,
      };

      return acc;
    }, {});

    res.status(200).json(transformedOrderCancelReasons);
  } catch (err) {
    console.log("Error in getOrderCancelReasons dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const toggleOrder = async (req, res) => {
  try {
    const { id, is_blocked } = req.query;
    const data = req.body;

    if (!id) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_ID
      });
    };

    if (!is_blocked) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_IS_BLOCKED
      });
    };

    // here need to send socket to frontend

    res.status(200).json();
  } catch (err) {
    console.log("Error in toggleOrder dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;

    console.log('dialer', id);
    console.log('dialer', data);

    // 1. check for id
    if (!id) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_ID
      });
    };

    // 2. check for data
    if (Object.keys(data).length === 0) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_FIELDS
      });
    };

    console.log('before 3')

    // 3. if 1, 4 or 12 change approved_by and cancelled_by
    if (data?.operator_id && (+data?.sub_status_id === 1 || +data?.sub_status_id === 4)) {
      await Order.update(id, {
        approved_by_id: data.operator_id,
        approved_by_entity: 'оператором',
      });
    };

    if (data?.operator_id && +data?.sub_status_id === 12) {
      await Order.update(id, {
        cancelled_by_id: data.operator_id,
        cancelled_by_entity: 'оператором',
      });
    };

    // 4. update sub status
    if (data?.sub_status_id) {
      const new_sub_status = await SubStatus.find(data.sub_status_id);
      data.status_id = new_sub_status.status_id;
    };

    // 5. update order
    const order = await Order.update(id, data);

    res.status(200).json(order);
  } catch (err) {
    console.log("Error in updateOrder dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changeOrderItem = async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;

    if (!id) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_ID
      });
    };

    if (!data.length) {
      return res.status(400).send({
        message: ERRORS.REQUIRED_FIELDS
      });
    };

    await OrderItem.hardDeleteByOrderId(id);

    let items = [];
    for (const order_item of data) {
      const item = await OrderItem.create({
        order_id: id,
        product_id: order_item.product_id,
        quantity: order_item.quantity,
      });
      items.push(item);
    };

    res.status(200).json(items);
  } catch (err) {
    console.log("Error in changeOrderItem dialer controller", err.message);
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
      paymentMethods,
      deliveryMethods,
      orderCancelReasons,
    ] = await Promise.all([
      Product.get(),
      Webmaster.get(),
      Operator.get(),
      City.get(),
      SubStatus.get(),
      Gender.get(),
      PaymentMethod.get(),
      DeliveryMethod.get(),
      OrderCancelReason.get(),
    ]);

    const transformedStatuses = await Promise.all(orders.map(async (order) => {
      const items = await OrderItem.getWhereIn('oi.order_id', [order.id]);

      return {
        ...order,
        webmaster: webmasters.find((w) => +w.id === +order.webmaster_id)?.name ?? '-',
        operator: operators.find((o) => +o.id === +order.operator_id)?.name ?? '-',
        city: cities.find((c) => +c.id === +order.city_id) || null,
        status: subStatuses.find((ss) => +ss.id === +order.sub_status_id) || null,
        items: items.map((item) => {
          const product = products.find((p) => +p.id === +item.product_id);
          return {
            ...item,
            name: product ? product.name : null,
          };
        }),
        gender: genders.find((g) => +g.id === +order.gender_id)?.name ?? '-',
        payment_method: paymentMethods.find((p) => +p.id === order.payment_id)?.name ?? '-',
        delivery_method: deliveryMethods.find((d) => +d.id === +order.delivery_id)?.name ?? '-',
        order_cancel_reason: orderCancelReasons.find((cr) => +cr.id === +order.cancel_reason_id)?.name ?? '-',
      };
    }));

    // Convert the result into an object with order IDs as keys (similar to your original code)
    const transformedStatusesObject = transformedStatuses.reduce((acc, transformedOrder) => {
      acc[transformedOrder.id] = transformedOrder;
      return acc;
    }, {});

    res.status(200).json(transformedStatusesObject);
  } catch (err) {
    console.log("Error in getOrdersByIds dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
