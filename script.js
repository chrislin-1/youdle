//const API_KEY = "AIzaSyCQ609JrmDhgRyajrZ2GT1RIBchIWhFyf8";

const MAX_GUESSES = 6;
const placeholderImg = "https://www.shutterstock.com/image-vector/youtube-error-grey-icon-this-260nw-1962406363.jpg";
const hintBox = document.getElementById("hint-output");

function initializeHintBox() {
  hintBox.innerHTML = ""; // Clear old content
  for (let i = 0; i < MAX_GUESSES; i++) {
    const hintItem = document.createElement("div");
    hintItem.className = "hint-item";
    hintItem.innerHTML = `
      <img src="${placeholderImg}" alt="Empty guess" class="hint-thumbnail">
      <div class="hint-info">
        <p class="hint-text">No guess yet</p>
      </div>
    `;
    hintBox.appendChild(hintItem);
  }
}

initializeHintBox();

// write to console showing all videos stored in Database
const topVideos = JSON.parse(localStorage.getItem("topVideos")) || [];
console.log(topVideos);

//choose video and pull necessary info
const todayVideo = JSON.parse(localStorage.getItem("todayVideo"));
console.log(todayVideo);
const todayViews = todayVideo.statistics.viewCount;
const todayTitle = todayVideo.snippet.title.toLowerCase();
const todayChannel = todayVideo.snippet.channelTitle;
const todayThumbnail = todayVideo.snippet.thumbnails.maxres.url;
const rawDate = new Date(todayVideo.snippet.publishedAt);
todayDescription = todayVideo.snippet.description;
const todayDate = rawDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric"
});
const channelThumbnail = todayVideo.channelThumbnail;

console.log(`today video is ${todayVideo.snippet.title}`);

//get elements from html
const searchInput = document.getElementById("search-input");
const suggestionsContainer = document.getElementById("suggestions");

const videoContainer = document.getElementById("video-container");
videoContainer.innerHTML = `
  <div class="video-player-section">
    <img src="${todayThumbnail}" alt="${todayTitle}" class="today-thumbnail">
  </div>

  <div class="video-info-section">
    <h2 class="video-title">${todayTitle}</h2>
    <div id="channel-section">
      <img src="${channelThumbnail}" alt="${todayTitle}" class="channel-thumbnail">
      <p class="video-channel">${todayChannel}</p>
    </div>
    <div id="description-section">
      <div id="views-date">
        <h3 id="views">________views</p>
        <h3 id="date">${todayDate}</p>
      </div>
        <p id="description">${todayDescription}</p>
    </div>
  </div>
`;

console.log(`today views is ${todayViews}`);

let guessCount = 0;
document.getElementById("search-button").addEventListener("click", () => {
  if (guessCount >= MAX_GUESSES) return; // stop at 6 guesses

  const query = document.getElementById("search-input").value;
  const guessViews = Number(query.replace(/,/g, "")); 
  const guessFormatted = guessViews.toLocaleString();
  const answerFormatted = Number(todayViews).toLocaleString();
  const viewsElement = document.getElementById("views");

  const ViewDifference = todayViews - guessViews;
  let guessThumbnail = "";
  let guessText = "";

  if (Math.abs(ViewDifference) < 0.05 * todayViews) {
    guessThumbnail = todayThumbnail; // correct!
    guessText = `✅ Correct! ${answerFormatted} views`;
    viewsElement.textContent = `${answerFormatted} views`;
    viewsElement.style.color = "green";
  } else if (ViewDifference > 0) {
    guessThumbnail = "https://www.kindpng.com/picc/m/20-200332_youtube-facebook-like-button-blog-facebook-hd-png.png";
    guessText = `☝️ ${guessFormatted} — too low`;
  } else {
    guessThumbnail = "https://innovation-village.com/wp-content/uploads/2021/04/youtube-dislike-download-icon-3.jpeg";
    guessText = `👇 ${guessFormatted} — too high`;
  }

  // Update one of the placeholders
  const hintItems = document.querySelectorAll(".hint-item");
  const currentHint = hintItems[guessCount];
  currentHint.querySelector(".hint-thumbnail").src = guessThumbnail;
  currentHint.querySelector(".hint-text").textContent = guessText;

  searchInput.value = "";
  guessCount++;
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission reload
    document.getElementById("search-button").click();
  }
});