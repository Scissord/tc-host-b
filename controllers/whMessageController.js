import * as whMessage from '#root/models/wh_message.js';



export const getChatHistory = async (req, res) => {
	try {
        const {order_id } = req.query 
        const messages = whMessage.getChatHistory(order_id)

		return res.status(200).send({ message: 'ok', messages });
	} catch (err) {
		console.log("Error in create getChatHistory controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const messageReceive = async (req, res) => {
	try {
		const data = req.body;
		console.log(data)
	} catch (err) {
		console.log("Error in messageReceive controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
}