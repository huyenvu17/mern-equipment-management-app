export function getAuthToken() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  return token;
}

export function isAuthenticated() {
  const token = getAuthToken();
  if (token) return true;
  return false;
}

export const setStoredItem = (name, value) => {
  return localStorage.setItem(name, value);
};

export const getStoredItem = (name) => {
  return localStorage.getItem(name);
};
