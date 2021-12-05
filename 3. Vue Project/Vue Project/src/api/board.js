import { apiInstance } from "./index.js";

const api = apiInstance();

function listBoard(success, fail) {
  api.get(`/board`).then(success).catch(fail);
}

function writeBoard(board, success, fail) {
  api.post(`/board`, JSON.stringify(board)).then(success).catch(fail);
}

function getBoard(board_no, success, fail) {
  api.get(`/board/${board_no}`).then(success).catch(fail);
}

function modifyBoard(board, success, fail) {
  api.put(`/board`, JSON.stringify(board)).then(success).catch(fail);
}

function deleteBoard(board_no, success, fail) {
  api.delete(`/board/${board_no}`).then(success).catch(fail);
}

export { listBoard, writeBoard, getBoard, modifyBoard, deleteBoard };
