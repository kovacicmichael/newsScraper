$(document).ready(function(){

			console.log("here")

	$.getJSON("/articlesdb", function(data){

	}).then(function(data){
		renderSavedArticles(data);
	})

	
})

$('#noteModal').modal({ show: false})

$('body').on("click", "#delete", function(){
	console.log("delete")
	$.ajax({
			url:"/deleteArticle",
			method:"DELETE",
			data: {
				id: $(this).parent().attr("data-id"),
		      	title: $(this).parent().find("a").text(),
		      	link: $(this).parent().find("a").attr("href"),
		      	description: $(this).parent().find("p").text()
		    }
		}).then(function(data){

			if(data == true){
				alert("Article deleted")
				$.getJSON("/articlesdb", function(data){

				}).then(function(data){
					renderSavedArticles(data);
				})
			}else{
				alert("Ooops, something went wrong..")
			}
		})


})


$('body').on("click", "#modal", function(){

	$('#noteModal').modal("show")
})


$('body').on("click", "#addNote", function(){

	$.ajax({
			url:"/newNote",
			method:"POST",
			data: {
		      noteInfo: $("#noteText").val()
		    }
		}).then(function(data){

			if(data == true){
				alert("Note saved!")
			}else{
				alert("Article was already saved!")
			}
		})

})





function renderSavedArticles(data){

	console.log("here saved Article")

	$(".savedArticle-container").empty();

	data.forEach(function(data){

		var articleDiv = $("<div>");
		articleDiv.addClass("well");
		articleDiv.addClass("articleDiv");
		articleDiv.attr("data-id", data._id);
		articleDiv.append("<a href=" + data.link + " target='_blank' id=title>" + data.title + "</a>");
		if(data.description != ""){
			articleDiv.append("<p id=description>" + data.description + "</p>");
		}
		articleDiv.append("<button class='btn btn-primary delete' id='delete'>Delete From Saved</button>")
		articleDiv.append("<button id='modal' type='button' class='btn btn-primary note' data-target='#exampleModal'>Article Notes</button>")

		$(".savedArticle-container").append(articleDiv)

		console.log("function complete")

	})



}