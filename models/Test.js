const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TestSchema = new Schema({
  name: {
    type: String,
    required: [true, "You must provide a name!"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters!"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Test", TestSchema);
