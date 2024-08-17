// routes/user.js
import { Router } from 'express';
import { userSignup, userLogin, userLogout } from '../controllers/user.js';

const router = Router();

router.post('/', userSignup); // Route for user signup
router.post('/login', userLogin); // Route for user login
router.get('/logout', userLogout); // Route for user logout // This will be available at /user/logout

// Export router as a named export
export { router };