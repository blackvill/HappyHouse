import { apiInstance } from "./index.js";

const api = apiInstance();

function listQna(success, fail) {
  api.get(`/qna/list`).then(success).catch(fail);
}

function writeQna(qna, success, fail) {
  api.post(`/qna/regist`, JSON.stringify(qna)).then(success).catch(fail);
}

function getQna(no, success, fail) {
  api.get(`/qna/detail/${no}`).then(success).catch(fail);
}

function modifyQna(qna, success, fail) {
  api.put(`/qna/update`, JSON.stringify(qna)).then(success).catch(fail);
}

function deleteQna(no, success, fail) {
  api.delete(`/qna/delete/${no}`).then(success).catch(fail);
}

function writeQnaReply(qna, success, fail) {
  api.post(`/qna/reply/regist`, JSON.stringify(qna)).then(success).catch(fail);
}

function listQnaReply(no, success, fail) {
  api.get(`/qna/reply/detail/${no}`).then(success).catch(fail);
}

export {
  listQna,
  writeQna,
  getQna,
  modifyQna,
  deleteQna,
  writeQnaReply,
  listQnaReply,
};
