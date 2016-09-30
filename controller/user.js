var Goods = require('../model/goods');
var User = require('../model/user')
var eventproxy = require('eventproxy')
const encryption = require('../bin/md5').encryption;
const _ = require('lodash');
// 用户验证API，传入帐号，密码
var _auth = function (account, pwd) {
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
        }
      });
  });
}

// 注册
var _register = function (account, pwd) {
  console.log('====== _register method in ======');
  return new Promise(function (resolve, reject) {
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


// joined_list: [{
//   // 用户购买时间
//   purchase_time: Date,
//   // 用户姓名
//   user_name: String,
//   // 用户IP
//   user_ip: String,
//   // 分配的号码
//   receive_no: [Number]
// }],
// 用户结算购物车
var _shoppingCart = function (user_name, user_ip, ids, amounts) {
  console.log('====== _shoppingCart method in ======');
  return new Promise(function (Outresolve, Outreject) {
    if (!Array.isArray(ids) || !Array.isArray(ids)) Outreject('参数错误')
      // var ep = new eventproxy()
      // ep.after('done', ids.length, function (docs) {
      //   resolve(docs)
      // })
    var promiseArray = ids.map((id, idx) => {
      return new Promise((resolve, reject) => {
        Goods.findById(id, (err, doc) => {
          if (err) reject(err);
          var joined_list = doc.joined_list || [];
          var receive_no = [];
          console.log(amounts.length);
          var start = 0;
          if (joined_list.length !== 0) {
            start = _.last(joined_list[joined_list.length - 1].receive_no) + 1;
          } else {
            start = 10001; // 开始的num
          }
          for (var i = start; i < start + parseInt(amounts[idx]) + 1; ++i) {
            console.log(i);
            receive_no.push(i)
          }
          joined_list.push({
            purchase_time: new Date(),
            user_name: user_name,
            user_ip: user_ip,
            receive_no: receive_no
          })
          doc.joined_list = joined_list;
          // 保存到用户参与记录
          User.findOne({
              user_name: user_name
            }).exec((err, doc) => {
              console.log(doc);
              doc.purchased_goods_list = {
                goods_name: id,
                purchase_time: new Date(),
                receive_no: receive_no
              }
              doc.save(function (err) {
                if (err) reject(err)
                resolve()
              })
            })
            // 保存到GOODS
          doc.save(function (err) {
              if (err) reject(err);
              resolve();
            })
            // ep.emit('one', doc.save())
        })
      })
    })
    Promise.all(promiseArray)
      .then(docs => {
        Outresolve(docs);
      })
      .catch(err => {
        Outreject(err);
      });
    // ids.forEach(function (_id, index) {
    //   // 商品集合添加一条参与记录
    //   Goods.findById(_id, (err, doc) => {
    //     var joined_list = doc.joined_list || [];
    //     var receive_no = [];
    //     console.log(amounts.length);
    //     if(joined_list.length !== 0){
    //       var start = _.last(joined_list[joined_list.length - 1].receive_no) + 1;
    //     }else {
    //       var start = 10001; // 开始的num
    //     }
    //     for (var i = start; i < start + parseInt(amounts[index]) + 1; ++i) {
    //       console.log(i);
    //       receive_no.push(i)
    //     }
    //     joined_list.push({
    //       purchase_time: new Date(),
    //       user_name: user_name,
    //       user_ip: user_ip,
    //       receive_no: receive_no
    //     })
    //     doc.joined_list = joined_list;
    //     ep.emit('one', doc.save())
    //   })
    // })
    console.log(amounts);
  })
}

// 获取购物车信息
var _shoppingCartInfo = function (uid) {
    console.log('====== _shoppingCartInfo method in ======');
    return new Promise(function (resolve, reject) {
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
          doc.shopping_cart.forEach(function (cart) {
            Goods.findById(cart.id, (err, doc2) => {
              if (err) reject(err)
              console.log(doc2);
              var temp = {};
              temp._id = doc2.id;
              temp.name = doc2.name;
              temp.price = doc2.price;
              temp.remainNum = doc2.required_no - doc2.joined_no;
              temp.amount = cart.amount;
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

var _rewardList = function (uid) {
  return new Promise((resolve, reject) => {
    User.findOne({
        _id: uid
      })
      .exec()
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });
}

module.exports.auth = _auth;
module.exports.register = _register;
module.exports.shoppingCart = _shoppingCart;
module.exports.shoppingCartInfo = _shoppingCartInfo;
module.exports.rewardList = _rewardList;
