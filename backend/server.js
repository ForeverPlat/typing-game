import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import auth from './Routes/auth.js';

//  Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = __dirname.slice(0,75);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  setup static folder
app.use(express.static(path.join(frontendDir, 'frontend', 'public')));

app.use('/api', auth);

app.listen(3000, () => console.log(`Server is running on 3000`));