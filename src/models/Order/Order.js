var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Order = mongoose.model('Order');
const MODELS_LIMIT = 60;
module.exports = {
  find(id,offset) {
    var model;
    article
      ? model = Order.find({"id":id}).sort('id')
      : model = Order.find().sort('id')
    if (offset) {
      model.skip(offset);
    }
    return model.limit(MODELS_LIMIT);
  }
  create() {
    var model;
    model = Order.insert({Article:[],Image:[{}],Details:{},count:0,discription:''});
    return model;
  }
  delete(data) {
    const { id } = data;
    return Order.remove({id:id});
  }
  update(data) {
    const { id } = data;
    return Order.find({id}).update({data});
  }
}
