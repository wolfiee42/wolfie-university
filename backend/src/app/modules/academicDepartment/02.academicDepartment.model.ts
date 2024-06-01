import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./01.academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartment = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            require: true,
            unique: true
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'Academic Faculty'
        }
    },
    {
        timestamps: true,
    }
)

// checking whether the department is stored before or not in the db. if stored then returning with an error else the function is running as it is.
academicDepartment.pre('save', async function (next) {

    const isDepartmentExist = await AcademicDepartmentModel.findOne({ name: this.name })

    if (isDepartmentExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Department is already exist.')
    }
    next();

});

academicDepartment.pre('findOneAndUpdate', async function (next) {

    const departmentId = this.getQuery();
    const isDepartmentExist = await AcademicDepartmentModel.findOne(departmentId);

    if (!isDepartmentExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Department doesn't Exists.")
    }
    next();

})



export const AcademicDepartmentModel = model<TAcademicDepartment>('Academic Department', academicDepartment)