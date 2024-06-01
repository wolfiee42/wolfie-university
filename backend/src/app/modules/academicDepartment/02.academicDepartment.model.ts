import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./01.academicDepartment.interface";

const academicDepartment = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            require: true,
            unique: true
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'Academic Faculty'
        }
    },
    {
        timestamps: true,
    }
)

export const AcademicDepartmentModel = model<TAcademicDepartment>('Academic Department', academicDepartment)