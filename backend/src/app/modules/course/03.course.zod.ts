import * as z from "zod";

const preRequisiteCourseSchemaValidation = z.object({
    course: z.string(),// Assuming course is a valid Mongoose ObjectId string
    isDeleted: z.boolean().optional(),
});

const courseSchemaValidation = z.object({
    body: z.object({

        title: z.string().trim().nonempty(),
        prefix: z.string().trim().nonempty(),
        code: z.number().positive(), // Ensures positive integer code
        credit: z.number().positive(), // Ensures positive integer credit
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(preRequisiteCourseSchemaValidation).optional(),

    })
})

const updateCourseSchemaValidation = z.object({
    body: z.object({

        title: z.string().trim().nonempty().optional(),
        prefix: z.string().trim().nonempty().optional(),
        code: z.number().positive().optional(), // Ensures positive integer code
        credit: z.number().positive().optional(), // Ensures positive integer credit
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(preRequisiteCourseSchemaValidation).optional(),

    })
})

export const courseValidation = {
    courseSchemaValidation,
    updateCourseSchemaValidation
};
