import * as ScheduledTasks from '#models/scheduled_tasks.js'
import * as cronTasks from '#services/cron/cron.js'
import cronTime from '#utils/cronTime.js';

export const get = async (req, res) => {
	try {
		const tasks = await ScheduledTasks.get();

		res.status(200).send({ message: 'ok', tasks });
	} catch (err) {
		console.log("Error in get ScheduledTasks controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
	try {
		// чч:мм
	
        const { id } = req.query;
		const data = req.body;
        const updated_task = await ScheduledTasks.update(id, data)
		const time = cronTime(updated_task.send_time)
        await cronTasks.updateCronTask(updated_task.task_name, time)
		const new_data = {
			cron_schedule: time
		}
		const new_task = await ScheduledTasks.update(id, new_data)
		res.status(200).send({ message: 'ok', new_task });
	} catch (err) {
		console.log("Error in get tasks controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};