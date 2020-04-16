import {
  GET_ALL_COMMITS,
  GET_ALL_COMMITS_SUCCESS,
  ADD_COMMITS_FROM_REPO,
  ADD_COMMITS_FROM_REPO_SUCCESS,
  ADD_COMMITS_FROM_REPO_ERROR,
  GET_COMMITS_FROM_REPO,
  GET_COMMITS_FROM_REPO_SUCCESS,
  GET_COMMITS_FROM_REPO_ERROR,
  SET_PAGE_NUMBER,
  SET_PAGE_LIMIT,
  REMOVE_ERROR_MESSAGE,
  SHOW_ERROR_MESSAGE,
  SHOW_SUCESSFUL_MESSAGE,
  REMOVE_SUCCESSFUL_MESSAGE,
} from '../constants';

const initialState = {
  currentUser: window.$user,
  commits: [],
  commitsCount: 0,
  page: 0,
  rowsPerPage: 10,
  loading: false,
  error: '',
  message: '',
  repository: {
    commits: [],
    commitsCount: 0,
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMITS: {
      return { ...state, loading: true };
    }
    case ADD_COMMITS_FROM_REPO: {
      return {
        ...state,
        page: initialState.page,
        rowsPerPage: initialState.rowsPerPage,
        loading: true,
      };
    }
    case SET_PAGE_NUMBER: {
      return { ...state, page: action.payload.page };
    }
    case SET_PAGE_LIMIT: {
      return { ...state, rowsPerPage: action.payload.limit };
    }
    case GET_COMMITS_FROM_REPO: {
      return { ...state, loading: true };
    }
    case GET_COMMITS_FROM_REPO_SUCCESS: {
      return Object.assign({}, state, {
        repository: {
          commits: action.payload.commits,
          commitsCount: action.payload.commitsCount,
        },
        loading: false,
      });
    }
    case ADD_COMMITS_FROM_REPO_SUCCESS: {
      return Object.assign({}, state, {
        commits: action.payload.commits,
        commitsCount: action.payload.count,
        message: 'Repository succesfully added.',
        loading: false,
      });
    }
    case GET_ALL_COMMITS_SUCCESS: {
      return Object.assign({}, state, {
        commits: action.payload.commits,
        commitsCount: action.payload.count,
        loading: false,
      });
    }
    case ADD_COMMITS_FROM_REPO_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false,
      });
    case SHOW_ERROR_MESSAGE:
      return { ...state, error: action.payload.message };
    case REMOVE_ERROR_MESSAGE:
      return { ...state, error: '' };
    case SHOW_SUCESSFUL_MESSAGE:
      return { ...state, message: action.payload.message };
    case REMOVE_SUCCESSFUL_MESSAGE:
      return { ...state, message: '' };
  }
  return state;
}

export default rootReducer;
