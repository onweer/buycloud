const router = require('express').Router();
const user = require('./controller/user');
const goods = require('./controller/goods')
const _ = require('lodash');
const validator = require('validator');

// import  other router from ./routes folder

router.get('/', function (req, res, next) {
  res.render('index', {
    user_name: '请登录'
  })
});

/* 登录|注册 */
router.get('/login', function (req, res) {
  res.render("USAndL")
});

router.post('/register', function (req, res) {
  var user_name = req.body.user_name.toLowerCase().trim()
  var password = req.body.password.trim()
  if (!validator.isEmail(user_name)) {
    return res.status(200).send({
      flag: -1,
      message: '用户名不是邮箱格式'
    })
  }
  if (!validator.isLength(password, {
      min: 6,
      max: 32
    })) {
    return res.status(200).send({
      flag: -1,
      message: '密码长度请控制在6至32个字符'
    })
  }
  user.register(user_name, password).then(msg => {
    console.log(msg);
  }).catch(err => {
    console.log(err);
  })
});

/* 登录|注册表单提交*/
router.post('/login', function (req, res) {
  var user_name = req.body.user_name.toLowerCase().trim()
  var password = req.body.password.trim()
    // password = encryption(password)
  user.auth(user_name, password).then(user => {
    req.session.user = user
    console.log(user);
    res.status(200).render('index', {
      user_name: user.account
    })
  }).catch(err => {
    console.log(err);
  });
})

/* 管理员添加商品页面*/
router.get('/newgoods', function (req, res) {

})

/* 管理员添加一个商品*/
router.post('/newgoods', function (req, res) {

})

/* 某一商品展示页面 */
router.get('/goods', function (req, res) {
  var goods_id = req.query.goods_id
  goods.oneGoods(goods_id).then(doc => {
    res.render('goods', doc) //
  }).catch(err => {
    res.render('404', {
      err: err.toString()
    });
  })
})

/* 购买某一商品 */
router.post('/goods', function (req, res) {

})

// 添加某一个商品到购物车
router.post('/add_to_cart', function (req, res) {

})

// 购物车
router.post('/shopping_cart', function (req, res) {
  var _id = req.body._id;
  var goods_name = req.body.goods_name;
  var goods_num = req.body.goods_num;
})

router.get('/shopping_cart', function (req, res) {
  // 从数据库中取用户购物车的信息
  user.shoppingCartInfo(req.query.id).then(carts => {
    res.render('shopping-cart', carts.shopping_cart) // 购物车数组
  }).catch(err => {
    console.log(err);
  })
})

// 购物车
router.post('/shopping_cart', function (req, res) {
  var id = req.body.id;
  var goods_name = req.body.goods_name;
  var goods_num = req.body.goods_num;
})

// 结算
router.post('/shopping', function (req, res) {

})

//

module.exports = router
