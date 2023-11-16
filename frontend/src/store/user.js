import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: {id: "", username: ""},
   
    setUser: (id, username) => { set({ user: {id, username}}) }
}));