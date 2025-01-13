import ERRORS from "#constants/errors.js";

const checkDialer = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send({
      message: ERRORS.NO_ACCESS
    });
  };

  if (token === process.env.DIALER_API_KEY) {
    next();
  };
};

export default checkDialer;
