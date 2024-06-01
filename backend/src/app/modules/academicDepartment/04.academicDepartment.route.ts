import { Router } from "express";
import { academicDepartmentController } from "./05.academicDepartment.controller";
import validateRequest from "../../middlewares/validateRequests";
import { departmentValidation } from "./03.academicDepartment.validation";

const route = Router();


route.post('/create-academic-department', validateRequest(departmentValidation.createAcademicDepartmentValidation), academicDepartmentController.createAcademicDepartment)

route.get('/all-department', academicDepartmentController.displayAllDepartment)

route.get('/:departmentId', academicDepartmentController.displaySingleDepartment)

route.patch('/:departmentId', validateRequest(departmentValidation.updateAcademicDepartmentValidation), academicDepartmentController.updateDepartment)


export const academicDepartmentRoute = route;