import mongoose, { startSession } from "mongoose";
import { studentModel } from "./02.student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { userModel } from "../user/02.user.model";
import { TStudent } from "./01.student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { serachableFieldForStudent } from "./00.student.constants";




// get a single students information
const getSingleStudentFromDB = async (id: string) => {

    // without aggregate
    const result = await studentModel.findById(id);


    // with aggregate
    // const result = await studentModel.aggregate([
    //     { $match: { email: email } }
    // ])
    return result;
}

// get a single students information
const deleteStudentFromDB = async (id: string) => {

    // starting Transaction & Rollback
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        //delete Student  // transaction-01
        const deletedStudent = await studentModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session }
        );
        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'The Student is not deleted.');
        }

        // get user _id from deletedStudent
        const userId = deletedStudent.id;


        //delete user  // transaction-02
        const deletedUser = await userModel.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session }
        );
        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'The USer is not deleted.');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
    }


}


// get all student information 
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {


    if (query) {
        const studentQuery = new QueryBuilder(studentModel.find(), query)
            .search(serachableFieldForStudent)
            .filter()
            .sort()
            .paginate()
            .fields();

        const result = await studentQuery.modelQuery;
        return result;
    }

    const result = await studentModel.find();
    return result;

}


// update student information
const updateStudentInfoInDB = async (id: string, payload: Partial<TStudent>) => {

    /*
    guardian:{
        fatherOccuoation :"Teacher"
    }

    guardian.fatherOccupation: "Teacher"

    */


    const { name, guardian, presentAddress, permanentAddress, localGuardian, ...remainingStudentData } = payload


    const modifiedDataa: Record<string, unknown> = {
        ...remainingStudentData
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedDataa[`name.${key}`] = value;
        }
    }
    if (presentAddress && Object.keys(presentAddress).length) {
        for (const [key, value] of Object.entries(presentAddress)) {
            modifiedDataa[`presentAddress.${key}`] = value;
        }
    }
    if (permanentAddress && Object.keys(permanentAddress).length) {
        for (const [key, value] of Object.entries(permanentAddress)) {
            modifiedDataa[`permanentAddress.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedDataa[`localGuardian.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedDataa[`guardian.${key}`] = value;
        }
    }


    const result = await studentModel.findByIdAndUpdate(
        id,
        modifiedDataa,
        { new: true, runValidators: true }
    )

    return result;

}


export const studentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentInfoInDB
}