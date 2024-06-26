import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync"
import { academicSemesterService } from "./06.academicSemester.service"
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createSemester = catchAsync(async (req: Request, res: Response) => {
    const result = await academicSemesterService.storeAcademicSemesterToDB(req.body);

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

const updateSemester = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const payload = req.body;

    const result = await academicSemesterService.updateSemesterInformation(id, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Semester's Information is Updated.",
        data: result
    })
})

export const academicController = {
    createSemester,
    displaySingleSemester,
    displayAllSemester,
    updateSemester
} 