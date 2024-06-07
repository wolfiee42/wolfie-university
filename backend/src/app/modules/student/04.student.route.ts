import express from 'express';
import { studentController } from './05.student.controller';
import validateRequest from '../../middlewares/validateRequests';
import { studentValidation } from './03.student.zod.validation';

const router = express.Router();

// getting a single students data 
router.get('/:id', studentController.getSingleStudent)

// delete a single students data 
router.delete('/:id', studentController.deleteSingleStudent)

// update a single students data 
router.patch('/:id', validateRequest(studentValidation.studentUpdateValidationSchema), studentController.updateStudentInfo)

// getting all students data alLtogether
router.get('/', studentController.getAllStudents)

export const StudentRoutes = router;