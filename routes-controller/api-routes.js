
var request = require('request');
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// Use mongojs to hook the database to the db variable
var db = require("./../models");

module.exports = function(app){


app.get("/scrape", function(req, res){
	
	var results =[];

	request("https://www.nytimes.com/", function(error, response, html) {

	  // Load the HTML into cheerio and save it to a variable
	  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
	  var $ = cheerio.load(html);

			$("h2.story-heading").each(function(i, element) {

				var $ = cheerio.load(html);


			    //i think this is not working because the nfl is grabing their news articles dynamically, they will not load with js turned off
			    var title = $(element).children().text().split("\n            ")[0]
			    var link = $(element).children().attr("href");
			    var description = $(element).parent().find("p.summary").text()
			    
			    //var title = $(element).children().attr("data-metrics-link-name");
			    
			    // Save these results in an object that we'll push into the results array we defined earlier
			    //db.scrapedData.find({})
			    if(title != null && title != "" && link){
				    results.push({
				      title: title,
				      link: link,
				      description: description
				    });
				    // db.Article.create(results)
				    // 	.then(function(dbArticle){
				    // 		res.json(dbArticle);
				    // 	}).catch(function(err) {
				    //       // If an error occurred, send it to the client
				    //       return res.json(err);
				    //     });
				}
			  });

			console.log(results);
			console.log("===============================================")
			res.json(results)
			// res.sendfile("./public/index.html");
		});

	console.log("end of route")
})

app.post("/newArticle", function(req, res){
	console.log("-----------------------------------------")
	console.log(req.body)

	savedArray = [];

	db.Article.find({})
  	.then(function(dbArticle){
  		console.log(dbArticle)
  		console.log(req.body.title)
  		dbArticle.forEach(function(element){
  			savedArray.push(element.title);
  		})
  	}).then(function(){
  		console.log(savedArray)
  		if(!savedArray.includes(req.body.title)){
  			db.Article.create(req.body)
				.then(function(dbArticle){
					console.log("Article Saved!")
					console.log(dbArticle)
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

app.delete("/deleteArticle", function(req, res){
	console.log("here")
	console.log(req.body);

	db.Article.findByIdAndRemove(req.body.id, function(error, result){
		if (error) return res.status(500).send(error);

		return res.send(true);
	})

})

app.post("/newNote", function(req, res){
	console.log("newNote")
	console.log(req.body)

	db.Note.create(req.body)
		.then(function(dbNote){
			console.log("note created")
			console.log(dbNote)
			res.send(true);
		})
		.catch(function(error){
	      console.log(error)
	    })
})











}