import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentService } from "./06.academicDepartment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAcademicDepartment = catchAsync(async (req: Request, res: Response) => {

    const departmentInformation = req.body;
    const result = await AcademicDepartmentService.storeAcademicDepartmentInDB(departmentInformation);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department is created!',
        data: result
    })

})

const displayAllDepartment = catchAsync(async (req: Request, res: Response) => {

    const result = await AcademicDepartmentService.getAllDepartment();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic Department are live!',
        data: result
    })
})

const displaySingleDepartment = catchAsync(async (req: Request, res: Response) => {

    const { departmentId } = req.params;
    const result = await AcademicDepartmentService.getSingleDepartment(departmentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department is Live!',
        data: result
    })
})


const updateDepartment = catchAsync(async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const departmentInfo = req.body;

    const result = await AcademicDepartmentService.updateDepartmentInfo(departmentId, departmentInfo);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department's information is Updated.",
        data: result
    })
})

export const academicDepartmentController = {
    createAcademicDepartment,
    displayAllDepartment,
    displaySingleDepartment,
    updateDepartment
}