import { create } from "zustand";

interface ProccessPaymentModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useReservationProccessPaymentModal = create<ProccessPaymentModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useReservationProccessPaymentModal;
