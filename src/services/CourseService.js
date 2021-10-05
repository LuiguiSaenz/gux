import Service from "./Service";

class CourseService extends Service {

  async fetchCourses() {
    try {
      return await this.http.get("/v1/courses");
    } catch (error) {
      return error.response;
    }
  }
  
  async fetchCoursesTypes() {
    try {
      return await this.http.get("/v1/courses-types");
    } catch (error) {
      return error.response;
    }
  }
  
  async getSylabus(slug) {
    try {
      return await this.http.get(`/v1/courses/${slug}`);
    } catch (error) {
      return error.response;
    }
  }
}

export default CourseService;
