import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        console.log('logging from validateRequest');
        try {
            //    validation
            await schema.parseAsync({ body: req.body })
            console.log('logging from inside validateRequest');
            next();
        } catch (error) {
            next(error)
        }
    }
}

export default validateRequest;