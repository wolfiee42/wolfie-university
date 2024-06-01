import { TAcademicDepartment } from "./01.academicDepartment.interface";
import { AcademicDepartmentModel } from "./02.academicDepartment.model";

const storeAcademicDepartmentInDB = async (departmentInfo: TAcademicDepartment) => {
    const result = await AcademicDepartmentModel.create(departmentInfo)
    return result;
}

const getAllDepartment = async () => {
    const result = await AcademicDepartmentModel.find();
    return result
}

const getSingleDepartment = async (departmentId: string) => {
    const result = await AcademicDepartmentModel.findById(departmentId);
    return result;
}

const updateDepartmentInfo = async (departmentId: string, payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartmentModel.findOneAndUpdate(
        { _id: departmentId },
        payload,
        { new: true }
    )
    return result;
}

export const AcademicDepartmentService = {
    storeAcademicDepartmentInDB,
    getAllDepartment,
    getSingleDepartment,
    updateDepartmentInfo
}