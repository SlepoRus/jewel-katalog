var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sha256 = require('sha256');
const Users = mongoose.model('Users');
const MODELS_LIMIT = 60;
module.exports = {
  find(data) {
    var { login, password } = data;
    password = sha256(password);
    return Users.findOne({ Login:login, Password: password })
  },
  create(data) {
    var { login, password } = data;
    password = sha256(password);
    return Users.create({ Login:login, Password:password })
  }
}
