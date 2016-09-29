var Goods = require('../model/goods');

var _oneGoods = function (goods_id) {
  return new Promise((resolve, reject) => {
    Goods.findOne({
        _id: goods_id
      })
      .exec((err, doc) => {
        if (err) reject(err)
        if (!doc) reject('没有此商品信息')
        if (doc) resolve(doc)
      })
  })
}

module.exports.oneGoods = _oneGoods
