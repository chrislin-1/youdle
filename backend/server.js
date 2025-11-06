import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Read database file
function loadData() {
  const raw = fs.readFileSync("./db.json");
  return JSON.parse(raw);
}

// Save database file
function saveData(data) {
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
}

// Get today's video
app.get("/api/today", (req, res) => {
  const data = loadData();
  res.json(data.todayVideo);
});

// Post player stats
app.post("/api/stats", (req, res) => {
  const data = loadData();
  const { player, won } = req.body;

  if (!player) {
    return res.status(400).json({ error: "Player name required" });
  }

  const entry = {
    player,
    won,
    timestamp: new Date().toISOString(),
  };

  data.stats.push(entry);
  saveData(data);
  res.json({ message: "Stats saved!", entry });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
