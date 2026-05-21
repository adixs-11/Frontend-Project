function saveScore(score, category) {
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];

  scores.push({
    score: score,
    category: category,
    date: new Date().toISOString()
  });

  scores.sort((a, b) => b.score - a.score);

  scores = scores.slice(0, 10);

  localStorage.setItem("quizScores", JSON.stringify(scores));
}