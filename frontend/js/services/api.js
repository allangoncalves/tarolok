import axios from 'axios';

export default axios.create({
  baseURL: `https://tarolok.herokuapp.com/v1/api/`,
});
