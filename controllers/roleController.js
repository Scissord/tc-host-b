import * as Role from '#root/models/role.js';

export const getRoles = async (req, res) => {
	try {
		const roles = await Role.get();

		res.status(200).send({ message: 'ok', roles });
	} catch (err) {
		console.log("Error in get role controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
	try {
		const data = req.body;
		const role = await Role.create(data);

		return res.status(200).send({ message: 'ok', role });
	} catch (err) {
		console.log("Error in create role controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
	try {
		const { role_id } = req.params;
		const data = req.body;

		const role = await Role.update(role_id, data);

		res.status(200).send({ message: 'ok', role });
	} catch (err) {
		console.log("Error in update role controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const softDelete = async (req, res) => {
	try {
		const { role_id } = req.params;
		const role = await Role.softDelete(role_id);

		res.status(200).send({ message: 'ok', role });
	} catch (err) {
		console.log("Error in softDelete role controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
