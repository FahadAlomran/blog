import  { Request, Response } from "express";
import {prisma} from "../config/db";

export const creatblog=async (req: Request, res: Response)=>{
   let blog= await prisma.blog.create({
        data:{
            titile:req.body.titile,
            userID:res.locals.user.id
        }
    })
    res.json({
        blog
    })
}

export const Updateblog=async (req: Request, res: Response)=>{
    let blog=  await prisma.blog.updateMany({
        where:{
            id:req.params.id,
            userID:res.locals.user.id
        },
        data:{
            titile:req.body.titile  
        }
    })
    res.json({
        blog
    })
}

export const getAllblog=async (req: Request, res: Response)=>{
  let blog=  await prisma.blog.findMany({
        where:{
            userID:res.locals.user.id
        },
       
    })
    res.json({
        blog
    })
}

export const deletblog=async (req: Request, res: Response)=>{
    let blog=  await prisma.blog.deleteMany({
          where:{
            id:req.params.id,
            userID:res.locals.user.id
          },
         
      })
      res.json({
          msg:'blog deleted'
      })
  }

