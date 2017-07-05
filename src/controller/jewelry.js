var model = require('../models').Jewelry;

module.exports.controller = function(app) {
  app.route('/jewelry/')
    .get((req,res) => {
      const offset = req.query.offset;
      model.find(null,offset).then((val) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(val));
      }).catch((err) => {
        console.log(err);
      })
    })
  app.route('/jewelry/:id')
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
}
