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


// Faculty ID
export const findLastFacultyId = async () => {
    const lastFaculty = await userModel.findOne(
        {
            role: 'faculty',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
    let currentId = (0).toString();
    const lastFacultyId = await findLastFacultyId();

    if (lastFacultyId) {
        currentId = lastFacultyId.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `F-${incrementId}`;

    return incrementId;
};


export const findLastAdminId = async () => {
    const lastAdmin = await userModel.findOne(
        {
            role: 'admin',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
    let currentId = (0).toString();
    const lastAdminId = await findLastAdminId();

    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `A-${incrementId}`;
    return incrementId;
};