const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

const loaders = async app => {
  await mongooseLoader();
  console.log('✌️ DB loaded and connected!');

  await expressLoader({ expressApp: app });
  console.log('✌️ Express loaded');
};

module.exports = loaders;
