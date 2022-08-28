import { Schema, model } from "mongoose";
import { IUser } from "../../types/models/user";

const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema<IUser>({
  id: { type: String, default: uuidv4, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
