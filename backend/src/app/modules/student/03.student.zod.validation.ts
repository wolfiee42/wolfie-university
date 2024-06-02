import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z.string().nonempty('First name is required'),
    middleName: z.string().optional(),
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
            academicSemester: z.string(),
            academicDepartment: z.string(),
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

// Update const userNameValidationSchema = z.object({
const userUpdateNameValidationSchema = z.object({
    firstName: z.string().min(2).max(50).nonempty('First name is required').optional(),
    middleName: z.string().min(2).max(50).nonempty('Middle name is required').optional(),
    lastName: z.string().min(2).max(50).nonempty('Last name is required').optional(),
});

const addressUpdateValidationSchema = z.object({
    house: z.string().min(1).max(100).nonempty('House number is required').optional(),
    road: z.string().min(1).max(100).nonempty('Road name is required').optional(),
    village: z.string().min(1).max(100).nonempty('Village name is required').optional(),
    district: z.string().min(1).max(100).nonempty('District name is required').optional(),
    division: z.string().min(1).max(100).nonempty('Division name is required').optional(),
    country: z.string().min(1).max(100).nonempty('Country name is required').optional(),
});

const guardianUpdateValidationSchema = z.object({
    fatherName: z.string().min(2).max(100).nonempty('Father name is required').optional(),
    fatherContactNo: z.string().min(6).max(15).nonempty('Contact number is required').regex(/^\d+$/, 'Contact number must be digits only').optional(),
    fatherOccupation: z.string().min(2).max(100).nonempty('Father occupation is required').optional(),
    motherName: z.string().min(2).max(100).nonempty('Mother name is required').optional(),
    motherContactNo: z.string().min(6).max(15).nonempty('Contact number is required').regex(/^\d+$/, 'Contact number must be digits only').optional(),
    motherOccupation: z.string().min(2).max(100).nonempty('Mother occupation is required').optional(),
});

const localGuardianUpdateValidationSchema = z.object({
    name: userNameValidationSchema.optional(),
    occupation: z.string().min(2).max(100).nonempty('Occupation is required').optional(),
    presentAddress: addressValidationSchema.optional(),
    contactNo: z.string().min(6).max(15).nonempty('Contact number is required').regex(/^\d+$/, 'Contact number must be digits only').optional(),
});

const studentUpdateValidationSchema = z.object({
    student: z.object({
        name: userUpdateNameValidationSchema.optional(),
        gender: z.enum(['Male', 'Female']).optional(),
        email: z.string().email('Invalid email format').optional(),
        academicSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        contactNo: z.string().min(6).max(15).nonempty('Contact number is required').regex(/^\d+$/, 'Contact number must be digits only').optional(),
        emergencyContactNo: z.string().min(6).max(15).nonempty('Contact number is required').regex(/^\d+$/, 'Contact number must be digits only').optional(),
        bloodGroup: z.enum(['A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
        guardian: guardianUpdateValidationSchema.optional(),
        presentAddress: addressUpdateValidationSchema.optional(),
        permanentAddress: addressUpdateValidationSchema.optional(),
        localGuardian: localGuardianUpdateValidationSchema.optional(),
    }).optional(),
});
export const studentValidation = {
    studentValidationSchema,
    studentUpdateValidationSchema
}