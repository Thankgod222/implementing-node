const mongoose = require("mongoose");

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
  image: {
    type: String,
    required: "This field is required.",
  },

  tag: {
    type: Array,
    required: "This field is required.",
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
