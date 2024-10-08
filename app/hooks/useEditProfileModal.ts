import { create } from "zustand";
import { getAccessToken } from "../lib/actions";

interface EditProfileModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}
const useEditProfileModal = create<EditProfileModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useEditProfileModal;