var express = require('express');
var router = express.Router();
var url = require("url");

var db = require(__dirname + '/mongo.js').model;

// remove all
//db.find().remove().exec();

router.get('/api/pages', function(req, res, next){
    var data = db.find();
    data.then(function(doc){   
      console.log( ' find pages ' );
      res.json({error: false, pages: doc});
    });
});

router.post('/api/pages', function(req, res, next){
      if ( !req.body.name || !req.body.body) {
        res.json({error: true, msg: 'no name or body was provided'});
        return ;
      }
      var post = new db({
        name : req.body.name,
        body : req.body.body
      });
      post.save(function (err, result) {
        if( err ) {
          res.json({error: true, msg: 'save was not work'});
          return ;
        }
        var data = db.find();
        data.then(function(doc){  
          res.json({
            error : false,
            pages : doc
          }); 
        });
      });
});

router.put('/api/pages', function(req, res, next){
      if ( !req.body.id || !req.body.name || !req.body.body) {
        res.json({error: true, msg: 'no name or body or id was provided'});
        return ;
      }
      db.findOneAndUpdate({_id:req.body.id}, {
        name : req.body.name,
        body : req.body.body
      }, function (err, result) {
          if( err ) {
            res.json({error: true, msg: 'update was not successfull, there are some error'});
            return ;
          } else {
            var data = db.find();
            data.then(function(doc){  
              res.json({
                error : false,
                pages : doc
              });
            });
          }
      });
});


router.delete('/api/pages', function(req, res, next){
  var parts = url.parse(req.url, true);
  var id = parts.query.id;
  console.log( parts );
      if ( !id ) {
        res.json({error: true, msg: 'no id was provided'});
        return ;
      }
      db.findByIdAndRemove(id ,function(err, result){
          if( err ) {
            res.json({error: true, msg: 'delete was not successfull, there are some error'});
            return ;
          } else {
            var data = db.find();
            data.then(function(doc){  
              res.json({
                error : false,
                pages : doc
              });
            });
          }
      });
});

router.get('*', function(req, res, next) {
    res.render('index');
});


module.exports = router;
