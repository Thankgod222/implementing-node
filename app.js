require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const { storage } = require("./cloudinary/index");
const upload = multer({ storage });
const Portfolio = require("./model/Portfolio");

const app = express();

app.use(express.json());

mongoose.connect(process.env.db_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "MyPortfolioSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);

app.get("/", function (req, res) {
  Portfolio.find({}, (error, port) => {
    if (error) {
      console.log(err);
      res.status(500).send({ message: error });
    } else {
      res.render("pages/index", { portfolio: port });
    }
  });
});

app.route("/update").post(upload.single("image"), function (req, res) {
  console.log(req.file.path);
  res.send("IT Worked?!");
});

app.route("/add").post(upload.single("image"), function (req, res) {
  // CREATING A NEW OBJECT FROM THE PARAMETER PASSES TO THE API

  let name = req.body.name;
  let description = req.body.description;
  let category = req.body.category;
  let image = req.body.image;
  let tags = JSON.parse(req.body.tag);

  if (
    name == "" ||
    description == "" ||
    category == "" ||
    image == "" ||
    tags == ""
  ) {
    res.send("empty cant proceed");
  } else {
    const newPortfolio = new Portfolio({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      image: req.file.path,
      tag: tags,
    });

    newPortfolio.save(function (err) {
      // res.send(err);
      if (!err) {
        res.send("Successfully added a new portfolio item.");
      } else {
        res.status(400).send(err.message);
      }
    });
  }
});

app.route("/update/:portfolioName").put(function (req, res) {
  Portfolio.updateOne(
    { name: req.params.portfolioName },
    { name: req.body.name, description: req.body.description },

    function (err) {
      if (!err) {
        res.send(
          "Successfully updated the content of the selected portfolio item."
        );
      } else {
        res.send(err);
      }
    }
  );
});

// DELETE ROUTE FOR A CORRESPONDING ARTICLE
app.route("/delete/:portfolioName").delete(function (req, res) {
  Portfolio.deleteOne({ name: req.params.portfolioName }, function (err) {
    if (!err) {
      res.send("Successfully deleted portfolio item by portfolio name.");
    } else {
      res.send(err);
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
