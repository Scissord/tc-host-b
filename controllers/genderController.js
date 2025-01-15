import * as Gender from '#models/gender.js';

export const get = async (req, res) => {
  try {
    const genders = await Gender.get();
    res.status(200).send({ message: 'ok', genders });
  } catch (err) {
    console.log("Error in get gender controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
