exports.index = function(req, res){
  res.render('index', { title: 'Paged at ' + req.params.page });
};