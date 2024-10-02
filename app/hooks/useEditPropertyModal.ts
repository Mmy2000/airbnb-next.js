import { create } from "zustand";

interface EditPropertyModalStore {
    isOpen: boolean;
    property: any | null;  // Add property to store the selected property (type `any` or your `PropertyType`)
    open: (property: any) => void;  // Modify open to accept a property argument
    close: () => void;
}

const useEditPropertyModal = create<EditPropertyModalStore>((set) => ({
    isOpen: false,
    property: null,  // Initialize property as null
    open: (property) => set({ isOpen: true, property }),  // Store the property when opening the modal
    close: () => set({ isOpen: false, property: null })  // Clear the property when closing
}));

export default useEditPropertyModal;
