const mongoose = require('mongoose');

const db = () => {
  mongoose
    .connect(
      'mongodb://127.0.0.1:27017/Test?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1'
    )
    .then(() => console.log('Database Connected'))
    .catch((e) => console.log(e));
};

module.exports = db;
