require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const multer = require("multer");
const Portfolio = require("./model/Portfolio");
const { cloudinary } = require("./cloudinary");
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

app.route("/add").post(function (req, res) {
  // CREATING A NEW OBJECT FROM THE PARAMETER PASSES TO THE API
  const newPortfolio = new Portfolio({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    tag: req.body.tag,
  });

  newPortfolio.save(function (err) {
    // res.send(err);
    if (!err) {
      res.send("Successfully added a new article.");
    } else {
      res.status(400).send(err);
    }
  });
});

app.route("/update/:portfolioName").put(function (req, res) {
  Portfolio.updateOne(
    { name: req.params.portfolioName },
    { name: req.body.name, description: req.body.description },
    // { overwrite: true },
    function (err) {
      if (!err) {
        res.send("Successfully updated the content of the selected article.");
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
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
