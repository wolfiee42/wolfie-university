import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./00.course.constanct";
import { TCourse } from "./01.course.interface"
import { courseModel } from "./02.course.model"

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

    // step1
    const result = await courseModel.findByIdAndUpdate(
        id,
        courseRemaining,
        { new: true, runValidators: true }
    )
    return result

}

export const courseService = {
    createCourseInDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteAcourseFromDB,
    updateCourseInDB
}