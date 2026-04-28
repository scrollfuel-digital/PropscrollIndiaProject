import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String, // better than Number for phone
      required: true
    },
    email: {
      type: String,
      required: true
    },
    service: {
      type: String,
      required: true,
      enum: [
        "General Inquiry",
        "Buy Property",
        "Sell My Property",
        "Rent / Lease",
        "Investment Advice",
        "Legal Verification",
        "Partnership / B2B"
      ],
    },
    location: {
      type: String,
      required: true,
      enum: [
        "Nagpur",
        "Mumbai",
        "Pune",
        "Wardha",
        "Amravati",
        "Chandrapur",
        "Akola",
        "Other"
      ]
    },

    // add this 
    budgetRange: {
      type: String,
      required: true,
      enum: [
        "Under ₹25L",
        "₹25L - ₹50L",
        "₹50L - ₹1Cr",
        "₹1Cr - ₹3Cr",
        "₹3Cr+"
      ]
    },

    message: {
      type: String
    }

  },
  { timestamps: true }
);

export default mongoose.model("Contact", ContactSchema);