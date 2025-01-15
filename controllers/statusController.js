import * as Status from '#models/status.js';

export const get = async (req, res) => {
  try {
    const statuses = await Status.get();

    res.status(200).send({ message: 'ok', statuses });
  } catch (err) {
    console.log("Error in get status controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  try {
    const data = req.body;
    const status = await Status.create(data);

    return res.status(200).send({ message: 'ok', status });
  } catch (err) {
    console.log("Error in create status controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const { status_id } = req.params;
    const data = req.body;
    const status = Status.update(status_id, data);

    res.status(200).send({ message: 'ok', status });
  } catch (err) {
    console.log("Error in update status controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const softDelete = async (req, res) => {
  try {
    const { status_id } = req.params;
    const status = await Status.softDelete(status_id);

    res.status(200).send({ message: 'ok', status });
  } catch (err) {
    console.log("Error in softDelete status controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
