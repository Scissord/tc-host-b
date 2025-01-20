import dotenv from 'dotenv';
import cron from 'node-cron';
import * as ScheduledTasks from '#models/scheduled_tasks.js';
import * as ketService from '#services/ketkz/ketkz.js'

dotenv.config();

// Предопределённые задачи
const task1 = {
    id: 'courier_cities',
    cronTask: null,
    handler: async () => {
        await ketService.sendCourierCityOrders()
    },
    defaultSchedule: '* * * * *',
};


const task2 = {
    id: 'postal',
    cronTask: null,
    handler: async () => {
        await ketService.sendPostalOrders()
    },
    defaultSchedule: '* * * * *',
};


const task3 = {
    id: 'courier',
    cronTask: null,
    handler: async () => {
       await ketService.sendCourierOrders()
    },
    defaultSchedule: '* * * * *',
};


const predefinedTasks = [task1, task2, task3];

const activeCronTasks = {};

export const initializeCronJobs = async () => {
    try {
        const tasks = await ScheduledTasks.get();

        tasks.forEach(({ task_name, cron_schedule }) => {
            const predefinedTask = predefinedTasks.find((t) => t.id === task_name);

            if (!predefinedTask) {
                console.error(`Неизвестная задача: ${task_name}`);
                return;
            }

            if (predefinedTask.cronTask) {
                predefinedTask.cronTask.stop();
            }

            // Проверяем формат cron-расписания
            if (!cron.validate(cron_schedule)) {
                console.error(`Неверный cron-формат для задачи "${task_name}": ${cron_schedule}`);
                return;
            }

            // Создаём и запускаем cron-задачу
            predefinedTask.cronTask = cron.schedule(cron_schedule, predefinedTask.handler);
            activeCronTasks[task_name] = predefinedTask.cronTask;

            console.log(`Задача "${task_name}" запущена с расписанием "${cron_schedule}"`);
        });

        console.log('Все задачи из базы данных инициализированы');
    } catch (err) {
        console.error('Ошибка при инициализации задач из базы данных:', err.message);
    }
};

// Функция для обновления задачи
export const updateCronTask = async (task_name, scheduled_time) => {
    try {
        // Найти предопределённую задачу по имени
        const predefinedTask = predefinedTasks.find((t) => t.id === task_name);

        if (!predefinedTask) {
            throw new Error(`Неизвестная задача: ${task_name}`);
        }

        // Проверяем формат cron-расписания
        if (!cron.validate(scheduled_time)) {
            throw new Error(`Неверный cron-формат: ${scheduled_time}`);
        }

        // Останавливаем текущую задачу
        if (predefinedTask.cronTask) {
            predefinedTask.cronTask.stop();
        }

        // Обновляем cron-задачу с новым расписанием
        predefinedTask.cronTask = cron.schedule(scheduled_time, predefinedTask.handler);
        activeCronTasks[task_name] = predefinedTask.cronTask;

        console.log(`Задача "${task_name}" обновлена с новым расписанием: ${scheduled_time}`);
    } catch (err) {
        console.error('Ошибка при обновлении задачи:', err.message);
    }
};

// Запуск всех задач
export const startCronJobs = async () => {
    try {
        await initializeCronJobs();

        console.log('Все cron-задачи успешно запущены');
    } catch (err) {
        console.error('Ошибка при запуске cron-задач:', err.message);
    }
};
