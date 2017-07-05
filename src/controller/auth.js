var model = require('../models').Users;
var sha256 = require('sha256');
const CONFIRM = 'USER EXIST';
const WRONG_PASSWORD = 'WRONG USER OR PASSWORD';
const USER_ALREADY_EXIST = 'USER ALREADY EXIST';
var session = require('express-session')
module.exports.controller = function(app) {
  app.route('/auth/login')
    .post((req,res) => {
      var sess = req.session;
      model.find(req.body).then((val) => {
        console.log(val._id);
        if (!val._id) {
          return res.status(400).end(JSON.stringify({status:WRONG_PASSWORD}))
        }

        sess.ssid = val._id;
        sess.rules = val.ruleLvl;
        sess.Login = val.Login;
        return res.end(JSON.stringify({status:CONFIRM}))
      }).catch((err) => {
        console.log(err);
        return res.status(400).end(JSON.stringify({status:WRONG_PASSWORD}))
      })
    })
  app.route('/auth/register')
    .post((req,res) => {
      var sess = req.session;
      model.create(req.body).then((val) => {
        sess.ssid = sha256(Math.random()%100000);
        sess.rules = val.ruleLvl;
        sess.Login = val.Login;

        return res.end(JSON.stringify({status:CONFIRM}))
      }).catch((err) => {
        console.log(err);
        return res.status(400).end(JSON.stringify({status:USER_ALREADY_EXIST}))
      })
    })
  app.route('/auth/logout')
    .post((req,res) => {
        req.session.destroy((err) => {
          if (err) return res.status(404).end();
          return res.end(JSON.stringify({status:CONFIRM}))
        })
    })
}
