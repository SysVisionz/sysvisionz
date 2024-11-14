const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/noveleria');

const hashTag="noveleriagofastvroom"

export {mongoose, hashTag}