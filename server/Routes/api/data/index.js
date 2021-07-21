/**
 * for all vaccine data related routes
 */

const router = require("express").Router();

const supportedVaccines = require("../../../Data/supportedVaccines");

/**
 * get list of all supported vaccines
 */
router.get("/vaccines", (req, res) => {
	res.status(200).json({
		status: "success",
		route: "/api/v1/data/vaccines",
		...supportedVaccines,
	});
});

/**
 * get info for a specific disease vaccine
 */
router.get("/vaccine/", (req, res) => {
	const disease = req.query.disease.toLocaleString();
	if (!disease) {
		return res.status(400).json({
			status: "error",
			error: "Missing query string",
		});
	}
	let result = [];
	supportedVaccines.supported.forEach((v) => {
		if (v.disease.toLowerCase() === disease.toLowerCase()) result.push(v);
	});
	// const vaccine = supportedVaccines.supported.filter((v) => {
	// 	console.log(v.disease.toLowerCase());
	// 	v.disease.toLowerCase() === disease.toLowerCase();
	// });
	res.status(200).json({
		status: "success",
		route: `/api/v1/data/vaccine?disease=${disease}`,
		result,
	});
});

module.exports = router;
