import axios from "axios";
import { User } from "../entities/User";

const url = import.meta.env.VITE_CLOUDY_API_URL;

export const userService = {
  async registerUser({ name, email, password }: User) {
    const response = await axios
      .post(`${url}/users/register`, { name, email, password })
      .catch((err) => {
        if (err.response) {
          return { ...err.response.data, status: err.response.status };
        }
      });
    return response;
  },

  async login({ email, password }: Pick<User, "email" | "password">) {
    const response = await axios
      .post(`${url}/users/login`, { email, password })
      .catch((err) => {
        if (err.response) {
          return { ...err.response.data, status: err.response.status };
        }
      });
    return response;
  },
};
