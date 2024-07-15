const express = require("express");
const app = express();
const {
	getTopics,
	getArticleById,
	getArticles,
} = require("./controllers/topics.controllers");
const endpoints = require("../endpoints.json");

app.get("/api", (request, response) => {
	response.status(200).send({ endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.use((error, request, response, next) => {
	if (error.code === "22P02") {
		response.status(400).send({ msg: "Bad request" });
	}
	next(error);
});

app.use((error, request, response, next) => {
	if (error.status && error.msg) {
		response.status(error.status).send({ msg: error.msg });
	}
	next(error);
});

app.use((error, request, response, next) => {
	response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
