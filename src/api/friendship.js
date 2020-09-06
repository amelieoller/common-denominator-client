import { API_ROOT, headers } from "./index";

const baseUrl = `${API_ROOT}/friendships`;

const fetchGetFriendship = (token, friendId) => {
  const options = { headers: { ...headers(), Authorization: token } };

  return fetch(`${baseUrl}/${friendId}`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const fetchGetResults = (categoryId) => {
  const options = { headers: { ...headers() } };

  return fetch(`${baseUrl}/get_results/${categoryId}`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

export { fetchGetFriendship, fetchGetResults };
