const express = require('express');
const postsApp = express();
require('dotenv').config();

const postsAppPort = 3000;

const postsAppRouter = require('../routes/posts');
const maintenanceMiddleware = require('../middlewares/maintenance');

postsApp.use(express.static(`${__dirname}/public`)); // Serving static files
postsApp.use(express.json({ limit: '50kb' }));
postsApp.use(express.urlencoded({ extended: false }));

postsApp.use('/api/posts', maintenanceMiddleware, postsAppRouter);

postsApp.listen(postsAppPort, (err) => {
  if (err) console.log(err);
  else console.log('Posts Application listening on port: ', postsAppPort);
});
