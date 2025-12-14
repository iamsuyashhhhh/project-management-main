import axiosInstance from "./axiosConfig";

export const login = async (formData) => {
  const res = await axiosInstance.post("/auth/login", formData);
  localStorage.setItem("authToken", res.data.token);
  return res.data;
};

export const register = async (formData) => {
  const res = await axiosInstance.post("/auth/register", formData);
  localStorage.setItem("authToken", res.data.token);
  return res.data;
};
