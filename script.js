const API_KEY = "AIzaSyCQ609JrmDhgRyajrZ2GT1RIBchIWhFyf8";

const todayVideo = {
    title: "How to Cook the Perfect Steak",
    channel: "Tasty",
    views: 10234823,
    category: "Food",
    published: "2022-01-10",
};

//mock video database
const fakeVideoDatabase = [
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

  
document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-input").value;

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = "" //clear previous results

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title =   item.snippet.title;
                const thumbnail = item.snippet.thumbnails.default.url;

                const videoElement = document.createElement("div");
                videoElement.innerHTML = `
                    <img src="${thumbnail}" alt="${title}">
                    <p>${title}</p>
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Watch</a>
                    `;
                resultsContainer.appendChild(videoElement);                
            });
        })
        .catch(error => {
            console.error("Error fetching Youtube data:", error);
        });


    //logic for hint box
    const userInput = document.getElementById("search-input").value.toLowerCase();
    const hintBox = document.getElementById("hint-output");

    const guessedVideo = fakeVideoDatabase.find((video) =>
        video.title.toLowerCase() === userInput
    );

    if(!guessedVideo) {
        hintBox.innerHTML = `<p> Video not found in our mock database, try again </p>`;
        return;
    }

    const hints = [];

    //Hint 1: View Count Difference
    const ViewDifference = todayVideo.views - guessedVideo.views;
    if(ViewDifference > 0){
        hints.push(`^Your guess has ${guessedVideo.views}`);
    } else if (ViewDifference <0){
        hints.push(`Your guess has ${guessedVideo.views}`);
    }

    //Hint 2: Same Channel
    if (guessedVideo.channel === todayVideo.channel){
        hints.push("✅ Same channel");
    } else{
        hints.push(`❌ Different channel (You guessed: ${guessedVideo.channel})`);
    }

    //Hint 3: Same Category
    if (guessedVideo.category === todayVideo.category) {
        hints.push("✅ Same category");
    } else{
        hints.push(`❌ Different category (You guessed: ${guessedVideo.category})`);
    }

    //Hint 4: Publish Date
    const guessedDate = new Date(guessedVideo.published);
    const correctDate = new Date(todayVideo.published);

    if (guessedDate.getTime() === correctDate.getTime()){
        hints.push("✅ Published on the same day");
    } else if(guessedDate < correctDate){
        hints.push("📅 Your guess is older");
    } else{
        hints.push("📅 Your guess is newer");
    }

    //Display Hints
    hintBox.innerHTML = `
        <p><strong>Your Guess:</strong> ${guessedVideo.title}</p>
        <ul>${hints.map((hint) => `<li>${hint}</li>`).join("")}</ul>
    `;
});