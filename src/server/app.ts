// Import the centralized Axios instance
import api from '../utilities/axiosInstance';

// Adding new user
export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
}) => {
  try {
    const response = await api.post('/users/createUser', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Fetching all users
export const fetchAllUsers = async () => {
  try {
    const response = await api.get('/users/users');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Login - check if email exists
export const checkEmail = async (userData: { email: string }) => {
  try {
    const response = await api.post('/users/check-email', userData);
    localStorage.setItem('user', response.data.data);
    return response.data;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

// Updating user
export const updateUser = async (id: string, updatedData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
}) => {
  try {
    const response = await api.patch(`/users/updateUser/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Deleting user
export const deleteUser = async (email: string) => {
  try {
    const response = await api.delete(`/users/deleteUser/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Searching users
export const searchUsers = async (searchCriteria: any) => {
  try {
    const response = await api.post('/users/users/searchUsers', searchCriteria);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

// Function to verify OTP
export const verifyOtp = async (otpData: { email: string, otpCode: string }) => {
  try {
    const response = await api.post('/otp/verify', otpData);
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

// Sending OTP
export const sendOtp = async (userData: { email: string }) => {
  try {
    const response = await api.post('/otp/sendotpbyemail', userData);
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// Google token verification
export const checkToken = async (token: string) => {
  try {
    const response = await api.post('/users/auth/google', { token });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log("Token saved to local storage:", response.data.token);
    } else {
      console.error("Token was not provided in the response.");
    }

    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};

export const fetchAllSites = async () => {
  try {
    const response = await api.get('/site/getAllSites');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const createSite = async (siteData: object) => {
  try {
    const response = await api.post('/site/createSite', siteData);
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};
export const updateSite = async (id: string, updatedData: {
  name?: string;
  address?: string;
  coordinates?: any;
  creationDate?: Date;
  lastUpdated?: Date;
}) => {
  try {
    const response = await api.patch(`/site/updateSide/${id}`, updatedData);
    console.log(id);
    return response.data;
  } catch (error) {
    console.error('Error updating site:', error); 
    throw error;
  }
};

export const getSiteById =async (id: any, updatedData: {
  name?: string;
  address?: string;
  coordinates?: any;
  creationDate?: Date;
  lastUpdated?: Date;
}) => {
  try {
    const response = await api.patch(`createSite/updateSide/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

//Searching sites
export const searchSite = async (searchCriteria: any) => {
  try {
    const response = await api.post('/site/searchSites', searchCriteria);
    return response.data;
  } catch (error) {
    console.error('Error searching site:', error);
    throw error;
  }
}

