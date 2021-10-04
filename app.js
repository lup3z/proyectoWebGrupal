const express = require("express");
const app = express();
app.set("view engine", "ejs");
const path = require("path");
app.set("views",path.join(__dirname, "./views"));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var methodOverride = require ('method-override')

var indexRouter = require("./routes/main.routes");
app.use(methodOverride("_method"));
app.use("/", indexRouter);


const puerto = process.env.PORT || 3030

app.listen(puerto, () => {
  console.log(`Server is running on PORT : ${puerto}`);
});

module.exports = app;