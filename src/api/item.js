import { API_ROOT, headers } from "./index";

const baseUrl = `${API_ROOT}/categories`;

const fetchDeleteItem = (item) => {
  const options = { method: "DELETE", headers: headers() };

  return fetch(`${baseUrl}/${item.categoryId}/items/${item.id}`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const fetchPostItem = (categoryId, item) => {
  const options = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(item),
  };

  return fetch(`${baseUrl}/${categoryId}/items/`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const fetchPatchItem = (item) => {
  const options = {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(item),
  };

  return fetch(`${baseUrl}/${item.categoryId}/items/${item.id}`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const fetchPatchItemRating = (rating) => {
  const options = {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ value: rating.value }),
  };

  return fetch(`${API_ROOT}/ratings/${rating.id}`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

export { fetchDeleteItem, fetchPostItem, fetchPatchItem, fetchPatchItemRating };
