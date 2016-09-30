const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./main_route')
const path = require('path');
const session = require('express-session');
const compression = require('compression');
const mongoExpress = require('mongo-express/lib/middleware');
const mongoExpressConfig = require('./mongo_express_config');
require('date-util'); // 添加在Date对象上Property

var app = express();
app.use('/mongo', mongoExpress(mongoExpressConfig));

// process.on('uncaughtException', function(err) {
//     logger.error('uncaughtException: %s', err.stack)
// })
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-mate'))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1mb'
}));
app.use(require('cookie-parser')('haha'));
app.use(session({
  name: 'connect.sid',
  secret: 'haha',
  // store: new RedisStore(redis_config),
  cookie: {
    // path: '/',
    // httpOnly: true,
    // secure: false, // https require true
    maxAge: 60 * 60 * 1000 // 过期时间
  }
  // rolling: true,
  // resave: true, //
  // saveUninitialized: false //
}));
app.use(compression())
app.use(routes);

app.listen(8000, function () {
  console.log("listening at localhost port 8000");
})

module.exports = app
