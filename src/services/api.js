const API_BASE_URL = '/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    console.log('Making API request to:', url, 'with config:', config);

    try {
      const response = await fetch(url, config);
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Books API
  async getBooks() {
    return this.request('/books');
  }

  async getBook(id) {
    return this.request(`/books/${id}`);
  }

  // User API
  async getUser(token) {
    return this.request('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async login(email, password) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(firstName, lastName, email, password) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
  }

  // Reservations API
  async getReservations(token) {
    return this.request('/reservations', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async createReservation(bookId, token) {
    return this.request('/reservations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId }),
    });
  }

  async deleteReservation(reservationId, token) {
    return this.request(`/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

export default new ApiService();