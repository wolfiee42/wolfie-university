import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./06.user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";




const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }
}



// create student
const createStudent: RequestHandler = catchAsync(async (req, res, next) => {

    const { password, student: studentData } = req.body;

    const result = await userServices.createStudentToDB(password, studentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New student successfully added to the system.',
        data: result
    })

})

export const userControllers = {
    createStudent
}