require("dotenv");
const express = require("express");
const app = express();
const stripe = require("./gateway/stripe");
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/", stripe);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
