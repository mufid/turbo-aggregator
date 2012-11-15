
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
// Halaman means "page" in Bahasa Indonesia
app.get('/halaman/:page', routes.paged);


app.get('/doparse', function(req,res) {

});

// For Google Webmaster tools, FB Login, analytics, etc.
var secret = require("./lib/secret.js");
secret.doSecret(app);

app.post('/api', routes.api);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

exports = app;

// FEEDPARSER WORKER
// ======================================================

// How this worker work
// cek per bulan apakah ada berita baru
// jika ada, masukkan ke bulan tersebut, sortir berdasarkan
// tanggal

var W = require('./lib/worker.js');
var worker = W;
console.log(worker);
worker.blogjson = __dirname + "/config/bloglist.json";
worker.locationjson = __dirname + "/public/all-blog.json";
worker.init();

var feedparser = require('feedparser')
  , fs = require('fs') // used in the examples below
  ;
/*
console.log("wait.. parsing..");

function callback (article) {
  var write = JSON.stringify(article, null, 4);
  fs.writeFile("public/vote.json", write, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
  });
  //console.log('Got article: %s', JSON.stringify(article));
}

feedparser.parseUrl('http://mufid.github.com/atom.xml')
  .on('article', callback);
*/