const express = require('express');

const startServer = async () => {
  const app = express();

  await require('./loaders')(app);

  // Handle production
  if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
  }
  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }
    console.log(`
      ####################################
      🛡️  Server listening on port: ${process.env.PORT} 🛡️ 
      ####################################
    `);
  });
};

startServer();
