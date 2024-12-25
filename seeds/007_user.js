/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('user').del();

  const users = [
    { id: 1, login: 'superadmin', password: '$2a$10$nmSMifufoud7yWmBHWg.j.nVAmsrgrta.TRCUV.lRd8/qQoge/Jpa', name: 'Шынгысхан' },
    { id: 2, login: 'admin1', password: '$2a$10$4dOvf4vDTUyfgzSklNS6Qurtnfp.vzL0.tSSsC6mCq.3jiDqslwJm', name: 'Медет' },
    { id: 3, login: 'admin2', password: '$2a$10$2EnIIfRVe8jrTcjXtP7.suPkY0StD2yho/f9BRYvOfBBZlJBfoEWm', name: 'Абзал' },
    { id: 4, login: 'webmaster1', password: '$2a$10$KNmvW7nHTzASa84EfC3Yy.it4MNXDdBeT9uq8OlFNkOsi.3litRXu', name: 'Вебмастер 1' },
    { id: 5, login: 'webmaster2', password: '$2a$10$K0E9zzjiZJnE23FwfB.yW.cq1iOHuHBT6kewgmcnlE9x/vA5I3KCm', name: 'Вебмастер 2' },
    { id: 6, login: 'webmaster3', password: '$2a$10$ejvDl8vzod9ML68uJ3rgFODV7/dYaM0Y9sm5UXpt6K0B.HhK7qTxe', name: 'Вебмастер 3' },
    { id: 7, login: 'operator1', password: '$2a$10$4E9JeW.4xpcA842X9oi.fOctsiZZD40lZJVCdfEznAZYOb3j3fIjS', name: 'Оператор 1' },
    { id: 8, login: 'operator2', password: '$2a$10$O0EPJzsUc5d/X./6uJ7BwOs0oISS/.Tcq4Hk2eSZd3BTLA6v1c3ga', name: 'Оператор 2' },
    { id: 9, login: 'supervisor', password: '$2a$10$islcEUAAn2SW8w9w07xBG.gpKx916rCKopdvINYZVZ1kxeFR9ZOTm', name: 'Начальник отдела' },
  ];

  await Promise.all(
    users.map(user => knex('user').insert(user))
  );
};
