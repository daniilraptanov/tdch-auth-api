import { Schema, model, connect } from "mongoose";
import { IUserDTO } from "../../types/dto/user-dto";
import { taskSchema, templateSchema } from "./template";


const userSchema = new Schema<IUserDTO>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weeks: [{
    template: templateSchema,
    tasks: taskSchema,
  }]
});

const User = model<IUserDTO>("User", userSchema);

export default User;
