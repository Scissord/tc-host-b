/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('operator').del()
  await knex('operator').insert([
    {
      id: 1, 
      name: 'Оператор 1',
      user_id: '9f65a948-8840-4e53-9344-acfab16ca740', 
    },
    {
      id: 2, 
      name: 'Оператор 2',
      user_id: 'bc924980-aaaa-4f1c-ae13-a08302cd2da1', 
    },
    {
      id: 3, 
      name: 'Оператор 3',
      user_id: 'f137544b-943a-4e63-ac3a-b8653b65da82', 
    },
    {
      id: 4, 
      name: 'Оператор 4',
      user_id: '0b5f144d-1809-42cf-a1bb-a080d6295c08', 
    },

    {
      id: 5, 
      name: 'Оператор 5',
      user_id: 'e3dd05cd-fabe-4172-8030-dea321a2a7df', 
    },
  ]);
};
