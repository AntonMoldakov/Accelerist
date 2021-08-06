import axios from 'axios';
import store from 'store';

const api = axios.create({
  baseURL: 'https://accelerist.herokuapp.com/api/v1/',
});

api.interceptors.request.use(config => {
  const token = store.getState().user.accessToken;

  if (!token) {
    return config;
  }

  const Authorization = `Bearer ${token}`;

  return {
    ...config,
    headers: { ...config.headers, Authorization },
  };
});

export default api;
