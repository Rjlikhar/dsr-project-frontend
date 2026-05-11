import { AUTH_CONFIG } from "../constants/auth.constants";
import { authRepository } from "../repositories/authRepository";

// Hash Password
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Get all users
export function getUsers() {
  return JSON.parse(localStorage.getItem(AUTH_CONFIG.STORAGE_KEY)) || [];
}

// Save all users
export function saveUsers(users) {
  localStorage.setItem(AUTH_CONFIG.STORAGE_KEY, JSON.stringify(users));
}

// Signup
export async function signupUser(formData) {
  console.log("formData.role", formData.role);
  return authRepository.register({
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    password: formData.password.trim(),
    department: formData.department.trim(),
    role:formData.role.trim()
  });
}

export async function loginUser(formData) {
  const payload = {
    email: formData.email.trim().toLowerCase(),
    password: formData.password.trim(),
  };

  const response = await authRepository.login(payload);

  const { user, token } = response.data;
  // Store token for API authentication
  localStorage.setItem("auth_token", token);

  // Store user info
  localStorage.setItem("currentUser", JSON.stringify(user));

  return user;
}

/* =========================
   LOGOUT
========================= */
export async function logoutUser() {
  try {
    await authRepository.logout();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("auth_token");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

/* =========================
   CURRENT USER
========================= */
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

/* =========================
   AUTH CHECK
========================= */
export function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

/* =========================
   CHANGE PASSWORD
========================= */

export async function changePasswordUser({
  currentPassword,
  newPassword,
}) {

  try {

    const response =
      await authRepository.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });

    return response.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Failed to change password"
    );
  }
}


export const appPasswordService = {
  saveAppPassword: async (appPassword) => {
    await authRepository.appPassword({
      app_password: appPassword,
    });
    console.log(appPassword)
  },
};

export const authServices = {
  async updateMentorReviewer(id, payload) {
    try {
      const response =
        await authRepository.updateMentorReviewer(id,payload);

      return response.data;
    } catch (error) {
      console.error("Failed to update user:", error);

      throw error;
    }
  },
};