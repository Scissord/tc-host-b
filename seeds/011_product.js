/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('product').del()
  await knex('product').insert([
    {
      id: 212253,
      name: 'AlcoBalance',
      price: 1650
    },
    {
      id: 212255,
      name: 'BodyBalance',
      price: 1650
    },
    {
      id: 212254,
      name: 'EroKing',
      price: 1650
    },
    {
      id: 212252,
      name: 'FemBalance',
      price: 1650
    },
    {
      id: 212251,
      name: 'LibidoFortis',
      price: 1650
    },
    {
      id: 200503,
      name: 'Beclean',
      price: 1650
    },
    {
      id: 200504,
      name: 'Cardio-Sei VARIKOZ',
      price: 1650
    },
    {
      id: 200505,
      name: 'Cardio-Sei',
      price: 1650
    },
    {
      id: 200501,
      name: 'EroPower',
      price: 1650
    },
    {
      id: 200502,
      name: 'Femiston',
      price: 1650
    },
    {
      id: 212256,
      name: 'FlexBalance',
      price: 1650
    },
    {
      id: 212257,
      name: 'ManBalance',
      price: 1650
    },
    {
      id: 212250,
      name: 'Minoxidix',
      price: 1650
    },
    {
      id: 200500,
      name: 'ProStrong',
      price: 1650
    },
  ]);

  await knex.raw("SELECT setval('product_id_seq', (SELECT MAX(id) FROM product))");
};
