import dotenv from 'dotenv';
import * as Order from '#models/order.js';
import * as OrderGood from '#models/order_item.js'
import * as City from '#models/city.js'
import * as KetUtils from '#utils/ketOrderName.js'
import { getCityCode } from '#utils/cityCode.js';
import { getKetStatus } from '#utils/ketStatusArray.js'

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


export const sendCourierOrders = async () => {
    const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

    const formattedTomorrow = tomorrow.toISOString().split('T')[0]; 

	const orders = await Order.getWhere({
            sub_status_id: 15,
            delivery_at: formattedTomorrow
        });

    
    const newOrders = [];
	const orderIds = [];

	for (const order of orders) {
		const orderItems = await OrderGood.getWhereIn('o.id', [order.id]);

		if (!orderItems || orderItems.length === 0) {
			console.log(`Заказ ${order.id} не содержит товаров.`);
			continue;
			}

		const firstItem = orderItems[0];
		const orderName = KetUtils.getOrderName(firstItem.product_id, firstItem.quantity);
			
	
		const city = await City.find(order.city_id);
		const cityCode = getCityCode(city.name);

		const newOrder = {
			phone: order.phone,
			price: order.total_sum,
			order_id: order.id,
			name: order.fio,
			country: 'kz',
			addr: order.address,
			city: city.name,
			kz_delivery: cityCode,
			offer: orderName,
			secret: process.env.KETKZ_SECRET,
			date_delivery: order.delivery_at,
			client_id: process.env.KETKZ_UID,
		};

		newOrders.push(newOrder);
		

		orderIds.push(order.id)

		};

    await sendOrders(newOrders);

	await Order.updateWhereIn(orderIds, {sub_status_id: 3})

}


export const sendCourierCityOrders = async () => {
    const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

    const formattedTomorrow = tomorrow.toISOString().split('T')[0]; 

	const orders = await Order.getWhere({
            sub_status_id: 15,
            delivery_at: formattedTomorrow
        });

    
    const newOrders = [];
	const orderIds = [];

	for (const order of orders) {

        const cityIds = [4, 5];

		if (cityIds.includes(order.city_id)) {
			console.log(`City ID ${order.city_id} is in the array.`);
		} else {
			continue;
		}
		const orderItems = await OrderGood.getWhereIn('o.id', [order.id]);

		if (!orderItems || orderItems.length === 0) {
			console.log(`Заказ ${order.id} не содержит товаров.`);
			continue;
			}

		const firstItem = orderItems[0];
		const orderName = KetUtils.getOrderName(firstItem.product_id, firstItem.quantity);
			
	
		const city = await City.find(order.city_id);
		const cityCode = getCityCode(city.name);

		const newOrder = {
			phone: order.phone,
			price: order.total_sum,
			order_id: order.id,
			name: order.fio,
			country: 'kz',
			addr: order.address,
			city: city.name,
			kz_delivery: cityCode,
			offer: orderName,
			secret: process.env.KETKZ_SECRET,
			date_delivery: order.delivery_at,
			client_id: process.env.KETKZ_UID,
		};

		newOrders.push(newOrder);
		

		orderIds.push(order.id)

		};

    await sendOrders(newOrders);

	await Order.updateWhereIn(orderIds, {sub_status_id: 3})

}


export const sendPostalOrders = async () => {
	const orders = await Order.getWhere({
            sub_status_id: 16
        });

    const newOrders = [];
	const orderIds = [];

	for (const order of orders) {
		const orderItems = await OrderGood.getWhereIn('o.id', [order.id]);

		if (!orderItems || orderItems.length === 0) {
			console.log(`Заказ ${order.id} не содержит товаров.`);
			continue;
			}

		const firstItem = orderItems[0];
		const orderName = KetUtils.getOrderName(firstItem.product_id, firstItem.quantity);
			
		const newOrder = {
            phone: order.phone,
            price: order.total_sum,
            order_id: order.id,
            name: order.fio,
            country: 'kz',
            addr: order.region,
            kz_delivery: "32",
            offer: orderName,
            secret: process.env.KETKZ_SECRET,
            date_delivery: order.delivery_at,
            client_id: process.env.KETKZ_UID,
            deliv_desc: order.address,
            index: order.postal_code
        };

		newOrders.push(newOrder);
		

		orderIds.push(order.id)

		};

    await sendOrders(newOrders);
	await Order.updateWhereIn(orderIds, {sub_status_id: 13})

}

