import * as OrderItem from '#models/order_item.js';

export const create = async (req, res) => {
  try {
    const data = req.body;
    const order_item = await OrderItem.create(data);

    res.status(200).send({ message: 'ok', order_item })
  } catch (err) {
    console.log("Error in create orderItem controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { order_item_id } = req.params;
    await OrderItem.hardDelete(order_item_id);

    res.status(200).send({ message: 'ok' })
  } catch (err) {
    console.log("Error in hardDelete orderItem controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
