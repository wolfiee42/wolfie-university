import { TAcademicSemester } from "../academicSemester/01.academicSemester.interface";
import { userModel } from "./02.user.model";

// generate a 4 digit unique number
// year code 4digitNum


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

    return lastStudent?.id ? lastStudent?.id : undefined
}


export const generateStudentID = async (payload: TAcademicSemester) => {

    let currentID = (0).toString();

    const lastStudentId = await findlastStudentId();

    const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);

    const currentSemesterYear = payload.year;
    const currentSemesterCode = payload.code;

    if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentSemesterYear === currentSemesterYear) {
        currentID = lastStudentId.substring(6)
    }



    let increamentedId = (Number(currentID) + 1).toString().padStart(4, '0');

    increamentedId = `${payload.year}${payload.code}${increamentedId}`

    return increamentedId;
}

