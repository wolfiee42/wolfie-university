import express from 'express';

const route = express.Router();

route.get('/create-student ', userControllers.createStudent)

export const userRouter = route;