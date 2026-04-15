const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: String,
  fileName: String,
  chunks: [String],
  embeddings: [[Number]], // array of vectors
});

module.exports = mongoose.model("Document", documentSchema);