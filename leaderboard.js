function loadLeaderboard() {
  const container = document.getElementById("leaderboardList");
const scores = (JSON.parse(localStorage.getItem("quizScores")) || [])
  .slice(-5)
  .reverse();

  if (!container) return;

  container.innerHTML = "";

  scores.forEach((item, index) => {
    let badge = "OK";
    let badgeClass = "plain";

    if (item.score === 8) {
      badge = "Perfect";
      badgeClass = "gold";
    } else if (item.score >= 6) {
      badge = "Great";
      badgeClass = "silver";
    } else if (item.score >= 4) {
      badge = "Good";
      badgeClass = "bronze";
    }

    container.innerHTML += `
      <div class="history-item ${index === 0 ? "best" : ""}">
        <span class="rank-num">${index + 1}</span>
        <span class="category">${item.category}</span>
        <span class="score-val">${item.score} <span class="of-eight">/ 8</span></span>
        <span class="badge ${badgeClass}">${badge}</span>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);