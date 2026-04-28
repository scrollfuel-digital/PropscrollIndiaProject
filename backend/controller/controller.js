import "../database/conn.js";
import ConatctModel from "../model/ConatctModel.js";
import EnquiryModel from "../model/EnquiryModel.js";
let CreateForm = async (req, res) => {
    try {
        const { name, email, phone, service, location, budgetRange, message } = req.body;
        if (!name || !email || !phone || !service || !location || !budgetRange || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const normalizedBudget = budgetRange.replace(/–/g, "-");
        const newContact = await ConatctModel.create({
            name,
            email,
            phone,
            service,
            location,
            budgetRange: normalizedBudget,
            message,
        });
        res.status(201).json({
            success: true,
            message: "Got the Lead Successfully",
            data: newContact
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while submitting the form",
            error: err.message
        })
    }

}

let CreateAllEnquiries = async (req, res) => {
    try {
        const { name, phone, details } = req.body;
        if (!name || !phone || !details) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const enquiries = await EnquiryModel.create({
            name,
            phone,
            details
        });
        res.status(200).json({
            success: true,
            message: "Enquiries created successfully",
            data: enquiries
        })

        console.log(req.body);
        console.log("enquiry created");

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while creating enquiries",
            error: err.message
        })
    }
}
export { CreateForm, CreateAllEnquiries }