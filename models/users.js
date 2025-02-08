const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  { timestamps: true },
);

usersSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', usersSchema);
