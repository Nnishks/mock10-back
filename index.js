
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
 const User = require("./models/user.model");
// const AddBlog = require("../Server/models/Addblog");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const connect = () => {
  var password = process.env.pass;
  return mongoose.connect(
    `mongodb+srv://Nishant:${encodeURIComponent(
      password
    )}@blogmongo.vsvctff.mongodb.net/NishantBlog`
  );
};

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    // const role =
    //   req.body.email === process.env.admin_mail ? "admin" : "creator";
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "duplicate email" });
  }
});


app.post("/api/log", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
    // password: req.body.password,
  });
  if (user) {
    const token = `${req.body.email}${Math.random() * 10}`

    return res.json({ status: "ok", user: token});
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/userDetails", async (req, res) => {
  console.log(req.body.email);

  const user = await User.findOne({
    email: req.body.email,
  }).populate();
  if (user) {
    return res.json({ status: "ok", detail:user});
  } else {
    return res.json({ status: "error", mssg:"no user found with this mail" });
  }
});

app.get("/api/calEmi", async (req, res) => {
  // console.log(req.body.email);
  let P = req.body.Principal;
  let r = req.body.rateOfInterest;
  let n = req.body.duration;

  if(P && r && n){
    E = P * r * ( 1 + r ) * n / ( ( 1 + r )* n - 1 ) ;
    return res.json({ status: "ok", Emi:{
      emi:E,
      duration:req.body.duration,
      repayableAmount:E*r
    }});

  }
 else {
    return res.json({ status: "error", mssg:"no user found with this mail" });
  }
});

app.post("/api/logot", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = null

    return res.json({ status: "ok", user: false , token});
  } else {
    return res.json({ status: "error", msg:"user trying to logout does not exist" });
  }
});






app.listen(8080, async () => {
  await connect();
  console.log("server started at port 8080");
});
