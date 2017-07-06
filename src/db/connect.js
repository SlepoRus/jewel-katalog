var MongoDB = require('../config/connect.json').MongoDB.URL;
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose);
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
let Order = new Schema({
  id: {type:Number, index:{unique:true}},
  Article: [{}],
  Details: {},
  Image: [{}],
  count: Number,
  discription: String,
})
Order.plugin(autoIncrement.plugin, 'id');
mongoose.model('Order', Order);

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
