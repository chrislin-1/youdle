//const API_KEY = "AIzaSyCQ609JrmDhgRyajrZ2GT1RIBchIWhFyf8";

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
    <div class="channel-section">
      <img src="${channelThumbnail}" alt="${todayTitle}" class="channel-thumbnail">
      <p class="video-channel">${todayChannel}</p>
    </div>
  </div>
`;

////////////////////// LOGIC FOR GUESSING VIDEO WITH SUGGESTIONS BAR /////////////////////
/* 
// Listen for typing in the input field
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  suggestionsContainer.innerHTML = ""; // clear previous suggestions

  if (!query) return; // stop if input is empty

  // Filter videos by title match
  const filtered = topVideos
    .filter(video => 
      video.snippet.title.toLowerCase().includes(query)
    )
    .slice(0, 5); // limit to 5 results

  // Create clickable suggestion elements
  filtered.forEach(video => {
    const suggestion = document.createElement("div");
    suggestion.classList.add("suggestion-item"); // give correct css class

    const thumbnailUrl = video.snippet.thumbnails.default.url;
    const title = video.snippet.title;
    const channel = video.snippet.channelTitle;

    suggestion.innerHTML = `
      <img src="${thumbnailUrl}" alt="${title}" class="suggestion-thumb">
      <div class="suggestion-info">
        <div class="suggestion-title">${title}</div>
        <div class="suggestion-channel">${channel}</div>
      </div>
    `;

    // When clicked, fill the input and clear suggestions
    suggestion.addEventListener("click", () => {
      searchInput.value = video.snippet.title;
      suggestionsContainer.innerHTML = "";
    });

    suggestionsContainer.appendChild(suggestion);
  });
});

// Optional: clear suggestions when clicking elsewhere
document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
    suggestionsContainer.innerHTML = "";
  }
});

/*
// Use topVideos if available, otherwise fall back to mock data for testing
const videoDatabase = typeof topVideos !== "undefined" ? topVideos : [
    {
      title: "Cooking Tips for Beginners",
      channel: "Gordon Ramsay",
      views: 9348210,
      category: "Food",
      published: "2022-03-12",
    },
    {
      title: "10-Minute Workout",
      channel: "FitnessBlender",
      views: 8234810,
      category: "Fitness",
      published: "2021-08-01",
    },
    {
      title: "How to Cook the Perfect Steak",
      channel: "Tasty",
      views: 10234823,
      category: "Food",
      published: "2022-01-10",
    },
  ];
*/
console.log(`today views is ${todayViews}`);

document.getElementById("search-button").addEventListener("click", () => {
  console.log(`today views is ${todayViews}`);
  const hintBox = document.getElementById("hint-output");
  const query = document.getElementById("search-input").value;
  const guessViews = Number(query.replace(/,/g, "")); //remove commas and convert to number
  const guessFormatted = guessViews.toLocaleString();
  const guess = document.createElement("li");
  guess.className = "hint-item";
  let guessResult = "";
  let guessCount = 0;
  guessCount += 1;

  //View Guess Calculation
  const ViewDifference = todayViews - guessViews;
  if(Math.abs(ViewDifference) < .5*todayViews){
    hintBox.innerHTML = `✅✅✅YOU WIN`;
    return;
  } else if(ViewDifference > 0){
    guessResult = "☝️";
  } else if (ViewDifference <0){
    guessResult="👇";
  }

/////////////// LOGIC FOR CHANGING WORDLE STYLE HINTS TO GUESS VIDEO //////////////
  /*
    //logic for hint box
    const userInput = document.getElementById("search-input").value.toLowerCase();
    const hintBox = document.getElementById("hint-output");

    const guess = document.createElement("div");
    const guessVideo = topVideos.find((video) =>
        video.snippet.title.toLowerCase() === userInput
    );
    const guessViews = guessVideo.statistics.viewCount;
    const guessTitle = guessVideo.snippet.title.toLowerCase();
    const guessChannel = guessVideo.snippet.channelTitle;
    const guessThumbnail = guessVideo.snippet.thumbnails.default.url;
    let guessResult = "";

    console.log(`guessedVideo is ${guessTitle}`);

    if(!guessVideo) {
        hintBox.innerHTML = `<p> Video not found in our mock database, try again </p>`;
        return;
    }

    if(guessTitle === todayTitle){
      hintBox.innerHTML = `
        <ul>✅✅✅YOU WIN</ul>
      `;
      return;
    }

    //Hint 1: View Count Difference
    const ViewDifference = todayViews - guessViews;
    if(ViewDifference > 0){
        guessResult = "☝️";
    } else if (ViewDifference <0){
        guessResult="👇";
    }
  */
    guess.innerHTML=`${guessResult}${guessFormatted}`;

    //Display Hints
    hintBox.appendChild(guess);

});