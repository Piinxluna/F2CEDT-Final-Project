import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },    
  inputNum: {
    type: Number,
    required: true,
  }
  },
{ timestamps: true }
);

const leaderboard = mongoose.model("leaderboard", leaderboardSchema);

export default leaderboard;