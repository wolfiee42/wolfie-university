import mongoose, { startSession } from "mongoose";
import { studentModel } from "./02.student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { userModel } from "../user/02.user.model";
import { TStudent } from "./01.student.interface";




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
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {

    const queryObj = { ...query };
    let searchTerm = '';
    let sort = '-createdAt';
    let limit = 1;
    let page = 1;
    let skip = 0;
    let fields = '-__v';


    const serachableFieldForStudent: string[] = ['email', 'name.firstName', 'presentAddress.district'];

    if (query?.searchTerm) {
        searchTerm = query.searchTerm as string;
    }

    const excludedFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    console.log({ queryObj }, { query });


    const studentQuery = studentModel.find({
        $or: serachableFieldForStudent.map((field) => ({
            [field]: {
                $regex: searchTerm,
                $options: 'i',
            }
        }))
    })

    const filterQuery = studentQuery.find(queryObj);

    if (query.sort) {
        sort = query.sort as string;
    }

    const sortQuery = filterQuery.sort(sort);

    if (query.limit) {
        limit = Number(query.limit);
    }

    if (query.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }

    const paginateQuery = sortQuery.skip(skip);

    const limitQuery = paginateQuery.limit(limit);


    if (query.fields) {
        fields = (query.fields as string).split(',').join(' ');
    }

    const fieldQuery = await limitQuery.select(fields);


    return fieldQuery;
}


// update student information
const updateStudentInfoInDB = async (studentId: string, payload: Partial<TStudent>) => {

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


    const result = await studentModel.findOneAndUpdate(
        { id: studentId },
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