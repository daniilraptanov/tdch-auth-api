import { Schema, model, connect } from "mongoose";
import { IUser } from "../../types/models/user";
import { taskSchema, templateSchema } from "./template";


const userSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weeks: [{
    id: { type: String, required: true, unique: true },
    template: templateSchema,
    tasks: taskSchema,
  }]
}, { _id : false });

const User = model<IUser>("User", userSchema);

export default User;
