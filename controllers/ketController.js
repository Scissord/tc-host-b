import dotenv from 'dotenv';

import * as Order from '#models/order.js';
import * as Ketkz from '#services/ketkz/ketkz.js';
import { getCityCode } from '#utils/cityCode.js';
import * as KetUtils from '#utils/ketOrderName.js'
import * as OrderGood from '#models/order_item.js'
import * as City from '#models/city.js'

dotenv.config();

export const sendAcceptedOrders = async (req, res) => {
    try {
		const {sub_status_id} = req.body
		
		const query = {
			sub_status_id
		}
		
        const orders = await Order.getWhere(query);

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found with the specified criteria." });
        }

        const newOrders = [];

        for (const order of orders) {
            const orderItems = await OrderGood.getWhereIn('o.id', [order.id]);
			console.log(`Заказы товары ${orderItems}`);
            if (!orderItems || orderItems.length === 0) {
                console.log(`Заказ ${order.id} не содержит товаров.`);
                continue; 
            }

            const firstItem = orderItems[0]; 
	
            const orderName = KetUtils.getOrderName(firstItem.product_id, firstItem.quantity );

			if (+sub_status_id === 15){
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
			} else {
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
					deliv_desc:order.address,
					index: order.postal_code
				};

				newOrders.push(newOrder);
			}
            

        }

        if (newOrders.length === 0) {
            console.log("Нет новых заказов для отправки.");
            return res.status(200).json({ message: "No new orders to send." });
        }
		
		console.log(newOrders)
        await Ketkz.sendOrders(newOrders);

        console.log("Все заказы успешно отправлены:", newOrders);
        res.status(200).json({ message: "Orders successfully sent." });
    } catch (error) {
        console.error("Error in sendAcceptedOrders dialer controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const sendCourierOrder = async (req, res) => {
	try {
		const { order_ids } = req.body

		const newOrders = []

		for (const order_id of order_ids) {

			const order = await Order.find(order_id)
			
			const city = await City.find(order.city_id);
			const orderItems = await OrderGood.getWhereIn('o.id', [order.id]);

			if (!orderItems || orderItems.length === 0) {
				console.log(`Заказ ${order.id} не содержит товаров.`);
			}

			const firstItem = orderItems[0]; 
			const cityCode = getCityCode(city.name);
			const orderName = KetUtils.getOrderName(firstItem.product_id, firstItem.quantity );

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

		}

		await Ketkz.sendOrders(newOrders);
	} catch (error) {
		console.error("Error in sendCourierOrder dialer controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
	}
}