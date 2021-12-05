import { apiInstance } from "./index.js";

const api = apiInstance();

function listReply(board_no, success, fail) {
  api.get(`/reply/${board_no}`).then(success).catch(fail);
}

function writeReply(reply, success, fail) {
  api.post(`/reply`, JSON.stringify(reply)).then(success).catch(fail);
}

function modifyReply(reply, success, fail) {
  api.put(`/reply`, JSON.stringify(reply)).then(success).catch(fail);
}

function deleteReply(reply_no, success, fail) {
  api.delete(`/reply/${reply_no}`).then(success).catch(fail);
}

export { listReply, writeReply, modifyReply, deleteReply };
