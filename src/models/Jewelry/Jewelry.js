var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Jewelry = mongoose.model('Jewelry');
module.exports = {
  find(article) {
    if (article) return Jewelry.find({"Article":article}).sort('Article');
    else return Jewelry.find().sort('Article')
  }
}
