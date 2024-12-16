/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('order_status').del()
  await knex('order_status').insert([
    {
      id: 1, 
      name: 'Обработка', 
      color: '#fef9c3',
    },
    {
      id: 2, 
      name: 'Принят',
      color: '#dcfce7', 
    },
    {
      id: 3, 
      name: 'Отменен', 
      color: '#fee2e2',
    },
    {
      id: 4, 
      name: 'Отправлен',
      color: '#f3e8ff',  
    },
    {
      id: 5, 
      name: 'Возврат', 
      color: '#f87171',
    },
    {
      id: 6, 
      name: 'Спам', 
      color: '#fecaca',
    },
    {
      id: 7, 
      name: 'Оплачен', 
      color: '#4ade80', 
    },
  ]);
};
