import mongoose from "mongoose";
import configaration from "../../configaration";
import { academicModel } from "../academicSemester/02.academicSemester.model";
import { TStudent } from "../student/01.student.interface";
import { studentModel } from "../student/02.student.model";
import { TUser } from "./01.user.interface";
import { userModel } from "./02.user.model";
import { generateStudentID } from "./07.user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// create student
const createStudentToDB = async (password: string, studentInfo: TStudent) => {

    const userData: Partial<TUser> = {}

    // if password is not given, use default password
    userData.password = password || configaration.default_password as string

    // find academic semester info
    const admissionSemester = await academicModel.findById(studentInfo.academicSemester)

    // role define
    userData.role = 'student';

    // Transaction & Rollback
    const session = await mongoose.startSession();

    try {
        // startting the session
        session.startTransaction();

        // user id
        if (admissionSemester) {
            userData.id = await generateStudentID(admissionSemester);
        } else {
            console.warn("Admission semester not available for student ID generation.");   // Handle the case where admissionSemester is null (e.g., log a warning)
        }

        // create a user  // transaction-01
        const newUser = await userModel.create([userData], { session });

        // create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User.')
        }
        // set id, _id as user
        studentInfo.id = newUser[0].id;
        studentInfo.user = newUser[0]._id;


        // create a student  // transaction-02
        const newStudent = await studentModel.create([studentInfo], { session });

        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Student.')
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
    }




}

export const userServices = {
    createStudentToDB
}