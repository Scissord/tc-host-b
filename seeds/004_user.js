/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('user').del()
  await knex('user').insert([
    {
      id: '3bbc7de3-724b-42c4-b70f-c378fcfff7d2', 
      login: 'admin', 
      password: '$2a$10$sjqiuQ0HwOKG5GDi7mSrHO7mL9pJ22M12cg9eEVCWh90hof50UMFy',
      avatar: null,
      position_id: 1
    },
    {
      id: '4333b467-9c71-4f4d-975c-e5f71c288e32', 
      login: 'supervisor', 
      password: '$2a$10$BfyJqKHGu49hc1Z3VCIh0ex3Lmlk4pgVB3u0by5RhOfWh4SsDAGn6',
      avatar: null,
      position_id: 2
    },
    {
      id: 'b5fb1752-10ab-43b1-9734-d15f380a30b6', 
      login: 'webmaster', 
      password: '$2a$10$JyzCtSNfUc5au/SuCPh5LeAXit12uzUuzxsaG.w7jY70qh/VNRSCK',
      avatar: null,
      position_id: 3
    },
    {
      id: '9f65a948-8840-4e53-9344-acfab16ca740', 
      login: 'operator', 
      password: '$2a$10$3Ts8.Ft21EdcjE0PHJJOreQTyZV0B/nCf0f2F5SmbAPxB6LW/tt72',
      avatar: null,
      position_id: 4
    },
  ]);
};
