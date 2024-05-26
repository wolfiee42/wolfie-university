import express from 'express';
import { userControllers } from './05.user.controller';

const route = express.Router();

route.post('/create-student', userControllers.createStudent)

export const userRouter = route;