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
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while creating enquiries",
            error: err.message
        })
    }
}
let GetAllContacts = async (req, res) => {
    try {
        const contacts = await ConatctModel.find().sort({ createdAt: -1 }).lean();
        res.status(200).json({ success: true, data: contacts });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch contacts", error: err.message });
    }
};

let GetAllEnquiries = async (req, res) => {
    try {
        const enquiries = await EnquiryModel.find().sort({ _id: -1 }).lean();
        res.status(200).json({ success: true, data: enquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch enquiries", error: err.message });
    }
};

let GetNotifications = async (req, res) => {
    try {
        const [contacts, enquiries] = await Promise.all([
            ConatctModel.find().sort({ createdAt: -1 }).limit(10).lean(),
            EnquiryModel.find().sort({ _id: -1 }).limit(10).lean(),
        ]);

        const notifications = [
            ...contacts.map(c => ({
                _id: c._id,
                type: "contact",
                title: `New contact from ${c.name}`,
                subtitle: `${c.service} · ${c.location}`,
                time: c.createdAt,
            })),
            ...enquiries.map(e => ({
                _id: e._id,
                type: "enquiry",
                title: `Enquiry from ${e.name}`,
                subtitle: e.details?.slice(0, 60),
                time: null,
            })),
        ];

        res.status(200).json({ success: true, data: notifications });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch notifications", error: err.message });
    }
};

let GetDashboardStats = async (req, res) => {
    try {
        const [totalContacts, totalEnquiries, recentContacts, recentEnquiries] = await Promise.all([
            ConatctModel.countDocuments(),
            EnquiryModel.countDocuments(),
            ConatctModel.find().sort({ createdAt: -1 }).limit(5).lean(),
            EnquiryModel.find().sort({ _id: -1 }).limit(5).lean(),
        ]);
        res.status(200).json({
            success: true,
            data: {
                totalContacts,
                totalEnquiries,
                recentContacts,
                recentEnquiries,
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch stats", error: err.message });
    }
};

export { CreateForm, CreateAllEnquiries, GetDashboardStats, GetNotifications, GetAllContacts, GetAllEnquiries };