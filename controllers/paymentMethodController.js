import * as PaymentMethod from '#root/models/payment_method.js';

export const get = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.get();
    res.status(200).send({ message: 'ok', paymentMethods });
  } catch (err) {
    console.log("Error in get delivery controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
