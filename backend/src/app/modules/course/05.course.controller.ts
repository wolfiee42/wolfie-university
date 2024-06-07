import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { courseService } from "./06.course.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCourse = catchAsync(async (req: Request, res: Response) => {

    const payload = req.body;
    const result = await courseService.createCourseInDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course Create Successfully.",
        data: result
    })

})

const displayAllCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await courseService.getAllCourseFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Course are live!",
        data: result
    })
})

const displaySingleCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await courseService.getSingleCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is live!",
        data: result
    })

})

const deleteACourse = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await courseService.deleteAcourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is removed!",
        data: result
    })


})


export const courseController = {
    createCourse,
    displayAllCourse,
    displaySingleCourse,
    deleteACourse
}