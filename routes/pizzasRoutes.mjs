//Create routes for the server to manage
import pizzaDB from "../data/pizzaDatabase.mjs";
import toppingDB from "../data/toppingDatabase.mjs";
import express from "express";
const router = express.Router();
let allToppingsData = await toppingDB.collection("Ingredients");
let toppingNames = await allToppingsData
  .find({})
  .project({ name: 1, _id: 0 })
  .toArray();

//Middleware function that puts all of the toppings in an array to send to the database.
function addIngredients(req, res, next) {
  let toppingArray = [];
  for (let [key, value] of Object.entries(req.body)) {
    if (value == "on") {
      toppingArray.push(key);
    }
  }
  req.body.ingredients = toppingArray;
}

// Base route, get all pizzas by default
// GET: Get all pizzas.
// POST: Make a new pizza. You cannot add duplicate pizzas.
router
  .route("/")
  .get(async (req, res) => {
    if (res.statusCode == 200 || res.statusCode == 201) {
      res.render("pizzas.pug", {
        baseURL: true,
        managerType: "pizzas",
        toppingData: toppingNames,
        messageAlert: "Welcome to the pizzas section",
      });
    } else {
      res.render("404.pug", {
        messageAlert: "Something went wrong...Error Code: " + res.statusCode,
      });
    }
  })
  .post(async (req, res) => {
    let allPizzasData = await pizzaDB.collection("Menu");
    let lastPizza = await allPizzasData
      .find()
      .sort({ pizza_id: -1 })
      .limit(1)
      .toArray();
    if (lastPizza[0].name == req.body.name) {
      res.render("404.pug", {
        messageAlert: "This pizza already exists. Error: " + res.statusCode,
      });
    }
    addIngredients(req);
    let newPizza = {
      pizza_id: lastPizza[0].pizza_id + 1,
      name: req.body.name,
      ingredients: req.body.ingredients,
      whole_price: Number(req.body.whole_price),
      slice_price: Number(req.body.slice_price),
    };
    allPizzasData.insertOne(newPizza);

    if (res.statusCode == 200 || res.statusCode == 201) {
      res.render("pizzas.pug", {
        baseURL: true,
        managerType: "pizzas",
        messageAlert: "New pizza added",
      });
    } else {
      res.render("404.pug", {
        messageAlert: "Something went wrong...Error Code: " + res.statusCode,
      });
    }
  });

// Get all pizzas
// GET: Get all pizzas. A specific route to get all of them will be useful.
router.route("/all").get(async (req, res) => {
  let allPizzasData = await pizzaDB.collection("Menu");
  let foundPizzas = await allPizzasData
    .find({})
    .sort({ pizza_id: 1 })
    .toArray();
  res.render("pizzas.pug", {
    productData: foundPizzas,
    toppingData: toppingNames,
    managerType: "pizzas",
  });
});

//Get a pizza based on search parameters
//GET: Get a pizza based on search parameters
router.route("/search").get(async (req, res) => {
  let allPizzasData = await pizzaDB.collection("Menu");
  let searchData = req.query.name;
  let foundPizza = await allPizzasData
    .find({ name: { $regex: new RegExp(searchData, "i") } })
    .toArray();
  res.render("pizzas.pug", {
    productData: foundPizza,
    toppingData: toppingNames,
    managerType: "pizzas",
  });
});

//Sort pizzas
//GET: Sort pizzas based on certain parameters
router.route("/filter").get(async (req, res) => {
  let allPizzasData = await pizzaDB.collection("Menu");
  //filter pizzas based on query given
  let searchData = req.query.q;
  //Out of stock?
  //Last Modified?
  switch (searchData) {
    //High Price to Low Price
    case "ascending":
      let orderedpizzasASC = await allPizzasData
        .find({})
        .sort({ slice_price: -1 })
        .toArray();
      res.render("pizzas.pug", {
        productData: orderedpizzasASC,
        toppingData: toppingNames,
        managerType: "pizzas",
      });
      break;
    //Low price to high price
    case "descending":
      let orderedpizzasDES = await allPizzasData
        .find({})
        .sort({ slice_price: 1 })
        .toArray();
      res.render("pizzas.pug", {
        productData: orderedpizzasDES,
        toppingData: toppingNames,
        managerType: "pizzas",
      });
      break;
    //Alphabetical order
    case "alphabetical":
      let orderedpizzasALPHA = await allPizzasData
        .find({})
        .sort({ name: 1 })
        .toArray();
      res.render("pizzas.pug", {
        productData: orderedpizzasALPHA,
        toppingData: toppingNames,
        managerType: "pizzas",
      });
      break;
  }
});

//Get a pizza with a specific ID
// DELETE: Delete a single pizza
// PATCH: Update a single pizza
router
  .route("/:id")
  .get(async (req, res) => {
    let allPizzasData = await pizzaDB.collection("Menu");
    let searchData = { pizza_id: Number(req.params.id) };
    let foundPizza = await allPizzasData.findOne(searchData);
    let convertPizza = [foundPizza];
    if (
      res.statusCode == 200 ||
      res.statusCode == 201 ||
      res.statusCode == 204
    ) {
      res.render("pizzas.pug", {
        productData: convertPizza,
        toppingData: toppingNames,
        managerType: "pizzas",
      });
    } else {
      res.render("404.pug", {
        messageAlert: "Something went wrong...Error Code: " + res.statusCode,
      });
    }
  })
  .delete(async (req, res) => {
    let allPizzasData = await pizzaDB.collection("Menu");
    let searchData = { pizza_id: Number(req.params.id) };
    await allPizzasData.deleteOne(searchData);

    if (
      res.statusCode == 200 ||
      res.statusCode == 201 ||
      res.statusCode == 204
    ) {
      res.render("pizzas.pug", {
        baseURL: true,
        managerType: "pizzas",
        messageAlert: "Pizza deleted",
      });
    } else {
      res.render("404.pug", {
        messageAlert: "Something went wrong...Error Code: " + res.statusCode,
      });
    }
  })
  .patch(async (req, res) => {
    let allPizzasData = await pizzaDB.collection("Menu");
    addIngredients(req);
    let updateResult = await allPizzasData.updateOne(
      { pizza_id: Number(req.params.id) },
      {
        $set: {
          pizza_id: Number(req.params.id),
          name: req.body.name,
          ingredients: req.body.ingredients,
          whole_price: Number(req.body.whole_price),
          slice_price: Number(req.body.slice_price),
        },
      }
    );

    if (!updateResult)
      res.render("404.pug", {
        messageAlert: "Something went wrong...Error Code: " + res.statusCode,
      });
    res.render("pizzas.pug", {
      baseURL: true,
      managerType: "pizzas",
      messageAlert: "Pizza updated.",
    });
  });

export default router;
