import * as User from '#models/user.js';
import * as Webmaster from '#models/webmaster.js';
import * as Order from '#models/order.js'

export const get = async (req, res) => {
	try {
        const webmasters = await Webmaster.get();
		res.status(200).send({ message: 'ok', webmasters });
	}	catch (err) {
		console.log("Error in get webmaster controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const getStatisticForWebmaster = async (req, res) => {
    try {
        const { webmaster_id , start_date, end_date, byDay} = req.query;
        const statistic_result = await Order.getOrderStatisticForWebmaster(webmaster_id, start_date, end_date, byDay)
        res.status(200).send({ message: 'ok', statistic_result });
    } catch (err) {
        console.log("Error in get statistic controller", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export const getStatisticForOperator = async (req, res) => {
    try {
        const { operator_id , start_date, end_date, byDay} = req.query;
        const statistic_result = await Order.getOrderStatisticForOperator(operator_id, start_date, end_date, byDay)
        res.status(200).send({ message: 'ok', statistic_result });
    } catch (err) {
        console.log("Error in get statistic controller", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
}
