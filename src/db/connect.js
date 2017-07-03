var MongoDB = require('../config/connect.json').MongoDB.URL;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.model('Jewelry',new Schema({
  Article: String,
  Pare: [{}],
  Range: [{}],
  MainLink: {},
}));
module.exports =
  function connect(callback) {
    var mongo_connect = mongoose.connect(MongoDB);
    if (mongo_connect) {
      callback();
    } else {
      throw 'Ошибка при подключении к MongoDB'
      return false;
    }
  }
