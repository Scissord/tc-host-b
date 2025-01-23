import dotenv from 'dotenv';
import * as ketService from '#services/ketkz/ketkz.js'

dotenv.config();

export const getSendedOrderInfo = async (req, res) => {
  try {
	const { ext_id } = req.query
	console.log(ext_id)
	const data = await ketService.getOrderInfoFromKet(ext_id)

	res.status(200).send({
		message: 'ok',
		data
	});
  } catch (err) {
    console.log("Error in get ket controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};