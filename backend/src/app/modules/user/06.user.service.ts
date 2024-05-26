import configaration from "../../configaration";
import { TStudent } from "../student/01.student.interface";
import { studentModel } from "../student/02.student.model";
import { TUser } from "./01.user.interface";
import { userModel } from "./02.user.model";

// create student
const createStudentToDB = async (password: string, studentInfo: TStudent) => {

    const userData: Partial<TUser> = {}

    // if password is not given, use default password
    userData.password = password || configaration.default_password as string

    // role define
    userData.role = 'student';

    // set id manually 
    userData.id = '203010001';

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