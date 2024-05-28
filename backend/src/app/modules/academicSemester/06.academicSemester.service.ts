import { TAcademicSemester } from "./01.academicSemester.interface"
import { academicModel } from "./02.academicSemester.model"

const storeAcademicSemesterToDB = async (payload: TAcademicSemester) => {
    const result = await academicModel.create(payload)
    return result
}


export const academicSemesterService = {
    storeAcademicSemesterToDB,
}