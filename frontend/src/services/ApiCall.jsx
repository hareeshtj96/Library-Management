import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const registerUser = async ({ name, email, password }) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
};

export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", response.data.token);
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
