/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('user').del()
  await knex('user').insert([
    // main admin
    {
      id: '3bbc7de3-724b-42c4-b70f-c378fcfff7d2', 
      login: 'admin', 
      password: '$2a$10$sjqiuQ0HwOKG5GDi7mSrHO7mL9pJ22M12cg9eEVCWh90hof50UMFy',
      avatar: null,
      position_id: 1
    },
    // supervisors
    {
      id: '4333b467-9c71-4f4d-975c-e5f71c288e32', 
      login: 'supervisor', 
      password: '$2a$10$BfyJqKHGu49hc1Z3VCIh0ex3Lmlk4pgVB3u0by5RhOfWh4SsDAGn6',
      avatar: null,
      position_id: 2
    },
    // webmasters 
    {
      id: 'b5fb1752-10ab-43b1-9734-d15f380a30b6', 
      login: 'webmaster', 
      password: '$2a$10$JyzCtSNfUc5au/SuCPh5LeAXit12uzUuzxsaG.w7jY70qh/VNRSCK',
      avatar: null,
      position_id: 3
    },
    {
      id: '62cadf22-24b9-4258-9071-028defb7a78c', 
      login: 'webmaster', 
      password: '$2a$10$lCJ.aOwe4vJCqLansy4BW.g6Q34XN5KJAIDu2fZ1gaD6ljHHAO4WS',
      avatar: null,
      position_id: 3
    },
    {
      id: '8708c630-376a-40d1-bbc6-35a7b1a68f75', 
      login: 'webmaster', 
      password: '$2a$10$a4xuT.8EcE8PrJqE3lo5EOv2eYGY9KVRow6fjxTQjML6u0Sa89CzW',
      avatar: null,
      position_id: 3
    },
    {
      id: 'bc092a68-33a1-426f-8f08-ed99fc2ef09b', 
      login: 'webmaster', 
      password: '$2a$10$ZccgJ6V2bqe1KnGIskXWK.4z3uwvvNf8DvaalvUFZQWVRYvaGf6pO',
      avatar: null,
      position_id: 3
    },
    {
      id: '7c23f45b-d3bd-4ad2-9334-bad510ae3d5e', 
      login: 'webmaster', 
      password: '$2a$10$PiCS9bqo5AY0mt3.rVAoO.tbSDMMNeegqUP96m2xJ1qjn1QDh9j62',
      avatar: null,
      position_id: 3
    },
    // operators
    {
      id: '9f65a948-8840-4e53-9344-acfab16ca740', 
      login: 'operator', 
      password: '$2a$10$3Ts8.Ft21EdcjE0PHJJOreQTyZV0B/nCf0f2F5SmbAPxB6LW/tt72',
      avatar: null,
      position_id: 4
    },
    {
      id: 'bc924980-aaaa-4f1c-ae13-a08302cd2da1', 
      login: 'operator', 
      password: '$2a$10$XgFSDBUKVuyjzVgk5zBFReD54NoErlGKCF3qz.tDmsB5h364icD4O',
      avatar: null,
      position_id: 4
    },
    {
      id: 'f137544b-943a-4e63-ac3a-b8653b65da82', 
      login: 'operator', 
      password: '$2a$10$YAfU5D3irSlrRCEB3ViNrucd2AUONYuQWFTL1aLZdyquwhN3dsvIO',
      avatar: null,
      position_id: 4
    },
    {
      id: '0b5f144d-1809-42cf-a1bb-a080d6295c08', 
      login: 'operator', 
      password: '$2a$10$ZnkITboqfWNF9bJocOUc/ulvLWuaZzi2am86T4LdEW0SOAjP.MRzW',
      avatar: null,
      position_id: 4
    },
    {
      id: 'e3dd05cd-fabe-4172-8030-dea321a2a7df', 
      login: 'operator', 
      password: '$2a$10$fiArpnuzf3iVuCOcagq8re6SjjJhyryfL5tGc6RS58AWCFIBZM24G',
      avatar: null,
      position_id: 4
    },
  ]);
};
