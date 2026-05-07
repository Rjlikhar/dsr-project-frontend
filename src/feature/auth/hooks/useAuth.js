import { useState } from "react";
import {
  hashPassword,
  loginUser,
  logoutUser,
  signupUser,
  changePasswordUser,
} from "../services/authServices";
import { AUTH_CONFIG } from "../constants/auth.constants";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async (formData) => {
    return signupUser(formData);
  };

  const login = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async ({ currentPassword, newPassword }) => {
    // 1. get current user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const userEmail = currentUser?.email;

    if (!userEmail) {
      throw new Error("User not logged in");
    }

    try {
      // 2. call backend API
      const response = await changePasswordUser({
        currentPassword,
        newPassword,
      });

      console.log("Password changed");

      return response;
    } catch (error) {
      console.log(error);

      throw new Error(error.message || "Failed to change password");
    }
  };

  const logout = () => {
    logoutUser();
  };

  return {
    signup,
    login,
    logout,
    loading,
    changePassword,
    error,
  };
}
