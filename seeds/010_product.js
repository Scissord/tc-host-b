/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('product').del()
  await knex('product').insert([
    {
      id: 1, 
      name: 'Продукт 1', 
      price: 500
    },
    {
      id: 2, 
      name: 'Продукт 2', 
      price: 1000
    },
    {
      id: 3, 
      name: 'Продукт 3', 
      price: 1500
    },
  ]);
};
