import shortid from 'shortid';
import URL from '../models/url.js';

export async function generateNewShortURL(req, res) {
    try {
        if (!req.body.url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const shortID = shortid();
        await URL.create({
            shortId: shortID,
            redirectURL: req.body.url,
            visitedHistory: [],
            createdBy: req.user._id,
        });

        return res.render('home', { id: shortID });
        // return res.json({ id: shortID });
    } catch (error) {
        console.error('Error generating short URL:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function shortURLToRedirectURL(req, res) {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );
        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export async function getAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOne({ shortId });
        if (entry) {
            res.json({ 
                totalclicks: entry.visitHistory.length,
                analytics: entry.visitHistory
            });
        } else {
            res.status(404).send('URL not found');
        }
    } catch (err) {
        res.status(500).send('error: ' + err.message);   
    } 
} 