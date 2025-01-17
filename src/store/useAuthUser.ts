import { create } from "zustand";
import { userService } from "../services/cloudyApi";
import { User } from "../entities/User";
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
}

const useAuthUser = create<UseAuthUser>((set) => ({
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
}));

export default useAuthUser;
