// src/app/api/index.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = {
  async request(method, endpoint, data = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // For cookies if needed
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Unexpected response type: ${contentType}. Status: ${response.status}. Response: ${text.substring(0, 100)}...`);
    }

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || `API error: ${response.status}`);
    }

    return responseData;
  },

  async get(endpoint) {
    return this.request('GET', endpoint);
  },

  async post(endpoint, data) {
    return this.request('POST', endpoint, data);
  },

  async put(endpoint, data) {
    return this.request('PUT', endpoint, data);
  },

  async delete(endpoint) {
    return this.request('DELETE', endpoint);
  }
};

export default api;