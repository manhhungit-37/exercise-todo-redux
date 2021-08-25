import { axiosInstanceJsonPlaceholder } from 'services/initRequest';

class TodosService {
  async get(url, config) {
    return axiosInstanceJsonPlaceholder.get(url, config);
  }

  async post(url, params, config) {
    return axiosInstanceJsonPlaceholder.post(url, params, config);
  }

  async delete(url, config) {
    return axiosInstanceJsonPlaceholder.delete(url , config);
  }

  async patch(url, data, config) {
    return axiosInstanceJsonPlaceholder.patch(url , data, config);
  }
}

const todosService = new TodosService();
export default todosService;