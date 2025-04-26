import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  
  signup: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/signup`, {
        username,
        email,
        password,
      });

      set({ user: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error from signup function in authStore");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/login`, {
        email,
        password,
      });
      const { user, message } = await response.data;
      set({ user });
      toast.success(message);
    } catch (error) {
      console.log("Error from login function in authStore");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getUser: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/auth/user`);
      set({ user: response.data.user });
    } catch (error) {
     console.log("Error from getUser function in auth store",error.response);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post(`/auth/logout`);
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));