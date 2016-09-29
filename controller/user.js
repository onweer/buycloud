var Goods = require('../model/goods');
var User = require('../model/user')
var eventproxy = require('eventproxy')
const encryption = require('../bin/md5').encryption;
// 用户验证API，传入帐号，密码
var _auth = function(account, pwd) {
  console.log('====== _auth method in ======');
  return new Promise((resolve, reject) => {
    User.findOne({
        account: account,
        pwd: pwd
      })
      .exec((err, doc) => {
        if (err) reject(err);
        if (!doc) {
          reject('用户不存在')
        } else if (pwd === doc.pwd) {
          resolve({
            id: doc._id,
            account: doc.account
          });
        } else {
          resolve('验证失败')
        };
      });
  });
}

var _register = function(account, pwd) {
  console.log('====== _register method in ======');
  return new Promise(function(resolve, reject) {
    var userEntity = new User({
      account: 'hjk',
      pwd: '123'
    })
    userEntity.save((err, doc) => {
      if (err) reject(err);
      if (doc) resolve('注册成功');
    })
  });
}

var _shoppingCart = function(goodsArray) {
  console.log('====== _shoppingCart method in ======');
}

var _shoppingCartInfo = function(uid) {
    console.log('====== _shoppingCartInfo method in ======');
    return new Promise(function(resolve, reject) {
      var ep = new eventproxy();
      User.findById(uid, (err, doc) => {
        if (err) reject(err);
        if (!doc) reject('用户不存在')
        if (doc.shopping_cart.length > 0) {
          var ep = new eventproxy(),
              carts = [];
          ep.after('done', doc.shopping_cart.length, function (carts) {
              resolve(carts)
          })
          console.log(doc.shopping_cart);
          doc.shopping_cart.forEach(function(cart) {
            Goods.findById(cart.id, (err, doc2) => {
              if (err) reject(err)
              console.log(doc2);
              var temp = {};
              temp.name = doc2.name;
              temp.price = doc2.price;
              temp.remainNum = doc2.required_no - doc2.joined_no;
              temp.amount = doc.shopping_cart.amount;
              carts.push(temp);
              ep.emit('done', temp)
            })
          })

        } else {
          resolve([])
        }
      })
    })
  }
  // 验证用例，promise用法

// _auth('gggg', '123')
//   .then(msg => {
//     console.log(msg);
//   })
//   .catch(err => {
//     console.log(err);
//   });

module.exports.auth = _auth;
module.exports.register = _register;
module.exports.shoppingCart = _shoppingCart;
module.exports.shoppingCartInfo = _shoppingCartInfo;
