export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
    ME: "/me",
    LOGOUT: "/logout",
    CHANGE_PASSWORD: "/change-password",
    APP_PASSWORD: "/save-app-password",
    UPDATE_MENTOR_REVIEWER: (id) =>
      `/user/${id}/mentor-reviewer`,
  },

  DSR: {
    CREATE: "/dsr",
    GET_ALL: "/dsr",
    GET_BY_ID: (id) => `/dsr/${id}`,
    UPDATE: (id) => `/dsr/${id}`,
    DELETE: (id) => `/dsr/${id}`,
    SEND: (payload) => `/dsr/send`,
  },

  MISSED_DSR_REQUEST: {
    SEND_REQUEST: "/missed-dsr-requests",
    GET_ALL: "/missed-dsr-requests",
    UPDATE_STATUS: (id) => `/missed-dsr-requests/${id}/status`,
    NOTIFICATIONS: "/missed-dsr-notifications",
  },

  GROUPS: {
    GET_ALL: "/groups",
    UPDATE: `/user/group`,
  },
};
