const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const { initialiseDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
initialiseDatabase();

//Homepage
app.get("/", (req, res) => {
  res.send("<h1>Welcome..!</h1>");
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
