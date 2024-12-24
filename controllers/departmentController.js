import * as Department from '#models/department.js';

export const get = async (req, res) => {
	try {
    const departments = await Department.get();

		res.status(200).send({ message: 'ok', departments });
	}	catch (err) {
		console.log("Error in get department controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {
	const data = req.body
	const department = await Department.create(data)

    return res.status(200).send({ message: 'ok', department });
  }	catch (err) {
		console.log("Error in create department controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
  try {
		const { department_id } = req.params;
		const data = req.body;
		const department = Department.update(department_id, data);

		res.status(200).send({ message: 'ok' , department});
	}	catch (err) {
		console.log("Error in update department controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const softDelete = async (req, res) => {
	try {
		const { department_id } = req.params;
		const department = await Department.softDelete(department_id);

		res.status(200).send({ message: 'ok', department });
	}	catch (err) {
		console.log("Error in softDelete department controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
