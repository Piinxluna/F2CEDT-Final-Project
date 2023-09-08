import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true,
  },
  map: {
    type: Array,
    required: true,
  },
  momDuckStartPos: {
    type: Array,
    required: true,
  },
  totalBaby: {
    type: Number,
    required: true,
  },
  scoring: {
    type: Array,
    required: true,
  },
  hint: {
    type: String,
    required: true,
  },
});

const Level = mongoose.model("levels", levelSchema);

export default Level;
