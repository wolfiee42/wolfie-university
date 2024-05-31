import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./01.academicFaculty.interface";

export const academicFacultySchema = new Schema<TAcademicFaculty>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export const AcademicFacultyModel = model<TAcademicFaculty>('Academic Faculty', academicFacultySchema)