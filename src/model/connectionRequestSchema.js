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

connectionRequestSchema.pre("save", function (next) {
  const currentUser = this;
  if (currentUser.fromUserId.equals(currentUser.toUserId)) {
    throw new Error("  Hey you are not allowed to send request to self!!! LOL");
  }
  next();
});

const ConnectRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectRequestModel;
