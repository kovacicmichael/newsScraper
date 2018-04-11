//js file for the article html page
//on page load it will pull all saved articles from the database
$(document).ready(function(){

	$.getJSON("/articlesdb", function(data){
	}).then(function(data){

		renderSavedArticles(data);
	})
})
//sets the modal default to show manually
$('#noteModal').modal({ show: false});
//deletes a saved article
$('body').on("click", "#delete", function(){
	$.ajax({
		url:"/deleteArticle",
		method:"DELETE",
		data: {
			id: $(this).parent().attr("data-id"),
		   }
	}).then(function(data){
		if(data){
			//after it is deleted it will reload the div container to reflect the new DB
			$.getJSON("/articlesdb", function(data){

			}).then(function(data){
					renderSavedArticles(data);
			});
		}else{
			alert("Ooops, something went wrong..")
		};
	});
});

//this will open the modal to show the notes for each article
$('body').on("click", "#modal", function(){
	let thisID = $(this).attr("data-id");

	$('#noteModal').modal("show");
	$("#addNote").attr("data-id", $(this).attr("data-id"));
	$("#noteDelete").attr("data-id", $(this).attr("data-id"));
		$.ajax({
			url:"/allNotes/" + thisID,
			method:"GET"
		}).then(function(data){

				renderNotes(data);
		});
});

//creates a new note for the specified article
$('body').on("click", "#addNote", function(){
	let thisID = $(this).attr("data-id");
		$.ajax({
			url:"/newNote/" + thisID,
			method:"POST",
			data: {
		      body: $("#noteText").val(),
		    }
		}).then(function(data){

			if(data){
				//will reload the DB with the newly added note
				$.getJSON("/allNotes/" + thisID, function(data){

				}).then(function(data){
					console.log("notes RERENDERED")
					renderNotes(data);
				});
				$("#noteText").val("")
			}else{
				alert("Article was already saved!")
			};
		});
});

$('body').on("click", "#noteDelete", function(){
	let thisID = $(this).attr("data-id");
	let articleID = $(this).parent().parent().parent().parent().find(".modal-footer").find("#addNote").attr("data-id");
		$.ajax({
			url:"/deleteNote/" + thisID,
			method:"DELETE"
		}).then(function(data){
			//recalls the DB after the delete
			$.getJSON("/allNotes/" + articleID, function(data){

			}).then(function(data){
				renderNotes(data);
			});
				//$('#noteModal').modal("hide")
		});
});


//displays all of the saved articles
function renderSavedArticles(data){

	$(".savedArticle-container").empty();
	console.log(data)
	//creates new div for each article
	if(data.length == 0){
		var articleDiv = $("<div>");
		articleDiv.addClass("well");
		articleDiv.addClass("articleDivEmpty");
		articleDiv.append("<p>There are no saved articles to display</p>");

		$(".savedArticle-container").append(articleDiv);
	}else{
		data.forEach(function(data){

			var articleDiv = $("<div>");
			articleDiv.addClass("well");
			articleDiv.addClass("articleDiv");
			articleDiv.attr("data-id", data._id);
			articleDiv.append("<a href=" + data.link + " target='_blank' id=title>" + data.title + "</a>");
			if(data.description != ""){
				articleDiv.append("<p id=description>" + data.description + "</p>");
			}
			articleDiv.append("<button class='btn btn-primary delete' id='delete'>Delete From Saved</button>");
			articleDiv.append("<button id='modal' type='button' class='btn btn-primary note' data-id=" + data._id + " data-target='#exampleModal'>Article Notes</button>");

			$(".savedArticle-container").append(articleDiv);
		});
	};
};
//displays notes in modal
function renderNotes(data){
	$(".noteContainer").empty();
	if(data === false){
		var noteDiv = $("<div>");
		noteDiv.addClass("noNoteDiv well");
		noteDiv.append("<p>There are no notes to display</p>");

		$(".noteContainer").append(noteDiv);
	}else{
		data.forEach(function(data){
			var noteDiv = $("<div>");
			noteDiv.addClass("noteDiv well");
			noteDiv.append("<p>" + data.body + "</p>");
			noteDiv.append("<button class='delete' data-id=" + data._id + " id='noteDelete'>Delete</button>");

			$(".noteContainer").append(noteDiv);
		});
	};
};



