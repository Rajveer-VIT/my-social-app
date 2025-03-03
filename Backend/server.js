require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connect");
const passport = require("./config/passportConfig");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const port = process.env.PORT || 5000;

connectDB().then(() => console.log("✅ MongoDB Connected")).catch(err => {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1);
});

// CORS Middleware
app.use(
  cors({
    origin: "https://my-social-app-git-main-rajveer-singhs-projects-498636d3.vercel.app", // Replace with your frontend URL
    credentials: true, // Allow credentials
    methods: "GET,POST,PUT,DELETE", // Allow specific HTTP methods
  })
);

// Handle OPTIONS requests for all routes
app.options("*", cors());

app.use(express.json());

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none" },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/apii", contactRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
