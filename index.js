const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

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

app.post("/users", (req, res) => {
  const user = req.body;

  if (!user || !user.name) {
    return res.status(400).send("Invalid user data.");
  }

  if (user.name === "John") {
    return res.send("John name is not accepted");
  }

  let data = [];

  if (fs.existsSync("users.json")) {
    const file = fs.readFileSync("users.json").toString();
    data = JSON.parse(file);
  }

  data.push(user);
  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));

  res.send("User added.");
});

app.use((req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("App running at http://localhost:3000");
});
