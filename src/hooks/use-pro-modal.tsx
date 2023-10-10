import { create } from "zustand";

import { useProModalStore } from "@/types/pro-modal-store";

export const useProModal = create<useProModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
