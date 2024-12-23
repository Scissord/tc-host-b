import * as SubStatuses from '#root/models/sub_status.js';

export const getSubStatuses = async (req, res) => {
	try {
    const subStatuses = await SubStatuses.get();
		
		res.status(200).send({ message: 'ok', subStatuses });
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
