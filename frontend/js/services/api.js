import axios from 'axios';

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const api = axios.create({
  baseURL: 'https://tarolok.herokuapp.com/v1/api',
});

api.interceptors.request.use(
  (config) => {
    config.headers['X-CSRFToken'] = getCookie('csrftoken');
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export function getBucket(action) {
  return api
    .get(
      `watchers/${action.currentUser}/commits/?page=${action.page + 1}&limit=${action.rowsPerPage}`
    )
    .then((response) => {
      return { commits: response.data.results, count: response.data.count };
    });
}

export function getCommitsFromRepo(action) {
  return api
    .get(`watchers/${action.currentUser}/repositories/${action.repoName}/`)
    .then((response) => {
      return { repoName: response.data.full_name, commits: response.data.commits };
    });
}

export function addRepoCommits(action) {
  return api
    .post(`watchers/${action.currentUser}/repositories/`, {
      full_name: action.repoName,
    })
    .then((response) => {
      return response;
    });
}

export default api;
