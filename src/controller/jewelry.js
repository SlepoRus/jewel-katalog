var jewelry = require('../models').Jewelry;

module.exports.controller = function(app) {
  app.get('/jewelry',(req,res) => {
    jewelry.find().then((val) => {
      res.end(val.toString());
    }).catch((err) => {
      console.log(err);
    })
  })
  app.route('/jewelry/:id')
    .get((req,res) => {
      jewelry.find(req.params.id).then((val) => {
        res.end(val.toString());
      }).catch((err) => {
        console.log(err);
      })
    })
}
