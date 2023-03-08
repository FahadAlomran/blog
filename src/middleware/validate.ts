import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";


const validate = (schema:AnyZodObject)=> (req:Request, res:Response, next:NextFunction)=>{


    try{
        schema.parse({
            body:req.body,
            params:req.params,
            query:req.query,
            headers:req.headers
        })

    }catch(err){
        const zodError = err as ZodError;
        return res.status(400).json( {
            message: zodError.errors[0].message
        })
    }
    next()

}

export default validate;