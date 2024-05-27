import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./01.academicSemester.interface";
import { TCodeCons, TMonths, TNameCons } from "./00.academic.constants";


const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: TNameCons,
        require: true
    },
    year: {
        type: Date,
        require: true
    },
    code: {
        type: String,
        enum: TCodeCons,
        require: true
    },
    startMonth: {
        type: String,
        enum: TMonths,
        require: true
    },
    endMonth: {
        type: String,
        enum: TMonths,
        require: true
    }
})

export const academicSchemaModel = model<TAcademicSemester>('Academic Semester', academicSemesterSchema)