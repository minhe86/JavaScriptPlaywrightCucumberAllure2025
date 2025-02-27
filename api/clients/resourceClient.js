import axios from "axios";

export default class ResourceClient {
  constructor(baseUrl, token) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createUsersResource(resourceData) {
    const response = await this.client.post("/api/users", resourceData);
    return response;
  }

  async getUsersResource(resourceId) {
    const response = await this.client.get(`/api/users/${resourceId}`);
    return response;
  }
  async createRegisterResource(resourceData) {
    const response = await this.client.post("/api/register", resourceData);
    return response;
  }
}
