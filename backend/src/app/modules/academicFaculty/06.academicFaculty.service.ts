import { TAcademicFaculty } from "./01.academicFaculty.interface";
import { AcademicFacultyModel } from "./02.academicFaculty.model";

const storeAcademicFacultyInDB = async (payload: TAcademicFaculty) => {

    const result = await AcademicFacultyModel.create(payload);
    return result;
}


const getSingleFaculty = async (facultyId: string) => {
    const result = await AcademicFacultyModel.findById(facultyId);

    return result;
}


const getAllFaculty = async () => {
    const result = await AcademicFacultyModel.find();
    return result;
}

const updateFacultyInfo = async (id: string, docs: Partial<TAcademicFaculty>) => {
    const result = await AcademicFacultyModel.findOneAndUpdate(
        { _id: id }, docs, { new: true }
    )
    return result;
}


export const academicFacultyService = {
    storeAcademicFacultyInDB,
    getSingleFaculty,
    getAllFaculty,
    updateFacultyInfo
}