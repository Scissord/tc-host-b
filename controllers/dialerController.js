import { io } from '#services/socket/socket.js';
import requestIp from 'request-ip';
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
import * as Log from '#models/log.js';
import * as PaymentMethod from '#root/models/payment_method.js';
import * as DeliveryMethod from '#root/models/delivery_method.js';
import * as OrderCancelReason from '#root/models/order_cancel_reason.js';
import * as OrderSignals from '#services/signals/orderSignals.js';
import { setKeyValue, getKeyValue } from '#services/redis/redis.js';
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
    const { id, operator_id, is_blocked } = req.query;
    const ip = requestIp.getClientIp(req);

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

    const isBlocked = is_blocked === 'true';

    const operator = await Operator.find(operator_id);
    const user = await User.find(operator.user_id);

    const onlineUsers = await getKeyValue('onlineUsers') || [];
    const reservedOrders = await getKeyValue('reservedOrders') || [];

    if (isBlocked) {
      const reservedOrder = reservedOrders.find((ro) => +ro.order_id === +id);
      if (!reservedOrder) {
        reservedOrders.push({
          order_id: id,
          name: user.name,
        });
        await setKeyValue('reservedOrders', reservedOrders);
      } else {
        return res.status(200).json({ id, is_blocked });
      }
    } else {
      const reservedOrder = reservedOrders.find((ro) => +ro.order_id === +id);
      if (reservedOrder) {
        const updatedReservedOrders = reservedOrders.filter((ro) => +ro.order_id !== +id);
        await setKeyValue('reservedOrders', updatedReservedOrders);
      } else {
        return res.status(200).json({ id, is_blocked });
      };
    };

    onlineUsers.forEach((onlineUser) => {
      onlineUser.sockets.forEach((socketId) => {
        io.to(socketId).emit(isBlocked ? "blockOrder" : "openOrder", {
          message: "Order reserved.",
          order_id: id,
          name: user.name,
        });
      });
    });

    await Log.create({
      order_id: id,
      operator_id: operator_id,
      action: `${user.name} ${isBlocked ? 'вошёл (-а) в заказ' : 'вышел (-а) из заказа'} №${id}`,
      ip,
    });

    res.status(200).json({ id, is_blocked });
  } catch (err) {
    console.log("Error in toggleOrder dialer controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    const ip = requestIp.getClientIp(req);

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

    // 3. if 1, 4 or 12 change approved_by and cancelled_by
    const check_order = await Order.find(id);
    if (data?.operator_id && (+data?.sub_status_id === 1 || +data?.sub_status_id === 4)) {

      const approved_data = {
        approved_at: new Date(),
        updated_at: new Date(),
      };

      if (!check_order.approved_at) {
        approved_data.approved_by_id = data.operator_id;
        approved_data.approved_by_entity = 'оператором';
      };

      await Order.update(id, approved_data);
    };

    if (data?.operator_id && +data?.sub_status_id === 12) {
      const cancelled_data = {
        cancelled_at: new Date(),
        updated_at: new Date()
      };

      if (!check_order.cancelled_at) {
        cancelled_data.cancelled_by_id = data.operator_id;
        cancelled_data.cancelled_by_entity = 'оператором';
      };

      await Order.update(id, cancelled_data);
    };

    if (+data?.sub_status_id === 3 || +data?.sub_status_id === 13) {
      await Order.update(id, {
        shipped_at: new Date(),
        updated_at: new Date(),
      });
    };

    if (+data?.sub_status_id === 5 || +data?.sub_status_id === 6 || +data?.sub_status_id === 27) {
      await Order.update(id, {
        buyout_at: new Date(),
        updated_at: new Date(),
      });
    };

    // 4. update sub status
    if (data?.sub_status_id) {
      const new_sub_status = await SubStatus.find(data.sub_status_id);
      data.status_id = new_sub_status.status_id;

      await OrderSignals.statusChangeSignal(+id, +data.sub_status_id)
    };

    // 4.1 change updated_at
    data.updated_at = new Date();

    // 5. update order
    const order = await Order.update(id, data);

    // 4.2 logs
    await Log.create({
      order_id: id,
      operator_id: data?.operator_id ? data.operator_id : check_order.operator_id,
      old_sub_status_id: check_order?.sub_status_id,
      new_sub_status_id: data?.sub_status_id ? data?.sub_status_id : check_order?.sub_status_id,
      action: `Изменение заказа оператором ${data?.operator_id ? data.operator_id : check_order.operator_id} через дайлер`,
      old_metadata: data,
      new_metadata: order,
      ip,
    });

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
        price: order_item.price
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
      users,
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
      User.get()
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
        approved_by_login: (() => {
          const operator = operators.find((o) => +o.id === +order.approved_by_id);
          if (!operator) return '-';
          const user = users.find((u) => +u.id === +operator.user_id);
          return user?.login ?? '-';
        })(),

        cancelled_by_login: (() => {
          const operator = operators.find((o) => +o.id === +order.cancelled_by_id); // Находим оператора
          if (!operator) return '-';
          const user = users.find((u) => +u.id === +operator.user_id);
          return user?.login ?? '-';
        })(),
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
