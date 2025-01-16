export function groupToStatus(group) {
  const statusMap = {
    processing: 0, // Обработка
    accepted: 1,   // Принят
    shipped: 2,    // Отправлено
    paid: 3,       // Оплачен
    canceled: 4,   // Отменен
    return: 5,     // Возврат
    spam: 6        // Спам
  };

  // Возвращаем значение из маппинга или 0 по умолчанию
  return statusMap[group] ?? 0;
}
