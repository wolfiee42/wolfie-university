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
        type: String,
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


academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExist: boolean = await academicModel.findOne({
        name: this.name,
        year: this.year
    }) as boolean;

    if (isSemesterExist) {
        throw new Error('This semester is not createable !')
    }

    next();
})


export const academicModel = model<TAcademicSemester>('Academic Semester', academicSemesterSchema)