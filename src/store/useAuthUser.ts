import { create } from "zustand";
import { userService } from "../services/cloudyApi";
import { UpdateUserData, User } from "../entities/User";
import { jwtDecode } from "jwt-decode";

interface DecodedUser {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

interface UseAuthUser {
  user: User | null;
  setUser: () => Promise<void>;
  updateUser: (attributes: UpdateUserData) => Promise<void>;
}

const useAuthUser = create<UseAuthUser>((set, get) => ({
  user: null,
  setUser: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedUser = jwtDecode(token) as DecodedUser;
      const response = await userService.getUserById(decodedUser.id, token);
      if (response.status === 200) {
        set({ user: response.data });
      }
    }
  },

  updateUser: async (attributes: UpdateUserData) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    set((state) => ({ user: { ...state.user!, ...attributes } }));
    await userService.updateUser(get().user!.id, token, attributes);
  },
}));

export default useAuthUser;
