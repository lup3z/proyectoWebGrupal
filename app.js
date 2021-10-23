const express = require("express"); 
const path = require("path"); 
const methodOverride = require ('method-override');
const indexRouter = require ("./src/routes/main.routes");
const app = express(); 
const puerto = process.env.PORT || 3030

app.set("views",path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); 
app.use(methodOverride("_method"));
app.use("/", indexRouter); 
app.use((req, res, next) => {
  res.status(404).render('not-found')
});


app.listen(puerto, () => {
  console.log(`Server is running on PORT : ${puerto}`);
});

module.exports = app;


