import { create } from "zustand";

interface EditPropertyModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useEditPropertyModal = create<EditPropertyModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useEditPropertyModal;