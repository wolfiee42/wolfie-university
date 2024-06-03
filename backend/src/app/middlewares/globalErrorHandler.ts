import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import configaration from "../configaration";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    // setting default value
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";


    let errorSourse: TErrorSource = [
        {
            path: "",
            message: ""
        }
    ]

    const handleZodError = (err: ZodError) => {
        const statusCode = 400;

        const errorSourse: TErrorSource = err.issues.map((issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue.message
            }
        })

        return {
            statusCode,
            message: "Zod Validation error.",
            errorSourse,
            stack: configaration.environment === 'development' ? err?.stack : null,
        }

    }


    if (err instanceof ZodError) {

        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSourse = simplifiedError?.errorSourse;

        console.log(simplifiedError);

    }


    return res.status(statusCode).json({
        success: false,
        message,
        errorSourse,
    })
}

export default globalErrorHandler; 