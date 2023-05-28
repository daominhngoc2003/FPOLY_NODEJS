import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "member",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", authSchema);
