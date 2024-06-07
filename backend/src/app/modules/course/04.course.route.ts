import { Router } from "express";
import { courseController } from "./05.course.controller";
import validateRequest from "../../middlewares/validateRequests";
import { courseValidation } from "./03.course.zod";

const route = Router();

route.post('/create-course', validateRequest(courseValidation.courseSchemaValidation), courseController.createCourse);

route.get('/', courseController.displayAllCourse)

route.get('/:id', courseController.displaySingleCourse)

route.delete('/:id', courseController.deleteACourse)

export const CourseRoute = route;