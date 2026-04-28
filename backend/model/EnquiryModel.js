import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String, // better than Number for phone
        required: true
    },
    details: {
        type: String,
        required: true
    }
    },
    { timestamp: true }
);

const EnquiryModel = mongoose.model("Enquiry", EnquirySchema);
export default EnquiryModel;