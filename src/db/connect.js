var MongoDB = require('../config/connect.json').MongoDB.URL;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.model('Jewelry',new Schema({
  Article: {type:String, index:true},
  Pare: [{}],
  Range: [{}],
  MainLink: {},
}));
mongoose.model('Users',new Schema({
  Login: {type:String, index:{unique:true}},
  Password: String,
  ruleLvl: {},
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
