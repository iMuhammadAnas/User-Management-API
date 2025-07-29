const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Path:", req.path);
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", (req, res) => {
  const filters = req.query;

  let data = [];

  if (fs.existsSync("users.json")) {
    const file = fs.readFileSync("users.json").toString();
    data = JSON.parse(file);
  }

  const filtered = data.filter((user) => {
    for (const key in filters) {
      const userValue = user[key];
      const filterValue = filters[key];

      if (typeof userValue === "string" && typeof filterValue === "string") {
        if (userValue.toLowerCase() !== filterValue.toLowerCase()) {
          return false;
        }
      } else {
        if (userValue != filterValue) {
          return false;
        }
      }
    }
    return true;
  });

  res.json(filtered);
});

app.get("/add-user", (req, res) => {
  res.render("add-user");
});

app.post("/users", (req, res) => {
  const user = req.body;

  if (!user || !user.name || !user.email) {
    return res.status(400).send("Invalid user data.");
  }

  if (user.name.toLowerCase() === "john") {
    return res.send("John name is not accepted");
  }

  let data = [];

  if (fs.existsSync("users.json")) {
    const file = fs.readFileSync("users.json").toString();
    data = JSON.parse(file);
  }

  const alreadyExists = data.find(
    (u) => u.email.toLowerCase() === user.email.toLowerCase()
  );

  if (alreadyExists) {
    return res.status(409).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>User Added</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            padding: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .message-box {
            background: #fff;
            padding: 30px 40px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h2 {
            color: #28a745;
            margin-bottom: 20px;
          }
          a {
            display: inline-block;
            margin: 10px;
            padding: 10px 20px;
            background: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s ease;
          }
          a:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="message-box">
          <h2>⚠️ User with this email already exists.</h2>
          <a href="/">🏠 Back to Home</a>
          <a href="/users">📋 View Users</a>
        </div>
      </body>
    </html>
  `);
  }

  data.push(user);
  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>User Added</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            padding: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .message-box {
            background: #fff;
            padding: 30px 40px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h2 {
            color: #28a745;
            margin-bottom: 20px;
          }
          a {
            display: inline-block;
            margin: 10px;
            padding: 10px 20px;
            background: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s ease;
          }
          a:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="message-box">
          <h2>✅ User added successfully!</h2>
          <a href="/">🏠 Back to Home</a>
          <a href="/users">📋 View Users</a>
        </div>
      </body>
    </html>
  `);
});

app.use((req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("App running at http://localhost:3000");
});
