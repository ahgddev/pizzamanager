# Pizza Manager
## Project
This is a full stack web development project showcasing my skills using MERN Stack technologies to create a fully functioning webpage.
The chef user profile image and search icon is from [iconmonstr](https://iconmonstr.com/).

## Tools Used
VSCode, node.js, express.js, pug, mongoDB

## Coding Languages used
HTML,CSS,Javascript (vanilla) 

## Running the application locally
Running this app locally requires the following to be installed; node.js, mongoDB

Documentation: Include a README file that contains detailed instructions on how to build, test, and run your application locally.
1. Execute `git clone` to download this repository into a folder.
2. Once downloaded, execute `npm install` to download all required dependencies and files for the application.
3. This application utilizes *mongoDB* to save, edit and fetch data from a database. Create a new instance named *pizzaDB*.
4. This github repo comes with two files containing the needed database information; `pizzaMasterPieces.Menu.json` and `pizzaToppings.Ingredients.json`
5. In the *pizzaDB* instance, create a database named *pizzaMasterPieces*, then add a collection named *Menu* inside. 
6. Import the `pizzaMasterPieces.Menu.json` file into the *Menu* collection.
7. Go back to the *pizzaDB* instance, and now create a database named *pizzaToppings*, then add a collection named *Ingredients* inside. 
8. Import the `pizzaToppings.Ingredients.json` file into the *Ingredients* collection.
9. Create an .env file with the following information; 
- ATLAS_URI= Your connection string to your *pizzaDB*
- PORT= Optional, specify the port the app should run on. It defaults to 3000 if nothing is specified.
10. Execute `nodemon server.js` to start running the application.
11. Go to http://localhost:PORTNumberHere/ to load the application in a browser.

## Testing
The app can be tested by using an application like Postman, Thunderclient, etc. to test the web APIs. Or by utilizing the app directly when run using nodemon.

### Testing in a web API application
Add your *pizzaDB* connection string to the application's header option with the key name ATLAS_URI.
Replace "baseURL" in the urls below with the word toppings or pizzas to test out the API. Both have full CRUD capabilities.

| URL      | Expected Req Type | Response    |
| :-------- | ----------- | :----------- |
| http://localhost:PORTNumberHere/ | GET or POST |  GET - Styled page loads, 200 OK Response with HTML file.<br>POST - User is sent to "Topping added" page on successful request. 200 OK Response
| http://localhost:PORTNumberHere/baseURL/ | GET |  Styled page loads, 200 OK Response with a HTML file.
| http://localhost:PORTNumberHere/baseURL/all | GET |  Page loads all toppings/pizzas in database, 200 OK Response with toppings/pizzas in a HTML file.
| http://localhost:PORTNumberHere/baseURL/search?name=  | GET |  Page loads toppings/pizzas that match the given search query. Query can be partial words (Like ext) and include spaces. For example, searching up "Ext" will bring up pizzas with the word "Extra" in them. *Search only works on topping/pizza names*<br>Example URL http://localhost:3000/toppings/search?name=onion will bring up the topping named onion. Sends a 200 OK Response with toppings/pizzas in a HTML file.
|http://localhost:PORTNumberHere/baseURL/filter?q=  | GET |  GET - Page loads all toppings/pizzas in the specified order. For pizzas, sorting by price is based on the *Slice Price*.<br>Example URL http://localhost:PORTNumberHere/baseURL/filter?q=alphabetical will bring up all toppings/pizzas in alphabetical order. Sends a 200 OK Response with toppings/pizzas in a HTML file.
|http://localhost:PORTNumberHere/baseURL/id  | GET, DELETE, PATCH |  GET - Page loads the topping/pizza with a certain ID. Sends a 200 OK Response with toppings/pizzas in HTML file.<br>DELETE - Deletes the topping/pizza from the database. Sends a 200 OK Response with a "Topping/Pizza Delete" HTML file.<br>PATCH - Edits a topping.  Sends a 200 OK Response with a "Topping/Pizza Added" HTML file.|

- Topping/Pizza object format
When adding or editing a topping/pizza it must be sent in JSON format. The properties for toppings/pizzas are as follows

**Topping**
```
{
    topping_id: Number, must exist within the database (This is set automatically if testing via the webpage based on req.params.id),
    name: String,
    type: Must a String that contains either "vegetable" or "meat",
    serving_size: String,
    price_per_serving: Number, can be a Double as well (example: 1 and 1.25 are acceptible),
}

```

**Pizza**
```
{
    pizza_id: Number, must exist within the database (This is set automatically if testing via the webpage based on req.params.id),
    name: String,
    ingredients: Array of Strings,
    whole_price: Number, can be a Double as well (example: 1 and 1.25 are acceptible),
    slice_price: Number, can be a Double as well (example: 1 and 1.25 are acceptible),
}

```

## Overview
This web page allows a pizza chef to manage toppings and pizzas. A chef can see all current pizzas/toppings in their inventory. They can also delete a topping/pizza, search for toppings/pizzas and edit toppings/pizzas. 

I utilized MERN stack (MongoDB, Express.js and node.js) technologies to create this application because of the ease at which everything can be intergrated together using Javascript. A view engine was used to easily intergrate data from the database to appear in the front end.

## Blockers
The error handling routes and middleware were not working. For example putting in an id in the toppings/# url crashes the app instead of going to the 404 page. I attempted to do the following to fix this,
- add a route that caught all routes that weren't defined `(*)`, `(/*)`
- add a route that would try to catch undefined routes with regex
- try/catch in the route files and the server.mjs file.
- if/else based on res status code to render the 404 page.
- Ask the course teacher assistant for help (she couldn't figure it out either).

## Improvements
Things I'd like to improve or modify in my app;
- Fix the error handling
- Add Stock and Last update/Creation Dates for toppings/pizzas
- Enable searching by more than just the topping/pizza name
- Enable sorting by more than just names in Alphabetical Order/Price
