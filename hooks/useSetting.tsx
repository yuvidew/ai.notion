import {create} from "zustand";

interface PopupSate{
    isOpen : boolean,
    onOpen : () => void,
    onClose : () => void,
}

export const useSetting = create<PopupSate>((set) => ({
    isOpen : false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))