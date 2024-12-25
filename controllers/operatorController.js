import * as Operator from '#models/operator.js';
import * as User from '#models/user.js';

export const get = async (req, res) => {
	try {
    const operators = await Operator.get();

		res.status(200).send({ message: 'ok', operators });
	}	catch (err) {
		console.log("Error in get webmaster controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const getFree = async (req, res) => {
	try {
    const free_operators = await Operator.getFree();

		res.status(200).send({ message: 'ok', free_operators });
	}	catch (err) {
		console.log("Error in getFree operator controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {
		const data = req.body;
		const operator = await Operator.create(data);

    return res.status(200).send({ message: 'ok', operator });
  }	catch (err) {
		console.log("Error in create webmaster controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
  try {
    const { operator_id } = req.params;
    const data = req.body;
    const operator = await Operator.update(operator_id, data);
    const user = await User.find(operator.user_id);
    operator.name = user.name;

    res.status(200).send({ message: 'ok', operator });
  }	catch (err) {
    console.log("Error in update operator controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const softDelete = async (req, res) => {
  try {
		const { operator_id } = req.params;
		const operator = await Operator.softDelete(operator_id);

		res.status(200).send({ message: 'ok', operator });
	}	catch (err) {
		console.log("Error in softDelete webmaster controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
