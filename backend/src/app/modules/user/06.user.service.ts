import configaration from "../../configaration";
import { TStudent } from "../student/01.student.interface";
import { NewUser } from "./01.user.interface";
import { userModel } from "./02.user.model";

// create student
const createStudentToDB = async (password: string, studentInfo: TStudent) => {

    const user: NewUser = {}

    // if password is not given, use default password
    user.password = password || configaration.default_password as string

    // role define
    user.role = 'student';

    // set id manually 
    user.id = '203010001';

    // create a user
    const result = await userModel.create(user);

    // create a student
    if (Object.keys(result).length) {

        // set id, _id as user
        studentInfo.id = result.id;
        studentInfo.user = result._id
    }

    return result;
}

export const userServices = {
    createStudentToDB
}