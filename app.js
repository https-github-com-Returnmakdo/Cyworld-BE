// reqiures
require('dotenv').config();
const fs = require('fs');
const HTTPS = require('https');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/error-hander.middleware');
//
const cookieParser = require('cookie-parser');

const app = express();
const https = HTTPS.createServer(app);
const router = require('./routes');
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
// 운영 환경일때만 적용
// if (process.env.NODE_ENV == 'production') {
  try {
    const option = {
      ca: fs.readFileSync(process.env.CA_FULL_CHAIN),
      key: fs.readFileSync(process.env.KEY_PRIVKEY),
      cert: fs.readFileSync(process.env.CERT_CERT),
    };

    HTTPS.createServer(option, app).listen(port, () => {
      console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
    });
  } catch (error) {
    console.log('HTTPS 서버가 실행되지 않습니다.');
    console.log(error);
  }
// }
//  else {
//   app.listen(port, () => {
//     console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port);
//   });
// }

module.exports = https;
