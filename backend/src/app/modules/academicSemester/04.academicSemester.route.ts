import { Router } from "express";
import { academicController } from "./05.academicSemester.controller";

const route = Router()

route.post('/create-academic-semester', academicController.createSemester)

export const academicSemesterRoutes = route;