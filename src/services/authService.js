import { axiosInstance } from './initRequest';

class AuthService {
  async get(url, config) {
    return axiosInstance.get(url, config)
  }

  async post(url, data, config) {
    return axiosInstance.post(url, data, config)
  }
}

const authService = new AuthService();

export default authService;