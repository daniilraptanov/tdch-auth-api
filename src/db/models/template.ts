import { Schema, model, connect } from "mongoose";
import { ITask, ITemplate } from "../../types/models/template";
import { Day } from "../../types/enums/day-enum";
import { Status } from "../../types/enums/status-enum";


export const taskSchema = new Schema<ITask>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    time: { type: String, required: true },
    day: {
        type: Number,
        enum: [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY, Day.SATURDAY, Day.SUNDAY],
        default: Day.MONDAY,
    },
    status: {
        type: Number,
        enum: [Status.PENDING, Status.PROCESS, Status.COMPLETE],
        default: Status.PENDING
    }
}, { _id : false });

export const templateSchema = new Schema<ITemplate>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  creatorId: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  tasks: [taskSchema],
}, { _id : false });

const Template = model<ITemplate>("Template", templateSchema);

export default Template;
