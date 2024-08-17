import User from '../models/user.js';
import { setUser } from '../services/auth.js';

export async function userSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already registered.');
        }

        // Create new user
        await User.create({
            name,
            email,
            password,
        });

        return res.redirect('/');
    } catch (error) {
        console.error('Error during user signup:', error);
        return res.status(500).send('An error occurred during signup.');
    }
}

export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Find the user with the provided email and password
        const user = await User.findOne({ email, password });
        
        // If user is not found, render login page with an error message
        if (!user) {
            return res.render('login', {
                error: 'Invalid Username or Password'
            });
        }

        const token = setUser(user);
        res.cookie('uid', token);
        
        // If user is found, log them in and redirect to the home page
        return res.redirect('/');
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).send('An error occurred during login.');
    }
}

export function userLogout(req, res) {
    // Clear the JWT token by setting the cookie to an empty value with an expired date
    res.cookie('uid', '', { expires: new Date(0) });
    res.redirect('/login');
}

