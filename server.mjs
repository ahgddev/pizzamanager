import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import toppingRoutes from "./routes/toppingsRoutes.mjs";
import pizzasRoutes from "./routes/pizzasRoutes.mjs";
import path from "path";
import methodOverride from "method-override";
import pug from "pug";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(".", "src")));

//Views
app.set("views", "./views");
app.set("view engine", "pug");
// const pug = require('pug');

app.use(function (req, res, next) {
  res.locals.current_url = req.path;
  res.locals.base_url = req.baseUrl;
  next();
});
//Error-handling middleware.
const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: "Internal Server Error" });
};
try {
  app.get("/", function (req, res) {
    res.send(
      pug.renderFile("views/default.pug", {
        welcomeMessage:
          "Welcome to the pizza manager! Here is where you can manage Pizza Masterpieces and Toppings. Click any link to the left to start.",
        managerType: " ",
      })
    );
  });
  app.use("/toppings", toppingRoutes);
  app.use("/pizzas", pizzasRoutes);
} catch (error) {
  app.use(errorHandler());
}

app.listen(PORT, () => {
  console.log("Listening....");
});
