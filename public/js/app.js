

	$(document).ready(function(){

			console.log("here")

			$.getJSON("/scrape", function(data){

				}).then(function(data){
				console.log(data);
				renderArticles(data);
			})
	})


// if (window.location.pathname === 'http://localhost:3000/savedArticles') {



// }


	$("#scrape").on("click", function(){

		$(".article-container").empty();
		console.log("here")

		$.getJSON("/scrape", function(data){
				//renderArticles(data);

			}).then(function(data){
			console.log(data);
			renderArticles(data);
		})

	})

	$("#home").on("click", function(){

		$(".article-container").empty();
		console.log("here")

		$.getJSON("/scrape", function(data){
				//renderArticles(data);

			}).then(function(data){
			console.log(data);
			renderArticles(data);
		})

	})

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

			if(data == true){
				alert("Article saved!")
			}else{
				alert("Article was already saved!")
			}
		})
	})


function renderArticles(data){

	console.log("here Json")

	$(".article-container").empty();

	for(var i = 0; i < data.length; i++){

		var articleDiv = $("<div>");
		articleDiv.addClass("well");
		articleDiv.addClass("articleDiv")
		articleDiv.append("<a href=" + data[i].link + " target='_blank' id=title>" + data[i].title + "</a>");
		if(data[i].description != ""){
			articleDiv.append("<p id=description>" + data[i].description + "</p>");
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



