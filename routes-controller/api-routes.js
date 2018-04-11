

const request = require('request');
const cheerio = require("cheerio");
const mongoose = require("mongoose");

// Use mongojs to hook the database to the db variable
const db = require("./../models");

//exports the routes to the server file and passes in the express "app"
module.exports = function(app){


app.get("/scrape", function(req, res){
	
	let results =[];

	request("https://www.nytimes.com/", function(error, response, html) {

	  // Load the HTML into cheerio and save it to a variable
	  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
	  const $ = cheerio.load(html);
	  let count = 0
			$("h2.story-heading").each(function(i, element) {
				
			    const title = $(element).children().text().split("\n            ")[0]
			    const link = $(element).children().attr("href");
			    const description = $(element).parent().find("p.summary").text()
			     
			    // Save these results in an object that we'll push into the results array we defined earlier
			    if(count < 20){
				    if(title != null && title != "" && link && description){
				    	console.log(count)
					    results.push({
					      title: title,
					      link: link,
					      description: description
					    });
					    count++					   
					}
				}
			  });
			res.json(results)
		});
})
//for articles the user wants to save, this code will check to see if the article exists in the database.  If not it will create it.
app.post("/newArticle", function(req, res){
	savedArray = [];
	//checking to see if article they want to save exists in the DB
	db.Article.find({})
  	.then(function(dbArticle){
  		dbArticle.forEach(function(element){
  			savedArray.push(element.title);
  		})
  	}).then(function(){
  		if(!savedArray.includes(req.body.title)){
  			console.log(req.body)
  			db.Article.create(req.body)
				.then(function(dbArticle){
					res.send(true);
				})
				.catch(function(err){
					console.log(err)
				})
  		}else{
			res.send(false);
		}
    }).catch(function(error){
      console.log(error)
    })	
})

//will render all of the saved articles
app.get("/articlesdb", function(req, res) {
	console.log("svaed articles backend")
  db.Article.find({})
  .then(function(dbArticle){
      res.json(dbArticle);
    }).catch(function(error){
      console.log(error)
    })

  })
//will delete an article based off of its ID
app.delete("/deleteArticle", function(req, res){
	console.log("here")
	console.log(req.body);

	db.Article.findByIdAndRemove(req.body.id, function(error, result){
		if (error) return res.status(500).send(error);

		return res.send(true);
	})

})

//routes for the notes.....
//creates a new note for a specific article by id
app.post("/newNote/:id", function(req, res){
	db.Note.create(req.body)
		.then(function(dbNote){
			
			res.send(true);
			return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });

		})
		.catch(function(error){
	      console.log(error)
	    })
})
//deletes an individual note to a specific article by ID
app.delete("/deleteNote/:id", function(req, res){
	console.log("newNote")
	console.log(req.body)

	db.Note.findByIdAndRemove(req.params.id, function(error, result){
		if (error) return res.status(500).send(error);

		return res.send(true);
	})
})
//this get route will populate all the notes tied to a specific article, similar to a MYSql join
app.get("/allNotes/:id", function(req, res){
	console.log("rendering notes")
	db.Article.findOne({_id: req.params.id})
		.populate("notes")
		.then(function(dbArticle){
			if(dbArticle.notes.length == 0){
				res.send(false)
				console.log("false")
			}else{
				console.log(dbArticle.notes)
				res.json(dbArticle.notes)
			}
		})
		.catch(function(error){
	      console.log(error)
	    })
})








}