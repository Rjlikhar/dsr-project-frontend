export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
    ME:"/me",
    LOGOUT: "/logout",
    CHANGE_PASSWORD: "/change-password",
    APP_PASSWORD:"/save-app-password"
  },

   DSR: {
    CREATE: "/dsr",
    GET_ALL: "/dsr",
    GET_BY_ID: (id) => `/dsr/${id}`,
    UPDATE: (id) => `/dsr/${id}`,
    DELETE: (id) => `/dsr/${id}`,
    SEND: (payload) => `/dsr/send`,
  },
};