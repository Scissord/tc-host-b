import * as OrderSubStatuses from '#models/order_sub_status.js';

export const getOrderSubStatuses = async (req, res) => {
	try {
    const orderSubStatuses = await OrderSubStatuses.get();
		
		res.status(200).send({ message: 'ok', orderSubStatuses });
	}	catch (err) {
		console.log("Error in get user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
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
