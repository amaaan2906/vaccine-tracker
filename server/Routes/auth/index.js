const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../Models/User");
const userRecord = require("../../Models/UserRecord");
const { loginValidation, registerValidation } = require("./dataValidator");
const verifyToken = require("./verifyToken");

router.get("/login", (req, res) => {
	res.status(200).json({
		route: "/auth/v1/login",
		method: "POST",
		body: "{ 'username', 'password' }",
		header: "",
	});
});
router.get("/register", (req, res) => {
	res.status(200).json({
		route: "/auth/v1/register",
		method: "POST",
		body: "{ 'name', 'username', 'password' }",
		header: "",
	});
});
router.get("/check-token", (req, res) => {
	res.status(200).json({
		route: "/auth/v1/check-token",
		method: "POST",
		body: "{}",
		header: "Authorization: <Access Token>",
	});
});
router.get("/refresh", (req, res) => {
	res.status(200).json({
		route: "/auth/v1/refresh",
		method: "POST",
		body: "{ refreshToken }",
	});
});

/**
 * Refresh user tokens
 *
 */
router.post("/refresh", (req, res) => {
	const { refreshToken } = req.body;
	if (!refreshToken) {
		res.status(400).json({
			status: "error",
			error: "Missing refresh token",
		});
	}
	const tokenData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
	const user = User.findById(tokenData.id);
	if (user) {
		const userInfo = JSON.parse(JSON.stringify(user));
		delete userInfo.password;
		delete userInfo._id;
		// create jwt access token
		const accessToken = jwt.sign(
			{ id: user._id, ...userInfo },
			process.env.ACCESS_SECRET
		);
		// send refresh and access token on login
		res.cookie("access", accessToken, { httpOnly: true });
		res.cookie("refresh", refreshToken, { httpOnly: true });
		return res
			.status(200)
			.json({ status: "success", userInfo, accessToken, refreshToken });
	}
});

/*
 * Check JWT POST route
 * req.header("Authorization") = JWT Access Token
 */
router.post("/check-token", verifyToken, (req, res) => {
	res.status(200).send({
		status: "success",
		message: "ACCESS token is valid",
	});
});

/*
 * Login POST route
 * 		1. validate request body
 * 		2. check for valid user id
 * 		3. validate user passwords
 * 		4. create JWT access token
 * req.body = { username, password }
 */
router.post("/login", async (req, res) => {
	// user data validation
	const validation = loginValidation(req.body);
	if (validation.error)
		return res.status(400).json({
			status: "error",
			error: validation.error.details[0],
		});
	// check if username exists
	const exists = await User.findOne({ username: req.body.username });
	if (!exists)
		return res.status(400).json({
			status: "error",
			error: "Invalid username",
		}); // invalid username error response
	// password check
	const validPwd = await bcrypt.compare(req.body.password, exists.password);
	if (!validPwd)
		return res.status(400).json({
			status: "error",
			error: "Invalid password",
		}); // invalid password error response
	const userInfo = JSON.parse(JSON.stringify(exists));
	delete userInfo.password;
	delete userInfo._id;
	// create jwt access token
	const accessToken = jwt.sign(
		{ id: exists._id, ...userInfo },
		process.env.ACCESS_SECRET
	);
	// create jwt refresh token
	const refreshToken = jwt.sign({ id: exists._id }, process.env.REFRESH_SECRET);
	// send refresh and access token on login
	res.cookie("access", accessToken, { httpOnly: true });
	res.cookie("refresh", refreshToken, { httpOnly: true });
	return res
		.status(200)
		.json({ status: "success", userInfo, accessToken, refreshToken });
});

/*
 * Register POST route
 * 		1. validate request body
 * 		2. check for existing user
 * 		3. create new user and user record
 * req.body = { name, username, password }
 */
router.post("/register", async (req, res) => {
	// user data validation
	const validation = registerValidation(req.body);
	if (validation.error)
		return res.status(400).json(validation.error.details[0]);
	// // check if email is available
	// let exists = await User.findOne({ email: req.body.email });
	// if (exists) {
	// 	res.status(400).json({
	// 		message: "duplicate email",
	// 	});
	// }
	// check if username is available
	exists = await User.findOne({ username: req.body.username });
	if (exists) {
		res.status(400).json({
			status: "error",
			error: "Duplicate username",
		});
	}
	// Hash password
	const hashedPwd = await bcrypt.hash(
		req.body.password,
		await bcrypt.genSalt(10)
	);
	// create user
	const nU = new User({
		name: req.body.name,
		username: req.body.username,
		password: hashedPwd,
	});
	try {
		const save = await nU.save();
		// create user record
		const uR = new userRecord({
			userId: save._id,
		});
		try {
			await uR.save();
		} catch (error) {
			res.status(500).json({
				status: "error",
				...error,
			});
		}
		res.status(201).json({
			status: "success",
			message: "new user and record created",
			data: { username: save.username },
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			...error,
		});
	}
});

module.exports = router;
