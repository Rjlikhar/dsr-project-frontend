const KEY = "dsr_user";

export const saveUser = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const getUser = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};

export const clearUser = () => {
  localStorage.removeItem(KEY);
};