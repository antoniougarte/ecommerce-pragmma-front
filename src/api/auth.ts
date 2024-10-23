import { loginUser, registerUser } from "../context/AuthContext";
import axios from "./axios";

// const API = 'http://localhost:3001/api';

export const registerRequest = async (user: registerUser) => {
  try {
    const response = await axios.post(`/auth/register`, user);
    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginRequest = async (user: loginUser) => {
  try {
    const response = await axios.post(`/auth/login`, user);
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const verifyTokenRequest = async () => {
  try {
    const response = await axios.get(`/auth/verify`);
    return response;
  } catch (error) {
    console.error("Error during verifyTokenRequest:", error);
    throw error;
  }
};
