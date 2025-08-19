import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectToDB from './Database/db.js';
import fs from 'fs/promises'; // To read the HTML file

import auth from './Routes/auth.js';
import profile from './Routes/profile.js';
import testResult from './Routes/testResult.js';
import verify from './Routes/verifyUser.js';
import verifyEmail from './Routes/verifyEmail.js';
import leaderboard from './Routes/leaderboard.js';
import errorHandler from './Middlewares/errorMiddleware.js';
import { createError } from './utils/createError.js';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;

//  Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.join(__dirname, '..', 'frontend');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  setup static folder
app.use(express.static(path.join(frontendDir, 'public')));

app.use(async (req, res, next) => {
  const filePath = path.join(frontendDir, 'public', req.path);
  if (filePath.endsWith('.html')) {
    try {
      const htmlContent = await fs.readFile(filePath, 'utf-8');
      const backendURL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
      const updatedHTML = htmlContent.replace(
        '</head>',
        `<script>window.BACKEND_URL = '${backendURL}';</script></head>`
      );
      return res.send(updatedHTML);
    } catch (error) {
      return next(); // Pass to next middleware if file not found
    }
  }
  next(); // Proceed to other routes if not an HTML file
});


app.use('/api/auth', auth);
app.use('/api/auth', verify);
app.use('/api/auth', verifyEmail);
app.use('/api', profile);
app.use('/api', testResult);
app.use('/api', leaderboard);

app.use(errorHandler);

// Connect to db before starting server
connectToDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on 3000`));
}).catch((error) => {
    console.error('Failed to connect to database: ', error);
});
