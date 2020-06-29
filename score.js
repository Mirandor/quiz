function displayScores() {
  var storeScore = JSON.parse(window.localStorage.getItem("scoreList")) || [];

  storeScore.sort(function(a, b) {
    return b.score - a.score;
  });

  storeScore.forEach(function(score) {
    var listItem = document.createElement("li");
    listItem.textContent = score.myName + " - " + score.score;

    var olEl = document.getElementById("scoreList");
    olEl.appendChild(listItem);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("scoreList");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

displayScores();