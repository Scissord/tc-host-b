/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('user').del()
  await knex('user').insert([
    // superadmin
    {
      id: 1, 
      login: 'superadmin', 
      password: '$2a$10$nmSMifufoud7yWmBHWg.j.nVAmsrgrta.TRCUV.lRd8/qQoge/Jpa',
      name: 'Шымнгысхан',
    },
    // admin
    {
      id: 2,
      login: 'admin1',
      password: '$2a$10$4dOvf4vDTUyfgzSklNS6Qurtnfp.vzL0.tSSsC6mCq.3jiDqslwJm',
      name: 'Медет',
    },
    {
      id: 3,
      login: 'admin2',
      password: '$2a$10$2EnIIfRVe8jrTcjXtP7.suPkY0StD2yho/f9BRYvOfBBZlJBfoEWm',
      name: 'Абзал',
    },
    // supervisor
    {
      id: 4,
      login: 'supervisor1',
      password: '$2a$10$2PRDg7g7pi1N9SSjs8bU7ukAge8CNpMwkiMFGy0lilhz8M80WnZzy',
      name: 'Начальник 1',
    },
    {
      id: 5,
      login: 'supervisor2',
      password: '$2a$10$YxQyccEajtKZApe2k/iRdeft3XsxgWjrZgBqYC2h6hALRLi1waa7q',
      name: 'Начальник 2',
    },
    {
      id: 6,
      login: 'supervisor3',
      password: '$2a$10$LnDYiJH2Fv/2CL5opS4QhukfOf/670eiqUmQ4b6XC9YC.lKCpHhbK',
      name: 'Начальник 3',
    },
    // webmaster
    {
      id: 7,
      login: 'webmaster1',
      password: '$2a$10$ImamcA8YvPzg2DaCsS1A1O2ce9WgHpuhSJQl8p7dfdq/UT50I8.Eu',
      name: 'Вебмастер 1',
    },
    {
      id: 8,
      login: 'webmaster2',
      password: '$2a$10$K0E9zzjiZJnE23FwfB.yW.cq1iOHuHBT6kewgmcnlE9x/vA5I3KCm',
      name: 'Вебмастер 2',
    },
    {
      id: 9,
      login: 'webmaster3',
      password: '$2a$10$ejvDl8vzod9ML68uJ3rgFODV7/dYaM0Y9sm5UXpt6K0B.HhK7qTxe',
      name: 'Вебмастер 3',
    },
    // operator
    {
      id: 10,
      login: 'operator1',
      password: '$2a$10$4E9JeW.4xpcA842X9oi.fOctsiZZD40lZJVCdfEznAZYOb3j3fIjS',
      name: 'Оператор 1',
    },
    {
      id: 11,
      login: 'operator2',
      password: '$2a$10$O0EPJzsUc5d/X./6uJ7BwOs0oISS/.Tcq4Hk2eSZd3BTLA6v1c3ga',
      name: 'Оператор 2',
    },
    {
      id: 12,
      login: 'operator3',
      password: '$2a$10$cEZBuRTcdCP3RQdnSMA9gOUEd1zGoYrsImrG9dPkE.ihNYVgc.VtK',
      name: 'Оператор 3',
    },
  ]);
};
