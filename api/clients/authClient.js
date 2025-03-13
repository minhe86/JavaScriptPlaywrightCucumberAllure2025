import axios from 'axios';

export default class AuthClient {
  constructor(baseUrl) {
    this.client = axios.create({
      baseURL: baseUrl + '/',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getToken(credentials) {
    const response = await this.client.post('/api/login', credentials);
    return response.data.token;
  }
}