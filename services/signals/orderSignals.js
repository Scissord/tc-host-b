import axios from 'axios';
import dotenv from 'dotenv';

import * as Log from '#models/log.js';
import * as Order from '#models/order.js';
import * as OrderItems from '#models/order_item.js';
import * as SubStatus from '#models/sub_status.js';

dotenv.config();

const cancelledOrder = async (order, sub_status_id) => {
    const oldOrder = order;
    const sub_status = await SubStatus.find(sub_status_id);

    const orderItems = await OrderItems.getByOrderId([order.id]);
    console.log(JSON.stringify(orderItems, null, 2));

    // Удаляем ненужные поля и преобразуем данные
    const cleanedOrderItems = orderItems.map(({ id, order_id, price, ...rest }) => ({
        ...rest,
        price: parseFloat(price), // Преобразуем price в число
        order_id: parseInt(order_id, 10), // Преобразуем order_id в число
    }));

    delete order.id;
    delete order.webmaster_id;
    delete order.utm_term;
    delete order.operator_id;
    delete order.approved_by_id;
    delete order.cancelled_by_id;
    delete order.cancelled_by_entity;
    delete order.created_at;

    order.additional9 = 'HOLD';
    order.status_id = sub_status.status_id;
    order.sub_status_id = sub_status_id;

    // Создаём новый заказ
    const new_order = await Order.create(order);

    // Обновляем order_id для каждого элемента
    const updatedOrderItems = cleanedOrderItems.map((item) => ({
        ...item,
        order_id: new_order.id, // Устанавливаем новый order_id
    }));

    // Вставляем записи в таблицу order_item
    await Promise.all(
        updatedOrderItems.map((item) => OrderItems.create(item))
    );

    await Log.create({
        order_id: new_order.id,
        old_sub_status_id: oldOrder.sub_status_id,
        new_sub_status_id: sub_status_id,
        action: `Заказ №${new_order.id} был пересоздан, старый - ${oldOrder.id}`,
        old_metadata: oldOrder,
        new_metadata: new_order,
    });
};

export const orderCreateSignal = async (new_order) => {
    try {
        const orders = await Order.getWhere({ status_id: new_order.status_id, phone: new_order.phone });

        if (orders && orders.length > 0 && orders.length !== 1) {
            console.log(`Found ${orders.length} orders. Processing...`);

            for (const order of orders) {
                try {
                    if (+order.sub_status_id === 30) {
                        await Order.update(+order.id, { sub_status_id: 54, status_id: 6 });
                    } else if (+order.id !== +new_order.id) {
                        await Order.update(+order.id, { sub_status_id: 54, status_id: 6 });
                    } else {
                        console.error("I DNK");
                    }
                } catch (orderError) {
                    console.error(`Error processing order ID ${existingOrder.id}:`, orderError);
                }

            }

        } else {
            console.log('No orders found.');
        }
    } catch (error) {
        console.error('Error checking or processing orders:', error);
        throw new Error('Failed to check or process orders');
    }
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
