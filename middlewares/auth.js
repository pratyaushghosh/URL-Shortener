import { getUser } from '../services/auth.js';

export async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies.uid;  // Change req.cookie to req.cookies
    if (!userUid) return res.redirect('/login');
    const user = await getUser(userUid);  // Await the getUser call if it's an async function

    if (!user) return res.redirect('/login');

    req.user = user;
    next();
}

export async function checkAuth(req, res, next) {
    const userUid = req.cookies.uid;  // Change req.cookie to req.cookies
    
    const user = getUser(userUid);  // Await the getUser call if it's an async function

    req.user = user;
    next();
}
