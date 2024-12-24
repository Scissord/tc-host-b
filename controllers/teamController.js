import * as Team from '#models/team.js';
import * as Operator from '#models/operator.js';

export const getByDepartment = async (req, res) => {
	try {
    const { department_id } = req.params;
    const teams = await Team.get(department_id);

		res.status(200).send({ message: 'ok', teams });
	}	catch (err) {
		console.log("Error in get team controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const getByTeam = async (req, res) => {
	try {
    const { team_id } = req.params;
    const team = await Team.find(team_id);
    const operators = await Operator.getWhere({ team_id });

		res.status(200).send({ 
      message: 'ok', 
      team, 
      operators,
    });
	}	catch (err) {
		console.log("Error in get team controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {
    const data = req.body;
    const team = await Team.create(data);

    return res.status(200).send({ message: 'ok', team });
  }	catch (err) {
    console.log("Error in create team controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const { team_id } = req.params;
    const data = req.body;
    const team = await Team.update(team_id, data);

    res.status(200).send({ message: 'ok', team });
  }	catch (err) {
    console.log("Error in update team controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const softDelete = async (req, res) => {
  try {
    const { team_id } = req.params;
    const team = await Team.softDelete(team_id);

    res.status(200).send({ message: 'ok', team });
  }	catch (err) {
    console.log("Error in softDelete team controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

