import express from 'express';
import { userControllers } from './05.user.controller';
import { studentValidation } from '../student/03.student.zod.validation';
import validateRequest from '../../middlewares/validateRequests';

const route = express.Router();


route.post('/create-student', validateRequest(studentValidation.studentValidationSchema), userControllers.createStudent)
route.post('/create-faculty', userControllers.createFaculty,);

export const userRouter = route;