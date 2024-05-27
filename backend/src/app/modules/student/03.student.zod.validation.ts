import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z.string().nonempty('First name is required'),
    middlename: z.string().optional(),
    lastName: z.string().nonempty('Last name is required'),
});

const addressValidationSchema = z.object({
    house: z.string().nonempty('House number is required'),
    road: z.string().nonempty('Road name is required'),
    village: z.string().nonempty('Village name is required'),
    district: z.string().nonempty('District name is required'),
    division: z.string().nonempty('Division name is required'),
    country: z.string().nonempty('Country name is required'),
});

const guardianValidationSchema = z.object({
    fatherName: z.string().nonempty('Father name is required'),
    fatherContactNo: z.number().positive('Contact number must be positive'),
    fatherOccupation: z.string().nonempty('Father occupation is required'),
    motherName: z.string().nonempty('Mother name is required'),
    motherContactNo: z.number().positive('Contact number must be positive'),
    motherOccupation: z.string().nonempty('Mother occupation is required'),
});

const localGuardianValidationSchema = z.object({
    name: userNameValidationSchema,
    occupation: z.string().nonempty('Occupation is required'),
    presentAddress: addressValidationSchema,
    contantNo: z.string().regex(/^\d+$/, 'Contact number must be digits only'),
});

const studentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(['Male', 'Female']),
            email: z.string().email('Invalid email format').optional(),
            contantNo: z.number().positive('Contact number must be positive'),
            emergencyContactNo: z.number().positive('Contact number must be positive').optional(),
            bloodGroup: z.enum(['A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            guardian: guardianValidationSchema,
            presentAddress: addressValidationSchema,
            permanentAddress: addressValidationSchema,
            localGuardian: localGuardianValidationSchema,
        })
    })
})


export const studentValidation = {
    studentValidationSchema,
}