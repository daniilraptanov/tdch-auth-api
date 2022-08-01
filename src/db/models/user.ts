import { Schema, model, connect } from "mongoose";
import { IUser } from "../../types/models/user";
import { taskSchema, templateSchema } from "./template";

const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema<IUser>({
  id: { type: String, default: uuidv4 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weeks: [{
    id: { type: String, default: uuidv4 },
    template: templateSchema,
    tasks: taskSchema,
  }]
});

const User = model<IUser>("User", userSchema);

export default User;
