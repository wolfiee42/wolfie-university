import { RequestHandler } from "express";
import { userServices } from "./06.user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


// create student
const createStudent: RequestHandler = catchAsync(async (req, res) => {

    const { password, student: studentData } = req.body;

    const result = await userServices.createStudentToDB(password, studentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New student successfully added to the system.',
        data: result
    })

})


const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;

    const result = await userServices.createFacultyIntoDB(password, facultyData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is created succesfully',
        data: result,
    });
});


const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    const result = await userServices.createAdminIntoDB(password, adminData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});

export const userControllers = {
    createStudent,
    createFaculty,
    createAdmin
}