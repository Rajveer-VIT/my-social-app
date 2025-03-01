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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/apii", contactRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});