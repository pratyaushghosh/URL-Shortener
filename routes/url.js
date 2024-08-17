import { Router } from 'express';
import { generateNewShortURL, shortURLToRedirectURL, getAnalytics } from '../controllers/url.js';

const router = Router();

router.post('/', generateNewShortURL);
router.get('/:shortId', shortURLToRedirectURL);
router.get('/analytics/:shortId', getAnalytics);

export default router;