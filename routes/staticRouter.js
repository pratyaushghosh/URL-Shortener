import { Router } from 'express';
import URL from '../models/url.js';

const router = Router();


router.get('/', async(req, res) => {
    try {
        if(!req.user) return res.redirect('/login');
        const allurls = await URL.find({ createdBy: req.user._id });
        // console.log(allurls)
        return res.render('home', {
            urls: allurls,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
    // return res.render('home');
});

router.get('/signup', async(req, res) => {
    return res.render('signup');
});

router.get('/login', async(req, res) => {
    return res.render('login');
});


export default router;
