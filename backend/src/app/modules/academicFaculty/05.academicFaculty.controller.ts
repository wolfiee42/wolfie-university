import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicFacultyService } from "./06.academicFaculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
    const academicfaculty = req.body;
    const result = await academicFacultyService.storeAcademicFacultyInDB(academicfaculty);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester is created!',
        data: result
    })
});

const displaySingleFaculty = catchAsync(async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result = await academicFacultyService.getSingleFaculty(facultyId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester is Live!',
        data: result
    })
})

const displayAllFaculty = catchAsync(async (req: Request, res: Response) => {
    const result = await academicFacultyService.getAllFaculty();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic Semesters are live!',
        data: result
    })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {

    const { facultyId } = req.params;
    const payload = req.body;

    const result = await academicFacultyService.updateFacultyInfo(facultyId, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty's information is Updated.",
        data: result
    })
})


export const academicFacultyController = {
    createAcademicFaculty,
    displaySingleFaculty,
    displayAllFaculty,
    updateFaculty
}