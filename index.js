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
app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const saveEvent = await event.save();
    if (!saveEvent)
      res
        .status(404)
        .json({
          error:
            "Please check the data format and all data values correct or not and please try again. Check logs for more details.",
        });
    else res.status(200).json({ message: "Event Added Successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error:
          "Some error occurred with the request itself. Please check logs & try again",
      });
  }
});

//Route to fetch all the events from database..
app.get("/events", async (req, res) => {
  try {
    const eventData = await Event.find();
    if (!eventData)
      res
        .status(404)
        .json({
          error:
            "Error fetching events. Either no event present or some other error. Please try again.",
        });
    else res.status(200).json(eventData);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Some error occurred with the request itself. Please check logs & try again.",
      });
  }
});

//Route to fetch event details by event ID.
app.get("/events/:eventId", async (req, res) => {
  try {
    const eventData = await Event.findById(req.params.eventId);
    if (!eventData)
      res
        .status(404)
        .json({
          error:
            "Error fetching event with given ID. Either event not present or some other error. Please try again.",
        });
    else res.status(200).json(eventData);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Some error occurred with the request itself. Please check logs & try again.",
      });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
