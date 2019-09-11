const express = require('express');
const posts = require('./routes/posts');

const routes = () => {
  const app = express.Router();

  posts(app);

  return app;
};

module.exports = routes;
