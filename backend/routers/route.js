import express from "express"
import { CreateAllEnquiries, CreateForm } from "../controller/controller.js"
let router = express.Router()

router.post("/create",CreateForm)
router.post("/enquiries", CreateAllEnquiries)
export default router