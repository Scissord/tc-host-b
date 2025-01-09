import * as Order from '#models/order.js';
import * as SubStatus from '#models/sub_status.js';
import * as Product from '#models/product.js';
import * as Webmaster from '#models/webmaster.js';
import * as Operator from '#models/operator.js';
import * as City from '#models/city.js';
// import { setKeyValue, getKeyValue } from '#services/redis/redis.js';
import ERRORS from '#constants/errors.js';

export const getOrdersChatsByStatuses = async (req, res) => {
	try {
		const { sub_statuses, limit, offset } = req.query
		const statusesArray = sub_statuses ? sub_statuses.split(',').map(Number) : [];

		const chats = await Order.getOrdersChatsByStatuses(statusesArray, limit, offset)
		return res.status(200).send({ chats })
	} catch (err) {
		console.log("Error in get getOrderChats controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const getUserOrders = async (req, res) => {
	try {
		const {
			limit,
			page,
			sub_status,
			id,
			fio,
			products: items,
			phone,
			region,
			city,
			address,
			postal_code,
			comment,
			utm_term,
			webmaster,
			operator,
			order_sub_status,
			additional1,
			additional2,
			additional3,
			additional4,
			additional5,
			additional6,
			additional7,
			additional8,
			additional9,
			additional10,
			created_at,
			updated_at,
		} = req.query;

		// validate here on fields

		const { orders, lastPage, pages } = await Order.getUserOrdersPaginated(
			limit,
			page,
			sub_status,
			id,
			fio,
			items,
			phone,
			region,
			city,
			address,
			postal_code,
			comment,
			utm_term,
			webmaster,
			operator,
			order_sub_status,
			additional1,
			additional2,
			additional3,
			additional4,
			additional5,
			additional6,
			additional7,
			additional8,
			additional9,
			additional10,
			created_at,
			updated_at,
		);

		const [products, webmasters, operators, cities, subStatuses] = await Promise.all([
			Product.get(), Webmaster.get(), Operator.get(), City.get(), SubStatus.get()
		]);

		const enhancedOrders = orders.map((order) => {
			return {
				...order,
				webmaster: webmasters.find((w) => +w.id === +order.webmaster_id)?.name,
				operator: operators.find((o) => +o.id === +order.operator_id)?.name,
				city: cities.find((c) => +c.id === +order.city_id) || null,
				status: subStatuses.find((ss) => +ss.id === +order.sub_status_id) || null,
				items: order.items.map((item) => {
					const product = products.find((p) => +p.id === +item.product_id);
					return {
						...item,
						name: product ? product.name : null,
						price: product ? product.price : null,
					};
				}),
			}
		});

		res.status(200).send({
			message: 'ok',
			orders: enhancedOrders,
			lastPage, pages
		});
	} catch (err) {
		console.log("Error in get getUserOrders controller", err.message);
		res.status(400).send({ message: "Ошибка на сервере" });
	};
};

export const getWebmasterOrders = async (req, res) => {
	try {
		const { limit, page } = req.query;

		// validate here on fields

		const { orders, lastPage, pages } = await Order.getWebmasterOrdersPaginated(
			limit,
			page,
			req.webmaster.id
		);

		const [products, webmasters, operators, cities, subStatuses] = await Promise.all([
			Product.get(), Webmaster.get(), Operator.get(), City.get(), SubStatus.get()
		]);

		const enhancedOrders = orders.map((order) => {
			return {
				...order,
				webmaster: webmasters.find((w) => +w.id === +order.webmaster_id)?.name,
				operator: operators.find((o) => +o.id === +order.operator_id)?.name,
				city: cities.find((c) => +c.id === +order.city_id) || null,
				status: subStatuses.find((ss) => +ss.id === +order.sub_status_id) || null,
				items: order.items.map((item) => {
					const product = products.find((p) => +p.id === +item.product_id);
					return {
						...item,
						name: product ? product.name : null,
						price: product ? product.price : null,
					};
				}),
			}
		});

		res.status(200).send({
			message: 'ok',
			orders: enhancedOrders,
			lastPage, pages
		});
	} catch (err) {
		console.log("Error in get getWebmasterOrders controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const getOperatorOrders = async (req, res) => {
	try {
		const { limit, page, sub_status } = req.query;

		// validate here on fields

		const {
			orders,
			lastPage,
			pages
		} = await Order.getOperatorOrdersPaginated(
			limit,
			page,
			sub_status,
		);

		const [products, webmasters, operators, cities, subStatuses] = await Promise.all([
			Product.get(), Webmaster.get(), Operator.get(), City.get(), SubStatus.get()
		]);

		const enhancedOrders = orders.map((order) => {
			return {
				...order,
				webmaster: webmasters.find((w) => +w.id === +order.webmaster_id)?.name,
				operator: operators.find((o) => +o.id === +order.operator_id)?.name,
				city: cities.find((c) => +c.id === +order.city_id) || null,
				status: subStatuses.find((ss) => +ss.id === +order.sub_status_id) || null,
				items: order.items.map((item) => {
					const product = products.find((p) => +p.id === +item.product_id);
					return {
						...item,
						name: product ? product.name : null,
						price: product ? product.price : null,
					};
				}),
			}
		});

		res.status(200).send({
			message: 'ok',
			orders: enhancedOrders,
			lastPage, pages
		});
	} catch (err) {
		console.log("Error in get getOperatorOrders controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const getOrder = async (req, res) => {
	try {
		const { order_id } = req.params;
		const order = await Order.find(order_id);
		delete order.phone;

		return res.status(200).send({ order })
	} catch (err) {
		console.log("Error in get getOrder controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const changeStatus = async (req, res) => {
	try {
		const { ids, old_sub_status_id, new_sub_status_id } = req.body;

		if (ids.length === 0) {
			const subStatus = await SubStatus.find(old_sub_status_id);
			const orders = await Order.getWhere({ sub_status_id: old_sub_status_id });
			await Order.updateWhereIn(orders.map(order => order.id), {
				status_id: subStatus.status_id,
				sub_status_id: new_sub_status_id
			})

			return res.status(200).send({
				message: 'ok',
				orders
			});
		};

		const newSubStatus = await SubStatus.find(new_sub_status_id);
		const orders = await Order.updateWhereIn(ids, {
			status_id: newSubStatus.status_id,
			sub_status_id: new_sub_status_id
		});

		res.status(200).send({
			message: 'ok',
			orders
		});
	} catch (err) {
		console.log("Error in patch changeStatus controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const create = async (req, res) => {
	try {
		const data = req.body;

		if (!data.phone) {
			return res.status(400).send({
				message: ERRORS.REQUIRED_PHONE
			});
		};

		data.status_id = 1;
		data.sub_status_id = 1;

		// const cachedOrder = await getKeyValue(phone);
		// if (cachedOrder) {
		// 	return res.status(400).send({ 
		// 		message: "Order for this phone number already exists" 
		// 	});
		// }

		const order = await Order.create(data);

		// await setKeyValue(phone, JSON.stringify(order), 60); 

		return res.status(200).send({ message: 'ok', order });
	} catch (err) {
		console.log("Error in create order controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
	try {
		const { order_id } = req.params;
		const data = req.body;

		// 1. check if new status not match
		if (data.sub_status_id) {
			const order = await Order.find(order_id);
			if (+order.sub_status_id !== +data.sub_status_id) {
				const sub_status = await SubStatus.find(data.sub_status_id);
				data.status_id = sub_status.status_id;
				data.sub_status_id = sub_status.id;
			};
		};


		// 2. update order
		const order = await Order.update(order_id, data);

		res.status(200).send({ message: 'ok', order });
	} catch (err) {
		console.log("Error in update user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
