document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStatsContainer = document.querySelector(".stat-card");

  function validateUsername(username) {
    if (username.trim() == "") {
      alert("username should not be empty");
      return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Invalid username");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    const safeUser = encodeURIComponent(username);
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    searchButton.textContent = "Searching";
    searchButton.disabled = true;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch API");
      }
      const data = await response.json();
      console.log("logging data:", data);

      displayUserData(data);
    } catch (error) {
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
  }

  function displayUserData(data) {
    const totalQues = data.totalQuestions;
    const totalEasyQues = data.totalEasy;
    const totalMediumQues = data.totalMedium;
    const totalHardQues = data.totalHard;

    const solvedQues = data.totalSolved;
    const solvedEasyQues = data.easySolved;
    const solvedMediumQues = data.mediumSolved;
    const solvedHardQues = data.hardSolved;
    const cardsData = [
      { label: "Overall Submissions", value: data.totalSolved },
      { label: "Easy Submissions", value: data.easySolved },
      { label: "Medium Submissions", value: data.mediumSolved },
      { label: "Hard Submissions", value: data.hardSolved },
    ];

    updateProgress(
      solvedEasyQues,
      totalEasyQues,
      easyLabel,
      easyProgressCircle
    );
    updateProgress(
      solvedMediumQues,
      totalMediumQues,
      mediumLabel,
      mediumProgressCircle
    );
    updateProgress(
      solvedHardQues,
      totalHardQues,
      hardLabel,
      hardProgressCircle
    );

    console.log(cardsData)

    cardStatsContainer.innerHTML = cardsData.map(
    data =>  
        `   <div class ="card">
                <h2>${data.label}</h2>
                <p class="marks">${data.value}</p>
            </div>`
        ).join("");
  }

  
   

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("username", username);
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }
  });
});
