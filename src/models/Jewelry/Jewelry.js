var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Jewelry = mongoose.model('Jewelry');
const MODELS_LIMIT = 60;
module.exports = {
  find(article,offset) {
    var model;
    article
      ? model = Jewelry.find({"Article":article}).sort('Article')
      : model = Jewelry.find().sort('Article')
    if (offset) {
      model.skip(offset);
    }

    return model.limit(MODELS_LIMIT);
  }
}
