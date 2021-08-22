const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/home.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/register.html"));
});


const puerto = process.env.PORT || 3031

app.listen(puerto, () => {
  console.log(`Server is running on PORT : ${puerto}`);
});