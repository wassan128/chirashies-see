"use strict";

const express = require("express");
const app = express();
const http = require("http").Server(app);
const kuromoji = require("kuromoji");
const kuro = kuromoji.builder({
	dicPath: "node_modules/kuromoji/dict"
});

const words = [];
const collect_words = (target) => {
	kuro.build((err, tokenizer) => {
		if (err) throw err;
		
		const tokens = tokenizer.tokenize(target);
		for (const token of tokens) {
			words.push(token["surface_form"]);
		}
	});
};

app.get("/", (req, res) => {
	collect_words("これはテストの文章です");
	res.send("index");
});

http.listen(process.env.PORT || 3000, () => {
	console.log("listen on *:3000");
});

