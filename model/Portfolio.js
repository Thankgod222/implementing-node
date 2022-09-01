const mongoose = require("mongoose");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required.",
  },
  description: {
    type: String,
    required: "This field is required.",
  },
  category: {
    type: String,
    required: "This field is required.",
  },
  images: [ImageSchema],
  tag: {
    type: String,
    required: "This field is required.",
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
