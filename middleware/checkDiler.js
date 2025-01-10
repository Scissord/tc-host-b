import ERRORS from "#constants/errors.js";

const checkDiler = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send({
      message: ERRORS.NO_ACCESS
    });
  };

  if (token === process.env.DILER_API_KEY) {
    next();
  };
};

export default checkDiler;
