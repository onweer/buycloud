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
      if (req.session.user) {
        console.log(req.session.user);
        data.user_name = req.session.user.account
      } else {
        data.user_name = '请登录';
      }
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
    return res.render('404', {
      err: '用户名不符合邮箱格式'
    })
  }
  if (!validator.isLength(password, {
      min: 6,
      max: 32
    })) {
    return res.render('404', {
      err: '密码长度请控制在6~32位'
    })
  }
  user.register(user_name, password).then(doc => {
    console.log(doc);
    req.session.user = doc
    res.redirect('/')
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

router.get('/newgoods', function (req, res) {

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

router.get('/kfd', function (req, res) {
  var data = {}
  if (req.session.user) {
    data.user_name = req.session.user.account
  } else {
    data.user_name = '请登录'
  }
  res.render('kfd', data)
})
router.get('/sdfx', function (req, res) {
  var data = {}
  if (req.session.user) {
    data.user_name = req.session.user.account
  } else {
    data.user_name = '请登录'
  }
  res.render('sdfx', data)
})
router.get('/sp', function (req, res) {
  var data = {}
  if (req.session.user) {
    data.user_name = req.session.user.account
  } else {
    data.user_name = '请登录'
  }
  res.render('sp', data)
})
router.get('/zxjx', function (req, res) {
  var data = {}
  if (req.session.user) {
    data.user_name = req.session.user.account
  } else {
    data.user_name = '请登录'
  }
  res.render('zxjx', data)
})

// 购物车页面
router.get('/shopping_cart', function (req, res) {
  if (!req.session.user) {
    return res.render('404', {
      err: '用户未登录'
    })
  }
  // 从数据库中取用户购物车的信息
  user.shoppingCartInfo(req.session.user.id)
    .then(carts => {
      console.log(carts);
      res.render('shopping-cart', {
        carts: carts,
        user_name: req.session.user.account
      }); // 购物车数组
    })
    .catch(err => {
      res.render('404', {
        err: err.toString()
      });
    })
})


// 购物车结算

router.post('/shopping_cart', function (req, res) {
  if (!req.session.user) res.render('404', '用户未登陆')
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


router.get('/reward', function (req, res) {
  if (!req.session.user) {
    return res.render('404', {
      err: "用户未登陆"
    });
  } else {
    user.rewardList(req.session.user.id)
      .then(doc => {
        var data = {};
        data.user_name = req.session.user.account;
        data.reward_list = doc.win_list;
        res.render('reward', data);
      })
      .catch(err => {
        res.render('404', {
          err: err.toString()
        });
      });
  }
});


router.get('/Participate', function (req, res) {
  if (!req.session.user) {
    return res.render('404', {
      err: '用户未登录'
    })
  }
  user.participate(req.session.user.id, req.session.user.account).then(docs => {
      console.log(docs);
      res.render('Participate', {
        joined_list: docs,
        user_name: req.session.user.account
      })
    })
    .catch(err => {
      res.render('404', {
        err: err.toString()
      });
    })
})

router.get('/personinfo', function (req, res) {
  if (!req.session.user) {
    return res.render('404', {
      err: '用户未登录'
    })
  }
  user.getInfo(req.session.user.id).then(doc => {
    res.render('personinfo', {
      user_name: req.session.user.account,
      addresses: doc
    })
  })
})

// router.get('/Participate', function (req, res) {
//   res.render('Participate');
// });
//

module.exports = router
