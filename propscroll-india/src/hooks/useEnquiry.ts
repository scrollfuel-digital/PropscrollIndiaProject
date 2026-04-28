import { useSetRecoilState } from "recoil";
import axios, { AxiosError } from "axios";
import { enquiryState } from "../state/enquiryState";

// Define form data type
interface EnquiryForm {
  name: string;
  phone: string;
  message: string;
}

// Optional: API response type
interface ApiResponse {
  success: boolean;
  message: string;
}

export const useEnquiry = () => {
  const setState = useSetRecoilState(enquiryState);

  const submitEnquiry = async (formData: EnquiryForm) => {
    try {
      setState({ loading: true, success: null, error: null });

      const res = await axios.post<ApiResponse>(
        "/enquiry",
        formData,
      );

      setState({
        loading: false,
        success: res.data.message,
        error: null,
      });
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
