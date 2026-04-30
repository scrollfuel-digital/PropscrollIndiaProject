import { useSetAtom } from "jotai";
import { AxiosError } from "axios";
import { api } from "../api/axios";
import { enquiryState } from "../state/enquiryState";

interface EnquiryForm {
  name: string;
  phone: string;
  propertyTitle: string;
  propertyLocation: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export const useEnquiry = () => {
  const setState = useSetAtom(enquiryState);

  const submitEnquiry = async (formData: EnquiryForm) => {
    try {
      setState({ loading: true, success: null, error: null });

      const payload = {
        name: formData.name,
        phone: formData.phone,
        details: `Property: ${formData.propertyTitle} | Location: ${formData.propertyLocation} | Message: ${formData.message}`,
      };

      const res = await api.post<ApiResponse>("/form/enquiries", payload);

      setState({ loading: false, success: res.data.message || "Enquiry sent successfully!", error: null });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setState({
        loading: false,
        success: null,
        error: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return { submitEnquiry };
};