export const checkSendedOrders = async () => {
	try {
		const filter_values = [46];
		console.log("Filter values:", filter_values);

		const orders = await Order.getWhereIn("o.sub_status_id", filter_values);
		if (!orders || orders.length === 0) {
			console.log("Нет заказов с указанными sub_status_id");
			return [];
		}

		const orderStatuses = {};
		orders.forEach(order => {
			orderStatuses[order.id] = +order.sub_status_id;
		});

		console.log("Статусы заказов:", JSON.stringify(orderStatuses, null, 2));

		const ext_ids = orders.map(order => order.id);
		console.log("Отправляемые ext_id:", ext_ids);

		try {
			const bodyData = new URLSearchParams({
				data: JSON.stringify(ext_ids.map(id => ({ ext_id: id })))
			}).toString();

			const response = await fetch(
				`${process.env.KETKZ_GET_URL}?uid=${process.env.KETKZ_UID}&s=${process.env.KETKZ_SECRET}`,
				{
					method: 'POST',
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: bodyData
				}
			);

			if (response.ok) {
				const data = await response.json();
				console.log("Ответ API:", JSON.stringify(data, null, 2));

				Object.values(data).forEach(apiResponse => {
					const id = apiResponse.ext_id;
					console.log(`Обработка заказа ID: ${id}`);

					if ([3, 47, 27].includes(orderStatuses[id])) { // kd
						console.log(`Обработка KD заказа ID: ${id}`);
						const ss_id = getKetStatus(apiResponse.status_cur);

						if (ss_id) {
							console.log(`Обновление KD заказа ID: ${id}, новый статус: ${ss_id}`);
							if (ss_id !== +orderStatuses[id]) {
								Order.update(id, {
									sub_status_id: ss_id,
									total_sum: apiResponse.total_price
								});
							}
						} else {
							console.log(`Статус ${apiResponse.status_cur} не найден для KD заказа ID: ${id}`);
						}

					} else if ([13, 48, 26].includes(orderStatuses[id])) { // pd
						console.log(`Обработка PD заказа ID: ${id}`);
						if (apiResponse.send_status === 5) {
							console.log(`Обновление PD заказа ID: ${id}, новый статус: 6`);
							Order.update(id, {
								sub_status_id: 6,
								total_sum: apiResponse.total_price
							});
						} else if (apiResponse.send_status === 4) {
							console.log(`Обновление PD заказа ID: ${id}, новый статус: 46`);
							Order.update(id, {
								sub_status_id: 46,
								total_sum: apiResponse.total_price
							});
						} else {
							console.log(`Неизвестный статус отправки ${apiResponse.send_status} для PD заказа ID: ${id}, сумма: ${apiResponse.total_price}`);
						}

					} else {
						console.log(`ID заказа: ${id}, Статус ${orderStatuses[id]} не найден`);
					}
				});

			} else {
				console.error(`Ошибка запроса: ${response.status} ${response.statusText}`);
			}
		} catch (fetchError) {
			console.error("Ошибка при выполнении запроса:", fetchError.message);
			throw fetchError;
		}
	} catch (error) {
		console.error("Ошибка при обработке заказов:", error.message);
		throw new Error("Не удалось обработать заказы");
	}
};


export const getOrderInfoFromKet = async (ext_id) => { 

	const bodyData = new URLSearchParams({
		data: JSON.stringify([{ ext_id }])
	}).toString();

	try {
		const response = await fetch(
			`${process.env.KETKZ_GET_URL}?uid=${process.env.KETKZ_UID}&s=${process.env.KETKZ_SECRET}`,
			{
				method: 'POST',
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: bodyData
			}
		);
		
		const data = await response.json();
	    console.log(data)
		if (data) {
			const orderKey = Object.keys(data)[0]; 
			console.log(orderKey)
			const returnData = { ...data[orderKey] }; 
			console.log(returnData)
			delete returnData.phone; 
	
			return returnData; 
		} else {
			throw new Error("Данные отсутствуют в ответе.");
		}
	} catch (err) {
		console.error("Ошибка при выполнении запроса:", err.message);
		throw err;
	}
	

}

  
  
  