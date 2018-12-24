const mongoose = require('mongoose');
require('dotenv').config();

exports.init = function () {
  mongoose
    .connect(process.env.MONGO_OFFLINE /*|| process.env.MONGODB_URI*/, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(err));
};
