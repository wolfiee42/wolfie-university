import { Schema, model } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./01.course.interface";


const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: Number,
        trim: true,
        required: true
    },
    credit: {
        type: Number,
        trim: true,
        required: true
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
})

export const courseModel = model<TCourse>('Course', courseSchema);