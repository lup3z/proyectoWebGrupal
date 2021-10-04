const express = require("express"); //le asignamos a la variable express el módulo de express
const app = express(); //guardamos en la varaible app el resultado de invocar la función express y mediante ella tenemos acceso a todas las propiedades y métodos




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


