import fs from "fs";
import db from "./db.js";   // <--- use your shared Knex instance

console.log("CWD:", process.cwd());
console.log("FILES:", fs.readdirSync("."));
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");

async function selectDailyVideo() {
  try {
    // Load video list
    const videos = JSON.parse(fs.readFileSync("./top_videos.json", "utf-8"));

    // Pick a random video
    const random = Math.floor(Math.random() * videos.length);
    const todayVideo = videos[random];

    // Replace yesterday’s daily video
    await db("daily_video").del(); // DELETE FROM daily_video;
    await db("daily_video").insert({ data: todayVideo }); // INSERT new row

    console.log(`✅ New daily video selected: ${todayVideo.snippet.title}`);

  } catch (err) {
    console.error("❌ Failed to select daily video:", err);
  } finally {
    // IMPORTANT: close Knex so Node exits cleanly
    await db.destroy();

    console.log("Waiting 500ms before exit to ensure PostgreSQL flushes...");
    await new Promise(res => setTimeout(res, 500));
  }
}

selectDailyVideo();
setTimeout(() => process.exit(0), 2000);
