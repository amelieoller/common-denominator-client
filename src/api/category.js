import { API_ROOT, headers } from "./index";

const baseUrl = `${API_ROOT}/categories`;

const getCategories = () =>
  fetch(baseUrl)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        return data;
      }
    })
    .catch((error) => console.log(error));

const fetchDeleteCategory = (categoryId) => {
  const options = { method: "DELETE" };

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

export { getCategories, fetchDeleteCategory, fetchPostCategory };
