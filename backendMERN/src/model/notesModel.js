const mongoose = require("mongoose");
require("../DB/database");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const notes = mongoose.model("note", noteSchema);
module.exports = notes;
