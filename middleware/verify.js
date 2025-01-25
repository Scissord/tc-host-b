import jwt from 'jsonwebtoken';
import * as User from '#models/user.js';
import * as Webmaster from '#models/webmaster.js';
import * as Operator from '#models/operator.js';
import ERRORS from '#constants/errors.js';

const verify = async (req, res, next) => {
  // 401 - refresh access and refresh tokens, or throw away user from app
  try {
    // 1. Make sure you have accessToken;
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({
      message: ERRORS.NO_ACCESS
    });

    // 2. Delete Bearer
    const accessToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    // 3. Try to decode token
    let decoded;
    try {
      // 4. If ok continue;
      decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      // 5. Else mean accessToken is expired
      if (err.name === ERRORS.TOKEN_EXPIRED) {

        // 6. Taking refreshToken from cookies
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).send({
          message: ERRORS.NO_REFRESH
        });

        try {
          // 7. Try to decode refreshToken
          const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

          // 8. Check if user exist
          const user = await User.find(decodedRefresh.userId);
          if (!user) return res.status(401).send({
            message: ERRORS.USER_NOT_FOUND
          });

          // 9. refreshToken is valid, but need new accessToken
          return res.status(401).send({
            message: ERRORS.INVALID_ACCESS
          });
        } catch (refreshError) {
          // 10. If refreshToken invalid too
          return res.status(401).send({
            message: ERRORS.INVALID_REFRESH
          });
        };
      } else {
        // 11. If token is not expired, but other error
        return res.status(401).send({
          message: ERRORS.INVALID_ACCESS
        });
      };
    };

    // if (!decoded.updated_at) return res.status(401).send({
    //   message: ERRORS.NEED_TO_RELOGIN
    // });

  
    const user = await User.find(decoded.userId);

    if (decoded.updated_at) {
      const userLastUpdated = new Date(decoded.updated_at).getTime(); 
      const user_update = new Date(user.updated_at).getTime(); 
      console.log(`сравниваются updated_at ${user_update} ${userLastUpdated}`)
      if (userLastUpdated < user_update) {
        return res.status(401).send({
          message: ERRORS.INVALID_UPDATED_AT 
        });
      }
    }
    
    if (!user) return res.status(401).send({
      message: ERRORS.USER_NOT_FOUND
    });

    req.user = user;

    const webmaster = await Webmaster.findWhere({ user_id: user.id });
    if (webmaster) {
      req.webmaster = webmaster;
    };
    const operator = await Operator.findWhere({ user_id: user.id });
    if (operator) {
      req.operator = operator;
    };
    next();
  } catch (err) {
    console.log("Error in verify middleware", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export default verify;
