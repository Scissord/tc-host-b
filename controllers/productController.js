import * as Product from '#models/product.js';

export const get = async (req, res) => {
	try {
    const products = await Product.get();
		res.status(200).send({ message: 'ok', products });
	}	catch (err) {
		console.log("Error in get product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {
		const data = req.body;
		const product = await Product.create(data);

    return res.status(200).send({ message: 'ok', product });
  }	catch (err) {
		console.log("Error in create product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
  try {
		const { product_id } = req.params;
		const data = req.body;
		const product = await Product.update(product_id, data);

		res.status(200).send({ message: 'ok', product });
	}	catch (err) {
		console.log("Error in update product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const softDelete = async (req, res) => {
  try {
		const { product_id } = req.params;
		const product = await Product.softDelete(product_id);

		res.status(200).send({ message: 'ok', product });
	}	catch (err) {
		console.log("Error in softDelete product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
