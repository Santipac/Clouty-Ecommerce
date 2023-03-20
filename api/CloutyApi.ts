import axios from 'axios';
const cloutyApi = axios.create({
  baseURL: '/api',
});
export default cloutyApi;
