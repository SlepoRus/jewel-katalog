var jewelry = require('../models').Jewelry;

module.exports.controller = function(app) {
  app.route('/jewelry/')
    .get((req,res) => {
      const offset = req.param('offset')

      jewelry.find(null,offset).then((val) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(val));
      }).catch((err) => {
        console.log(err);
      })
    })
  app.route('/jewelry/:id')
    .get((req,res) => {
      const { offset, id } = req.params;
        var regex = new RegExp(".*" + id + ".*")
        jewelry.find(regex,offset).then((val) => {
          res.end(val.toString());
        }).catch((err) => {
          console.log(err);
        })
    })
}
