'use strict';
var model = require('./db').model;
var Schema = require('./db').Schema;

var schema = new Schema({
  // 商品名称
  name: String,
  // 商品描述
  content: String,
  // 商品价格
  price: Number,
  // 开奖所需人次
  required_no: Number,
  // 以参与人次
  joined_no: Number,
  // 当前期号
  last_no: Number,
  // 分类信息
  sort_info: String,
  // 用户参与记录
  joined_list: [{
    // 用户购买时间
    purchase_time: Date,
    // 用户姓名
    user_name: String,
    // 用户IP
    user_ip: String,
    // 分配的号码
    receive_no: [Number]
  }],
  // 往期开奖记录
  past_record: [{
    // 期号
    no: Number,
    // 获奖人姓名
    winner: String,
    // 获奖号码
    reward_no: Number,
    // 揭示获奖日期
    end_date: Date
  }]
}, {
  collection: 'goods'
});

var Goods = model('goods', schema);

module.exports = Goods;
