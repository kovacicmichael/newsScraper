var path = require("path");


module.exports = function(app){


app.get("/", function(req, res){

	console.log("index.html")
	res.sendFile('index.html', { root: path.join(__dirname, '../public') });
})

app.get("/savedArticles", function(req, res){
	console.log("html rendering")

	res.sendFile('article.html', { root: path.join(__dirname, '../public') });
})




}