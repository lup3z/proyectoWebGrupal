const express = require("express");
const session = require('express-session')
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const path = require("path");
const methodOverride = require('method-override');
const app = express();
const puerto = process.env.PORT || 3030

app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");

app.use(session({
  secret: "Shhh, It's a secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use("/", require("./src/routes/index.routes"));
app.use((req, res, next) => {
  res.status(404).render('not-found')
});

app.listen(puerto, () => {
  console.log(`Server is running on PORT : ${puerto}`);
});

module.exports = app;