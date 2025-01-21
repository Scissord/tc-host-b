import dotenv from 'dotenv';
import * as Order from '#models/order.js';
import * as OrderGood from '#models/order_item.js'
import * as City from '#models/city.js'
import * as KetUtils from '#utils/ketOrderName.js'
import { getCityCode } from '#utils/cityCode.js';

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
	await Order.updateWhereIn(orderIds, {sub_status_id: 3})

}

export const checkSendedOrders = async () => { 
	try {
	  const filter_values = [3, 13, 27, 47, 48];
	  const orders = await Order.getWhereIn("o.sub_status_id", filter_values);
  
	  if (!orders || orders.length === 0) {
		console.log("Нет заказов с указанными sub_status_id");
		return;
	  }
  
	  const results = [];
  
	  const promises = orders.map(order =>
		fetch(`${process.env.KETKZ_GET_URL}?uid=${process.env.KETKZ_UID}&s=${process.env.KETKZ_SECRET}`, { 
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ ext_id: order.id }),
		}).then(async (response) => {
		  const result = {
			id: order.id,
			sub_status_id: order.sub_status_id,
		  };
  
		  if (response.ok) {
			try {
			  const data = await response.json();
			  result.response = data; 
			} catch (jsonError) {
			  console.error(`Ошибка парсинга JSON для заказа ${order.id}:`, jsonError.message);
			  result.error = `Ошибка парсинга JSON: ${jsonError.message}`;
			}
		  } else {
			result.error = `Ошибка запроса: ${response.status} ${response.statusText}`;
		  }
  
		  results.push(result);
		}).catch((error) => {
		  console.error(`Ошибка при выполнении запроса для заказа ${order.id}:`, error.message);
		  results.push({
			id: order.id,
			sub_status_id: order.sub_status_id,
			error: `Ошибка запроса: ${error.message}`,
		  });
		})
	  );
  
	  await Promise.all(promises); 
  
	  console.log("Все запросы завершены.", JSON.stringify(results, null, 2));
	  return results; 

	} catch (error) {
	  console.error("Ошибка при отправке заказов:", error.message);
	  throw new Error("Не удалось обработать заказы");
	}
  };
  
  