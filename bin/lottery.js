// 自动开奖系统
var Goods = require('../model/goods');
var User = require('../model/user');
const eventproxy = require('eventproxy');
module.exports = (function () {
  var ep = new eventproxy()
  ep.tail('u', 'g', function (u, g) {
    // 判断商品是否已达购买人次
    g.forEach(function (gOne) {
      if(gOne.required_no === gOne.joined_no){
        // 幸运号
        var random = (Date.now() % gOne.required_no) + 1
        g.past_record = {
          no: g.no,
          winner: 'gggggg@qq.com',
          reward_no: random,
          end_date: new Date()
        }
        g.save().exec()
      }
    })
  });

  setInterval(function () {
    console.log('====== auto method in ======');
    User.find({}, (err, u_docs) => {
      if(err) console.log(err);
      ep.emit('u', u_docs)

    })
    Goods.find({}, (err, g_docs) => {
      if(err) console.log(err);
      ep.emit('g', g_docs)
    })
  }, 10 * 1000)
})()
