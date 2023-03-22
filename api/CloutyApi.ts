import axios from 'axios';
const CloutyApi = axios.create({
  baseURL: '/api',
});
export default CloutyApi;
