const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
mongoose.connect(
	process.env.MONGO_DEV,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log(`<< ${new Date().toUTCString()} >> Database connected`);
	}
);

app.use(express.json());
app.use(cookieParser());

const authRoute = require("./Routes/auth");
app.use("/auth/v1/", authRoute);
const apiRoute = require("./Routes/api");
app.use("/api/v1/", apiRoute);

app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "Hello World! 👋",
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`<< ${new Date().toUTCString()} >> Server Boot ${PORT}`);
	setInterval(() => {
		console.log(`<< ${new Date().toUTCString()} >> Running daily checks`);
	}, 1000 * 60 * 60 * 24);
});
