import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync"
import { academicSemesterService } from "./06.academicSemester.service"
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createSemester = catchAsync(async (req: Request, res: Response) => {
    const result = await academicSemesterService.storeAcademicSemesterToDB(req.body);
    console.log(result);

    sendResponse(res, {
        success: true,
        message: "Academic semester is created!",
        statusCode: httpStatus.OK,
        data: result
    })
})

export const academicController = {
    createSemester
} 