var router = require('express').Router();
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
  console.log("login post");
  res.redirect('/index')
})

module.exports = router
