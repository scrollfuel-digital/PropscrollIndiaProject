import express from "express"
import { CreateAllEnquiries, CreateForm, GetDashboardStats, GetNotifications, GetAllContacts, GetAllEnquiries } from "../controller/controller.js"
let router = express.Router()

router.post("/create", CreateForm)
router.post("/enquiries", CreateAllEnquiries)
router.get("/dashboard/stats", GetDashboardStats)
router.get("/notifications", GetNotifications)
router.get("/contacts", GetAllContacts)
router.get("/all-enquiries", GetAllEnquiries)

export default router