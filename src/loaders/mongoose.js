const mongoose = require('mongoose');

const mongooseLoader = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};

module.exports = mongooseLoader;
