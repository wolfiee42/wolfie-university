import { Schema, model } from "mongoose";
import { TCourse, TCourseWithFaculties, TPreRequisiteCourses } from "./01.course.interface";


const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
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
    isDeleted: {
        type: Boolean,
        default: false
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
})


const courseWFaculties = new Schema<TCourseWithFaculties>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        unique: true
    },
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: "Faculty"
        }
    ]
})

export const courseWFacultiesModel = model<TCourseWithFaculties>('CourseWithFaculties', courseWFaculties);
export const courseModel = model<TCourse>('Course', courseSchema);