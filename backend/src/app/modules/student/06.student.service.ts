import mongoose, { startSession } from "mongoose";
import { studentModel } from "./02.student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { userModel } from "../user/02.user.model";




// get a single students information
const getSingleStudentFromDB = async (studentId: string) => {

    // without aggregate
    const result = await studentModel.findOne({ id: studentId });


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
        const deletedStudent = await studentModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );
        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'The Student is not deleted.');
        }

        //delete user  // transaction-02
        const deletedUser = await userModel.findOneAndUpdate(
            { id },
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
const getAllStudentsFromDB = async () => {
    const result = await studentModel.find().populate('academicDepartment');
    return result;
}



export const studentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB
}