import axios from 'axios';
import * as Product from '#models/product.js'
import * as ProductCategory from '#models/product_category.js';
import * as ProductBrand from '#models/product_brand.js';
import * as ProductTags from '#models/product_tag.js';
import * as PivotProductTags from '#models/pivot_product_tags.js';
import * as ProductReview from '#models/product_review.js';
import * as ProductImage from '#models/product_image.js';

export const get = async (req, res) => {
	try {
    const { limit, page, search } = req.query;
    console.log('fetching products');

    const { products, total } = await Product.get(limit, page, search);

		res.status(200).send({ message: 'ok', products, total });
	}	catch (err) {
		console.log("Error in get user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const create = async (req, res) => {
  try {
    const data = req.body;
    const product = await Product.create(data);

    return res.status(200).send({ message: 'ok', product });
  }	catch (err) {
		console.log("Error in create user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const update = async (req, res) => {
  try {
    const product_id = req.params;
    const data = req.body;
    const product = await Product.update(product_id, data);

		res.status(200).send({ message: 'ok', product });
	}	catch (err) {
		console.log("Error in update user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const destroy = async (req, res) => {
  try {
    const product_id = req.params;
    await Product.destroy(product_id);

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in destroy user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const fetchProducts = async (req, res) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://dummyjson.com/products?limit=30&skip=0',
    })

    for (const product of response.data.products) {
      const category_id = await ProductCategory.getCategoryIdByName(product.category);
      let brand_id = 1;
      if(product.brand) {
        brand_id = await ProductBrand.getBrandIdByName(product.brand);
      };

      const p = await Product.create({
        title: product.title,
        description: product.description,
        category_id,
        price: product.price,
        discount_percentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand_id,
        sku: product.sku,
        weight: product.weight,
        width: product.dimensions.width,
        height: product.dimensions.height,
        depth: product.dimensions.depth,
        warranty_information: product.warrantyInformation,
        shipping_information: product.shippingInformation,
        availability_status: product.availabilityStatus,
        return_policy: product.returnPolicy,
        minimum_order_quantity: product.minimumOrderQuantity,
        barcode: product.meta.barcode,
        qrCode: product.meta.qrCode,
        thumbnail: product.thumbnail,
      });

      for(const tag of product.tags) {
        // find tag if it exists
        let t = await ProductTags.find({ name: tag });
        if(!t) {
          t = await ProductTags.create({
            name: tag
          });
        };
        await PivotProductTags.create({
          product_id: p.id,
          tag_id: t.id,
        });
      };

      for(const review of product.reviews) {
        await ProductReview.create({
          product_id: p.id,
          rating: review.rating,
          comment: review.comment,
          created_at: review.date,
          reviewer_name: review.reviewerName,
          reviewer_email: review.reviewerEmail,
        })
      };

      for(const image of product.images) {
        await ProductImage.create({
          product_id: p.id,
          link: image
        })
      }
    }

    console.log('successfully');

    res.status(200).send({ message: 'ok' });
  } catch (err) {
    console.log("Error in fetchProducts product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
  };
} ;
