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
        // webmasters
        31, 32, 33, 34, 35,
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
        // roles
        121, 122, 123, 124,
        // assigned_role
        131, 132, 133,
        // abilities
        141,
        // permissions
        151, 152, 153,
        // statistics
        161, 162, 163
      ],
      type: "role"
    },
    // admin
    {
      entity_id: 2,
      abilities: [
        // orders
        1, 2, 3, 4,
        // webmasters
        31, 32, 33, 34, 35,
        // departments
        41, 42, 43, 44, 45,
        // teams
        51, 52, 53, 54, 55,
        // operators
        61, 62, 63, 64, 65,
        // order_column
        101, 102, 103, 104,
        // statistics
        161, 162, 163
      ],
      type: "role"
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

  await knex.raw("SELECT setval('permission_id_seq', (SELECT MAX(id) FROM permission))");
};
