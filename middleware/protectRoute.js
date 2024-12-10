import jwt from 'jsonwebtoken';
import * as User from '#models/user.js';
import * as Role from '#models/role.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: "Unauthorized - No Token Provided" });

    const accessToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).send({
          error: "Unauthorized - No Refresh Token Provided"
        });
        try {
          const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

          const user = await User.find(decodedRefresh.userId);
          if (!user) return res.status(401).send({ error: "User not found" });

          const newAccessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_LIFE_TIME }
          );

          decoded = jwt.verify(newAccessToken, process.env.JWT_ACCESS_SECRET);

          return res.status(401).send({ accessToken: newAccessToken });
        } catch (refreshError) {
          return res.status(401).send({ error: "Unauthorized - Invalid Refresh Token" });
        }
      } else {
        return res.status(401).send({ error: "Unauthorized - Invalid Token" });
      }
    }

    const user = await User.find(decoded.userId);
    if (!user) return res.status(401).send({ error: "User not found" });

    const role = await Role.getForUser(user.role);
    user.role = role;

    req.user = user;

    next();
  } catch (err) {
    console.log("Error in protectRoute controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export default protectRoute;
