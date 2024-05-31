import { Router } from "express";
import { academicFacultyController } from "./05.academicFaculty.controller";
import { academicFacultyValidation } from "./03.academicFaculty.validation";
import validateRequest from "../../middlewares/validateRequests";

const route = Router()

route.post('/create-academic-faculty', validateRequest(academicFacultyValidation.createAcademicFacultyValidation), academicFacultyController.createAcademicFaculty);

route.get('/all-faculty', academicFacultyController.displayAllFaculty)

route.get('/:facultyId', academicFacultyController.displaySingleFaculty)

route.patch('/:facultyId', validateRequest(academicFacultyValidation.updateAcademicFacultyvalidation), academicFacultyController.updateFaculty)


export const academicFacultyRoute = route;