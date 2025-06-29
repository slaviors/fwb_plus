import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export function generateToken(user) {
  return jwt.sign(
    { 
      userId: user._id, 
      username: user.username,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(username, password) {
  const user = await User.findByUsername(username);
  if (!user) {
    return null;
  }

  const isValid = await User.validatePassword(password, user.password);
  if (!isValid) {
    return null;
  }

  return user;
}

export function isAuthenticated(request) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return false;
  
  const decoded = verifyToken(token);
  return decoded !== null;
}

export function getUser(request) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return null;
  
  return verifyToken(token);
}