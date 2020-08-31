import { API_ROOT, headers } from "./index";

const fetchSignup = (user) => {
  const options = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(user),
  };

  console.log("fetchSignup");

  return fetch(`${API_ROOT}/users`, options)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

const fetchLogin = (user) => {
  const options = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(user),
  };

  console.log("fetchLogin");

  return fetch(`${API_ROOT}/auth`, options)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

const fetchGetCurrentUser = () => {
  const options = {
    headers: headers(),
  };

  console.log("fetchGetCurrentUser");

  return fetch(`${API_ROOT}/current_user`, options)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export { fetchSignup, fetchLogin, fetchGetCurrentUser };
