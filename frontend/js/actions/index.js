import {
  GET_ALL_COMMITS,
  GET_COMMITS_FROM_REPO,
  SET_PAGE_LIMIT,
  SET_PAGE_NUMBER,
  ADD_COMMITS_FROM_REPO,
  REMOVE_ERROR_MESSAGE,
  SHOW_ERROR_MESSAGE,
  SHOW_SUCESSFUL_MESSAGE,
  REMOVE_SUCCESSFUL_MESSAGE
} from '../constants';

export function getBucket(payload) {
  return { type: GET_ALL_COMMITS, payload };
}

export function getCommitsFromRepo(payload) {
  return { type: GET_COMMITS_FROM_REPO, payload };
}

export function setPage(payload) {
  return { type: SET_PAGE_NUMBER, payload };
}

export function setPageLimit(payload) {
  return { type: SET_PAGE_LIMIT, payload };
}

export function addCommitsFromRepo(payload) {
  return { type: ADD_COMMITS_FROM_REPO, payload };
}

export function removeErrorMessage() {
  return { type: REMOVE_ERROR_MESSAGE };
}

export function showErrorMessage(payload) {
  return { type: SHOW_ERROR_MESSAGE, payload };
}

export function showSuccessfulMessage(payload) {
  return { type: SHOW_SUCESSFUL_MESSAGE, payload };
}

export function removeSuccessfulMessage(){
  return { type: REMOVE_SUCCESSFUL_MESSAGE}
}
