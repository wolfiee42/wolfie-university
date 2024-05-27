import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import { userControllers } from './05.user.controller';
import { AnyZodObject } from 'zod';
import { studentValidation } from '../student/03.student.zod.validation';
import validateRequest from '../../middlewares/validateRequests';

const route = express.Router();


route.post('/create-student', validateRequest(studentValidation.studentValidationSchema), userControllers.createStudent)

export const userRouter = route;