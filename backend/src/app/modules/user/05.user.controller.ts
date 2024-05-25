import { userServices } from "./06.user.service";

// create student
const createStudent = async (req: Request, res: Response) => {
    try {

        const { password, student: studentData } = req.body;

        const result = await userServices.createStudentToDB(password, studentData);

        res.status(200).json({
            success: true,
            message: 'New student successfully added to the system.',
            data: result
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something Went Wrong!',
            error: error
        })
    }
}

export const userControllers = {
    createStudent
}