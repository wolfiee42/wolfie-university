import express from 'express';
import { studentController } from './05.student.controller';

const router = express.Router();

// getting a single students data 
router.get('/:studentId', studentController.getSingleStudent)

// delete a single students data 
router.delete('/:id', studentController.deleteSingleStudent)

// getting all students data alLtogether
router.get('/', studentController.getAllStudents)

export const StudentRoutes = router;