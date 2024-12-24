/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  // Удаляем все существующие записи
  await knex('order_item').del();

  const ordersCount = 1000; // Количество заказов
  const maxItemsPerOrder = 3; // Максимальное количество товаров в одном заказе
  const productsCount = 3; // Количество различных товаров

  const orderItems = [];
  const baseOrderId = 10000; // Начальный идентификатор заказа

  for (let i = 0; i < ordersCount; i++) {
    const orderId = baseOrderId + i; // Уникальный идентификатор заказа
    const itemsCount = Math.floor(Math.random() * maxItemsPerOrder) + 1; // Случайное количество товаров для текущего заказа

    for (let j = 0; j < itemsCount; j++) {
      const productId = Math.floor(Math.random() * productsCount) + 1; // Случайный товар
      const quantity = Math.floor(Math.random() * 10) + 1; // Случайное количество товара (от 1 до 10)

      orderItems.push({
        id: orderItems.length + 1, // Уникальный ID для каждой записи
        order_id: orderId, // Привязка к заказу
        product_id: productId, // ID товара
        quantity, // Количество товара
      });
    }
  }

  // Вставляем сгенерированные записи
  await knex('order_item').insert(orderItems);
};
