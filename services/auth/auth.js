import bcrypt from 'bcryptjs';
import * as User from '#models/user.js';
import ERRORS from '#constants/errors.js';
import SUCCESSES from '#constants/successes.js';

export const validateLogin = async (login, password) => {
  const result = {
    isCorrect: false,
    message: '',
    user: null
  };

  login = login.trim();
  password = password.trim();

  // 1. is login and password exits
  if (!login || !password) {
    result.message = ERRORS.INVALID_CREDENTIALS;
    return result;
  }

  // finding user in db
  const user = await User.findByQuery({ login });

  // 2. if user is not found
  if(!user) {
    result.message = ERRORS.USER_NOT_FOUND;
    return result;
  };

  // 3. if password is incorrect
  const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
  if(!isPasswordCorrect) {
    result.message = ERRORS.INVALID_PASSWORD;
    return result;
  };

  // 4. if all correct
  result.isCorrect = true;
  result.message = SUCCESSES.USER_FOUND;
  result.user = user;

  return result;
};