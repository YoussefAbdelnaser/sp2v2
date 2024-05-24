/* eslint-disable prettier/prettier */
import axios from 'axios';
// Import the UserProfile type from the appropriate file

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

const Profileapi = axios.create({
  baseURL: 'http://localhost:3004',
});

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await Authenticationapi.post(
    'authentication/login',
    credentials,
  );
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
  const response = await Authenticationapi.post(
    'authentication/signup',
    formData,
  );
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
  const response = await homeapi.post('/home/products-categories', {
    category,
  });
  return response.data;
};

export const addReview = async (
  productId: string,
  rating: number,
  comment: string,
  token: string,
) => {
  if (!token) {
    throw new Error('Token not found');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await Productsapi.post(
    '/products/reviews',
    { id: productId, rating, comment },
    { headers },
  );
  return response.data;
};

export const addToCart = async (
  item: { productId: string; quantity: number; purchaseOption: string },
  token: string,
) => {
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

export const placeOrder = async (
  cartItems: {
    _id: string;
    productId: string;
    product?:
      | {
          _id: string;
          name: string; //localhost:3001',
          //localhost:3001',
          price: number;
        }
      | undefined;
    quantity: number;
    purchaseOption?: 'rent' | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    customization?: Record<string, unknown> | undefined;
  }[],
  token: string,
) => {
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
};

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

//////////////////////////////////////////////////////////////////////////////////////
export const getUserProfile = async (email: string) => {
  try {
    console.log(`Fetching profile for email: ${email}`);
    const response = await Profileapi.get(`/profile/${email}`);
    console.log('Profile data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (
  email: string,
  updateUserDto: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    company?: string;
    addresses?: string[];
  },
) => {
  try {
    console.log(
      `Updating profile for email: ${email} with data:`,
      updateUserDto,
    );
    const response = await Profileapi.put(`/profile/${email}`, updateUserDto);
    console.log('Updated profile data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const updateUserPassword = async (
  email: string,
  updatePasswordDto: { oldPassword: string; newPassword: string },
) => {
  try {
    console.log(
      `Updating password for email: ${email} with data:`,
      updatePasswordDto,
    );
    const response = await Profileapi.put(
      `/profile/${email}/password`,
      updatePasswordDto,
    );
    console.log('Updated password data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const addAddress = async (email: string, address: string) => {
  try {
    console.log(`Adding address for email: ${email} with address: ${address}`);
    const response = await Profileapi.patch(`/profile/${email}/address`, {
      address,
    });
    console.log('Updated profile with new address:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding address:', error);
    throw error;
  }
};

export const editAddressByIndex = async (
  email: string,
  index: number,
  newAddress: string,
) => {
  try {
    console.log(
      `Editing address for email: ${email} at index: ${index} with new address: ${newAddress}`,
    );
    const response = await Profileapi.patch(`/profile/${email}/edit-address`, {
      index,
      newAddress,
    });
    console.log('Updated profile with edited address:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing address:', error);
    throw error;
  }
};

// New method to delete an address by index
export const deleteAddressByIndex = async (email: string, index: number) => {
  try {
    console.log(`Deleting address for email: ${email} at index: ${index}`);
    const response = await Profileapi.patch(
      `/profile/${email}/delete-address`,
      { index },
    );
    console.log('Updated profile with deleted address:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

export const addCreditCard = async (
  email: string,
  creditCard: {
    cardNumber: string;
    cardholderName: string;
    expirationDate: string;
    cvv: string;
  },
) => {
  try {
    console.log(
      `Adding credit card for email: ${email} with data:`,
      creditCard,
    );
    const response = await Profileapi.post(
      `/profile/${email}/credit-card`,
      creditCard,
    );
    console.log('Updated profile with new credit card:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding credit card:', error);
    throw error;
  }
};

// New method to edit a credit card by index
export const editCreditCardByIndex = async (
  email: string,
  creditCardData: {
    index: number;
    cardNumber: string;
    cardholderName: string;
    expirationDate: string;
    cvv: string;
  },
) => {
  try {
    console.log(
      `Editing credit card for email: ${email} at index: ${creditCardData.index} with data:`,
      creditCardData,
    );
    const response = await Profileapi.patch(
      `/profile/${email}/edit-credit-card`,
      creditCardData,
    );
    console.log('Updated profile with edited credit card:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing credit card:', error);
    throw error;
  }
};

export const deleteCreditCardByIndex = async (email: string, index: number) => {
  try {
    console.log(`Deleting credit card for email: ${email} at index: ${index}`);
    const response = await Profileapi.patch(
      `/profile/${email}/delete-credit-card`,
      { index },
    );
    console.log('Updated profile with deleted credit card:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting credit card:', error);
    throw error;
  }
};

export const editUserReviewByIndex = async (
  email: string,
  reviewData: { index: number; rating: number; comment: string },
) => {
  try {
    console.log(
      `Editing review for email: ${email} at index: ${reviewData.index} with data:`,
      reviewData,
    );
    const response = await Profileapi.patch(
      `/profile/${email}/review`,
      reviewData,
    );
    console.log('Updated review data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing review:', error);
    throw error;
  }
};

export const deleteUserReviewByIndex = async (email: string, index: number) => {
  try {
    console.log(`Deleting review for email: ${email} at index: ${index}`);
    const response = await Profileapi.patch(`/profile/${email}/delete-review`, {
      index,
    });
    console.log('Deleted review response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};
