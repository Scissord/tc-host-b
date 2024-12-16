/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('webmaster').del()
  await knex('webmaster').insert([
    {
      id: 1, 
      name: 'Вебмастер 1',
      user_id: 'b5fb1752-10ab-43b1-9734-d15f380a30b6', 
    },
    {
      id: 2, 
      name: 'Вебмастер 2',
      user_id: '62cadf22-24b9-4258-9071-028defb7a78c', 
    },
    {
      id: 3, 
      name: 'Вебмастер 3',
      user_id: '8708c630-376a-40d1-bbc6-35a7b1a68f75', 
    },
    {
      id: 4, 
      name: 'Вебмастер 4',
      user_id: 'bc092a68-33a1-426f-8f08-ed99fc2ef09b', 
    },
    {
      id: 5, 
      name: 'Вебмастер 5',
      user_id: '7c23f45b-d3bd-4ad2-9334-bad510ae3d5e', 
    },
  ]);
};
