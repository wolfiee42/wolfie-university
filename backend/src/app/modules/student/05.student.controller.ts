import { NextFunction, Request, Response } from "express";
import { studentServices } from "./06.student.service";



// get a single students information
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const result = await studentServices.getSingleStudentFromDB(email);

        res.status(200).json({
            success: true,
            message: 'The students information is now live',
            data: result
        })

    } catch (error) {
        next(error)
    }
}


// delete students information
const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await studentServices.deleteStudentFromDB(id);

        res.status(200).json({
            success: true,
            message: 'The students information is now deleted.',
            data: result
        })

    } catch (error) {
        next(error)
    }
}


// get all student information
const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await studentServices.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: 'The student list is now live!',
            data: result
        })
    } catch (error) {
        next(error)
    }
}



export const studentController = {
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent
}