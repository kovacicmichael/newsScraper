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
	let thisID = $(this).attr("data-id");

	$('#noteModal').modal("show")
	$("#addNote").attr("data-id", $(this).attr("data-id"))
	$("#noteDelete").attr("data-id", $(this).attr("data-id"))

		$.ajax({
			url:"/allNotes/" + thisID,
			method:"GET"
		}).then(function(data){

				renderNotes(data);
		})
})


$('body').on("click", "#addNote", function(){

	let thisID = $(this).attr("data-id");
	console.log(thisID)


		$.ajax({
			url:"/newNote/" + thisID,
			method:"POST",
			data: {
		      body: $("#noteText").val(),
		    }
		}).then(function(data){

			if(data == true){
				//alert("Note saved!")
				$.getJSON("/allNotes/" + thisID, function(data){

				}).then(function(data){
					console.log("notes RERENDERED")
					renderNotes(data);
				})
				$("#noteText").val("")
				//$('#noteModal').modal("hide")
			}else{
				alert("Article was already saved!")
			}
		})
})

$('body').on("click", "#noteDelete", function(){
	let thisID = $(this).attr("data-id");
	let articleID = $(this).parent().parent().parent().parent().find(".modal-footer").find("#addNote").attr("data-id");
	console.log(articleID)

		$.ajax({
			url:"/deleteNote/" + thisID,
			method:"DELETE"
		}).then(function(data){
				// alert("Note deleted")
				$.getJSON("/allNotes/" + articleID, function(data){

				}).then(function(data){
					console.log("notes RERENDERED")
					renderNotes(data);
				})
				//$('#noteModal').modal("hide")
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
		articleDiv.append("<button id='modal' type='button' class='btn btn-primary note' data-id=" + data._id + " data-target='#exampleModal'>Article Notes</button>")

		$(".savedArticle-container").append(articleDiv)

		console.log("function complete")

	})
}

function renderNotes(data){
	$(".noteContainer").empty();
	if(data === false){
		console.log("no notes")
		var noteDiv = $("<div>");
		noteDiv.addClass("noNoteDiv well");
		noteDiv.append("<p>There are no notes to display</p>")

		$(".noteContainer").append(noteDiv)

	}else{
		data.forEach(function(data){

			var noteDiv = $("<div>");
			noteDiv.addClass("noteDiv well");
			noteDiv.append("<p>" + data.body + "</p>")
			noteDiv.append("<button class='delete' data-id=" + data._id + " id='noteDelete'>Delete</button>")

			$(".noteContainer").append(noteDiv)
			console.log("notes rendered")
		})
	}
}



