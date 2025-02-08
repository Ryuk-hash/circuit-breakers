// Imports and env-vars injection
require('dotenv').config();
require('./utils/db')();
require('./apps/posts');
require('./apps/users');
require('./apps/admins');
