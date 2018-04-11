var path = require("path");

//exports routes and passes in the express 'app'
module.exports = function(app){

//renders index.html
app.get("/", function(req, res){
	res.sendFile('index.html', { root: path.join(__dirname, '../public') });
})
//renders article.html
app.get("/savedArticles", function(req, res){
	res.sendFile('article.html', { root: path.join(__dirname, '../public') });
})



}