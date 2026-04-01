const API_KEY = "AIzaSyB380wSq3__2GefGhoVmcbyrJs5tnnT3TI";

const resultsDiv = document.getElementById("results");
const loader = document.getElementById("loader");
const heading = document.getElementById("heading");

let currentSubject = "";

/* TOPICS */
const topics = {
  math: ["Algebra", "Calculus", "Trigonometry"],
  science: ["Physics", "Chemistry", "Biology"]
};

const subjectDropdown = document.getElementById("subject");
const topicDropdown = document.getElementById("topic");

subjectDropdown.addEventListener("change", () => {
  const selected = subjectDropdown.value;

  topicDropdown.innerHTML = '<option value="">Select Topic</option>';

  topics[selected]?.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicDropdown.appendChild(option);
  });
});

/* START */
function startSearch() {
  const userClass = document.getElementById("class").value;
  const subject = document.getElementById("subject").value;
  const topic = document.getElementById("topic").value;

  if (!userClass || !subject || !topic) {
    alert("Please select all fields");
    return;
  }

  currentSubject = topic;

  document.getElementById("formSection").style.display = "none";
  document.getElementById("mainSection").style.display = "block";

  heading.innerText = `Showing results for ${topic} (Class ${userClass})`;

  searchData();
}

/* FETCH */
async function searchData() {
  const input = document.getElementById("searchInput").value;
  const query = input || currentSubject;

  currentSubject = query;

  heading.innerText = `Showing results for ${query}`;

  loader.style.display = "block";
  resultsDiv.innerHTML = "";

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=6&key=${API_KEY}`
    );

    const data = await res.json();
    displayData(data);

  } catch (error) {
    resultsDiv.innerHTML = "<p>Error loading videos</p>";
  }

  loader.style.display = "none";
}

/* DISPLAY */
function displayData(data) {
  resultsDiv.innerHTML = data.items
    .filter(item => item.id.videoId)
    .map(item => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnail = item.snippet.thumbnails.medium.url;

      return `
        <div class="card">
          <img src="${thumbnail}">
          <div class="card-content">
            <h3>${title}</h3>
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
              ▶ Watch Video
            </a>
          </div>
        </div>
      `;
    }).join("");
}