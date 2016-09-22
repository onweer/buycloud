var mongoose = require('mongoose');
var conn_uri = require('./../web_config').db_config.uri;

mongoose.connect(conn_uri);


module.exports.model = function(name, schema) {
  return mongoose.model(name, schema);
}


module.exports.Schema = mongoose.Schema;
