if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const constants = require("./constants");
const handlers = require("./handlers");

const app = express();

app.use(express.json({ limit: "15mb" }));
app.use(cors());

app.post("/api/generate", handlers.generate);

app.listen(constants.PORT, () => {
	console.log(`Server is running on port ${constants.PORT}`);
});
