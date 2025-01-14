import * as Order from '#models/order.js';
import * as SubStatus from '#models/sub_status.js';
import { setKeyValue, getKeyValue } from '#services/redis/redis.js';
import { mapOrders, mapOrder } from '#services/order/map.js';
import hideString from '#utils/hideString.js';
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

		let hide = false;
		if (req.operator) {
			hide = true;
		};

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

		const mappedOrders = await mapOrders(orders, hide);

		res.status(200).send({
			message: 'ok',
			orders: mappedOrders,
			lastPage, pages
		});
	} catch (err) {
		console.log("Error in get getUserOrders controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
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

		const mappedOrders = await mapOrders(orders, true);

		res.status(200).send({
			message: 'ok',
			orders: mappedOrders,
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

		const {
			orders,
			lastPage,
			pages
		} = await Order.getOperatorOrdersPaginated(
			limit,
			page,
			sub_status,
		);

		const mappedOrders = await mapOrders(orders, true);

		res.status(200).send({
			message: 'ok',
			orders: mappedOrders,
			lastPage, pages
		});
	} catch (err) {
		console.log("Error in get getOperatorOrders controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const getOrder = async (req, res) => {
	try {
		// webmaster can't enter the page
		if (req.webmaster) {
			return res.status(403).send({
				message: ERRORS.USER_CANT
			});
		};

		const { order_id } = req.params;
		const order = await Order.findWithItems(order_id);
		const transformedOrder = await mapOrder(order)
		console.log(transformedOrder);

		// for operators don't show phone
		if (req.operator) {
			transformedOrder.phone = hideString(transformedOrder.phone) ?? '-';
		};

		return res.status(200).send({ order: transformedOrder })
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

		data.status_id = 0;
		data.sub_status_id = 0;

		const cachedOrder = await getKeyValue(data.phone);
		if (cachedOrder) {
			return res.status(400).send({
				message: "Заказ по этому номеру был создан недавно!"
			});
		};

		const order = await Order.create(data);

		await setKeyValue(data.phone, order, 60);

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
		await Order.update(order_id, data);

		res.status(200).send({ message: 'ok' });
	} catch (err) {
		console.log("Error in update user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
