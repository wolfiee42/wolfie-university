import configaration from "../../configaration";
import { TAcademicSemester } from "../academicSemester/01.academicSemester.interface";
import { academicModel } from "../academicSemester/02.academicSemester.model";
import { TStudent } from "../student/01.student.interface";
import { studentModel } from "../student/02.student.model";
import { TUser } from "./01.user.interface";
import { userModel } from "./02.user.model";
import { generateStudentID } from "./07.user.utils";

// create student
const createStudentToDB = async (password: string, studentInfo: TStudent) => {

    const userData: Partial<TUser> = {}

    // if password is not given, use default password
    userData.password = password || configaration.default_password as string

    // find academic semester info
    const admissionSemester = await academicModel.findById(studentInfo.academicSemester)

    // role define
    userData.role = 'student';

    // user id
    if (admissionSemester) {
        userData.id = await generateStudentID(admissionSemester);
    } else {
        console.warn("Admission semester not available for student ID generation.");   // Handle the case where admissionSemester is null (e.g., log a warning)
    }

    // create a user
    const newUser = await userModel.create(userData);

    // create a student
    if (Object.keys(newUser).length) {

        // set id, _id as user
        studentInfo.id = newUser.id;
        studentInfo.user = newUser._id;

        const newStudent = await studentModel.create(studentInfo);
        return newStudent;
    }

    return newUser;
}

export const userServices = {
    createStudentToDB
}