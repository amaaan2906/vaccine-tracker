const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../Models/User')
const { loginValidation, registerValidation } = require('./dataValidator')


router.get("/login", (req, res) => {
  
})
router.get("/register", (req, res) => {
  
})
/**
 * req.body = {
 *              userName,
 *              password
 *            }
 */
router.post('/login', async (req, res) => {
  // user data validation
  const validation = loginValidation(req.body);
  if (validation.error)
    return res.status(400).json({
      status: 'error',
      error: validation.error.details[0]
    });
  // check if username exists
  const exists = await User.findOne({ username: req.body.username });
  if (!exists) return res.status(400).json({
    status: "error",
    error: "Invalid username!"
  }); // invalid username error response
  // password check
  const validPwd = await bcrypt.compare(req.body.password, exists.password);
  if (!validPwd) return res.status(400).json({
    status: "error", 
    error: "Invalid password"
  }); // invalid password error response
  // duplicate user
  const userInfo = JSON.parse(JSON.stringify(exists));
  delete userInfo.password;
  // create jwt access token
  const accessToken = jwt.sign(
    { id: exists._id },
    process.env.ACCESS_SECRET,
    { expiresIn: 60 } // 1 min
  );
  // create jwt refresh token
  const refreshToken = jwt.sign({ id: exists._id }, process.env.REFRESH_SECRET);
  // send refresh and access token on login
  res.cookie("refresh", refreshToken, { httpOnly: true });
  return res.status(200).json({ userInfo, accessToken, refreshToken });
})

router.post('/register', async (req, res) => {
  // user data validation
	const validation = registerValidation(req.body);
	if (validation.error)
		return res.status(400).json(validation.error.details[0]);
	// check if email is available
	let exists = await User.findOne({ email: req.body.email });
	if (exists) {
		res.status(400).json({
			message: "duplicate email",
		});
	}
	// check if username is available
	exists = await User.findOne({ username: req.body.username });
	if (exists) {
		res.status(400).json({
			message: "duplicate username",
		});
	}
	// Hash password
	const hashedPwd = await bcrypt.hash(
		req.body.password,
		await bcrypt.genSalt(10)
	);
	// Save user in db
	const nU = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: hashedPwd,
	});
	try {
		const save = await nU.save();
		res.status(200).json({ id: save._id, username: save.username });
	} catch (error) {
		res.status(500).json(error);
	}
})

module.exports = router