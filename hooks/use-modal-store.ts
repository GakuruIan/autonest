import { create } from "zustand";

import { Car } from "@prisma/client";

type CarProps = Pick<Car, "id" | "model">;

export type modaltype = "DeleteCar";

interface ModalData {
  car?: CarProps;
}

interface ModalStore {
  type: modaltype | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: modaltype, data: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
