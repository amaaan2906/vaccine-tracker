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
const userRoute = require("./Routes/api/user");
app.use("/api/v1/user", userRoute);
const dataRoute = require("./Routes/api/data");
app.use("/api/v1/data", dataRoute);

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
		// check all external connections
		// check if database is connected and working
	}, 1000 * 60 * 60 * 24);
});
