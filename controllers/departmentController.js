import * as Department from '#models/department.js';

export const getDepartments = async (req, res) => {
	try {
    const departments = await Department.get();

		res.status(200).send(departments);
	}	catch (err) {
		console.log("Error in get user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const getDepartmentHeadAbility = async (req, res) => {
	try {
	const { department_id } = req.params;
    const head_ability_id = await Department.getDepartmentHeadAbility(department_id);
		
		res.status(200).send(head_ability_id);
	}	catch (err) {
		console.log("Error in get user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {
	const data = req.body
	const department = await Department.create(data)

    return res.status(200).send({ message: 'ok', department });
  }	catch (err) {
		console.log("Error in create user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
  try {
		const { department_id } = req.params
		const data = req.body
		const department = Department.update(department_id, data)

		res.status(200).send({ message: 'ok' , department});
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
