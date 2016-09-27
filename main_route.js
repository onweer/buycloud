var router = require('express').Router();
var _auth = require('./controller/user');
// import  other router from ./routes folder

router.get('/', function(req, res, next) {
  res.send('hello-world')
});

router.get('/index', function(req, res, next) {
  res.render("index")
});

router.get('/login',function(req,res){
  res.render("USAndL")
});

router.post('/login',function(req,res){
  _auth('gggg','123');
  res.redirect('/index')
})

module.exports = router
