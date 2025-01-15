import * as SubStatus from '#models/sub_status.js';
import * as Team from '#models/team.js';

export const get = async (req, res) => {
	try {
		const subStatuses = await SubStatus.get();

		res.status(200).send({ message: 'ok', subStatuses });
	} catch (err) {
		console.log("Error in get subStatus controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const find = async (req, res) => {
	try {
		const { status_id } = req.params;
		const subStatuses = await SubStatus.getWhere({ status_id });

		res.status(200).send({ message: 'ok', subStatuses });
	} catch (err) {
		console.log("Error in get getByStatus controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const operator = async (req, res) => {
	try {
		const team = await Team.find(req.operator.team_id);
		const subStatuses = await SubStatus.getForOperator(team.sub_status_ids);
		res.status(200).send({ message: 'ok', subStatuses });
	} catch (err) {
		console.log("Error in get subStatus controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
	try {
		const data = req.body;
		const subStatus = await SubStatus.create(data);

		return res.status(200).send({ message: 'ok', subStatus });
	} catch (err) {
		console.log("Error in create subStatus controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
	try {
		const { sub_status_id } = req.params;
		const data = req.body;
		const subStatus = SubStatus.update(sub_status_id, data);

		res.status(200).send({ message: 'ok', subStatus });
	} catch (err) {
		console.log("Error in update subStatus controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const softDelete = async (req, res) => {
	try {
		const { sub_status_id } = req.params;
		const subStatus = await SubStatus.softDelete(sub_status_id);

		res.status(200).send({ message: 'ok', subStatus });
	} catch (err) {
		console.log("Error in softDelete status controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
