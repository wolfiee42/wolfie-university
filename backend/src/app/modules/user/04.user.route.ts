import express from 'express';
import { userControllers } from './05.user.controller';
import { studentValidation } from '../student/03.student.zod.validation';
import validateRequest from '../../middlewares/validateRequests';
import { AdminValidations } from '../admin/03.admin.zod';

const route = express.Router();


route.post('/create-student', validateRequest(studentValidation.studentValidationSchema), userControllers.createStudent)
route.post('/create-faculty', userControllers.createFaculty,);
route.post('/create-admin', validateRequest(AdminValidations.createAdminValidationSchema), userControllers.createAdmin);

export const userRouter = route;