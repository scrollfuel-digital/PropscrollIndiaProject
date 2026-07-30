import { api } from "./axios";

export interface PropertyPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  type: string;
  price: string;
  size: string;
  description: string;
}

export interface ContactRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  budgetRange: string;
  message: string;
  createdAt: string;
}

export interface EnquiryRecord {
  _id: string;
  name: string;
  phone: string;
  details: string;
}

export const submitPropertyApi = (payload: PropertyPayload) =>
  api.post<{ success: boolean; message: string }>("/form/create", {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    service: payload.type,
    location: payload.city,
    budgetRange: payload.price,
    message: `Area: ${payload.area} | Size: ${payload.size} | ${payload.description}`,
  });

export const getAllContactsApi = () =>
  api.get<{ success: boolean; data: ContactRecord[] }>("/form/contacts");

export const getAllEnquiriesApi = () =>
  api.get<{ success: boolean; data: EnquiryRecord[] }>("/form/all-enquiries");
