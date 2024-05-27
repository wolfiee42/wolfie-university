import { z } from "zod";
import { TCodeCons, TMonths, TNameCons } from "./00.academic.constants";

const academicValidationSchema = z.object({
    name: z.enum([...TNameCons] as [string, ...string[]]),
    year: z.date(),
    code: z.enum([...TCodeCons] as [string, ...string[]]),
    startMonth: z.enum([...TMonths] as [string, ...string[]]),
    endMonth: z.enum([...TMonths] as [string, ...string[]]),
})