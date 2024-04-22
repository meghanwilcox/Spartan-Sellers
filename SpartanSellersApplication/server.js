// Setting up express and required middleware
const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');
const passport = require('passport');

// Configuring session middleware
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Initializing passport
app.use(passport.initialize());
app.use(passport.session());

// Using multer for handling multipart/form-data
const multer = require("multer");
app.use(multer().none());

// Parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parsing JSON bodies
app.use(express.json());

// Configuring view engine and static files directory
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Setting up user routes
const userRouter = require("./routes/user.route");
app.use("/user", userRouter);

// Setting up admin routes
const adminRouter = require("./routes/admin.route");
app.use("/admin", adminRouter);

// Rendering login page on root route
app.get("/", (req, res) => {
  res.render("index", { title: 'Login' });
});

// Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
