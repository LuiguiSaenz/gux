import axios from 'axios';
import { apiUrl } from '../config/environment';

const http = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

async function list(filters) {
  try {
    return await http.get('/testings', { params: filters });
  } catch (error) {
    return error.response;
  }
}

export default { list };
