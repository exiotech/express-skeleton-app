import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import expressJwt from 'express-jwt';
import cors from 'cors';
import { Joi, errors } from 'celebrate';
import config from 'config';

Joi.objectId = require('joi-objectid')(Joi);

const app = express();

require('./db/connect');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressJwt({ secret: config.jwt.key }).unless({
  path: [/\/auth\/(.*)/ig],
}));

app.use(errors());

require('./routes')(app);
require('./config/auth').default(app);
require('./routes/errors')(app);

module.exports = app;
