import { TAcademicSemester } from "../academicSemester/01.academicSemester.interface";
import { userModel } from "./02.user.model";

// generate a 4 digit unique number
// year code 4digitNum
export const generateStudentID = async (payload: TAcademicSemester) => {

    const currentID = (await findlastStudentId()) || (0).toString();
    let increamentedId = (Number(currentID) + 1).toString().padStart(4, '0');

    increamentedId = `${payload.year}${payload.code}${increamentedId}`

    return increamentedId;
}

const findlastStudentId = async () => {
    const lastStudent = await userModel.findOne(
        {
            role: 'student'
        },
        {
            id: 1,
            _id: 0
        }
    )
        .sort({ createdAt: -1 }).lean()

    return lastStudent?.id ? lastStudent?.id.substring(6) : undefined
}