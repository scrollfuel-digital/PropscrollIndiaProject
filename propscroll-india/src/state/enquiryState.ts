import { atom } from "jotai";

interface EnquiryState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export const enquiryState = atom<EnquiryState>({
  loading: false,
  success: null,
  error: null,
});
