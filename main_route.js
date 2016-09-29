const router = require('express').Router();
const user = require('./controller/user');
const goods = require('./controller/goods')
const _ = require('lodash');
const validator = require('validator');

// import  other router from ./routes folder

router.get('/', function (req, res, next) {
  goods.getAllGoods()
    .then(docs => {
      var data = {};
      data.goods = docs;
      data.user_name = '请登录';
      res.render('index', data);
    })
    .catch(err => {
      res.render('404', {
        err: err.toString()
      });
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
    res.render('404', {
      err: err.toString()
    })
  })
});

/* 登录|注册表单提交*/
router.post('/login', function (req, res) {
  var user_name = req.body.user_name.toLowerCase().trim()
  var password = req.body.password.trim()
    // password = encryption(password)
  user.auth(user_name, password).then(user => {
    req.session.user = user
    res.status(200).render('index', {
      user_name: user.account
    })
  }).catch(err => {
    res.render('404', {
      err: err.toString()
    })
  });
})

/* 管理员添加商品页面*/

router.get('/newgoods', function(req, res) {

})

/* 管理员添加一个商品*/
router.post('/newgoods', function (req, res) {
  goods.newGoods('iPhone7 Plus', '一个肾也好', 8888, 9999, '手机').then(doc => {
    console.log(doc);
  }).catch(err => {
    res.render('404', {
      err: err.toString()
    })
  })
})


/* 某一商品展示页面 */
router.get('/goods', function (req, res) {
  var goods_id = req.query.goods_id
  goods.oneGoods(goods_id).then(doc => {
    var data = {};
    if (req.session.user) data.user_name = req.session.user.account;
    else data.user_name = '';
    for (var key in doc) data[key] = doc[key];
    res.render('goods', data) //
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


// 购物车页面
router.get('/shopping_cart', function (req, res) {
  // 从数据库中取用户购物车的信息
  user.shoppingCartInfo(req.query.id).then(carts => {
    console.log(carts);
    res.render('shopping-cart', {
        carts: carts
      }) // 购物车数组
  }).catch(err => {
    res.render('404', {
      err: err.toString()
    });
  })
})


// 购物车结算
router.post('/shopping_cart', function(req, res) {
  var _id = req.body._id;
  var amount = req.body.amount;
  user.shoppingCart(req.session.user.user_name, req.ip, _id, amount).then((doc) => {
    // 返回到参与记录
    console.log(doc);
  }).catch(err => {
    res.render('404', {
      err: err.toString()
    });
  })
})

// 结算
router.post('/shopping', function (req, res) {

})

//

module.exports = router
