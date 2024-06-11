import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { SemesterRegistrationValidations } from './03.semesterRegistration.zod';
import { SemesterRegistrationController } from './05.semesterRegistration.controller';

const router = express.Router();

router.post(
    '/create-semester-registration',
    validateRequest(
        SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.createSemesterRegistration,
);

router.get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
    '/:id',
    validateRequest(
        SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.updateSemesterRegistration,
);

router.get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
);

router.delete(
    '/:id',
    SemesterRegistrationController.deleteSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;