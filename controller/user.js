var Goods = require('../model/goods');
var User = require('../model/user')
const encryption = require('../bin/md5').encryption;
// 用户验证API，传入帐号，密码
var _auth = function(account, pwd) {
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
  console.log('register');
  return new Promise(function(resolve, reject) {
    var userEntity = new User({
      account: 'hjk',
      pwd: '123'
    })
    userEntity.save()
  });
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
