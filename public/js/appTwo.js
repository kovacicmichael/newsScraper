$(document).ready(function(){

			console.log("here")

	$.getJSON("/articlesdb", function(data){

	}).then(function(data){
		renderSavedArticles(data);
	})
})



function renderSavedArticles(data){

	console.log("here saved Article")

	$(".savedArticle-container").empty();

	data.forEach(function(data){

		var articleDiv = $("<div>");
		articleDiv.addClass("well");
		articleDiv.addClass("articleDiv")
		articleDiv.append("<a href=" + data.link + " target='_blank' id=title>" + data.title + "</a>");
		if(data.description != ""){
			articleDiv.append("<p id=description>" + data.description + "</p>");
		}
		articleDiv.append("<button id=delete>Delete From Saved</button>")
		articleDiv.append("<button id=note>Article Notes</button>")

		$(".savedArticle-container").append(articleDiv)

		console.log("function complete")

	})



}