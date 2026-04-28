import { atom } from "recoil";

interface EnquiryState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export const enquiryState = atom<EnquiryState>({
  key: "enquiryState",
  default: {
    loading: false,
    success: null,
    error: null,
  },
});
