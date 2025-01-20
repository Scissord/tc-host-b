const cronTime = (time) => {
    // Проверяем формат времени с секундами
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/; // ЧЧ:ММ:СС
    if (!timeRegex.test(time)) {
        throw new Error('Некорректный формат времени. Используйте формат ЧЧ:ММ:СС.');
    }

    // Разбиваем время на часы и минуты, игнорируем секунды
    const [hours, minutes] = time.split(':');

    // Формируем cron-строку
    const cronTime = `${parseInt(minutes)} ${parseInt(hours)} * * *`;
    return cronTime;
};

export default cronTime;
