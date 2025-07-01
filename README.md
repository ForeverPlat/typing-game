# Typing Game 🧠⌨️

A full-stack typing game designed to test and improve your speed and accuracy in real time. Built with **HTML**, **CSS**, and **JavaScript** on the frontend, and powered by a **Node.js**, **Express**, and **MongoDB** backend, the game features secure user authentication, email verification, and a personalized profile experience that tracks your progress.

---

## 🚀 Features

- 🔐 **JWT Authentication**  
  Users can sign up and log in securely with JSON Web Tokens managing session state.

- 📧 **Email Verification**  
  New users receive a verification email to activate their accounts before accessing the game.

- 👤 **User Profiles**  
  Logged-in users have access to a profile page that displays their previous test data, including WPM (words per minute), accuracy, and test duration. The profile also shows the average WPM from the last five tests.

- 📄 **Word-Count Based Challenges**  
  Each round presents a fixed number of randomly generated words. Players aim to type them as fast and accurately as possible.

- 🧩 **Random Text Generation**  
  Every session provides new randomly generated words or sentences to keep the experience dynamic.

- 📊 **Score Tracking and Analytics**  
  Player performance is stored in a MongoDB database and retrieved to show trends over time.

---

## ✅ Future Improvements

🌍 Global leaderboard for top players

- ✍️ Typing modes (quotes, code snippets, paragraphs)

- 🌙 Themes toggle

- 🤝 Live multiplayer typing battles

---

## 🛠️ Tech Stack

**Frontend**  
- HTML  
- CSS  
- JavaScript  

**Backend**  
- Node.js  
- Express  
- MongoDB  

**Other Tools**  
- JWT (JSON Web Tokens) for authentication
- Bcryptjs for password hashing in user authentication. 
- Nodemailer (or equivalent) for email verification  
- Mongoose for database modeling