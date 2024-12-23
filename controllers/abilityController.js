import * as Ability from '#models/ability.js';

export const get = async (req, res) => {
	try {
    

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in get ability controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const getForHeader = async (req, res) => {
	try {
    const get_orders_ability = await Ability.findWhere({ name: 'get_orders' });
    const get_products_ability = await Ability.findWhere({ name: 'get_products' });

		res.status(200).send({ 
      message: 'ok', 
      get_orders: +get_orders_ability.id,
      get_products: +get_products_ability.id
    });
	}	catch (err) {
		console.log("Error in get ability controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {

    return res.status(200).send({ message: 'ok' });
  }	catch (err) {
		console.log("Error in create ability controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
  try {

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in update ability controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const destroy = async (req, res) => {
  try {

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in destroy ability controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
