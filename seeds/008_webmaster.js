/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('webmaster').del()
  await knex('webmaster').insert([
    {
      id: 1, 
      user_id: 'b5fb1752-10ab-43b1-9734-d15f380a30b6', 
    },
  ]);
};
