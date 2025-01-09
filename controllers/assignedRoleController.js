import * as AssignedRole from '#models/assigned_role.js';
import * as User from '#models/user.js';
import ERRORS from '#constants/errors.js';

export const getByRole = async (req, res) => {
  try {
    const { role_id } = req.params;
    const assigned_roles = await AssignedRole.getUsers(role_id);

    res.status(200).send({ message: 'ok', assigned_roles });
  } catch (err) {
    console.log("Error in find assigned_role controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  try {
    const data = req.body;
    const exist_assigned_role = await AssignedRole.findWhere(data);
    if (exist_assigned_role) {
      return res.status(400).send({
        message: ERRORS.ROLE_EXIST,
      });
    };

    const exist_another_role = await AssignedRole.findWhere({
      entity_id: data.entity_id,
      entity_type: data.entity_type
    });

    if (exist_another_role) {
      await AssignedRole.hardDelete(exist_another_role.id);
    };

    const assigned_role = await AssignedRole.create(data);

    const user = await User.find(assigned_role.entity_id);
    if (user) {
      assigned_role.name = user.name;
    };


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
