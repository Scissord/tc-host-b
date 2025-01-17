import dotenv from 'dotenv';
// import * as Order from '#models/status.js';
dotenv.config();

export const sendOrders = async (orders) => {
    try {
        const promises = orders.map(order =>
            fetch(`${process.env.KETKZ_URL}?uid=${order.client_id}`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            })
        );

        const responses = await Promise.all(promises);

        for (const [index, response] of responses.entries()) {
            if (!response.ok) {
                console.error(
                    `Ошибка при отправке заказа ${orders[index].id}: ${response.status} - ${response.statusText}`
                );
            } else {
                try {
                    const data = await response.json();
                    console.log(`Заказ ${orders[index].id} успешно отправлен:`, data);
                } catch (jsonError) {
                    console.error(`Ошибка парсинга JSON для заказа ${orders[index].id}:`, jsonError.message);
                }
            }
        }

        console.log("Все заказы обработаны!");
    } catch (error) {
        console.error("Общая ошибка при обработке заказов:", error.message);
    }
};
