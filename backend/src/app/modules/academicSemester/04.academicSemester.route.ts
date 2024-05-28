import express from "express"
import { Router } from "express";
import { academicController } from "./05.academicSemester.controller";
import validateRequest from "../../middlewares/validateRequests";
import { academicValidationSchema } from "./03.academicSemester.validation";

const route = express.Router()

route.post('/create-academic-semester', validateRequest(academicValidationSchema), academicController.createSemester)

route.get('/', academicController.displayAllSemester)

route.get('/:id', academicController.displaySingleSemester)
export const academicSemesterRoutes = route;