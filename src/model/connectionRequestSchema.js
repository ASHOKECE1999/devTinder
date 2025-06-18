const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: "String",
      enum: {
        values: ["ignored", "interested", "rejected", "accepted"],
        message: `{VALUE} is Incorrect Status Type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ConnectRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectRequestModel;
