import Service from "./Service";

class GlobalService extends Service {

  async fetchLinks() {
    try {
      return await this.http.get("/v1/quick-links");
    } catch (error) {
      return error.response;
    }
  }

  async fetchSuggestions() {
    try {
      return await this.http.get("/v1/users/follower_suggestions");
    } catch (error) {
      return error.response;
    }
  }

  async follow(suggestionId) {
    try {
      return await this.http.get("/v1/users/follow", {
        params: {
          user_following_id: suggestionId
        }
      });
    } catch (error) {
      return error.response;
    }
  }
  
}

export default GlobalService;
