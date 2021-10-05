import Service from "./Service";

class NewsService extends Service {
  async create(form) {
    try {
      const config = {     
        headers: { 'content-type': 'multipart/form-data' }
      }
      return await this.http.post("/v1/news/", form, config);
    } catch (error) {
      return error.response;
    }
  }

  async get(newId) {
    try {
      return await this.http.get(`/v1/news/${newId}`);
    } catch (error) {
      return error.response;
    }
  }

  async fetch(page, link, userParams) {
    try {
      if (link) {
        return await this.http.get("/v1/news/", {
          params: {
            page,
            link
          }
        });
      }
      if (userParams){
        return await this.http.get("/v1/news/", {
          params: {
            page,
            ...userParams
          }
        });
      }
      return await this.http.get("/v1/news/", {
        params: {
          page
        }
      });
    } catch (error) {
      return error.response;
    }
  }

  async createLike(newId) {
    try {
      return await this.http.post(`/v1/news/${newId}/likes/`);
    } catch (error) {
      return error.response;
    }
  }

  async updateLike(newId, likeId) {
    try {
      return await this.http.patch(`/v1/news/${newId}/likes/${likeId}/`);
    } catch (error) {
      return error.response;
    }
  }

  async storeNew(newId) {
    try {
      return await this.http.get(`/v1/news/store/`, {
        params: {
          new_id: newId
        }
      });
    } catch (error) {
      return error.response;
    }
  }

  async saveComment(body) {
    try {
      return await this.http.post(`/v1/comments/`, body);
    } catch (error) {
      return error.response;
    }
  }
  async fetchComments(newId, page) {
    try {
      return await this.http.get(`/v1/comments/`, {
        params: {
          new: newId,
          page
        }
      });
    } catch (error) {
      return error.response;
    }
  }

  async commentLike(commentId) {
    try {
      return await this.http.get(`/v1/comments/like/`, {
        params: {
          comment_id: commentId
        }
      });
    } catch (error) {
      return error.response;
    }
  }

  async fetchAnswers(commentId) {
    try {
      return await this.http.get(`/v1/answers/`, {
        params: {
          comment: commentId
        }
      });
    } catch (error) {
      return error.response;
    }
  }

  async saveAnswer(body) {
    try {
      return await this.http.post(`/v1/answers/`, body);
    } catch (error) {
      return error.response;
    }
  }

  async fetchMentionSuggestions(query) {
    try {
      return await this.http.get("/v1/users/mention_suggestions", {
        params: {
          q: query
        }
      });
    } catch (error) {
      return error.response;
    }
  }
}

export default NewsService;
