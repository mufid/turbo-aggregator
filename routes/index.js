
/*
 * GET home page.
 */

var worker = require("../lib/worker.js");
var S = require("string");

exports.index = function(req, res){
  var posts = worker.pool;
  posts.strip = function(what) {
  	return S(what).stripTags();
  }
  res.render('index', { title: 'Express', posts: posts });
};

exports.paged = function(req, res){
  res.render('index', { title: 'Express Duo', datas: worker.pool });
};

exports.api = function(req, res) {
	res.json({"API is Called" : "Yiihaaa"});
}