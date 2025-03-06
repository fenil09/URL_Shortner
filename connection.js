const mongoose = require('mongoose');

function  connectmongodb(){
  return mongoose.connect('mongodb://127.0.0.1:27017/URL');
}

module.exports = connectmongodb;