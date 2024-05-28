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

const displaySingleSemester = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicSemesterService.getSingleSemesterFromDb(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Semester is Live!',
        data: result
    })
}

const displayAllSemester = catchAsync(async (req: Request, res: Response) => {
    const result = await academicSemesterService.getAllSemesterFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'All Academic Semesters are live!',
        data: result
    })
})

export const academicController = {
    createSemester,
    displaySingleSemester,
    displayAllSemester
} 