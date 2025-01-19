import * as Order from '#models/order.js';
import * as OrderItem from '#models/order_item.js';
import * as SubStatus from '#models/sub_status.js';
import * as Product from '#models/product.js';
import * as Webmaster from '#models/webmaster.js';
import * as Operator from '#models/operator.js';
import * as City from '#models/city.js';
import * as Gender from '#models/gender.js';
import * as PaymentMethod from '#root/models/payment_method.js';
import * as DeliveryMethod from '#root/models/delivery_method.js';
import * as OrderCancelReason from '#root/models/order_cancel_reason.js';
import { getKeyValue } from '#services/redis/redis.js';
import hideString from '#utils/hideString.js';

export async function mapOrders(orders, hide) {
  const reservedOrders = await getKeyValue('reservedOrders') || [];
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

  const mappedOrders = await Promise.all(
    orders.map(async (order) => {
      const doubles = await Order.getDoubles(order.id, order.phone);
      const items = await OrderItem.getWhereIn('oi.order_id', [order.id]);

      const reserver = reservedOrders.find((ro) => +ro.order_id === +order.id);
      const is_disabled = !!reserver;
      const reserved_by = reserver?.name || '';

      return {
        ...order,
        phone: hide ? hideString(order.phone) : order.phone,
        webmaster: webmasters.find((w) => +w.id === +order.webmaster_id)?.name ?? '-',
        operator: operators.find((o) => +o.id === +order.operator_id)?.name ?? '-',
        city: cities.find((c) => +c.id === +order.city_id) || null,
        status: subStatuses.find((ss) => +ss.id === +order.sub_status_id) ?? null,
        items: items.map((item) => {
          const product = products.find((p) => +p.id === +item.product_id);
          return {
            ...item,
            name: product ? product.name : null,
          };
        }),

        created_at: order.created_at.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null,
        updated_at: order.updated_at.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null,
        delivery_at: order.delivery_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null,
        logist_recall_at: order.logist_recall_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null,
        approved_at: order.approved_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null,
        cancelled_at: order.cancelled_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null,
        shipped_at: order.shipped_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null,
        buyout_at: order.buyout_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null,

        gender: genders.find((g) => +g.id === +order.gender_id)?.name ?? '-',
        payment_method: paymentMethods.find((p) => +p.id === order.payment_method_id)?.name ?? '-',
        delivery_method: deliveryMethods.find((d) => +d.id === +order.delivery_method_id)?.name ?? '-',
        order_cancel_reason: orderCancelReasons.find((cr) => +cr.id === +order.order_cancel_reason_id)?.name ?? '-',
        doubles,
        is_doubles_open: false,
        is_checked: false,
        is_disabled,
        reserved_by,
      };
    })
  );

  return mappedOrders;
};

export async function mapOrder(order) {
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

  order.doubles = await Order.getDoubles(order.id, order.phone);
  order.webmaster = webmasters.find((w) => +w.id === +order.webmaster_id)?.name ?? '-';
  order.operator = operators.find((o) => +o.id === +order.operator_id)?.name ?? '-';
  order.city = cities.find((c) => +c.id === +order.city_id) || null;
  order.status = subStatuses.find((ss) => +ss.id === +order.sub_status_id) ?? null;
  order.items = order.items.map((item) => {
    const product = products.find((p) => +p.id === +item.product_id);
    return {
      ...item,
      name: product ? product.name : null,
    };
  });

  order.created_at = order.created_at.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
  order.updated_at = order.updated_at.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
  order.delivery_at = order.delivery_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null;
  order.logist_recall_at = order.logist_recall_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null;
  order.approved_at = order.approved_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null;
  order.cancelled_at = order.cancelled_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null;
  order.shipped_at = order.shipped_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null;
  order.buyout_at = order.buyout_at?.toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }) || null;

  order.gender = genders.find((g) => +g.id === +order.gender_id)?.name ?? '-';
  order.payment_method = paymentMethods.find((p) => +p.id === order.payment_method_id)?.name ?? '-';
  order.delivery_method = deliveryMethods.find((d) => +d.id === +order.delivery_method_id)?.name ?? '-';
  order.order_cancel_reason = orderCancelReasons.find((cr) => +cr.id === +order.order_cancel_reason_id)?.name ?? '-';

  return order;
};
