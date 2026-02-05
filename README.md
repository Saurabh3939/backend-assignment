This project is a scalable REST API built with Node.js and Express, featuring JWT-based Authentication, Role-Based Access Control (RBAC), and a basic React.js frontend for interaction.

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Tokens) & Bcrypt.js (Password Hashing)
- **Frontend:** React.js (Vite), Axios, React Router
- **Tooling:** Postman (API Testing), Dotenv (Environment Variables)

## ✨ Features

- **User Authentication:** Secure Login and Registration with hashed passwords.
- **Role-Based Access:** - `User`: Can create and view their own tasks.
  - `Admin`: Can view all tasks and delete any task.
- **CRUD Operations:** Create, Read, Update, and Delete tasks.
- **Protected Routes:** Frontend and Backend routes are protected via JWT.
- **Error Handling:** Centralized error handling and validation.

## 📂 Project Structure

```text
/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── api.js
    │   └── App.jsx
    └── package.json
```
