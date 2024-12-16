import * as Order from '#models/order.js';
import * as OrderSubStatus from '#models/order_sub_status.js';
import * as Product from '#models/product.js';
import * as Webmaster from '#models/webmaster.js';
import * as Operator from '#models/operator.js';
import * as City from '#models/city.js';
import * as OSS from '#models/order_sub_status.js';

export const getOrders = async (req, res) => {
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

    const { orders, lastPage, pages } = await Order.getPaginated(
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
			Product.get(), Webmaster.get(), Operator.get(), City.get(), OSS.get()
		]);

		const enhancedOrders = orders.map((order) => ({
			...order,
			webmaster: webmasters.find((w) => +w.id === +order.webmaster_id) || null,
			operator: operators.find((o) => +o.id === +order.operator_id) || null,
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
		}));

		res.status(200).send({ 
			message: 'ok', 
			orders: enhancedOrders, 
			lastPage, pages
		});
	}	catch (err) {
		console.log("Error in get getOrders controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const changeStatus = async (req, res) => {
	try {
		const { ids, sub_status_id } = req.body;

		const subStatus = await OrderSubStatus.find(sub_status_id);
		const orders = await Order.updateWhereIn(ids, { status_id: subStatus.order_status_id, sub_status_id });

		res.status(200).send({ 
			message: 'ok', 
			orders
		});
	}	catch (err) {
		console.log("Error in patch changeStatus controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const create = async (req, res) => {
  try {

    return res.status(200).send({ message: 'ok' });
  }	catch (err) {
		console.log("Error in create user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
  try {

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in update user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const destroy = async (req, res) => {
  try {

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in destroy user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
