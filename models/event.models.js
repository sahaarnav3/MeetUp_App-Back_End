const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: ["Online", "Offline"],
    required: true
  },
  imageLink: {
    type: String,
    required: true,
  },
  hostedBy: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  dressCode: {
    type: String,
    required: true,
  },
  ageRestriction: {
    type: String,
    required: true,
  },
  dateTimeFrom: {
    type: String,
    required: true,
  },
  dateTimeTo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  speakers: {
    type: [speakerSchema],
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
