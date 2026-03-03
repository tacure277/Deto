import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://10.0.2.2:8000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export function setAuthToken(token: string | null) {
    if (token) {
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosClient.defaults.headers.common['Authorization'];
    }
}
axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
      const msg =
          error.response?.data?.detail ||
          error.response?.data?.non_field_errors?.[0] ||
          error.message ||
          'Error de red';
      return Promise.reject(new Error(msg));
    },
);