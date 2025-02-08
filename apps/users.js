const express = require('express');
const usersApp = express();
require('dotenv').config();

const usersAppPort = 5000;

const usersAppRouter = require('../routes/users');
const maintenanceMiddleware = require('../middlewares/maintenance');

usersApp.use(express.static(`${__dirname}/public`)); // Serving static files
usersApp.use(express.json({ limit: '50kb' }));
usersApp.use(express.urlencoded({ extended: false }));

usersApp.use('/api/users', maintenanceMiddleware, usersAppRouter);

usersApp.listen(usersAppPort, (err) => {
  if (err) console.log(err);
  else console.log('Users Application listening on port: ', usersAppPort);
});
