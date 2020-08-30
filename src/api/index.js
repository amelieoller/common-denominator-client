export const API_ROOT = process.env.REACT_APP_SERVER_URL;
export const authToken = localStorage.getItem("token");
export const headers = () => ({
  "content-type": "application/json",
  accept: "application/json",
  Authorization: authToken,
});
