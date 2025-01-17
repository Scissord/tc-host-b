import * as Log from '#models/log.js';

export const getOrderLogs = async (req, res) => {
  try {
    const { order_id } = req.params;
    const logs = await Log.getOrderLogs(order_id);

    res.status(200).send({ message: 'ok', logs });
  } catch (err) {
    console.log("Error in getOrderLogs log controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getOperatorLogs = async (req, res) => {
  try {
    const { operator_id } = req.params;
    const logs = await Log.getOperatorLogs(operator_id);

    res.status(200).send({ message: 'ok', logs });
  } catch (err) {
    console.log("Error in getOperatorLogs log controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getWebmasterLogs = async (req, res) => {
  try {
    const { webmaster_id } = req.params;
    const logs = await Log.getWebmasterLogs(webmaster_id);

    res.status(200).send({ message: 'ok', logs });
  } catch (err) {
    console.log("Error in getWebmasterLogs log controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};