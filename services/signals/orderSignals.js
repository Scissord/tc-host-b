import axios from 'axios';
import dotenv from 'dotenv';

import * as Order from '#models/order.js';
import * as OrderItems from '#models/order_item.js';
import * as SubStatus from '#models/sub_status.js';

dotenv.config();

const cancelledOrder = async (order, sub_status_id) => {
    const sub_status = await SubStatus.find(sub_status_id);

    const orderItems = await OrderItems.getByOrderId([order.id]);
    const cleanedOrderItems = orderItems.map(({ id, order_id, ...rest }) => rest);

    delete order.id;
    delete order.webmaster_id;
    delete order.utm_term;
    delete order.operator_id;
    delete order.approved_by_id;
    delete order.cancelled_by_id;
    delete order.cancelled_by_entity;

    order.additional9 = 'HOLD';
    order.status_id = sub_status.status_id;
    order.sub_status_id = sub_status_id;

    const new_id = await Order.create(order);

    const updatedOrderItems = cleanedOrderItems.map((item) => ({
        ...item,
        order_id: new_id,
    }));

    await Promise.all(
        updatedOrderItems.map((item) => OrderItems.create(item))
    );
};

export const orderCreateSignal = async (order) => {
    // Реализация не указана, оставлено для заполнения
};

export const statusChangeSignal = async (order_id, sub_status_id) => {
    switch (sub_status_id) {
        // ЕСЛИ ЗАКАЗ ОТМЕНИЛИ: 12 - статус ОТМЕНЕН, ЗАКИДЫВАЕМ В Hotcold - 30
        case 12:
        case 7:
            setTimeout(async () => {
                const updatedOrder = await Order.find(order_id);

                // проверка то что заказ все еще в отмененных
                if (updatedOrder && updatedOrder.sub_status_id === sub_status_id) {
                    await cancelledOrder(updatedOrder, 30);
                } else {
                    console.log(
                        `Order ${order_id} no longer has sub_status_id ${sub_status_id}. Skipping cancellation.`
                    );
                }
            }, 10 * 60); // 10 минут ждем 
            break;

        default:
            console.log(`Order ${order_id} has an unknown sub_status_id: ${sub_status_id}`);
    }
};



export const postbackKeitaroSignal = async (utm_term, domain, status) => {
    const params = {
        subid: utm_term,
        payout: 0,
        status: status,
        offer_domain: domain,
        lead_status: 0,
        sale_status: 1,
        rejected_status: -1,
        from: 'api.talkcall-crm.com',
    };

    try {
        const response = await axios.get(process.env.KEITARO_POSTBACK, { params });
        console.log(response.status)
    } catch (error) {
        if (error.response) {
            console.error(`Ошибка от сервера: ${error.response.status} ${error.response.statusText}`);
            console.error('Данные ошибки:', error.response.data);
        } else {
            console.error('Ошибка выполнения запроса:', error.message);
        }
    }
};
