import mongoose, { Schema } from 'mongoose';
import { TOfferedCourse } from './01.offeredCourse.interface';
import { Days } from './00.offeredCourse.constant';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
    {
        semesterRegistration: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'SemesterRegistration',
        },
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Academic Semester',
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Academic Faculty',
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Academic Department',
        },
        course: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'CourseWithFaculties',
        },
        faculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Faculty',
        },
        maxCapacity: {
            type: Number,
            required: true,
        },
        section: {
            type: Number,
            required: true,
        },
        days: [
            {
                type: String,
                enum: Days,
            },
        ],
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const OfferedCourse = mongoose.model<TOfferedCourse>(
    'OfferedCourse',
    offeredCourseSchema,
);