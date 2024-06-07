import * as z from "zod";

const preRequisiteCourseSchema = z.object({
    course: z.string(),// Assuming course is a valid Mongoose ObjectId string
    isDeleted: z.boolean().optional(),
});

const courseSchema = z.object({
    body: z.object({

        title: z.string().trim().nonempty(),
        prefix: z.string().trim().nonempty(),
        code: z.number().positive(), // Ensures positive integer code
        credit: z.number().positive(), // Ensures positive integer credit
        preRequisiteCourses: z.array(preRequisiteCourseSchema).optional(),

    })
})

export const validateCourse = courseSchema.safeParse;
