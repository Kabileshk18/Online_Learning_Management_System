const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
require('./config/config');
require('./services/cronMail.service');
const v1 = require('./routes/v1');
const cryptoService = require('./services/crypto.service');
const { limiter } = require('./middlewares/rateLimiter');

var app = express();

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));
app.use(passport.initialize());
app.use(limiter);

const models = require('./models');
models.sequelize.authenticate().then(() => {
  console.log('Connected to SQL database ', CONFIG.db_name);
}).catch(err => {
  console.log('Unable to connect to SQL database ', CONFIG.db_name, err.message);
});
if (CONFIG.app === 'local') {
  models.sequelize.sync();
}
app.use(function (req, res, next) {
  // if (req && req.headers && req.headers.authorization) {
  //   req.headers.authorization = cryptoService.decrypt(req.headers.authorization);
  // }
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use('/v1', v1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
