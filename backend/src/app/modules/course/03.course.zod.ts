import * as z from "zod";

const preRequisiteCourseSchemaValidation = z.object({
    course: z.string(),// Assuming course is a valid Mongoose ObjectId string
    isDeleted: z.boolean(),
});

const courseSchemaValidation = z.object({
    body: z.object({

        title: z.string().trim(),
        prefix: z.string().trim(),
        code: z.number().positive(),
        credit: z.number().positive(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(preRequisiteCourseSchemaValidation).optional(),

    })
})

const updateCourseSchemaValidation = z.object({
    body: z.object({

        title: z.string().trim().optional(),
        prefix: z.string().trim().optional(),
        code: z.number().positive().optional(),
        credit: z.number().positive().optional(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(preRequisiteCourseSchemaValidation).optional(),

    })
})

export const courseValidation = {
    courseSchemaValidation,
    updateCourseSchemaValidation
};
