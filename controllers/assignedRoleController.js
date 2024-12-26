import * as AssignedRole from '#models/assigned_role.js';

export const getByRole = async (req, res) => {
  try {
    const { role_id } = req.params;
    const assigned_roles = await AssignedRole.getWhere({ role_id });

    res.status(200).send({ message: 'ok', assigned_roles });
  } catch (err) {
    console.log("Error in find assigned_role controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  try {
    const data = req.body;
    const assigned_role = await AssignedRole.create(data);

    return res.status(200).send({ message: 'ok', assigned_role });
  } catch (err) {
    console.log("Error in create assigned_role controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { assigned_role_id } = req.params;
    const assigned_role = await AssignedRole.hardDelete(assigned_role_id);

    res.status(200).send({ message: 'ok', assigned_role });
  } catch (err) {
    console.log("Error in softDelete assigned_role controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
