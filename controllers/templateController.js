export const get = async (req, res) => {
	try {

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in get template controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {

    return res.status(200).send({ message: 'ok' });
  }	catch (err) {
		console.log("Error in create template controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
  try {

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in update template controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const softDelete = async (req, res) => {
  try {

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in softDelete template controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
