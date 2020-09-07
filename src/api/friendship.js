import { API_ROOT, headers } from "./index";

const baseUrl = `${API_ROOT}/friendships`;

const fetchGetFriendship = (friendId) => {
  const options = { headers: { ...headers() } };

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

const fetchPatchFriendship = (friendshipId, settings) => {
  const options = {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(settings),
  };

  return fetch(`${baseUrl}/${friendshipId}`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const fetchDeleteFriendship = (friendshipId) => {
  const options = { method: "DELETE", headers: headers() };

  return fetch(`${baseUrl}/${friendshipId}`, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const fetchPostFriendship = (friendship) => {
  const options = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(friendship),
  };

  return fetch(baseUrl, options)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

export {
  fetchGetFriendship,
  fetchGetResults,
  fetchPatchFriendship,
  fetchPostFriendship,
  fetchDeleteFriendship,
};
