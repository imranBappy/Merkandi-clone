const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "conversation",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "auth",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "auth",
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = model("message", messageSchema);
exports.Message = Message;
