// reqiures
require('dotenv').config();
const express = require('express');
const Http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/error-hander.middleware');

const cookieParser = require('cookie-parser');

const app = express();
const http = Http.createServer(app);
const router = require('./routes')
const port = process.env.EXPRESS_PORT || 3000;

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api', router);
app.use(express.urlencoded({ extended: false }));
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
