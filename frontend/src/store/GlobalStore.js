import { create } from "zustand";

export const useGlobalStore = create((set) => ({
    isLoading: false,
    isAuthLoading: true,

    stopAuthLoading: () => { set({ isAuthLoading: false }) },
    startLoading: () => { set({ isLoading: true }) },
    startLoadingDelay: (delay) => {
        set({ isLoading: true });
        setTimeout(() => set( { isLoading: false }), delay);
    },
    stopLoading: () => { set({ isLoading: false }) },
    stopLoadingDelay: (delay) => {
        setTimeout(() => set( { isLoading: false}), delay);
    }
}));