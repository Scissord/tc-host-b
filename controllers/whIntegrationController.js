import * as whIntegration from '#models/wh_integration.js';

// export const get = async (req, res) => {
// 	try {
//         const integrations = await whIntegration.get();
    
// 		res.status(200).send({ message: 'ok', integrations });
// 	}	catch (err) {
// 		console.log("Error in get integration controller", err.message);
// 		res.status(500).send({ error: "Internal Server Error" });
// 	}
// };


export const create = async (req, res) => {
	try {
		const data = req.body;
		const integration = await whIntegration.create(data);

		return res.status(200).send({ message: 'ok', integration });
	} catch (err) {
		console.log("Error in create wh_integration controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};


// export const update = async (req, res) => {
// 	try {
// 		const { role_id } = req.params;
// 		const data = req.body;

// 		const role = await whIntegration.update(role_id, data);

// 		res.status(200).send({ message: 'ok', role });
// 	} catch (err) {
// 		console.log("Error in update role controller", err.message);
// 		res.status(500).send({ error: "Internal Server Error" });
// 	}
// };