import * as City from '#models/city.js';

export const get = async (req, res) => {
	try {
    const cities = await City.get();
		res.status(200).send({ message: 'ok', cities });
	}	catch (err) {
		console.log("Error in get city controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {
		const data = req.body;
		const city = await City.create(data);

    return res.status(200).send({ message: 'ok', city });
  }	catch (err) {
		console.log("Error in create city controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
  try {
		const { city_id } = req.params;
		const data = req.body;
		const city = await City.update(city_id, data);

		res.status(200).send({ message: 'ok', city });
	}	catch (err) {
		console.log("Error in update city controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const softDelete = async (req, res) => {
  try {
		const { city_id } = req.params;
		const city = await City.softDelete(city_id);

		res.status(200).send({ message: 'ok', city });
	}	catch (err) {
		console.log("Error in softDelete product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
