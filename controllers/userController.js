import bcrypt from 'bcryptjs';
import * as User from '#models/user.js';
import * as Webmaster from '#models/webmaster.js';
import * as Operator from '#models/operator.js';

export const get = async (req, res) => {
	try {
		const users = await User.get();

		res.status(200).send({ message: 'ok', users });
	} catch (err) {
		console.log("Error in get user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
	try {
		const data = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(data.password, salt);

		const user = await User.create({
			login: data.login,
			password: hashedPassword,
			name: data.name,
		});

		return res.status(200).send({ message: 'ok', user });
	} catch (err) {
		console.log("Error in create user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
	try {
		const { user_id } = req.params;
		const data = req.body;

		const user = await User.find(user_id);
		if (user.password !== data.password) {
			const salt = await bcrypt.genSalt(10);
			data.password = await bcrypt.hash(data.password, salt);
		};

		data.updated_at = new Date().toISOString();
		
		const newUser = await User.update(user_id, data);

		res.status(200).send({ message: 'ok', user: newUser });
	} catch (err) {
		console.log("Error in update user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const softDelete = async (req, res) => {
	try {
		const { user_id } = req.params;

		const webmaster = await Webmaster.findWhere({ user_id });
		if (webmaster) {
			await Webmaster.softDelete(webmaster.id);
		};

		const operator = await Operator.findWhere({ user_id });
		if (operator) {
			await Operator.softDelete(operator.id);
		};

		const user = await User.softDelete(user_id);

		res.status(200).send({ message: 'ok', user });
	} catch (err) {
		console.log("Error in softDelete user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
