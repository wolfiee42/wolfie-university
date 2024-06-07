import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { updateFacultyValidationSchema } from './03.faculty.zod';
import { FacultyControllers } from './05.faculty.controller';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;