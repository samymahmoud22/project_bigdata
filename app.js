const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const User = require("./models/mydataschema");
const userRoutes = require('./routes/users');

const app = express();

// View Engine
app.set("view engine", "ejs");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/course4arab?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

// Routes
app.get("/", async (req, res) => {
  const users = await User.find();
  res.render("index", { users });
});

// استخدام Routes المستخدمين
app.use('/users', userRoutes);

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
