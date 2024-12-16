/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('product').del()
  await knex('product').insert([
    {
      id: 1, 
      name: 'Libido Fortis', 
      price: 500
    },
    {
      id: 2, 
      name: 'Flex Balance', 
      price: 1000
    },
    {
      id: 3, 
      name: 'Man Balance', 
      price: 1500
    },
  ]);
};
