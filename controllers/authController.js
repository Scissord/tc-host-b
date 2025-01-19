import jwt from 'jsonwebtoken';
import requestIp from 'request-ip';
import * as User from "#models/user.js";
import * as UserToken from "#models/user_token.js";
import { validateAuth } from "#services/auth/validate.js";
import { getUserInfo, getUserAssignedRole, getUserAbilitiesId } from "#services/ability/user.js";
import generateTokens from "#utils/generateTokens.js";
import ERRORS from "#constants/errors.js";

export const signin = async (req, res) => {
  try {
    let { login, password, entity } = req.body;

    const ip = requestIp.getClientIp(req);
    console.log(ip);

    // 1. validation
    const result = await validateAuth(login, password, entity);
    if (!result.isCorrect) return res.status(400).send({ message: result.message });

    let user = null;
    // 2. edit user by role
    switch (entity) {
      case 'user':
        user = await getUserInfo(result.user);
        break;
      case 'webmaster':
        user = await User.findWebmaster(result.user.id);
        const webmaster_assigned_role = await getUserAssignedRole(user.id);

        user.abilities = webmaster_assigned_role
          ? await getUserAbilitiesId(user.id)
          : [];

        break;
      case 'operator':
        user = await User.findOperator(result.user.id);
        const operator_assigned_role = await getUserAssignedRole(user.id);

        user.abilities = operator_assigned_role
          ? await getUserAbilitiesId(user.id)
          : [];

        break;
    };

    // 3. generate JWT TOKEN
    const { accessToken, refreshToken } = generateTokens(user.id);

    // 4. save refreshToken in DB
    const user_token = await UserToken.findWhere({ user_id: user.id });
    if (user_token) {
      await UserToken.updateWhere({ user_id: user.id }, {
        refresh_token: refreshToken,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 дней
      });
    } else {
      await UserToken.create({
        user_id: user.id,
        refresh_token: refreshToken,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 дней
      });
    };

    // 5. send cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      httpOnly: true, // Защищает от XSS атак
      sameSite: "strict", // Защита от CSRF атак
      secure: process.env.NODE_ENV === "production" // Только в производственной среде
    });

    res.status(200).send({ message: "ok", user, accessToken });
  } catch (err) {
    console.log("Error in login auth controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("refreshToken", "", { maxAge: 0 })
    console.log('logout successfully')
    res.status(200).send({ message: "ok" });
  } catch (err) {
    console.log("Error in logout auth controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const refresh = async (req, res) => {
  try {
    // 1. check for refreshToken
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).send({
      message: ERRORS.NO_REFRESH
    });

    // 2. Try to decode refreshToken
    try {
      const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // 3. Check if user exist
      const user = await User.find(decodedRefresh.userId);
      if (!user) return res.status(401).send({
        message: ERRORS.USER_NOT_FOUND
      });

      // 4. if user exist and we get decodedRefresh, we generate JWT TOKEN
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      } = generateTokens(user.id);

      // 5. save refreshToken in DB
      await UserToken.updateWhere({ user_id: user.id }, {
        refresh_token: newRefreshToken,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 дней
      });

      // 6. send cookie
      res.cookie("refreshToken", newRefreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
        httpOnly: true, // Защищает от XSS атак
        sameSite: "strict", // Защита от CSRF атак
        secure: process.env.NODE_ENV === "production" // Только в производственной среде
      });

      res.status(200).send({
        message: "ok",
        newAccessToken
      });
    } catch (err) {
      // session expired
      res.status(401).send({
        message: ERRORS.SESSION_EXPIRED
      });
    }
  } catch (err) {
    console.log("Error in refresh auth controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
