/**
 * for all user related actions
 * require auth for all routes
 */
const router = require("express").Router();

const verifyToken = require("../../auth/verifyToken");

/**
 * get logged in user vaccine records
 */
router.get("/record", verifyToken, (req, res) => {});

/**
 * Update specific vaccine shot info
 */
router.put("/vaccine", verifyToken, (req, res) => {});

/**
 * delete specific vaccine record
 */
router.delete("/vaccine", verifyToken, (req, res) => {});

module.exports = router;
