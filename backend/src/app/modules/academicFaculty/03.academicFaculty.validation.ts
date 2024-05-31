import { z } from 'zod';

const createAcademicFacultyValidation = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required.',
            invalid_type_error: 'Invalid field type.'
        })
    })
})

const updateAcademicFacultyvalidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Invalid field type.'
        })
    })
})

export const academicFacultyValidation = {
    createAcademicFacultyValidation,
    updateAcademicFacultyvalidation
};