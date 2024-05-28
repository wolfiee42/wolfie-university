import { z } from "zod";
import { TCodeCons, TMonths, TNameCons } from "./00.academic.constants";

export const academicValidationSchema = z.object({
    body: z.object({
        name: z.enum([...TNameCons] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...TCodeCons] as [string, ...string[]]),
        startMonth: z.enum([...TMonths] as [string, ...string[]]),
        endMonth: z.enum([...TMonths] as [string, ...string[]]),
    })
})
