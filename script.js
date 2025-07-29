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

document.getElementById("submit-btn").addEventListener("click", () => {
    const userInput = document.getElementById("guess-input").value.toLowerCase();
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