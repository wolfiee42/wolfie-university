import mongoose from "mongoose";
import configaration from "../../configaration";
import { academicModel } from "../academicSemester/02.academicSemester.model";
import { TStudent } from "../student/01.student.interface";
import { studentModel } from "../student/02.student.model";
import { TUser } from "./01.user.interface";
import { userModel } from "./02.user.model";
import { generateAdminId, generateFacultyId, generateStudentID } from "./07.user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { AcademicDepartmentModel } from "../academicDepartment/02.academicDepartment.model";
import { Faculty } from "../faculty/02.faculty.model";
import { TFaculty } from "../faculty/01.faculty.interface";
import { Admin } from "../admin/02.admin.model";

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


const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (configaration.default_password as string);

    //set student role
    userData.role = 'faculty';

    // find academic department info
    const academicDepartment = await AcademicDepartmentModel.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await userModel.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};


const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (configaration.default_password as string);

    //set student role
    userData.role = 'admin';

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await userModel.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const userServices = {
    createStudentToDB,
    createFacultyIntoDB,
    createAdminIntoDB
}