import catchAsync from "../../utils/catchAsync"
import { academicSemesterService } from "./06.academicSemester.service"

const createSemester = catchAsync(async (req, res) => {
    const result = await academicSemesterService.storeAcademicSemesterToDB()
})

export const academicController = {
    createSemester
}