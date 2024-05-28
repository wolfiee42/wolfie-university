import { Router } from "express";
import { StudentRoutes } from "../modules/student/04.student.route";
import { userRouter } from "../modules/user/04.user.route";
import { academicSemesterRoutes } from "../modules/academicSemester/04.academicSemester.route";

const router = Router();


const moduleRoutes = [
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic',
        route: academicSemesterRoutes
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route))


export default router;