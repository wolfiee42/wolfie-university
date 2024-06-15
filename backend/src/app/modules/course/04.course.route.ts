import { Router } from "express";
import { courseController } from "./05.course.controller";
import validateRequest from "../../middlewares/validateRequests";
import { courseValidation } from "./03.course.zod";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/00.user.constant";

const route = Router();

route.post('/create-course', validateRequest(courseValidation.courseSchemaValidation), courseController.createCourse);

route.get('/', auth(USER_ROLE.admin), courseController.displayAllCourse)

route.get('/:id', courseController.displaySingleCourse)

route.delete('/:id', courseController.deleteACourse)

route.patch('/:id', validateRequest(courseValidation.updateCourseSchemaValidation), courseController.updateAcourse)

route.put('/:courseaId/assign-faculties', courseController.assignFacultiesWithDB)

export const CourseRoute = route;