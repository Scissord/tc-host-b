import * as Webmaster from '#models/webmaster.js';
import * as Operator from '#models/operator.js';
import ERRORS from '#constants/errors.js';

const checkEntity = async (req, res, next, extraData) => {
  if(extraData.entity === 'webmaster') {
    const webmaster = await Webmaster.findWhere({ user_id: req.user.id });
    if(!webmaster) {
      return res.status(400).send({ 
        message: ERRORS.NOT_WEBMASTER 
      });
    };
    req.webmaster = webmaster;
  };
  if(extraData.entity === 'operator') {
    const operator = await Operator.findWhere({ user_id: req.user.id });
    if(!operator) {
      return res.status(400).send({ 
        message: ERRORS.NOT_OPERATOR 
      });
    };
    req.operator = operator;
  };
  next();
};

export default checkEntity;
