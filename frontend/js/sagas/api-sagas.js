import { takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import { getBucket, getCommitsFromRepo, addRepoCommits } from '../services/api';
import {
  GET_ALL_COMMITS,
  GET_ALL_COMMITS_SUCCESS,
  GET_ALL_COMMITS_ERROR,
  GET_COMMITS_FROM_REPO,
  GET_COMMITS_FROM_REPO_SUCCESS,
  GET_COMMITS_FROM_REPO_ERROR,
  ADD_COMMITS_FROM_REPO,
  ADD_COMMITS_FROM_REPO_SUCCESS,
  ADD_COMMITS_FROM_REPO_ERROR,
} from '../constants';

export default function* watcherSaga() {
  yield all([
    takeLatest(GET_ALL_COMMITS, bucketSaga),
    takeEvery(GET_COMMITS_FROM_REPO, commitsSaga),
    takeLatest(ADD_COMMITS_FROM_REPO, repoSaga),
  ]);
}

function* commitsSaga(action) {
  try {
    const payload = yield call(getCommitsFromRepo, action.payload);
    yield put({ type: GET_COMMITS_FROM_REPO_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_COMMITS_FROM_REPO_ERROR, payload: e });
  }
}

function* bucketSaga(action) {
  try {
    const payload = yield call(getBucket, action.payload);
    yield put({ type: GET_ALL_COMMITS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_ALL_COMMITS_ERROR, payload: e });
  }
}

function* repoSaga(action) {
  try {
    const _ = yield call(addRepoCommits, action.payload);
    const payload = yield call(getBucket, {
      currentUser: action.payload.currentUser,
      page: 0,
      rowsPerPage: 10,
    });
    yield put({ type: ADD_COMMITS_FROM_REPO_SUCCESS, payload });
  } catch (e) {
    yield put({ type: ADD_COMMITS_FROM_REPO_ERROR, payload: e });
  }
}
