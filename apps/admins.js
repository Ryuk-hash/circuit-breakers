const express = require('express');
const adminsApp = express();
require('dotenv').config();

const adminsAppPort = 8000;

const adminsAppRouter = require('../routes/admins');

adminsApp.use(express.static(`${__dirname}/public`)); // Serving static files
adminsApp.use(express.json({ limit: '50kb' }));
adminsApp.use(express.urlencoded({ extended: false }));

adminsApp.use('/api/admins', adminsAppRouter);

adminsApp.listen(adminsAppPort, (err) => {
  if (err) console.log(err);
  else console.log('Admins Application listening on port: ', adminsAppPort);
});
