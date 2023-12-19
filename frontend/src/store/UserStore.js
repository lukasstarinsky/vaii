import { create } from "zustand";

export const useUserStore = create((set, get) => ({
    user: {id: "", username: "", role: 0},
   
    setUser: (id, username, role) => { set({ user: {id, username, role}}) },
    IsAdmin: () => { return get().user.role == 2; },
    IsModerator: () => { return get().user.role == 1 || get().user.role == 2; }
}));