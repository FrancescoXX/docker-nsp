const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database'); //database initializations
const User = require('./models/users'); //REQUIRED even if IDE says not used!

//INITIALIZE APP WITH EXPRESS
const app = express();

//BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set proper Headers on Backend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//ROUTES
app.use('/dev', require('./routes/dev')); //All test routes are placed here
app.use('/users', require('./routes/users')); //users crud

(async () => {
  try {
    await sequelize.sync(
      { force: false } //Reset db every time
    );
    app.listen(process.env.EXTERNAL_PORT); //DEF in docker.compose.yml
  } catch (error) {
    console.log(error);
  }
})();