
//when the document opens it will scrape the articles from the NY Times
$(document).ready(function(){

	$.getJSON("/scrape", function(data){
	}).then(function(data){
		//function to render data on page
		renderArticles(data);
	})
})

//the 'scrape new articles' button
$("#scrape").on("click", function(){
	$(".article-container").empty();

	$.getJSON("/scrape", function(data){
	}).then(function(data){
		
		renderArticles(data);
	})

})
//the 'home' button
$("#home").on("click", function(){
	$(".article-container").empty();

	$.getJSON("/scrape", function(data){
	}).then(function(data){
	
		renderArticles(data);
	})
})
//the 'save article' button
$('body').on("click", "#save", function(){
	$.ajax({
		url:"/newArticle",
		method:"POST",
		data: {
		     title: $(this).parent().find("a").text(),
		     link: $(this).parent().find("a").attr("href"),
		     description: $(this).parent().find("p").text()
		   }
	}).then(function(data){
		if(data){
			alert("Article saved!")
		}else{
			alert("Article was already saved!")
		}
	})
})
//renders data onto the page into the article container
function renderArticles(data){

	//creates a new div for each article scraped
	for(let i = 0; i < data.length; i++){
		var articleDiv = $("<div>");
		articleDiv.addClass("well");
		articleDiv.addClass("articleDiv");
		articleDiv.append("<a href=" + data[i].link + " target='_blank' id=title>" + data[i].title + "</a>");
		if(data[i].description != ""){
			articleDiv.append("<p id=description>" + data[i].description + "</p>");
		};
		articleDiv.append("<button id=save>Save Article</button>");

		$(".article-container").append(articleDiv);
	};
};










