/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('position').del()
  await knex('position').insert([
    {
      id: 1, 
      name: 'Админ', 
    },
    {
      id: 2, 
      name: 'Начальник', 
    },
    {
      id: 3, 
      name: 'Вебмастер', 
    },
    {
      id: 4, 
      name: 'Оператор', 
    },
  ]);
};
