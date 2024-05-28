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
    const result = await academicModel.findById(id);
    return result;
}


const getAllSemesterFromDB = async () => {
    const result = await academicModel.find();
    return result;
}

const updateSemesterInformation = async (id: any, docs: any) => {

    const result = await academicModel.findOneAndUpdate(
        id,
        {
            name: docs.name,
            year: docs.year,
            code: docs.code,
            startMonth: docs.startMonth,
            endMonth: docs.endMonth
        },
        {
            new: true
        })

    return result;
}

export const academicSemesterService = {
    storeAcademicSemesterToDB,
    getSingleSemesterFromDb,
    getAllSemesterFromDB,
    updateSemesterInformation
}