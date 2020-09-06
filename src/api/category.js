import { API_ROOT, headers } from "./index";

const baseUrl = `${API_ROOT}/categories`;

const fetchGetCategories = (token) => {
  const options = { headers: { ...headers(), Authorization: token } };

  return fetch(baseUrl, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const fetchGetCategory = (categoryId) => {
  const options = { headers: { ...headers() } };

  return fetch(`${baseUrl}/${categoryId}`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const fetchDeleteCategory = (categoryId) => {
  const options = { method: "DELETE", headers: headers() };

  return fetch(`${baseUrl}/${categoryId}`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const fetchPostCategory = (category) => {
  const options = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(category),
  };

  return fetch(baseUrl, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

export {
  fetchGetCategories,
  fetchGetCategory,
  fetchDeleteCategory,
  fetchPostCategory,
};
