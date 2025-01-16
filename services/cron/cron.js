import dotenv from 'dotenv';
import cron from 'redis';

dotenv.config();


// Пример задачи 1: Выполняется каждую минуту
const task1 = cron.schedule('* * * * *', () => {
    console.log('Task 1 выполняется каждую минуту');
});

// Пример задачи 2: Выполняется каждый день в 12:00
const task2 = cron.schedule('0 12 * * *', () => {
    console.log('Task 2 выполняется каждый день в 12:00');
});

// Функция для запуска всех cron-задач
const startCronJobs = () => {
    task1.start();
    task2.start();
    console.log('Все cron-задачи запущены');
};

module.exports = { startCronJobs };