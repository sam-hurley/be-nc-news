const express = require("express");
const app = express();
const {
	getTopics,
	getArticleById,
	getArticles,
	getCommentsByArticleId,
	postNewComment,
} = require("./controllers/topics.controllers");
const endpoints = require("../endpoints.json");

app.use(express.json());

app.get("/api", (request, response) => {
	response.status(200).send({ endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postNewComment);

//400 (SQL) errors
app.use((error, request, response, next) => {
	if (error.code === "22P02" || error.code === "23502") {
		response.status(400).send({ msg: "Bad request" });
	}
	next(error);
});

//custom 404 errors
app.use((error, request, response, next) => {
	if (error.status && error.msg) {
		response.status(error.status).send({ msg: error.msg });
	}
	next(error);
});

//500 error
app.use((error, request, response) => {
	response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
