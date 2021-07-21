const router = require("express").Router();

const verifyToken = require("../auth/verifyToken");
const supportedVaccines = require("../../Data/supportedVaccines");

/**
 * get list of all supported vaccines
 */
router.get("/vaccines", (req, res) => {
	res.status(200).json({
		status: "success",
		route: "/api/v1/vaccines",
		...supportedVaccines,
	});
});

/**
 * get logged in user vaccine records
 */
router.get("/records", verifyToken, (req, res) => {});

/**
 * Update specific vaccine shot info
 */
router.put("/", verifyToken, (req, res) => {});

/**
 * delete specific vaccine record
 */
router.delete("/vaccine", verifyToken, (req, res) => {});

module.exports = router;
