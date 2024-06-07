import { TCourse } from "./01.course.interface"
import { courseModel } from "./02.course.model"

const createCourseInDB = async (payload: TCourse) => {
    const result = await courseModel.create(payload);
    return result;
}

const getAllCourseFromDB = async () => {
    const result = await courseModel.find();
    return result;
}

const getSingleCourseFromDB = async (id: string) => {
    const result = await courseModel.findById(id);
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

export const courseService = {
    createCourseInDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteAcourseFromDB
}