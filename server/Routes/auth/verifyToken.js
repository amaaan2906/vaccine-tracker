const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	// get access token from request header
	const token = req.header("Authorization");
	if (!token) {
		// NO token = unauthorized access
		res.status(401).json({
			status: "error",
			error: "Invalid/missing token",
		});
	} else {
		try {
			const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);
			// verified token is saved in request body for the server
			req.user = tokenData;
			next();
		} catch (error) {
			// token is invalid or expired
			res.status(401).json({
				status: "error",
				...error,
			});
		}
	}
};
