import bcrypt from 'bcryptjs';
import * as User from '#models/user.js';
import * as UserToken from "#models/user_token.js";
import generateTokens from '#utils/generateTokens.js';
import sha256 from 'js-sha256';


export const signup = async (req, res) => {
	try {
		let { login, password, confirm, gender } = req.body;

    // Trim whitespace from login, password, and confirm
    login = login.trim();
    password = password.trim();
    confirm = confirm.trim();

		const user = await User.isExist(login);

		// Should be in validate function (service)
		if (password !== confirm) {
			return res.status(400).send({ error: "Passwords don't match" });
		}
		if (user) {
			return res.status(400).send({ error: "Username or phone already exists" });
		}
		if (password.length < 6) {
			return res.status(400).send({ error: "Password must be at least 6 characters long" });
		}

		// HASH PASSWORD
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://gravatar.com/
    const address = String(login).trim().toLowerCase();
    const hash = sha256(address);
    const avatar = `https://www.gravatar.com/avatar/${hash}?d=wavatar`;

    const newUser = await User.create({
      login,
      password: hashedPassword,
      gender,
			avatar
    })

		if(newUser) {
			const { accessToken, refreshToken } = generateTokens(newUser.id);

      await UserToken.create({
        user_id: newUser.id,
        refresh_token: refreshToken,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true, // XSS
        sameSite: "strict", // CSRF
        secure: process.env.NODE_ENV === "production"
      });

			return res.status(201).send({
        message: "Successfully created",
        user: newUser,
        accessToken
      });
		} else {
			return res.status(400).send({ error: "Invalid user data" });
		}
	}	catch (err) {
		console.log("Error in post signup controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	};
};

export const login = async (req, res) => {
	try {
		let { login, password } = req.body;

    // Trim whitespace from login, password, and confirm
    login = login.trim();
    password = password.trim();

		const user = await User.findByQuery(login);
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user) return res.status(400).send({ error: "This user does not exist" });
		if(!isPasswordCorrect) return res.status(400).send({ error: "Invalid password" });

    // generate JWT TOKEN
    const { accessToken, refreshToken } = generateTokens(user.id);

    // save refreshToken in DB
    await UserToken.update(user.id, {
      refresh_token: refreshToken,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 дней
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      httpOnly: true, // Защищает от XSS атак
      sameSite: "strict", // Защита от CSRF атак
      secure: process.env.NODE_ENV === "production" // Только в производственной среде
    });

		res.status(200).send({ message: "Successfully login", user, accessToken });
	}	catch (err) {
		console.log("Error in login controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
    res.cookie("refreshToken", "", { maxAge: 0 })
    console.log('logout successfully')
		res.status(200).send({ status: "ok", message: "Successfully logout" });
	}	catch (err) {
		console.log("Error in logout controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
