const API_KEY = "AIzaSyCQ609JrmDhgRyajrZ2GT1RIBchIWhFyf8";

// Fetch top 50 most popular videos and store them in localStorage
async function fetchTopVideos() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=US&key=${API_KEY}`
    );
    const data = await response.json();

    const topVideos = data.items;
    localStorage.setItem("topVideos", JSON.stringify(topVideos));

    // Pick a random video AFTER the fetch
    const random = Math.floor(Math.random() * topVideos.length);
    const todayVideo = topVideos[random];

    const channelId = todayVideo.snippet.channelId;

    // --- Second fetch: get the channel thumbnail ---
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
    );
    const channelData = await channelResponse.json();
    const channelThumbnailUrl = channelData.items[0].snippet.thumbnails.default.url;

    // Add channel thumbnail to the todayVideo object
    todayVideo.channelThumbnail = channelThumbnailUrl;

    // Update localStorage with full info
    localStorage.setItem("todayVideo", JSON.stringify(todayVideo));

    console.log("✅ Today video ready with channel thumbnail:", todayVideo);

  } catch (error) {
    console.error("Error fetching top videos or channel info:", error);
  }
}

// Run once to fetch top videos and select today's video
fetchTopVideos();


/*
const fetch = require("node-fetch"); // If you're using Node.js
const fs = require("fs");

const API_KEY = "AIzaSyCQ609JrmDhgRyajrZ2GT1RIBchIWhFyf8";
const MAX_RESULTS = 50;
const TOTAL_RESULTS = 1000;
const REGION = "US";

let allVideos = [];

async function fetchPopularVideos(pageToken = "", count = 0) {
  if (count >= TOTAL_RESULTS) {
    fs.writeFileSync("top_videos.json", JSON.stringify(allVideos, null, 2));
    console.log("✅ Saved top videos to file!");
    return;
  }

  let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=${MAX_RESULTS}&regionCode=${REGION}&key=${API_KEY}`;
  if (pageToken) url += `&pageToken=${pageToken}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.items) {
    allVideos.push(...data.items);
    console.log(`Fetched ${allVideos.length} videos...`);
  }

  if (data.nextPageToken && allVideos.length < TOTAL_RESULTS) {
    await fetchPopularVideos(data.nextPageToken, allVideos.length);
  } else {
    fs.writeFileSync("top_videos.json", JSON.stringify(allVideos, null, 2));
    console.log("✅ Done. Saved to file.");
  }
}

fetchPopularVideos();
*/