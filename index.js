import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connect.js';
import { restrictToLoggedinUserOnly, checkAuth } from './middlewares/auth.js';

import urlRoute from './routes/url.js';
import staticRouter from './routes/staticRouter.js';
import { router as userRoute } from './routes/user.js'; // Import the router with a named import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use('/url', restrictToLoggedinUserOnly, urlRoute); // Apply authentication middleware only to routes that need it
app.use('/user', userRoute); // Register user routes under /user
app.use('/', checkAuth, staticRouter); // Static routes that might need authentication, apply middleware only if necessary

connectToMongoDB(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB Connected Successfully....');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process with failure code
    });
