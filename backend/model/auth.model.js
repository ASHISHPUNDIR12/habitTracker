import mongoose, { Schema } from "mongoose";

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", user);
export default User;
