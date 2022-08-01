import { Day } from "../types/enums/day-enum";
import { Status } from "../types/enums/status-enum";

const Joi = require("joi");

export const taskSchema = Joi.object({
    name: Joi.string().min(5).required(),
    time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    day: Joi.string().valid(
        Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY, Day.SATURDAY, Day.SUNDAY
    ).required(),
    status: Joi.number().valid(
        Status.PENDING, Status.PROCESS, Status.COMPLETE
    ).required(),
});

export const templateSchema = Joi.object({
    name: Joi.string().min(5).required(),
    description: Joi.string().min(30).required(),
    creatorId: Joi.string().required(),
    isPublic: Joi.boolean().required(),
    tasks: Joi.array().items(taskSchema),
});

