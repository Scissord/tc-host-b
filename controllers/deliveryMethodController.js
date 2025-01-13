import * as DeliveryMethod from '#root/models/delivery_method.js';

export const get = async (req, res) => {
  try {
    const deliveryMethods = await DeliveryMethod.get();
    res.status(200).send({ message: 'ok', deliveryMethods });
  } catch (err) {
    console.log("Error in get delivery controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
