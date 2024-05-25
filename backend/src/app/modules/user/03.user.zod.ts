import { z } from "zod";


export const userValidationSchema = z.object({
    password: z
        .string({
            invalid_type_error: 'Password must be a string.'
        })
        .max(20, 'Password can not be over 20 characters.'),
});