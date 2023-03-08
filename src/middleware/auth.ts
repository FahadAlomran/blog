import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

interface User {
  id: string;
  userName: string;
}
const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
          return  res.status(403).json({
            msg: "please login agian",
          })
        ;
        }
        const user = jwt.verify(token, process.env.myscret as string) as User;
        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error);
        
    }
 
};

export default auth