'use strict';
var model = require('./db').model;
var Schema = require('./db').Schema;

var schema = new Schema({
  // 帐号
  account: {
    type: String,
    required: true
  },
  // 密码
  pwd: {
    type: String,
    required: true
  },
  // 账户余额
  balance: Number,
  // 地址列表
  addresses: [{
    // 姓名
    name: String,
    // 收货地址
    addr: String,
    // 收货电话号
    phone: String
  }],
  // 购物车
  shopping_cart: [{
    // 商品名称
    name: String,
    // 商品数量
    amount: Number
  }],
  // 以购物品列表
  purchased_goods_list: [{
    // 商品名称
    goods_name: String,
    // 购买时间
    purchase_time: Date,
    // 获得的号码
    receive_no: [Number]
  }],
  // 中奖名单
  win_list: [{
    // 商品名称
    goods_name: String,
    // 中奖号码
    reward_no: Number
  }]
});

var User = model('user', schema);

module.exports = User;
