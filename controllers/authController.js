import jwt from 'jsonwebtoken';
import * as User from "#models/user.js";
import * as UserToken from "#models/user_token.js";
import { validateAuth } from "#services/auth/validate.js";
import { getUserInfo, getUserAssignedRole, getUserAbilitiesId } from "#services/ability/user.js";
import generateTokens from "#utils/generateTokens.js";
import ERRORS from "#constants/errors.js";
// import sha256 from 'js-sha256';

// export const signup = async (req, res) => {
// 	try {
// 		let { login, password, confirm, gender } = req.body;

//     login = login.trim();
//     password = password.trim();
//     confirm = confirm.trim();

// 		const user = await User.findWhere({ login });

// 		if (password !== confirm) {
// 			return res.status(400).send({ error: "Passwords don't match" });
// 		}
// 		if (user) {
// 			return res.status(400).send({ error: "Username or phone already exists" });
// 		}
// 		if (password.length < 6) {
// 			return res.status(400).send({ error: "Password must be at least 6 characters long" });
// 		}

// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);

// 		// https://gravatar.com/
//     const address = String(login).trim().toLowerCase();
//     const hash = sha256(address);
//     const avatar = `https://www.gravatar.com/avatar/${hash}?d=wavatar`;

//     const newUser = await User.create({
//       login,
//       password: hashedPassword,
//       gender,
// 			avatar
//     })

// 		if(newUser) {
// 			const { accessToken, refreshToken } = generateTokens(newUser.id);

//       await UserToken.create({
//         user_id: newUser.id,
//         refresh_token: refreshToken,
//         expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//       });

//       res.cookie("refreshToken", refreshToken, {
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         httpOnly: true, // XSS
//         sameSite: "strict", // CSRF
//         secure: process.env.NODE_ENV === "production"
//       });

// 			return res.status(201).send({
//         message: "Successfully created",
//         user: newUser,
//         accessToken
//       });
// 		} else {
// 			return res.status(400).send({ error: "Invalid user data" });
// 		}
// 	}	catch (err) {
// 		console.log("Error in post signup controller", err.message);
// 		res.status(500).send({ error: "Internal Server Error" });
// 	};
// };

export const signin = async (req, res) => {
	try {
		let { login, password, entity } = req.body;

    // 1. validation
    const result = await validateAuth(login, password, entity);
    if(!result.isCorrect) return res.status(400).send({ message: result.message });

    let user = null;
    // 2. edit user by role
    switch(entity) {
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
    await UserToken.updateWhere({ user_id: user.id }, {
      refresh_token: refreshToken,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 дней
    });

    // 5. send cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      httpOnly: true, // Защищает от XSS атак
      sameSite: "strict", // Защита от CSRF атак
      secure: process.env.NODE_ENV === "production" // Только в производственной среде
    });

		res.status(200).send({ message: "ok", user, accessToken });
	}	catch (err) {
		console.log("Error in login auth controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const logout = async (req, res) => {
	try {
    res.cookie("refreshToken", "", { maxAge: 0 })
    console.log('logout successfully')
		res.status(200).send({ message: "ok" });
	}	catch (err) {
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
    } catch(err) {
      // session expired
      res.status(401).send({
        message: ERRORS.SESSION_EXPIRED
      });
    }
	}	catch (err) {
		console.log("Error in refresh auth controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
