var _ = require("underscore");

var Worker = {
	// == Variables ==
	// location of json directory of the blog
	blogjson : null,
	locationjson : null,
	// Interval of checking all update, in second
	interval: 600,
	// The id of the worker timer
	workerID: -1,
	pool: [],

	// == Worker Control ==
	// Start worker

	start: function() {
		setInterval(this.mainWorker, this.interval * 1000);
	},
	// Stop worker
	stop: function() {
		
	},
	init : function() {
		var th = this;
		var feedparser = require('feedparser')
		  , fs = require('fs') // used in the examples below
		  ;
		console.log("wait.. parsing..");

		var fileContents = fs.readFileSync(th.locationjson, 'utf8');
		var blogs;
		th.db = JSON.parse(fileContents);

		function writenow() {

		  // Write the article part
		  console.log("Now sorting articles");
		  th.pool = _.union(th.db, th.pool);
		  th.pool = _.sortBy(th.pool, function(obj) { return -obj.pubdate });
		  _.each(th.pool, function(post) {
		  	console.log("Now sorted with " + post.pubdate);
		  });
		  console.log("try to save the file..");
		  var write = JSON.stringify(th.pool, null, 4);

		  fs.writeFile(th.locationjson, write, function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		  });
		  // Write the blog information part
		}

		var writenowtimerid;

		var fileContents = fs.readFileSync(th.blogjson, 'utf8');
		var blogs;
		blogs = JSON.parse(fileContents).blogs;

		_.each(blogs, function(blog) {
			console.log("Going to parse " + blog.uri);
			feedparser.parseUrl(blog.uri).on('article', function callback (article) {
			console.log("Got new article from " + blog.id + ", writed at " + article.pubdate);
			th.pool.push(article);
			clearTimeout(writenowtimerid);
			writenowtimerid = setTimeout(writenow, 5000);
		});
		});
	},
	// Worker that done at every tick
	mainWorker: function() {

	},
	/** FOR DEVELOPMENT PURPOSE ONLY! **/
	writePool: function() {

	}
};

_.extend(exports, Worker);