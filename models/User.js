import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    enums: ["user", "admin", "super_admin"],
    default: ["user"],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
