import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  level: {
    type: Int32Array,
    required: true,
  },
  map: {
    type: Number,
    required: true,
  },
  duckPosition: {
    type: Array,
    required: true,
  },
  startCode: {
    type: Array,
    required: true,
  },
});

const Level = mongoose.model("level", levelSchema);

export default Level;
