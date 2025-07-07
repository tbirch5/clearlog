
// helper refresh function
//decode and check JWT token expiration

import jwt_decode from 'jwt-decode';

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000; // Convert to seconds
    return decoded.exp > now;
  } catch (err) {
    return false;
  }
};

export const getTokenExpiry = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded.exp;
  } catch (err) {
    return null;
  }
};
