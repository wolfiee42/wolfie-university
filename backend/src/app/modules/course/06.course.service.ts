import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { searchableFields } from "./00.course.constanct";
import { TCourse } from "./01.course.interface"
import { courseModel } from "./02.course.model"
import mongoose from "mongoose";

const createCourseInDB = async (payload: TCourse) => {
    const result = await courseModel.create(payload);
    return result;
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(courseModel.find().populate('preRequisiteCourses.course'), query).search(searchableFields).filter().sort().paginate().fields()

    const result = await courseQuery.modelQuery;
    return result;
}

const getSingleCourseFromDB = async (id: string) => {
    const result = await courseModel.findById(id).populate('preRequisiteCourses.course');
    return result;
}

const deleteAcourseFromDB = async (id: string) => {
    const result = await courseModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    return result;
}

const updateCourseInDB = async (id: string, payload: Partial<TCourse>) => {

    const { preRequisiteCourses, ...courseRemaining } = payload;

    const session = await mongoose.startSession();

    try {
        session.startTransaction()


        // step1
        const updatedBasicCourseInfo = await courseModel.findByIdAndUpdate(
            id,
            courseRemaining,
            { new: true, runValidators: true, session }
        )
        if (!updatedBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to solve basic update course')
        }


        if (preRequisiteCourses && preRequisiteCourses.length > 0) {

            // delete prereqiusites
            const deletedPrerequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course);
            const deletedPrerequisiteCourses = await courseModel.findByIdAndUpdate(
                id,
                { $pull: { preRequisiteCourses: { course: { $in: deletedPrerequisites } } } },
                { new: true, runValidators: true, session }
            )
            if (!deletedPrerequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete pre requisite course')
            }


            // insert new prerequisites
            const newPrerequisites = preRequisiteCourses?.filter(el => el.course && !el.isDeleted)
            const newPrerequisiteCourses = await courseModel.findByIdAndUpdate(id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPrerequisites } },
                },
                { new: true, runValidators: true, session }
            )

            if (!newPrerequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to insert pre requisite course')
            }


        }

        const result = await courseModel.findById(id).populate('preRequisiteCourses.course')

        await session.commitTransaction();
        await session.endSession();


        return result

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to run updateCourseInDB function.')
    }
}

export const courseService = {
    createCourseInDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteAcourseFromDB,
    updateCourseInDB
}