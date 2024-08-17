import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Function to sign the JWT token with user details
export function setUser(user) {
    try {
        return jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET, // Securely sign the token using a secret key from environment variables
            { expiresIn: '1h' } // Optionally, you can set an expiration time for the token
        );
    } catch (error) {
        console.log('Error signing token:', error);
        return null;
    }
}

// Function to verify and decode the JWT token
export function getUser(token) {
    try {
        if (!token) return null;
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}
