import validator from "validator";
import { z } from "zod";

const adminNameValidation = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, { message: "First name is required." })
        .max(20, { message: "Firstname can not have more than 20 characters." })
        .refine((value) => value === value.charAt(0).toUpperCase() + value.slice(1), {
            message: "{VALUE} is not in capitalized format.",
            path: ["firstName"],
        }),
    middleName: z.string().optional(),
    lastName: z
        .string()
        .min(1, { message: "Last name is required." })
        .refine((value) => validator.isAlpha(value), {
            message: "{VALUE} is not valid. Must only contain letters.",
            path: ["lastName"],
        }),
});

const adminAddressValidation = z.object({
    house: z.string().min(1, { message: "House Name is required." }),
    road: z.string().min(1, { message: "Road number is required." }),
    village: z.string().min(1, { message: "Village Name is required." }),
    district: z.string().min(1, { message: "District Name is required." }),
    division: z.string().min(1, { message: "Division Name is required." }),
    country: z.string().min(1, { message: "Country Name is required." }),
});

const adminValidation = z.object({
    name: adminNameValidation,
    id: z.number().positive(),// Assuming unique validation happens during data storage
    user: z.string().cuid(), // Assuming user is a string representation of a CUID
    gender: z.enum(["Male", "Female"]),
    email: z.string().email({ message: "{VALUE} is not a valid email type." }),
    managementDepartment: z.string().min(1, { message: "Management Department Id is Required" }),
    contactnumber: z.number().positive(),
    emergencyContactnumber: z.number().positive(),
    presentAddress: adminAddressValidation,
    permanentAddress: adminAddressValidation,
    profileImage: z.string().url({ message: "Invalid Image URL" }),
    isDeleted: z.boolean(),
});

export default adminValidation;
