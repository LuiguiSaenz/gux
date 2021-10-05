import Service from "./Service";

class UserService extends Service {

  async getUser(userId) {
    try {
      return await this.http.get(`/v1/users/${userId}`);
    } catch (error) {
      return error.response;
    }
  }
  async updateUser(userId, form) {
    try {
      return await this.http.patch(`/v1/users/${userId}/`, form);
    } catch (error) {
      return error.response;
    }
  }
  
}

export default UserService;
