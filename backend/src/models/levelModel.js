import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true,
  },
  mapFile: {
    type: String,
    required: true,
  },
  mapArray: {
    type: Array,
    required: true,
  },
  momDuckStartPos: {
    type: Array,
    required: true,
  },
  babyDuckPos: {
    type: Array,
    required: true,
  },
  goalPos: {
    type: Array,
    required: true,
  },
  codeGuide: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    required: true,
  },
});

const Level = mongoose.model("levels", levelSchema);

export default Level;
