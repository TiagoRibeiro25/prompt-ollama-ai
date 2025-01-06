const axios = require("axios");
const constants = require("./constants");

module.exports = {
	/**
	 * Communicate with the AI model
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	generate: async (req, res) => {
		// Check if the request body only has the "prompt" field and it is a string
		if (!req.body.prompt || typeof req.body.prompt !== "string") {
			res.status(400).json({ message: "Bad Request" });
			return;
		}

		let response;

		// Send the prompt to the AI model and get the response
		try {
			response = await axios.post(constants.OLLAMA_API_URL, {
				prompt: req.body.prompt,
				model: constants.MODEL_NAME,
			});
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}

		let data = "";

		// ! Improve this; bad for performance (parsing each word/line)
		for (const line of response.data.split("\n")) {
			try {
				const lineData = JSON.parse(line);
				if (!lineData.done) {
					data += lineData.response;
				}
			} catch (_error) {
				break;
			}
		}

		res.status(200).json({ message: data });
	},
};
