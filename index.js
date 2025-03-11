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

//Route to push data to database..
app.post("/event", async (req, res) => {
  try {
    const event = new Event(req.body);
    const saveEvent = await event.save();
    if(!saveEvent)
      res.status(404).json({error: "Please check the data format and all data values correct or not and please try again. Check logs for more details."});
    else 
      res.status(200).json({ message: "Event Added Successfully." });
    
  } catch (error) {
    console.log(error);
    res.status(505).json({ error: "Some error occurred with the request itself. Please check logs & try again" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
