import{ creatUser, findAllUser , updateUser, delateUser} from '../controller/user.controller'
import express from "express";
let router=express.Router()

// post
router.post("/", creatUser );

//get all data from database
router.get("/", findAllUser);

// update user
router.put("/:id",updateUser);

// delate user
router.delete("/:id", delateUser);

export default router

