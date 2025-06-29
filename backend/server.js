import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectToDB from './Database/db.js';

import auth from './Routes/auth.js';
import profile from './Routes/profile.js';
import testResult from './Routes/testResult.js';
import verify from './Routes/verify.js';

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

app.use('/api/auth', auth);
app.use('/api/auth', verify)
app.use('/api', profile);
app.use('/api', testResult);

// Connect to db before starting server
connectToDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on 3000`));
}).catch((error) => {
    console.error('Failed to connect to database: ', error);
});
