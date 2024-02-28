//Create routes for the server to manage
// Utilize route parameters, where appropriate.
//Create GET routes for all data that should be exposed to the client.
//Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request.
//Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request.
//Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request.

import toppingDB from "../data/toppingDatabase.mjs";
import express from "express";
const router = express.Router();

// Base route, get all Toppings by default
// GET: Get all toppings.
// POST: Make a new topping. You cannot add duplicate toppings.
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      res.render("toppings.pug", {
        baseURL: true,
        managerType: "toppings",
        messageAlert: "Welcome to the toppings section",
      });
    } catch (error) {
      res.render("404.pug", {
        messageAlert: "Something went wrong...Error Code: " + res.statusCode,
      });
    }
    next();
  })
  .post(async (req, res) => {
    let allToppingsData = await toppingDB.collection("Ingredients");
    let lastTopping = await allToppingsData
      .find()
      .sort({ topping_id: -1 })
      .limit(1)
      .toArray();
    if (lastTopping[0].name == req.body.name) {
      throw new Error("This topping already exists");
    }

    let newTopping = {
      topping_id: lastTopping[0].topping_id + 1,
      name: req.body.name,
      type: req.body.type,
      serving_size: req.body.serving_size,
      price_per_serving: Number(req.body.price_per_serving),
    };
    allToppingsData.insertOne(newTopping);

    if (res.statusCode == 200 || res.statusCode == 201) {
      res.render("toppings.pug", {
        baseURL: true,
        managerType: "toppings",
        messageAlert: "New topping added",
      });
    } else {
      res.render("404.pug", {
        messageAlert: "Something went wrong...Error Code: " + res.statusCode,
      });
    }
  });

// Get all Toppings
// GET: Get all toppings. A specific route to get all of them will be useful.
router.route("/all").get(async (req, res) => {
  let allToppingsData = await toppingDB.collection("Ingredients");
  let foundToppings = await allToppingsData
    .find({})
    .sort({ topping_id: 1 })
    .toArray();
  res.render("toppings.pug", {
    productData: foundToppings,
    managerType: "toppings",
  });
});

//Get a topping based on search parameters
//GET: Get a topping based on search parameters
router.route("/search").get(async (req, res) => {
  let allToppingsData = await toppingDB.collection("Ingredients");
  let searchData = req.query.name;
  let foundTopping = await allToppingsData
    .find({ name: { $regex: new RegExp(searchData, "i") } })
    .toArray();
  res.render("toppings.pug", {
    productData: foundTopping,
    managerType: "toppings",
  });
});

//Sort toppings
//GET: Sort toppings based on certain parameters
router.route("/filter").get(async (req, res) => {
  let allToppingsData = await toppingDB.collection("Ingredients");
  //filter toppings based on query given
  let searchData = req.query.q;
  switch (searchData) {
    //High Price to Low Price
    case "ascending":
      let orderedToppingsASC = await allToppingsData
        .find({})
        .sort({ price_per_serving: -1 })
        .toArray();
      res.render("toppings.pug", {
        productData: orderedToppingsASC,
        managerType: "toppings",
      });
      break;
    //Low price to high price
    case "descending":
      let orderedToppingsDES = await allToppingsData
        .find({})
        .sort({ price_per_serving: 1 })
        .toArray();
      res.render("toppings.pug", {
        productData: orderedToppingsDES,
        managerType: "toppings",
      });
      break;
    //Alphabetical order
    case "alphabetical":
      let orderedToppingsALPHA = await allToppingsData
        .find({})
        .sort({ name: 1 })
        .toArray();
      res.render("toppings.pug", {
        productData: orderedToppingsALPHA,
        managerType: "toppings",
      });
      break;
  }
});

//Get a topping with a specific ID
// DELETE: Delete a single Topping
// PATCH: Update a single Topping
router
  .route("/:id")
  .get(async (req, res) => {
    let allToppingsData = await toppingDB.collection("Ingredients");
    let searchData = { topping_id: Number(req.params.id) };
    let foundTopping = await allToppingsData.findOne(searchData);
    let convertTopping = [foundTopping];
    try {
      res.render("toppings.pug", {
        productData: convertTopping,
        managerType: "toppings",
      });
    } catch (error) {
      res.render("404.pug", {
        messageAlert: "Something went wrong...Error Code: " + res.statusCode,
      });
    }
  })
  .delete(async (req, res) => {
    let allToppingsData = await toppingDB.collection("Ingredients");
    let searchData = { topping_id: Number(req.params.id) };
    await allToppingsData.deleteOne(searchData);

    if (
      res.statusCode == 200 ||
      res.statusCode == 201 ||
      res.statusCode == 204
    ) {
      res.render("toppings.pug", {
        baseURL: true,
        managerType: "toppings",
        messageAlert: "Topping deleted",
      });
    } else {
      res.render("404.pug", {
        messageAlert: "Something went wrong...Error Code: " + res.statusCode,
      });
    }
  })
  .patch(async (req, res) => {
    let allToppingsData = await toppingDB.collection("Ingredients");
    let updateResult = await allToppingsData.updateOne(
      { topping_id: Number(req.params.id) },
      {
        $set: {
          topping_id: Number(req.params.id),
          name: req.body.name,
          type: req.body.type,
          serving_size: req.body.serving_size,
          price_per_serving: req.body.price_per_serving,
        },
      }
    );

    if (!updateResult) res.send("Topping not found").status(400);
    res.render("toppings.pug", {
      baseURL: true,
      managerType: "toppings",
      messageAlert: "Topping updated.",
    });
  });

export default router;
