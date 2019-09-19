const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.log(`An error has occured! ${err}`);
    process.exit(-1);
  });
