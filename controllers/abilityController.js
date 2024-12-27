import * as Ability from '#models/ability.js';

export const get = async (req, res) => {
	try {
		const abilities = await Ability.get();

		res.status(200).send({ message: 'ok', abilities });
	} catch (err) {
		console.log("Error in get ability controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const getForHeader = async (req, res) => {
	try {
		const get_orders_ability = await Ability.findWhere({ name: 'get_orders' });
		const get_products_ability = await Ability.findWhere({ name: 'get_products' });
		const get_cities_ability = await Ability.findWhere({ name: 'get_cities' });
		const get_departments_ability = await Ability.findWhere({ name: 'get_departments' });
		const get_statuses_ability = await Ability.findWhere({ name: 'get_statuses' });
		const get_users_ability = await Ability.findWhere({ name: 'get_users' });

		res.status(200).send({
			message: 'ok',
			get_orders: +get_orders_ability.id,
			get_products: +get_products_ability.id,
			get_cities: +get_cities_ability.id,
			get_departments: +get_departments_ability.id,
			get_statuses: +get_statuses_ability.id,
			get_users: +get_users_ability.id
		});
	} catch (err) {
		console.log("Error in getForHeader ability controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const getAbilitiesByEntityType = async (req, res) => {
	try {
		const { entity_id, entity_type } = req.query
		const abilities = await Ability.getAbilitiesByPermission(entity_id, entity_type)

		res.status(200).send({ message: 'ok', abilities });
	} catch (err) {
		console.log("Error in get ability controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
