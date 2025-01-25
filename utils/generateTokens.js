import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const generateTokens = (userId, updated_at) => {
  const accessToken = jwt.sign(
    { userId},
    {updated_at},
    process.env.JWT_ACCESS_SECRET,
    {expiresIn: process.env.JWT_ACCESS_LIFE_TIME}
  );

  const refreshToken = jwt.sign(
    { userId, jti: uuidv4() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_LIFE_TIME}
  );

  return { accessToken, refreshToken };
};

export default generateTokens;
