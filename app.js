const express = require("express");
const app = express();
app.set("view engine", "ejs");
const path = require("path");
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
var indexRouter = require("./routes/main.routes");



app.use("/", indexRouter);

/*
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/home.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/register.html"));
});

app.get("/productCart", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/productCart.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/login.html"));
});

app.get("/productDetails", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/productDetails.html"));
});*/

const puerto = process.env.PORT || 3031

app.listen(puerto, () => {
  console.log(`Server is running on PORT : ${puerto}`);
});

module.exports = app;