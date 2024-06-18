const express = require("express");

const app = express();

// Exercise 1 :

app.get("/greet/:Bailey", (req, res) => {
  res.send("<h1>Greetings, Bailey</h1>");
});

// Exercise 2:

app.get("/roll/:number", (req, res) => {
  const number = req.params.number;
  if (isNaN(number)) {
    return res.send("You must specify a number.");
  }
  const highestNumber = parseInt(number);
  // parseInt turns string into integer
  const roll = Math.floor(Math.random() * highestNumber);
  res.send(`You have rolled a ${roll}!`);
});

// Exercise 3:

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = req.params.index;
  if (index > collectibles.length - 1) {
    return res.send("This item is not yet in stock. Check back soon!");
  } else {
    let collectible = collectibles[index];
    let message = `So, you want the ${collectible.name}? For $${collectible.price} it can be yours!`;
    return res.send(message);
  }
});

// Exercise 4:

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  let shoeList = shoes;
  if (req.query["min-price"]) {
    let minPrice = Number(req.query["min-price"]);
    shoeList = shoeList.filter((shoe) => shoe.price >= minPrice);
    return res.send(shoeList);
  }

  if (req.query["max-price"]) {
    let maxPrice = Number(req.query["max-price"]);
    shoeList = shoeList.filter((shoe) => shoe.price <= maxPrice);
    return res.send(shoeList);
  }

  if (req.query.type) {
    let type = req.query.type;
    shoeList = shoeList.filter((shoe) => shoe.type === type);
    return res.send(shoeList);
  }

  return res.send(shoeList);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
