# 👤 User Management System (Node.js + Express + EJS)

This is a lightweight and educational **User Management App** built with **Node.js**, **Express.js**, and **EJS templating engine**. It allows users to be added via a frontend form, lists all users via an API route, and supports filtering via query parameters. Data is stored locally using the built-in `fs` module — **no database or login system** is used.

---

## 🚀 Features

- 📝 Add new users through a styled EJS form
- 📄 Store user data in a local `users.json` file
- 🔍 Filter users by name, age, city, gender via query parameters
- ❌ Rejects duplicate emails and a specific name ("john")
- 📊 Displays success/error messages with full styling

---

## 🌐 Routes Overview

| Method | Route         | Description                        |
|--------|---------------|------------------------------------|
| GET    | `/`           | Home/info page                     |
| GET    | `/add-user`   | Form to add a new user             |
| POST   | `/users`      | Handle user form submission        |
| GET    | `/users`      | Returns filtered user list in JSON |

### Example Filter:
/users?city=Karachi&gender=female

---

## 📄 Sample Form Inputs

Form at `/add-user` includes:

- Name
- Age
- Email
- Gender (radio buttons)
- City

---

## 🧠 Validations & Rules

- `name`, `age`, `email`, `gender`, and `city` are required
- `email` must be unique (checked against `users.json`)
- `name = john` is blocked for demo purposes

---

## 🛠 Tech Stack

- Node.js
- Express.js
- EJS Templating Engine
- `fs` module (for local JSON storage)

---

## 🔧 How to Run

1. Clone the repository:

- git clone https://github.com/YOUR_USERNAME/User-Management-App.git
- cd User-Management-App
- Install dependencies:
- npm install

- Start the server:

- node index.js
- Open in browser: 👉 http://localhost:3000

---

## 📦 Sample users.json Entry

- json
  
```bash
{
  "name": "Ali",
  "age": 25,
  "email": "ali@example.com",
  "gender": "male",
  "city": "Lahore"
}
```
---

## 🤝 Acknowledgments
- This project was created as part of learning during my studies at Jamia Baitussalam.
