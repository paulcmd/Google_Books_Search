const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);
// Connect to the Mongo DB

mongoose.set("debug", true);
mongoose.connect(process.env.MONGODB_URI || "mongodb://user:root123@ds249269.mlab.com:49269/heroku_2p9mg9gg",
  // "mongodb://localhost/booksDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB connection established")
);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`======> App listening on ${PORT}!`);
});
