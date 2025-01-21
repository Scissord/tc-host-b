import requestIp from 'request-ip';
import * as Order from '#models/order.js';
import * as OrderSignals from '#services/signals/orderSignals.js';
import * as OrderItem from '#models/order_item.js';
import * as SubStatus from '#models/sub_status.js';
import * as Product from '#models/product.js';
import * as Log from '#models/log.js';
import { setKeyValue, getKeyValue } from '#services/redis/redis.js';
import { mapOrders, mapOrder } from '#services/order/map.js';
import hideString from '#utils/hideString.js';
import ERRORS from '#constants/errors.js';
import globalPrice from '#constants/price.js';

// for sync
// import axios from 'axios';
// import * as City from '#models/city.js';
// import * as Gender from '#models/gender.js';
// import * as PaymentMethod from '#models/payment_method.js';
// import * as DeliveryMethod from '#models/delivery_method.js';
// import * as OrderCancelReason from '#models/order_cancel_reason.js';
// import { chunkArray } from '#utils/chunkArray.js';
// import { groupToStatus } from '#services/leadvertex/groupToStatus.js';

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
			sort_by,
			order_by,
			start,
			end,
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
			sort_by,
			order_by,
			start,
			end,
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
		const {
			limit,
			page,
			sub_status,
			sort_by,
			order_by,
			start,
			end,
		} = req.query;

		const {
			id,
			operator: operators,
			products,
			created_at,
			updated_at,
			approved_at,
			shipped_at,
			cancelled_at,
			buyout_at,
			delivery_at,
			comment,
			price,
			total_sum,
			logist_recall_at,
			quantity,
			fio,
			phone,
			region,
			city: cities,
			address,
			postal_index,
			age,
			status: statuses,
			gender,
			payment_method: payment_methods,
			delivery_method: delivery_methods,
			order_cancel_reason: order_cancel_reasons,
			additional4,
			additional5,
			additional7,
			additional8,
		} = req.body

		const { orders, lastPage, pages } = await Order.getOperatorOrdersPaginated(
			limit,
			page,
			sub_status,
			sort_by,
			order_by,
			start,
			end,
			id,
			operators,
			products,
			created_at,
			updated_at,
			approved_at,
			shipped_at,
			cancelled_at,
			buyout_at,
			delivery_at,
			comment,
			price,
			total_sum,
			logist_recall_at,
			quantity,
			fio,
			phone,
			region,
			cities,
			address,
			postal_index,
			age,
			statuses,
			gender,
			payment_methods,
			delivery_methods,
			order_cancel_reasons,
			additional4,
			additional5,
			additional7,
			additional8,
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
		const order = await Order.find(order_id);
		const items = await OrderItem.getWhereIn('oi.order_id', [order_id]);
		order.items = items;
		const transformedOrder = await mapOrder(order)

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
		const ip = requestIp.getClientIp(req);

		const responsible_id = req.operator?.id || req.user.id;
		const responsible = req.operator?.id ? 'оператором' : 'пользователем';

		if (ids.length === 0) {
			const subStatus = await SubStatus.find(old_sub_status_id);
			const orders = await Order.getWhere({ sub_status_id: old_sub_status_id });
			await Order.updateWhereIn(orders.map(order => order.id), {
				status_id: subStatus.status_id,
				sub_status_id: new_sub_status_id,
				updated_at: new Date(),
			});

			for (const order of orders) {
				if (+new_sub_status_id === 1 || +new_sub_status_id === 4) {

					const approved_data = {
						approved_at: new Date(),
						updated_at: new Date(),
					};

					if (!order.approved_at) {
						approved_data.approved_by_id = responsible_id;
						approved_data.approved_by_entity = responsible;
					};

					await Order.update(order.id, approved_data);
				};

				if (+new_sub_status_id === 12) {
					const cancelled_data = {
						cancelled_at: new Date(),
						updated_at: new Date(),
					};

					if (!order.cancelled_at) {
						cancelled_data.cancelled_by_id = responsible_id;
						cancelled_data.cancelled_by_entity = responsible;
					};

					await Order.update(order.id, cancelled_data);
				};

				if (+new_sub_status_id === 3 || +new_sub_status_id === 13) {
					await Order.update(id, {
						shipped_at: new Date(),
						updated_at: new Date(),
					});
				};

				if (+new_sub_status_id === 5 || +new_sub_status_id === 6 || +new_sub_status_id === 27) {
					await Order.update(id, {
						buyout_at: new Date(),
						updated_at: new Date(),
					});
				};

				await OrderSignals.statusChangeSignal(+order.id, +new_sub_status_id)
			};

			await Log.create({
				order_id: ids,
				operator_id: responsible_id,
				old_sub_status_id: old_sub_status_id,
				new_sub_status_id: new_sub_status_id,
				action: `Все заказы из статуса ${old_sub_status_id} перенесены в ${new_sub_status_id}, ${responsible} №${responsible_id}.`,
				ip,
			});

			return res.status(200).send({
				message: 'ok',
				orders
			});
		};

		const newSubStatus = await SubStatus.find(new_sub_status_id);
		const orders = await Order.updateWhereIn(ids, {
			status_id: newSubStatus.status_id,
			sub_status_id: new_sub_status_id,
			updated_at: new Date(),
		});

		for (const order of orders) {
			if (+new_sub_status_id === 1 || +new_sub_status_id === 4) {
				const approved_data = {
					approved_at: new Date(),
					updated_at: new Date(),
				};

				if (!order.approved_at) {
					approved_data.approved_by_id = responsible_id;
					approved_data.approved_by_entity = responsible;
				};

				await Order.update(order.id, approved_data);
			};

			if (+new_sub_status_id === 12) {
				const cancelled_data = {
					cancelled_at: new Date(),
					updated_at: new Date(),
				};

				if (!order.cancelled_at) {
					cancelled_data.cancelled_by_id = responsible_id;
					cancelled_data.cancelled_by_entity = responsible;
				};

				await Order.update(order.id, cancelled_data);
			};

			if (+new_sub_status_id === 3 || +new_sub_status_id === 13) {
				await Order.update(id, {
					shipped_at: new Date(),
					updated_at: new Date(),
				});
			};

			if (+new_sub_status_id === 5 || +new_sub_status_id === 6 || +new_sub_status_id === 27) {
				await Order.update(id, {
					buyout_at: new Date(),
					updated_at: new Date(),
				});
			};

			await OrderSignals.statusChangeSignal(+order.id, +new_sub_status_id)
		};

		for (const id of ids) {
			await Log.create({
				order_id: id,
				operator_id: responsible_id,
				old_sub_status_id: old_sub_status_id,
				new_sub_status_id: new_sub_status_id,
				action: `Изменение статуса у заказа №${id}, ${responsible} №${responsible_id}.`,
				ip,
			});
		};

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
		const items = req.body.items;
		const ip = requestIp.getClientIp(req);

		if (!data.phone) {
			return res.status(400).send({
				message: ERRORS.REQUIRED_PHONE
			});
		};

		data.status_id = 0;
		data.sub_status_id = 0;

		const cachedOrder = await getKeyValue(data.phone);
		if (cachedOrder) {
			return res.status(200).send({
				message: "Заказ по этому номеру был создан недавно!"
			});
		};

		data.total_sum = 1650;

		if (Array.isArray(items)) {
			// to send to Обработка
			if (
				data.phone.startsWith('77') &&
				data.phone.length === 11 &&
				items.length > 0 &&
				items.some(item => item.product_id)
			) {
				data.sub_status_id = 21;
			};
			// to count total_sum
			if (items.length > 0) {
				const newTotal = items.reduce((acc, item) => {
					const quantity = Number(item.quantity) || 0;
					const price = Number(item.price) || 0;

					const tmp = quantity * price;
					return acc + tmp;
				}, 0);

				if (isNaN(newTotal)) {
					data.total_sum = 1650;
				} else {
					data.total_sum = newTotal
				};
			} else {
				data.total_sum = 1650;
			};
		} else {
			data.total_sum = 1650;
		};

		const order = await Order.create(data);
		await OrderSignals.orderCreateSignal(order)
		process.env.NODE_ENV === "production" && await OrderSignals.postbackKeitaroSignal(order.utm_term, order.additional1, 0)

		if (Array.isArray(items) && items) {
			const products = await Product.get();
			const order_items = await Promise.all(items.map(async (item) => {
				const order_item = await OrderItem.create({
					order_id: order.id,
					product_id: item.product_id,
					price: item.price || globalPrice,
					quantity: item.quantity || 1,
				});
				order_item.name = products.find((p) => +p.id === +order_item.product_id)?.name ?? '-';
				return order_item;
			}));
			order.items = order_items;
		};

		await setKeyValue(data.phone, order, 60);

		await Log.create({
			order_id: order.id,
			operator_id: order.operator_id,
			old_sub_status_id: order.sub_status_id,
			new_sub_status_id: order.sub_status_id,
			action: `Заказ №${order.id} был создан.`,
			old_metadata: { ...data, items: Array.isArray(items) ? items : [] },
			new_metadata: { ...order },
			ip,
		});

		order.created_at = order.created_at.toLocaleString();
		order.updated_at = order.updated_at.toLocaleString();

		return res.status(200).send({ message: 'ok', order });
	} catch (err) {
		console.log("Error in create order controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
	try {
		const { order_id } = req.params;
		const order = req.body.order;
		const items = req.body.items;
		const ip = requestIp.getClientIp(req);

		const responsible_id = req.operator?.id || req.user.id;
		const responsible = req.operator?.id ? 'оператором' : 'пользователем';

		const keitaroStatuses = [1, 4];

		// 1. check if new status not match
		const oldOrder = await Order.find(order_id);
		const oldItems = await OrderItem.getWhereIn('oi.order_id', [order_id]);

		if (+oldOrder.sub_status_id !== +order.sub_status_id) {
			const new_sub_status = await SubStatus.find(order.sub_status_id);
			order.status_id = new_sub_status.status_id;
			order.sub_status_id = new_sub_status.id;
			// 1. Keitaro postbackSignal
			if (keitaroStatuses.includes(new_sub_status.status_id)) {
				await OrderSignals.postbackKeitaroSignal(oldOrder.utm_term, oldOrder.additional1, new_sub_status.status_id)
			};
			await OrderSignals.statusChangeSignal(+order.id, +order.sub_status_id)
		};

		// 1.1 change updated_at
		order.updated_at = new Date()

		// 2. update order
		const updatedOrder = await Order.update(order_id, order);

		// 3. update order_item
		if (Array.isArray(items) && items) {
			const products = await Product.get();
			const order_items = await Promise.all(items.map(async (item) => {
				let order_item = await OrderItem.find(item.id);
				if (!order_item) {
					order_item = await OrderItem.create({
						order_id: updatedOrder.id,
						product_id: item.product_id,
						price: item.price || globalPrice,
						quantity: item.quantity || 1,
					});
				} else {
					order_item = await OrderItem.update(item.id, {
						product_id: item.product_id,
						quantity: item.quantity || 1,
						price: item.price || globalPrice,
					});
				};
				order_item.name = products.find((p) => +p.id === +order_item.product_id)?.name ?? '-';
				return order_item;
			}));
			updatedOrder.items = order_items;
		};

		// 4. if 1, 4 or 12 change approved_by and cancelled_by
		if (+order.sub_status_id === 1 || +order.sub_status_id === 4) {

			const approve_data = {
				approved_at: new Date(),
				updated_at: new Date(),
			}

			if (!oldOrder.approved_at) {
				approve_data.approved_by_id = responsible_id;
				approve_data.approved_by_entity = responsible;
			};

			await Order.update(order_id, approve_data);
		};

		if (+order.sub_status_id === 12) {
			const cancelled_data = {
				cancelled_at: new Date(),
				updated_at: new Date(),
			}

			if (!oldOrder.cancelled_at) {
				cancelled_data.cancelled_by_id = responsible_id;
				cancelled_data.cancelled_by_entity = responsible;
			};

			await Order.update(order_id, cancelled_data);
		};

		if (+order.sub_status_id === 3 || +order.sub_status_id === 13) {
			await Order.update(id, {
				shipped_at: new Date(),
				updated_at: new Date(),
			});
		};

		if (+order.sub_status_id === 5 || +order.sub_status_id === 6 || +order.sub_status_id === 27) {
			await Order.update(id, {
				buyout_at: new Date(),
				updated_at: new Date(),
			});
		};

		// 5. create log
		await Log.create({
			order_id,
			operator_id: responsible_id,
			old_sub_status_id: order.sub_status_id,
			new_sub_status_id: updatedOrder.sub_status_id,
			old_metadata: { ...oldOrder, items: Array.isArray(oldItems) ? oldItems : [] },
			new_metadata: { ...updatedOrder },
			action: `Изменение заказа №${updatedOrder.id}, ${responsible} №${responsible_id}.`,
			ip,
		});

		res.status(200).send({ message: 'ok' });
	} catch (err) {
		console.log("Error in update user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

// export const sync = async (req, res) => {
// 	try {
// 		// 29.01.2025
// 		// 15.01.2025

// 		// Получаем текущие заказы
// 		const orders_from_db = await Order.get();
// 		const current_orders = orders_from_db.map(({ id, ...rest }) => ({ ...rest }));

// 		// Получаем их items
// 		const order_items_from_db = await OrderItem.get();
// 		const current_items = order_items_from_db.map(({ id, ...rest }) => rest);

// 		// Удаляем items
// 		await OrderItem.hardDeleteAll();
// 		await db.raw("SELECT setval('order_item_id_seq', 1, false)");

// 		// Удаляем сами orders
// 		await Order.hardDeleteAll();
// 		await db.raw("SELECT setval('order_id_seq', 100000, false)");

// 		// Создаём новые orders
// 		const orders = await Order.createMany(current_orders);

// 		// Создаём маппинг старых и новых order_id
// 		const orderIdMap = {};
// 		orders_from_db.forEach((oldOrder, index) => {
// 			orderIdMap[oldOrder.id] = orders[index].id;
// 		});

// 		// Обновляем items с новыми order_id
// 		const updated_items = current_items.map(item => ({
// 			...item,
// 			order_id: orderIdMap[item.order_id], // Заменяем старый order_id на новый
// 		}));

// 		// Создаём новые items
// 		await OrderItem.create(updated_items);

// 		db.raw("SELECT setval('order_id_seq', 1, false)");

// 		const genders = await Gender.get();
// 		const cities = await City.get();
// 		const payment_methods = await PaymentMethod.get();
// 		const delivery_methods = await DeliveryMethod.get();
// 		const order_cancel_reasons = await OrderCancelReason.get();

// 		// достаём список статусов из leadvertex
// 		const response_statuses = await axios({
// 			method: 'GET',
// 			url: 'https://talkcall-kz.leadvertex.ru/api/admin/getStatusList.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa'
// 		});

// 		let i = 0;

// 		// достаём ids по статусам
// 		for (const [status, data] of Object.entries(response_statuses.data)) {
// 			const response_ids = await axios({
// 				method: 'GET',
// 				url: `https://talkcall-kz.leadvertex.ru/api/admin/getOrdersIdsInStatus.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa&status=${status}`
// 			});

// 			const chunkedArray = chunkArray(response_ids.data, 100);
// 			for (const ids of chunkedArray) {
// 				const idsString = ids.join(',');
// 				// достаём все старые заказы по статусам
// 				const response_orders = await axios({
// 					method: 'GET',
// 					url: `https://talkcall-kz.leadvertex.ru/api/admin/getOrdersByIds.html?token=kjsdaKRhlsrk0rjjekjskaaaaaaaa&ids=${idsString}`
// 				});

// 				Object.entries(response_orders.data).map(async ([order_id, order]) => {
// 					const newOrder = await Order.create({
// 						id: order_id,
// 						fio: order.fio,
// 						phone: order.phone,
// 						region: order.region,
// 						city_id: cities.find((c) => c.name === order.city)?.id ?? null,
// 						address: order.address,
// 						postal_code: order.postIndex,
// 						comment: order.comment,
// 						age: order.additional6 || "",
// 						utm_term: order.utm_term,
// 						webmaster_id: order?.webmaster?.id || null,
// 						operator_id: order.operatorID || null,
// 						status_id: groupToStatus(order.statusGroup),
// 						sub_status_id: order.status || 0,
// 						gender_id: genders.find((g) => g.name === order.additional4)?.id ?? null,
// 						payment_method_id: payment_methods.find((pm) => pm.name === order.additional12)?.id ?? null,
// 						delivery_method_id: delivery_methods.find((dm) => dm.name === order.additional2)?.id ?? null,
// 						order_cancel_reason_id: order_cancel_reasons.find((ocr) => ocr.name === order.additional7)?.id ?? null,
// 						total_sum: order.total || "",
// 						created_at: order.datetime || null,
// 						updated_at: order.lastUpdate || null,
// 						delivery_at: order.additional1 || null,
// 						logist_recall_at: order.additional3 || null,
// 						approved_at: order.approvedAt || null,
// 						cancelled_at: order.canceledAt || null,
// 						shipped_at: order.shippedAt || null,
// 						buyout_at: order.buyoutAt || null,
// 						additional1: order.domain,
// 						additional2: order.timeSpent,
// 						additional3: order.externalWebmaster,
// 						additional4: order.russianpostTrack,
// 						additional5: order.refundedAt,
// 						additional6: order.additional5,
// 						additional7: order.additional7,
// 						additional8: order.additional8,
// 						additional9: order.additional10,
// 						additional10: order.additional15,
// 					});

// 					if (order.goods) {
// 						for (const [product_id, order_item] of Object.entries(order.goods)) {
// 							const orderItem = await OrderItem.create({
// 								order_id: newOrder.id,
// 								quantity: order_item.quantity,
// 								product_id,
// 							});
// 						};
// 					};

// 					i++;

// 					return newOrder;
// 				})

// 				console.log(i);
// 			};
// 		};

// 		db.raw("SELECT setval('order_id_seq', (SELECT MAX(id) FROM order))");
// 		res.status(200).send({ message: 'ok' });
// 	} catch (err) {
// 		console.log("Error in sync order controller", err.message);
// 		res.status(500).send({ error: "Internal Server Error" });
// 	}
// };




