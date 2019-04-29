const path = require("path");
var express = require("express");
const bodyParser = require("body-parser");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://kapil:" + process.env.MONGO_ATLAS_PW + "@cluster-lsnkw.mongodb.net/test1?retryWrites=true")
.then(() => {
  console.log(); 'Connected to database'
})
.catch(() => {
  console.log(); 'Connected Faild!'
}) ;
// const password = "POnuZ8Vkw05ZNmpf";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extented: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requseted-With, Content-Type, Accept, Authorization ");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
