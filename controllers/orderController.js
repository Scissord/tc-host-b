import requestIp from 'request-ip';
import * as Order from '#models/order.js';
import * as OrderSignals from '#services/signals/orderSignals.js';
import * as OrderItem from '#models/order_item.js';
import * as SubStatus from '#models/sub_status.js';
import * as Product from '#models/product.js';
import * as Log from '#models/log.js';
import { setKeyValue, getKeyValue } from '#services/redis/redis.js';
import { mapOrders, mapOrder } from '#services/order/map.js';
import { hideString, hidePhoneInComment } from '#utils/hideString.js';
import {
	unloadingIdsOrders,
	unloadingFilteredOrders,
	unloadingSubStatusOrders,
} from '#services/xlsx/unloadingOrders.js';
import ERRORS from '#constants/errors.js';
import globalPrice from '#constants/price.js';

// for sync
import axios from 'axios';
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
			sort_by,
			order_by,
			start,
			end,
			is_filtered,
		} = req.query;

		const {
			id,
			operator: operators,
			products,
			webmaster: webmasters,
			additional1,
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
			postal_code,
			age,
			urm_term,
			status: statuses,
			gender,
			payment_method: payment_methods,
			delivery_method: delivery_methods,
			order_cancel_reason: order_cancel_reasons,
			additional2,
			additional3,
			additional4,
			additional5,
			additional6,
			additional7,
			additional8,
			additional9,
			additional10,
		} = req.body;

		let hide = false;
		if (req.operator) {
			hide = true;
		};

		// validate here on fields

		const { orders, lastPage, pages, total } = await Order.getUserOrdersPaginated(
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
			webmasters,
			additional1,
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
			postal_code,
			age,
			urm_term,
			statuses,
			gender,
			payment_methods,
			delivery_methods,
			order_cancel_reasons,
			additional2,
			additional3,
			additional4,
			additional5,
			additional6,
			additional7,
			additional8,
			additional9,
			additional10,
			is_filtered
		);

		const mappedOrders = await mapOrders(orders, hide);

		res.status(200).send({
			message: 'ok',
			orders: mappedOrders,
			lastPage, pages, total
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
			is_filtered,
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
			postal_code,
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
		} = req.body;

		const { orders, lastPage, pages, total } = await Order.getOperatorOrdersPaginated(
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
			postal_code,
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
			is_filtered
		);

		const mappedOrders = await mapOrders(orders, true);

		res.status(200).send({
			message: 'ok',
			orders: mappedOrders,
			lastPage, pages, total
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
			transformedOrder.comment = hidePhoneInComment(transformedOrder.comment) ?? '-';
		};

		return res.status(200).send({ order: transformedOrder })
	} catch (err) {
		console.log("Error in get getOrder controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const changeStatus = async (req, res) => {
	try {
		const { ids, old_sub_status_id, new_sub_status_id, is_filtered, filters } = req.body;
		const ip = requestIp.getClientIp(req);

		const responsible_id = req.operator?.id || null;
		const responsible = responsible_id ? 'оператором' : 'администратором';

		// if (!ids.length) {
		// 	return res.status(400).send({
		// 		message: ERRORS.CHOSE_ORDERS
		// 	});
		// };

		if (ids.length === 0) {
			const newSubStatus = await SubStatus.find(new_sub_status_id);

			let orders = [];
			if (is_filtered) {
				orders = await Order.getByFilters(filters);
			} else {
				orders = await Order.getWhere({ sub_status_id: old_sub_status_id });
			};

			await Order.updateWhereIn(orders.map(order => order.id), {
				status_id: newSubStatus.status_id,
				sub_status_id: new_sub_status_id,
				updated_at: new Date(),
			});

			for (const order of orders) {
				// 4. if 1, 4 or 12 change approved_by and cancelled_by
				if (!order.operator_id && (+new_sub_status_id === 1 || +new_sub_status_id === 4 || +new_sub_status_id === 12)) {
					await Order.update(order.id, { operator_id: responsible_id });
				};

				if (+new_sub_status_id === 1 || +new_sub_status_id === 4) {
					await Order.update(order.id, {
						approved_at: new Date(),
						updated_at: new Date(),
					});
				};

				if (+new_sub_status_id === 12) {
					await Order.update(order.id, {
						cancelled_at: new Date(),
						updated_at: new Date()
					});
				};

				if (+new_sub_status_id === 3 || +new_sub_status_id === 13) {
					await Order.update(order.id, {
						shipped_at: new Date(),
						updated_at: new Date(),
					});
				};

				if (+new_sub_status_id === 5 || +new_sub_status_id === 6 || +new_sub_status_id === 27) {
					await Order.update(order.id, {
						buyout_at: new Date(),
						updated_at: new Date(),
					});
				};

				if (+new_sub_status_id === 7 || +new_sub_status_id === 47 || +new_sub_status_id === 48) {
					await Order.update(order.id, {
						returned_at: new Date(),
						updated_at: new Date(),
					});
				};

				await OrderSignals.statusChangeSignal(+order.id, +new_sub_status_id);

				await Log.create({
					order_id: order.id,
					operator_id: order?.operator_id || null,
					old_sub_status_id: old_sub_status_id,
					new_sub_status_id: new_sub_status_id,
					action: `Все заказы из статуса ${old_sub_status_id} перенесены в ${new_sub_status_id}, ${responsible} №${responsible_id}.`,
					ip,
				});
			};

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
			// 4. if 1, 4 or 12 change approved_by and cancelled_by
			if (!order.operator_id && (+new_sub_status_id === 1 || +new_sub_status_id === 4 || +new_sub_status_id === 12)) {
				await Order.update(order.id, { operator_id: responsible_id });
			};

			if (+new_sub_status_id === 1 || +new_sub_status_id === 4) {
				await Order.update(order.id, {
					approved_at: new Date(),
					updated_at: new Date(),
				});
			};

			if (+new_sub_status_id === 12) {
				await Order.update(order.id, {
					cancelled_at: new Date(),
					updated_at: new Date()
				});
			};

			if (+new_sub_status_id === 3 || +new_sub_status_id === 13) {
				await Order.update(order.id, {
					shipped_at: new Date(),
					updated_at: new Date(),
				});
			};

			if (+new_sub_status_id === 5 || +new_sub_status_id === 6 || +new_sub_status_id === 27) {
				await Order.update(order.id, {
					buyout_at: new Date(),
					updated_at: new Date(),
				});
			};

			if (+new_sub_status_id === 7 || +new_sub_status_id === 47 || +new_sub_status_id === 48) {
				await Order.update(order.id, {
					returned_at: new Date(),
					updated_at: new Date(),
				});
			};

			await OrderSignals.statusChangeSignal(+order.id, +new_sub_status_id)

			await Log.create({
				order_id: order.id,
				operator_id: order?.operator_id ?? null,
				old_sub_status_id: old_sub_status_id,
				new_sub_status_id: new_sub_status_id,
				action: `Изменение статуса у заказа №${order.id}, ${responsible} №${responsible_id}.`,
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
		data.total_sum = 1650;

		const cachedOrder = await getKeyValue(data.phone);
		if (cachedOrder) {
			return res.status(200).send({
				message: "Заказ по этому номеру был создан недавно!"
			});
		};

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

		const responsible_id = req.operator?.id || null;
		const responsible = responsible_id ? req.operator?.id : req.user?.id

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
		if (!oldOrder.operator_id && (+order?.sub_status_id === 1 || +order?.sub_status_id === 4 || +order?.sub_status_id === 12)) {
			await Order.update(order_id, { operator_id: responsible_id });
		};

		if (+order?.sub_status_id === 1 || +order?.sub_status_id === 4) {
			await Order.update(order_id, {
				approved_at: new Date(),
				updated_at: new Date(),
			});
		};

		if (+order?.sub_status_id === 12) {
			await Order.update(order_id, {
				cancelled_at: new Date(),
				updated_at: new Date()
			});
		};

		if (+order.sub_status_id === 3 || +order.sub_status_id === 13) {
			await Order.update(order_id, {
				shipped_at: new Date(),
				updated_at: new Date(),
			});
		};

		if (+order.sub_status_id === 5 || +order.sub_status_id === 6 || +order.sub_status_id === 27) {
			await Order.update(order_id, {
				buyout_at: new Date(),
				updated_at: new Date(),
			});
		};

		if (+order.sub_status_id === 7 || +order.sub_status_id === 47 || +order.sub_status_id === 48) {
			await Order.update(order_id, {
				returned_at: new Date(),
				updated_at: new Date(),
			});
		};

		// 5. create log
		await Log.create({
			order_id,
			operator_id: oldOrder?.operator_id || null,
			old_sub_status_id: oldOrder.sub_status_id,
			new_sub_status_id: updatedOrder.sub_status_id,
			old_metadata: { ...oldOrder, items: Array.isArray(oldItems) ? oldItems : [] },
			new_metadata: { ...updatedOrder },
			action: `Изменение заказа №${updatedOrder.id}, ${responsible} №${responsible_id}.`,
			ip,
		});

		res.status(200).send({ message: 'ok' });
	} catch (err) {
		console.log("Error in update order controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const unloading = async (req, res) => {
	try {
		const { is_filtered, sub_status } = req.query;
		const filters = req.body.filters;
		const ids = req.body.ids;

		const from = './templates/clear.xlsx';
		const to = `./uploads/order-${new Date().toISOString().replace(/[-:.TZ]/g, '')}.xlsx`;

		if (ids) {
			await unloadingIdsOrders(from, to, ids);
		};

		if (is_filtered === 'false' && ids.length === 0) {
			await unloadingSubStatusOrders(from, to, sub_status);
		};

		if (is_filtered === 'true' && ids.length === 0) {
			await unloadingFilteredOrders(from, to, filters);
		};

		return res.download(to, (err) => {
			if (err) {
				throw new Error("Ошибка при скачивании файла")
			}
		});
	} catch (err) {
		console.log("Error in unloading order controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const sync = async (req, res) => {
  // Начинаем с 1 до 10000
  for(let i = 1; i <= 10000; i++) {
    // Ищем заказ
    let order = null;
    try {
      order = await axios({
        method: 'GET',
        url: `https://callcenter-kyrgyzstan.leadvertex.ru/api/admin/getOrdersIdsByCondition.html?token=SLKAShgfeureiJEWGHJKlslak&id=${i}`
      })
    } catch(error) {
      console.error(`Ошибка при поиске заказа id - ${i}, завершаю цикл!`, error.message);
      break;
    };

    // Если не нашли заказ, то останавливаем
    if(!order) {
      console.error(`Заказа с id - ${i} не найден, завершаю цикл!`);
      break;
    };

    // Создаю данные
    let createdOrder = null;
    try {
      createdOrder = await axios({
        method: 'POST',
        url: `https://callcenter-krg.leadvertex.ru/api/admin/addOrder.html?token=MedgfsaktuiddfuvhKg`,
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: {
          webmasterID: order.webmasterID,
          operatorID: order.operatorID,
          externalID: order.externalID,
          externalWebmaster: order.externalWebmaster,
          country: order.country,
          region: order.region,
          city: order.city,
          postIndex: order.postIndex,
          address: order.address,
          house: order.house,
          flat: order.flat,
          fio: order.fio,
          phone: order.phone,
          email: order.email,
          price: order.price,
          total: order.total,
          quantity: order.quantity,
          additional1: order.additional1,
          additional2: order.additional2,
          additional3: order.additional3,
          additional4: order.additional4,
          additional5: order.additional5,
          additional6: order.additional6,
          additional7: order.additional7,
          additional8: order.additional8,
          additional9: order.additional9,
          additional10: order.additional10,
          additional11: order.additional11,
          additional12: order.additional12,
          additional13: order.additional13,
          additional14: order.additional14,
          additional15: order.additional15,
          additional16: order.additional16,
          additional17: order.additional17,
          additional18: order.additional18,
          additional19: order.additional19,
          additional20: order.additional20,
          additional21: order.additional21,
          additional22: order.additional22,
          additional23: order.additional23,
          additional24: order.additional24,
          additional25: order.additional25,
          comment: order.comment,
          russianpostTrack: order.russianpostTrack,
          novaposhtaTrack: order.novaposhtaTrack,
          kazpostTrack: order.kazpostTrack,
          belpostTrack: order.belpostTrack,
          timezone: order.timezone,
          utm_source: order.utm_source,
          utm_medium: order.utm_medium,
          utm_campaign: order.utm_campaign,
          utm_term: order.utm_term,
          utm_content: order.utm_content,
          domain: order.domain,
          timeSpent: order.timeSpent,
          ip: order.ip,
          referer: order.referer,
          goods: order.goods
        },
      });
    } catch (error) {
      console.error(`Ошибка при создании заказа id - ${i}, завершаю цикл!`, error.message);
      break;
    };

    // Если не создались, то останавливаю
    if(!createdOrder) {
      console.error(`Заказа с id - ${i} не создался в leadvertex, завершаю цикл!`);
      break;
    };

    // Кидаю в свой статус
    let updatedOrder = null;
    try {
      updatedOrder = await axios({
        method: 'POST',
        url: `https://callcenter-krg.leadvertex.ru/api/admin/addOrder.html?token=MedgfsaktuiddfuvhKg&id=${Object.keys(createdOrder)[0]}`,
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: {
          status: order.status,
        }
      });
    } catch (error) {
      console.error(`Ошибка при обновлении заказа id - ${Object.keys(createdOrder)[0]}, завершаю цикл!`, error.message);
      break;
    };

    // Если не обновил в новом leadvertex, то останавливаю
    if(!updatedOrder) {
      console.error(`Заказа с id - ${Object.keys(createdOrder)[0]} не обновился в leadvertex, завершаю цикл!`);
      break;
    };

    console.log(i, Object.keys(createdOrder)[0]);
  };
};
