import axios from "./axios";

export const signup = async (data: { name: string; email: string; password: string }) => {
  const res = await axios.post("/auth/signup", data);
  return res.data;
};

export const signin = async (data: { email: string; password: string }) => {
  const res = await axios.post("/auth/signin", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};
