import { z } from "zod";

const createAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Invalid name type.',
            required_error: 'name is required'
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Invalid Academic Department type.',
            required_error: 'Academic Department is required'
        })
    })
})
const updateAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Invalid name type.',
            required_error: 'name is required'
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: 'Invalid Academic Department type.',
            required_error: 'Academic Department is required'
        }).optional()
    })
})

export const departmentValidation = {
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation
}