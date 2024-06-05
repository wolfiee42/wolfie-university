import { Request, RequestHandler, Response } from "express";
import { studentServices } from "./06.student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


// get a single students information
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'The students information is now live',
        data: result
    })

})


// delete students information
const deleteSingleStudent: RequestHandler = catchAsync(async (req, res) => {

    const id = req.params.id;
    const result = await studentServices.deleteStudentFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'The students information is now deleted.',
        data: result
    })

})


// get all student information
const getAllStudents: RequestHandler = catchAsync(async (req, res) => {

    const result = await studentServices.getAllStudentsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'The student list is now live!',
        data: result
    })

})

// update a single student information 
const updateStudentInfo = catchAsync(async (req: Request, res: Response) => {

    const { studentId } = req.params;
    const { student } = req.body;

    const result = await studentServices.updateStudentInfoInDB(studentId, student);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student information updated.',
        data: result
    })
})

export const studentController = {
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent,
    updateStudentInfo
}