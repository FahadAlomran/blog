import { creatblog, deletblog, getAllblog, Updateblog } from "../controller/blog";
import auth from "../middleware/auth";
import express from "express";
let router=express.Router()

router.post('/',auth,creatblog)
router.put('/',auth,Updateblog)
router.get('/',auth,getAllblog)
router.delete('/',auth,deletblog)



export default router