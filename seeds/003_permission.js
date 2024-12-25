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
        // teams
        51, 52, 53, 54, 55,
        // operators
        61, 62, 63, 64, 65,
        // users
        71, 72, 73, 74,
        // statuses
        81, 82, 83, 84,
        // sub_statuses
        91, 92, 93, 94,
        // order_column
        101, 102, 103, 104,
        // users
        121, 122, 123, 124,
      ],
      type: "role"
    },
    // admin
    {
      entity_id: 2,
      abilities: [1, 2, 3, 4, 101],
      type: "role"
    },
    // supervisor
    {
      entity_id: 3,
      abilities: [1, 2, 3, 4, 101],
      type: "role"
    },
    // webmaster_team_lead
    {
      entity_id: 4,
      abilities: [31, 93, 101],
      type: "role"
    },
    // webmaster1
    {
      entity_id: 4,
      abilities: [101],
      type: "user"
    },
    // webmaster1
    {
      entity_id: 5,
      abilities: [101],
      type: "user"
    },
    // operator1
    {
      entity_id: 7,
      abilities: [91, 101],
      type: "user"
    },
    // operator2
    {
      entity_id: 8,
      abilities: [91, 101],
      type: "user"
    },
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
