
$(document).ready(function(){


	$(".article-container").empty();

		console.log("here")

		$.getJSON("/scrape", function(data){
				//renderArticles(data);

			}).then(function(data){
			console.log(data);
			renderArticles(data);
		})


	$("#scrape").on("click", function(){

		$(".article-container").empty();
		console.log("here")

		$.getJSON("/scrape", function(data){
				//renderArticles(data);

			}).then(function(data){
			console.log(data);
			renderArticles(data);
		})
		// $.ajax({
		//   dataType: "json",
		//   url: "/scrape",
		//   data: data,
		//   success: success
		// }).then(function(data){
		// 	console.log(data);
		// 	renderArticles(data);
		// })

	})
})







function renderArticles(data){

	console.log("here Json")

			for(var i = 0; i < data.length; i++){

				var articleDiv = $("<div>");
				articleDiv.addClass("well");
				articleDiv.addClass("articleDiv")
				articleDiv.append("<a href=" + data[i].link + " target='_blank'>" + data[i].title + "</a>");
				if(data[i].description != ""){
					articleDiv.append("<p>" + data[i].description + "</p>");
				}
				articleDiv.append("<button id=save>Save Article</button>")

				$(".article-container").append(articleDiv)

				}
				console.log("function complete")
}




// $.getJSON("/all", function(data) {
//   // Call our function to generate a table body
//   displayResults(data);
// });



