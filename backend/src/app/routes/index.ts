import { Router } from "express";
import { StudentRoutes } from "../modules/student/04.student.route";
import { userRouter } from "../modules/user/04.user.route";

const router = Router();


const moduleRoutes = [
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/students',
        route: StudentRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route))

router.use('/users', userRouter)
router.use('/students', StudentRoutes);


export default router;