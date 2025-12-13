const API_URL = import.meta.env.PROD 
  ? '/api'  // Production: relative path
  : 'http://localhost:3000/api';  // Development: full URL

console.log('Environment:', import.meta.env.MODE);
console.log('Is Production:', import.meta.env.PROD);
console.log('API URL:', API_URL);

export default API_URL;

// import.meta.env.PROD  // true in production, false in development
// import.meta.env.DEV   // true in development, false in production
// import.meta.env.MODE  // 'development' or 'production'

// dev
// npm run dev

// prod
// npm run build