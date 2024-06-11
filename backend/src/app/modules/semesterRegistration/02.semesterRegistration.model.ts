import mongoose, { Schema } from 'mongoose';
import { SemesterRegistrationStatus } from './00.semesterRegistration.constant';
import { TSemesterRegistration } from './01.semesterRegistration.interface';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
    {
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'Academic Semester',
        },
        status: {
            type: String,
            enum: SemesterRegistrationStatus,
            default: 'UPCOMING',
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        minCredit: {
            type: Number,
            default: 3,
        },
        maxCredit: {
            type: Number,
            default: 15,
        },
    },
    {
        timestamps: true,
    },
);

export const SemesterRegistration = mongoose.model<TSemesterRegistration>(
    'SemesterRegistration',
    semesterRegistrationSchema,
);