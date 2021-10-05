import Service from "./Service";

class StandardService extends Service {

  async fetchStandards() {
    try {
      return await this.http.get("/v1/standards");
    } catch (error) {
      return error.response;
    }
  }

  async getStandard(standardId) {
    try {
      return await this.http.get(`/v1/standards/${standardId}`);
    } catch (error) {
      return error.response;
    }
  }

  async createAnnotation(data) {
    try {
      return await this.http.post(`/v1/annotations/`, data);
    } catch (error) {
      return error.response;
    }
  }

  async updateAnnotation(data, annotationId) {
    try {
      return await this.http.patch(`/v1/annotations/${annotationId}/`, data);
    } catch (error) {
      return error.response;
    }
  }
}

export default StandardService;
