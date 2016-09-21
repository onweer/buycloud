var User = require('../model/user');
var Goods = require('../model/goods');

// 用户验证API，传入帐号，密码
var _auth = function (account, pwd) {
  return new Promise((resolve, reject) => {
    User.findOne({
        account: account
      })
      .exec((err, doc) => {
        if (err) reject(err);
        if (!doc) reject('用户不存在');
        else if (pwd === doc.pwd) resolve('验证成功');
        else resolve('验证失败');
      });
  });
}

// 验证用例，promise用法
/*
  _auth('123', '123')
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(err);
  });
*/
module.exports.auth = _auth;
