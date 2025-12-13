import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectToDB from './Database/db.js';
import fs from 'fs/promises'; // To read the HTML file
import cors from 'cors'

import auth from './Routes/auth.js';
import profile from './Routes/profile.js';
import testResult from './Routes/testResult.js';
import verify from './Routes/verifyUser.js';
import verifyEmail from './Routes/verifyEmail.js';
import leaderboard from './Routes/leaderboard.js';
import errorHandler from './Middlewares/errorMiddleware.js';
import { createError } from './utils/createError.js';

//  Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// console.log('NODE_ENV:', process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));
}

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', auth);
app.use('/api/auth', verify);
app.use('/api/auth', verifyEmail);
app.use('/api', profile);
app.use('/api', testResult);
app.use('/api', leaderboard);

const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDist));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(frontendDist, 'index.html'));
// });
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendDist, 'index.html'));
  } else {
    next();
  }
});

app.use(errorHandler);

// Connect to db before starting server
connectToDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on 3000`));
}).catch((error) => {
    console.error('Failed to connect to database: ', error);
});
