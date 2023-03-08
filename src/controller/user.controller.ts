import { Request, Response } from "express";
import { prisma } from "../config/db";
import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import * as dotenv from "dotenv";
//creat User
export const creatUser = async (req: Request, res: Response) => {
  try {
    let password =await argon2.hash(req.body.password) 
    let adduser = await prisma.user.create({
      data: {
        userName: req.body.name,
        password: password,
        email: req.body.email,
      },
    });
    if (adduser) {
      res.json({
        msg: "uesr created",
      });
    }
  } catch (e) {
    res.send(e);
  }
};
//get all User
export const findAllUser = async (req: Request, res: Response) => {
  try {
    let user = await prisma.test.findMany({
      include: {
        Corrses: true,
      },
    });
    res.json(user);
  } catch (e) {
    res.send(e);
  }
};

//Update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    let updateU = await prisma.test.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
      },
    });
    if (updateU) {
      res.json({
        msg: "uesr Updated",
      });
    }
  } catch (e) {
    res.send(e);
  }
};

//delete User
export const delateUser = async (req: Request, res: Response) => {
  try {
    let deleteU = await prisma.test.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deleteU) {
      res.json({
        msg: "uesr deleted",
      });
    }
  } catch (e) {
    res.send(e);
  }
};

//عند الانشاء اضافه عنصر للجدول الثاني
const creat = async () => {
  let adduser = await prisma.test.create({
    data: {
      name: "rana",
      Corrses: {
        create: [{ corName: "php" }, { corName: "java" }],
      },
    },
  });
  console.log("user created ");
};

export const login = async (req: Request, res: Response) => {
  let user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.json({
      msg: "wrong email or password ",
    });
  } else if (!(await jwt.verify(user.password, req.body.password))) {
    return res.json({
      msg: "wrong email or password ",
    });
  }
  let token = jwt.sign(
    {
      id: user.id,
      userName: user.userName,
    },
    process.env.myscret as string,
    {
      expiresIn: "3h",
    }
  );

  res.json({
    msg: `hello ${user}`,
    token: token,
  });
};
