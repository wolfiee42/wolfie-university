import { Router } from "express";
import { StudentRoutes } from "../modules/student/04.student.route";
import { userRouter } from "../modules/user/04.user.route";
import { academicSemesterRoutes } from "../modules/academicSemester/04.academicSemester.route";
import { academicFacultyRoute } from "../modules/academicFaculty/04.academicFaculty.route";
import { academicDepartmentRoute } from "../modules/academicDepartment/04.academicDepartment.route";

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
    {
        path: '/academic-faculty',
        route: academicFacultyRoute
    },
    {
        path: '/academic-department',
        route: academicDepartmentRoute
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route))


export default router;