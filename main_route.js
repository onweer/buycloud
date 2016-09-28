const router = require('express').Router();
const user = require('./controller/user');
const _ = require('lodash');
const validator = require('validator');

// import  other router from ./routes folder

router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/goods', function(req, res, next) {
  res.render('goods')
})

/* 登录|注册 */
router.get('/login',function(req,res){
  res.render("USAndL")
});

router.post('/login',function(req,res){
    var user_name = req.body.user_name.toLowerCase()
    var password = req.body.password
    user.register(user_name, password).then(msg => {
      
    })
});

/* 登录|注册表单提交*/
router.post('/register', function (req, res) {
    var user_name = req.body.user_name.toLowerCase()
    var password = req.body.password
    if (!validator.isEmail(user_name)) {
        return res.status(200).send({
            flag: -1,
            message: '用户名不是邮箱格式'
        })
    }
    if (!validator.isLength(password, {min:6, max:32})) {
        return res.status(200).send({
            flag: -1,
            message: '密码长度请控制在6至32个字符'
        })
    }
    // password = encryption(password)
    user.auth(user_name, password).then(user => {
        req.session.user = user
        res.status(200).end()
    }).catch(err => {
        console.log(err);
    });

})

/* 商品页面 */
// route.get('/goods', function (req, res) {
//
// })
//
// /* 购买商品 */
// router.post('/goods', function (req, res) {
//
// })

module.exports = router
