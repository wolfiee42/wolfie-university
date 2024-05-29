import express from "express"
import { Router } from "express";
import { academicController } from "./05.academicSemester.controller";
import validateRequest from "../../middlewares/validateRequests";
import { academicValidationSchema, updateAcademicValidationSchema } from "./03.academicSemester.validation";

const route = express.Router()

route.post('/create-academic-semester', validateRequest(academicValidationSchema), academicController.createSemester)

route.get('/', academicController.displayAllSemester)

route.get('/:id', academicController.displaySingleSemester)

route.patch('/:id', validateRequest(updateAcademicValidationSchema), academicController.updateSemester)




export const academicSemesterRoutes = route;