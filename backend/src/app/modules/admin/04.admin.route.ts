import express from 'express';
import { AdminControllers } from './05.admin.controller';
import validateRequest from '../../middlewares/validateRequests';
import { updateAdminValidationSchema } from './03.admin.zod';
const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
    '/:id',
    validateRequest(updateAdminValidationSchema),
    AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;