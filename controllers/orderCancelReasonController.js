import * as OrderCancelReason from '#root/models/order_cancel_reason.js';

export const get = async (req, res) => {
  try {
    const orderCancelReasons = await OrderCancelReason.get();
    res.status(200).send({ message: 'ok', orderCancelReasons });
  } catch (err) {
    console.log("Error in get cancelReason controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
