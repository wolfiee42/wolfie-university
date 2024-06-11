import express from 'express';
import { OfferedCourseControllers } from './05.offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequests';
import { OfferedCourseValidations } from './03.offeredCourse.zod';

const router = express.Router();

router.get('/', OfferedCourseControllers.getAllOfferedCourses);

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);

router.post(
    '/create-offered-course',
    validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse,
);

router.patch(
    '/:id',
    validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
    OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
    '/:id',
    OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;