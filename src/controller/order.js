var model = require('../models').Order;

module.exports.controller = function(app) {
  app.route('/order/')
    .get((req,res) => {
      const offset = req.query.offset;
      model.find(null,offset).then((val) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(val));
      }).catch((err) => {
        console.log(err);
        res.status(404).end();
      })
    })
  app.route('/order/:id')
    .get((req,res) => {
      const { id } = req.params;
      const offset = req.query.offset;
        var regex = new RegExp(".*" + id + ".*")
        model.find(regex,offset).then((val) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(val));
        }).catch((err) => {
          console.log(err);
        })
    })
    .delete((req,res) => {
      const { id } = req.params;
      model.delete
    })
}
