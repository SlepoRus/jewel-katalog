import StaticRouter from 'react-router-dom/StaticRouter';
import ReactDOMServer from 'react-dom/server';
import Provider from 'react-redux/lib/components/Provider';
import React from 'react';
import App from './components/App'
import configureStore from './redux/configureStore';

const db           = require('./db');
const model        = require('./models');
const express      = require('express');
const PORT         = require('./config/connect.json').PORT
const app          = express();
const morgan       = require('morgan');
const log4js       = require('log4js');
const logger       = log4js.getLogger();
const bodyParser   = require('body-parser');
const cors         = require('cors');
const fs           = require('fs');
const path         = require('path');
const session      = require('express-session')
const assetUrl     = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '';

var route = express().route;

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
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'asdfasdfasdfwqefqwefsadxzvczx3151235621354esafsdfcbxcvbsaf23151236123SAFDSFadf1235312',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge: 60000 }
}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'jewelimg')));
const pathfix = __dirname.substr(0,__dirname.length-4)
app.use('/jewelImg', express.static(pathfix + '/jewelImg'))
app.use('/public', express.static(pathfix + '/public'));
fs.readdirSync('./src/controller').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controller/' + file);
      route.controller(app);
  }
});
app.use((req,res) => {
  var context = {};
  var auth = {};
  if (req.session.ssid) {
    auth = {
      ssid: req.session.ssid,
      rules: req.session.rules,
      login: req.session.Login,

    }
  }
  var store = configureStore(auth);
  const componentHTML = ReactDOMServer.renderToString(
    <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
        <App auth={auth}/>
        </StaticRouter>
    </Provider>
    );
  res.end(renderHTML(componentHTML,auth));
})
function renderHTML(componentHTML,auth) {

  return `
    <!DOCTYPE html>
    <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>QRepublik</title>
          <link rel="stylesheet" type="text/css" href="${assetUrl}/public/dist/styles.css">
          <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon">
          <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet">
          <script type="application/javascript">
              window.REDUX_INITIAL_STATE = ${JSON.stringify({auth})};

          </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script src="${assetUrl}/public/dist/bundle.js"></script>
      </body>
    </html> `
}
