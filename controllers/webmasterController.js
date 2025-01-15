import * as User from '#models/user.js';
import * as Webmaster from '#models/webmaster.js';
import * as Operator from '#models/operator.js';
import ERRORS from '#constants/errors.js';

export const getFree = async (req, res) => {
	try {
		const free_webmasters = await Webmaster.getFree();

		res.status(200).send({ message: 'ok', free_webmasters });
	} catch (err) {
		console.log("Error in getFree operator controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const get = async (req, res) => {
	try {
		const webmasters = await Webmaster.get();
		res.status(200).send({ message: 'ok', webmasters });
	} catch (err) {
		console.log("Error in get webmaster controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
	try {
		const data = req.body;

		// check if exist
		const existed_webmaster = await Webmaster.findWhere({ user_id: data.user_id });
		if (existed_webmaster) {
			return res.status(400).send({
				message: ERRORS.IS_WEBMASTER,
			});
		};

		// check if he is operator
		const existed_operator = await Operator.findWhere({ user_id: data.user_id });
		if (existed_operator) {
			return res.status(400).send({
				message: ERRORS.IS_OPERATOR,
			});
		};

		const webmaster = await Webmaster.create(data);

		return res.status(200).send({ message: 'ok', webmaster });
	} catch (err) {
		console.log("Error in create webmaster controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
	try {
		const { webmaster_id } = req.params;
		const data = req.body;
		const webmaster = await Webmaster.update(webmaster_id, data);
		const user = await User.find(webmaster.user_id);
		webmaster.name = user.name;

		res.status(200).send({ message: 'ok', webmaster });
	} catch (err) {
		console.log("Error in update webmaster controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const softDelete = async (req, res) => {
	try {
		const { webmaster_id } = req.params;
		const webmaster = await Webmaster.softDelete(webmaster_id);

		res.status(200).send({ message: 'ok', webmaster });
	} catch (err) {
		console.log("Error in softDelete webmaster controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

