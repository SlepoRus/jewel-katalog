var db = require('./db');
var model = require('./models');
var express = require('express');
const PORT = require('./config/connect.json').PORT
var app = express();
var morgan = require('morgan');
var log4js = require('log4js');
var logger = log4js.getLogger();
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
const path = require('path');
db.connect(() => {
  logger.info('Подключено к MongoDB');
});
app.listen(PORT, function(err) {
  if (!err) {
    logger.info('Сервер запущен')
  }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
fs.readdirSync('./src/controller').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controller/' + file);
      route.controller(app);
  }
});
app.use((req,res) => {
  return res.end('123');
})
