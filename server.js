const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const routes = require('./src/routes');
require('dotenv/config');
require('./src/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('combined'));
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'Secure Tech Inc.' }));


app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use('/api/v1',routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Secure AJOCARD Transaction API listening on ${PORT}`);
});

module.exports = app;