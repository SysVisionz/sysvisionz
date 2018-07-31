const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/your-database')

const hashTag = 'your-hash-string';

module.exports = {hashTag, mongoose}