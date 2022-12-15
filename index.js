
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//  const User = require("./models/user.model");
 const Shopping = require("./models/shopping.model");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const connect = () => {
  let password = process.env.pass;
  return mongoose.connect(
    `mongodb+srv://Nishant:${password}@cluster0.k7kiurw.mongodb.net/?retryWrites=true&w=majority`
  );
};

app.post("/shoppingDetails", async (req, res) => {
  console.log(req.body);
  try {
    let response = await Shopping.create({
      title: req.body.title,
      quantity: req.body.quantity,
      priority: req.body.priority,
      description:req.body.description
    });
    console.log(response)
    res.json({ status: "ok" , data:response});
  } catch (err) {
    console.log(err)
    res.json({ status: "error", error: "duplicate title or something went wrong" });
  }
});
app.delete("/shoppingDetails", async (req, res) => {
  console.log(req.body);
  let id = req.query.title
  try {
    let res= Shopping.findOneAndDelete({title:id})
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err)
    res.json({ status: "error", error: err });
  }
});









app.listen(8080, async () => {
  await connect();
  console.log("server started at port 8080");
});
