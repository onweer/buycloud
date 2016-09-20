const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./main_route')
const path = require('path');
var app = express();

// process.on('uncaughtException', function(err) {
//     logger.error('uncaughtException: %s', err.stack)
// })
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(routes);

app.listen(8000, function () {
  console.log("listening at localhost port 8000");
})

module.exports = app
