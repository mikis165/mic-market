import axios from  './config.js';
const customInstance = axios.create ({
  baseURL : 'http://198.199.78.169',
  headers: {'Accept': 'application/json'}
})

export default customInstance;
