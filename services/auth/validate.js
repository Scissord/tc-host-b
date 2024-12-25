import bcrypt from 'bcryptjs';
import * as User from '#models/user.js';
import * as Webmaster from '#models/webmaster.js'; 
import * as Operator from '#models/operator.js'; 
import ERRORS from '#constants/errors.js';
import SUCCESSES from '#constants/successes.js';

export const validateAuth = async (login, password, entity) => {
  const result = {
    isCorrect: false,
    message: '',
    user: null
  };

  login = login.trim();
  password = password.trim();

  // 1. Check if login and password exist
  if (!login || !password) {
    result.message = ERRORS.INVALID_CREDENTIALS;
    return result;
  };

  // 2. Find user in database
  const user = await User.findWhereActive({ login });

  // 3. If user is not found
  if(!user) {
    result.message = ERRORS.USER_NOT_FOUND;
    return result;
  };

  // 4. Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
  if(!isPasswordCorrect) {
    result.message = ERRORS.INVALID_PASSWORD;
    return result;
  };

  // 5. Check for role
  switch (entity) {
    case 'user': {
      const webmaster = await Webmaster.findWhereActive({ user_id: user.id });
      if (webmaster) {
        result.message = ERRORS.IS_WEBMASTER;
        return result;
      }
      const operator = await Operator.findWhereActive({ user_id: user.id });
      if (operator) {
        result.message = ERRORS.IS_OPERATOR;
        return result;
      }
      break;
    }
    case 'webmaster': {
      const webmaster = await Webmaster.findWhereActive({ user_id: user.id });
      if (!webmaster) {
        result.message = ERRORS.NOT_WEBMASTER;
        return result;
      }
      break;
    }
    case 'operator': {
      const operator = await Operator.findWhereActive({ user_id: user.id });
      if (!operator) {
        result.message = ERRORS.NOT_OPERATOR;
        return result;
      }
      break;
    }
    default:
      result.message = ERRORS.INVALID_ROLE;
      return result;
  }

  // 6. If all is correct
  result.isCorrect = true;
  result.message = SUCCESSES.USER_FOUND;
  result.user = user;

  // 7. Delete user password
  delete result.user.password;

  return result;
};