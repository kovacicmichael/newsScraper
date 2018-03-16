
var request = require('request');
var cheerio = require("cheerio");

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















}