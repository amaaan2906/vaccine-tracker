const mongoose = require("mongoose");

const recordModel = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	vaccines: {
		type: Array,
		required: true,
	},
});

module.exports = mongoose.model("userRecord", recordModel);
