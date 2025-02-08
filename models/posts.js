const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    body: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Post', postsSchema);
