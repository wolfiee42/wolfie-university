import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { AuthValidation } from './03.auth.zod';
import { AuthControllers } from './05.auth.controller';

const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
);

router.post(
    '/change-password',
    auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword,
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
);

export const AuthRoutes = router;