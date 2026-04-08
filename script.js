const topics = {
  math: ["Algebra", "Trigonometry"],
  science: ["Physics", "Chemistry"]
};

let videos = [];

// Topic change
document.getElementById("subjectSelect")?.addEventListener("change", function () {
  const subject = this.value;
  const topicSelect = document.getElementById("topicSelect");

  topicSelect.innerHTML = '<option value="">Select Topic</option>';

  (topics[subject] || []).forEach(t => {
    topicSelect.innerHTML += `<option>${t}</option>`;
  });
});

// Fetch videos
document.getElementById("searchBtn")?.addEventListener("click", () => {
  const cls = document.getElementById("classSelect").value;
  const subject = document.getElementById("subjectSelect").value;
  const topic = document.getElementById("topicSelect").value;

  const query = `class ${cls} ${subject} ${topic} ncert`;

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=10&key=AIzaSyAh02FQb0AzW6x2V0C0G9i5C7SLszcGbm0`)
    .then(res => res.json())
    .then(data => {
      videos = data.items || [];
      showVideos(videos);
    });
});

// Show videos
function showVideos(list) {
  const container = document.getElementById("videos");
  container.innerHTML = "";

  list.map(v => {
    container.innerHTML += `
      <div class="video-card">
        <img src="${v.snippet.thumbnails.medium.url}">
        <div class="video-info">
          <h3>${v.snippet.title}</h3>
          <a class="video-link" href="https://youtube.com/watch?v=${v.id.videoId}" target="_blank">
            Watch Video →
          </a>
        </div>
      </div>
    `;
  });
}

// Search filter
document.getElementById("searchInput")?.addEventListener("input", function () {
  const text = this.value.toLowerCase();

  showVideos(
    videos.filter(v => v.snippet.title.toLowerCase().includes(text))
  );
});

// Sort
document.getElementById("sortBtn")?.addEventListener("click", () => {
  videos.sort((a, b) => a.snippet.title.localeCompare(b.snippet.title));
  showVideos(videos);
});

// Theme toggle (simplified)
document.getElementById("themeToggle")?.addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
});

// Reset
document.getElementById("resetBtn")?.addEventListener("click", () => location.reload());