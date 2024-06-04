import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";
import configaration from "../configaration";
import handleZodError from "../errors/handleZodError";
import handlerValidationError from "../errors/handleValidationError";

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


    if (err instanceof ZodError) {

        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSourse = simplifiedError.errorSourse

    } else if (err.name === "ValidationError") {

        const simplifiedError = handlerValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSourse = simplifiedError.errorSourse;

    }

    // ultimate error handler
    return res.status(statusCode).json({

        success: false,
        message,
        errorSourse,
        stack: configaration.environment === 'development' ? err.stack : null

    })
}

export default globalErrorHandler; 