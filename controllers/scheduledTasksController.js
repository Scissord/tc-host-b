import * as ScheduledTasks from '#models/scheduled_tasks.js'
import * as cronTasks from '#services/cron/cron.js'

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
        const { id } = req.params;
		const data = req.body;

        updated_task = await ScheduledTasks.update(id, data)

        await cronTasks.updateCronTask(updated_task.task_name, updated_task.scheduled_time)

		res.status(200).send({ message: 'ok', updated_task });
	} catch (err) {
		console.log("Error in get ability controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};