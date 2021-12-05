import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(user_id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${user_id}`).then(success).catch(fail);
}

async function registUser(user, success, fail) {
  console.log(user);
  api.post(`/user/join`, JSON.stringify(user)).then(success).catch(fail);
}

async function updateUser(user, success, fail) {
  console.log(user);
  api.put(`/user/update`, JSON.stringify(user)).then(success).catch(fail);
}

function deleteUser(user_id, success, fail) {
  api.delete(`/user/remove/${user_id}`).then(success).catch(fail);
}

async function userList(success, fail) {
  api.get(`/user/list`).then(success).catch(fail);
}

export { login, findById, registUser, updateUser, deleteUser, userList };
