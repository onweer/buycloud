var Goods = require('../model/goods');
var User = require('../model/user');
var _oneGoods = function(goods_id) {
  console.log('====== _oneGoods method in ======');
  return new Promise((resolve, reject) => {
    Goods.findOne({
        id: goods_id
      })
      .exec((err, doc) => {
        if (err) reject(err)
        if (!doc) reject('没有此商品信息')
        if (doc) resolve(doc)
      })
  })
}

var _newGoods = function(name, content, prize, required_no, sort_info) {
  console.log('====== _newGoods method in ======');
  return new Promise((resolve, reject) => {
    var goodsEntity = new Goods({
      name: name,
      content: content,
      prize: prize,
      joined_no: 0,
      last_no: 0,
      required_no: required_no,
      sort_info: sort_info
    })
    goodsEntity.save((err, doc) => {
      if(err) reject(err)
      if(doc) resolve('添加商品成功')
    })
  })
}

module.exports.oneGoods = _oneGoods
module.exports.newGoods = _newGoods
