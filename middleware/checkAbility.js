import { can } from '#services/ability/user.js';
import ERRORS from '#constants/errors.js';

const checkAbility = async (req, res, next, extraData) => {
  const is_available = await can(req.user.id, extraData.ability_name)

  if (is_available) {
    next();
  } else {
    return res.status(403).send({
      message: ERRORS.USER_CANT
    });
  };
};

export default checkAbility;