const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  age: { type: String, required: true },
  imageUrl: { type: String, required: false },
  personnageDescription: { type: String, required: true },
  text: { type: Array, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
