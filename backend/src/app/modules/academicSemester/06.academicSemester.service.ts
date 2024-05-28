import { SemesterNameAndCodeMapper } from "./00.academic.constants"
import { TAcademicSemester } from "./01.academicSemester.interface"
import { academicModel } from "./02.academicSemester.model"

const storeAcademicSemesterToDB = async (payload: TAcademicSemester) => {

    if (SemesterNameAndCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code.')
    }

    const result = await academicModel.create(payload)
    return result
}


const getSingleSemesterFromDb = async (id: string) => {
    const result = await academicModel.find({ _id: id });
    return result;
}


const getAllSemesterFromDB = async () => {
    const result = await academicModel.find();
    return result;
}

export const academicSemesterService = {
    storeAcademicSemesterToDB,
    getSingleSemesterFromDb,
    getAllSemesterFromDB
}