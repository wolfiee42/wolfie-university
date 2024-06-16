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
        message: "Course Created Successfully.",
        data: result
    })

})

const displayAllCourse = catchAsync(async (req: Request, res: Response) => {

    const result = await courseService.getAllCourseFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The Course list is now live!",
        data: result
    })

})

const displaySingleCourse = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await courseService.getSingleCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The Course information is now live!",
        data: result
    })

})

const deleteACourse = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await courseService.deleteAcourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The Course is now deleted!",
        data: result
    })


})

const updateAcourse = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await courseService.updateCourseInDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The Course is now Updated!",
        data: result
    })


})


const assignFacultiesWithDB = catchAsync(async (req: Request, res: Response) => {

    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await courseService.assignFacultiesWithCourseInDB(courseId, faculties);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The Course is Assigned with faculties!",
        data: result
    })

})


export const courseController = {
    createCourse,
    displayAllCourse,
    displaySingleCourse,
    deleteACourse,
    updateAcourse,
    assignFacultiesWithDB
}