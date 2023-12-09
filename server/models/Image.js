const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

imageSchema.index(
  {
    name: "text",
  },
  {
    weights: {
      name: 5,
    },
  }
);
const Image = model("image", imageSchema);
module.exports = Image;
