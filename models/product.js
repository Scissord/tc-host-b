import knex from './knex.js';

const db = knex();

export const get = async function (limit, page, search) {
  const result = await db('product as p')
    .select(
      'p.*',
      'pc.name as category_name',
      'pb.name as brand_name',
    )
    .select(db.raw('COALESCE(json_agg(pi.link) FILTER (WHERE pi.id IS NOT NULL), \'[]\') as images'))
    .select(db.raw('COALESCE(json_agg(pr.*) FILTER (WHERE pr.id IS NOT NULL), \'[]\') as reviews'))
    .select(db.raw('COALESCE(json_agg(DISTINCT pt.name) FILTER (WHERE pt.id IS NOT NULL), \'[]\') as tags'))
    .leftJoin('product_category as pc', 'pc.id', 'p.category_id')
    .leftJoin('product_brand as pb', 'pb.id', 'p.brand_id')
    .leftJoin('product_image as pi', 'pi.product_id', 'p.id')
    .leftJoin('product_review as pr', 'pr.product_id', 'p.id')
    .leftJoin('pivot_product_tags as ppt', 'ppt.product_id', 'p.id')
    .leftJoin('product_tag as pt', 'pt.id', 'ppt.tag_id')
    .where((q) => {
      if (search) {
        q.where('p.title', 'ilike', `%${search}%`)
      }
    })
    .groupBy('p.id', 'pc.name', 'pb.name')
    .paginate({
      perPage: limit,
      currentPage: page,
      isLengthAware: true
    });

  return {
    products: result.data,
    total: result.pagination.total
  };
};

export const create = async function (data) {
  const [product] = await db("product")
    .insert(data)
    .returning("id")

  data.id = product.id;
  return data;
};

export const update = async function (id, data) {
  const [product] = await db("product")
    .where('id', id)
    .update(data)
    .returning("*");

  return product;
};

export const destroy = async function (id) {
  await db("product")
    .del()
    .where("id", id)
};
