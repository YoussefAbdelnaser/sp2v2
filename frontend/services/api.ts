/* eslint-disable prettier/prettier */
import axios from 'axios';

const homeapi = axios.create({
  baseURL: 'http://localhost:3002',
});

const Productsapi = axios.create({
  baseURL: 'http://localhost:3003',
});

const Authenticationapi = axios.create({
  baseURL: 'http://localhost:4000',
});

const Cartapi = axios.create({
  baseURL: 'http://localhost:3001',
});

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await Authenticationapi.post('authentication/login', credentials);
  return response.data;
};

export const signupUser = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  address: string;
  password: string;
}) => {
  const response = await Authenticationapi.post('authentication/signup', formData);
  return response.data;
};

export const getTopOffers = async () => {
  const response = await homeapi.get('/home/offers');
  return response.data;
};

export const getProducts = async () => {
  const response = await homeapi.get('/home/products');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await Productsapi.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category: string) => {
  const response = await homeapi.post('/home/products-categories', { category });
  return response.data;
};

export const addReview = async (productId: string, rating: number, comment: string, token: string) => {
  if (!token) {
    throw new Error('Token not found');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await Productsapi.post('/products/reviews', { id: productId, rating, comment }, { headers });
  return response.data;
};

export const addToCart = async (item: { productId: string; quantity: number; purchaseOption: string }, token: string) => {
  if (!token) {
    throw new Error('Token not found');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await Cartapi.post('/cart', { items: [item] }, { headers });
  return response.data;
};

export const getCartItems = async (token: string) => {
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    const response = await Cartapi.get('/cart', { headers });
    return response.data;
  };
  
  export const placeOrder = async (cartItems: {
    _id: string; productId: string; product?: {
        _id: string; name: string; //localhost:3001',
        //localhost:3001',
        price: number;
    } | undefined; quantity: number; purchaseOption?: "rent" | undefined; startDate?: Date | undefined; endDate?: Date | undefined; customization?: Record<string, unknown> | undefined;
}[], token: string) => {
    if (!token) {
        throw new Error('Token not found');
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    // Corrected URL to match the backend route definition
    const response = await Cartapi.post('/cart/place-order', {}, { headers });
    return response.data;
}

// Assuming your getOrders function looks like this
export const getOrders = async (token: string) => {
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    const response = await Cartapi.get('/cart/orders', { headers });
    return response.data; // Assuming this directly returns an array of orders
  };