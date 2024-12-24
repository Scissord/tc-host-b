/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('permission').del();

  const roles = [
    // superadmin
    {
      entity_id: 1,
      abilities: [
        // orders
        1, 2, 3, 4,
        // products
        11, 12, 13, 14,
        // cities
        21, 22, 23, 24, 
        // departments
        41, 42, 43, 44, 45,
      ],
      type: "role"
    },
    // admin
    {
      entity_id: 2,
      abilities: [1, 2, 3, 4,],
      type: "role"
    },
    // supervisor
    {
      entity_id: 3,
      abilities: [1, 2, 3, 4,],
      type: "role"
    },
    // webmaster_team_lead
    {
      entity_id: 4,
      abilities: [31, 93],
      type: "role"
    },
    // operator1
    // {
    //   entity_id: 7,
    //   abilities: [1, 2, 3, 4,],
    //   type: "user"
    // },
    // operator2
    // {
    //   entity_id: 8,
    //   abilities: [1, 2, 3, 4,],
    //   type: "user"
    // },
  ];

  let id = 1;
  const permissions = [];

  roles.forEach((role) => {
    role.abilities.forEach((ability_id) => {
      permissions.push({
        id: id++,
        ability_id,
        entity_id: role.entity_id,
        entity_type: role.type,
      });
    });
  });

  await knex('permission').insert(permissions);
};
