const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api');
require('dotenv').config();

const expressLoader = ({ expressApp: app }) => {
  // Middleware
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(bodyParser.json());

  app.use(cors());

  app.use('/api', routes());
};

module.exports = expressLoader;
