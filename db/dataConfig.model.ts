const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/DATABASE');

const hashTag="HASHTAG"

export {mongoose, hashTag}