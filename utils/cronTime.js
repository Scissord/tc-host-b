const cronTime = (time) => {
    // Проверяем формат времени
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/; // ЧЧ:ММ
    if (!timeRegex.test(time)) {
        throw new Error('Некорректный формат времени. Используйте формат ЧЧ:ММ.');
    }

    // Разбиваем время на часы и минуты
    const [hours, minutes] = time.split(':');

    // Формируем cron-строку
    const cronTime = `${parseInt(minutes)} ${parseInt(hours)} * * *`;
    return cronTime;
}

export default cronTime;