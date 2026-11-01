let playerCount = 0;
let currentPlayer = 0;
let scores = [];
let gameActive = false;

const scenarios = [
  { text: 'found a clean water cache! (+12 Points)', points: 12 },
  { text: 'secured a green solar grid cell! (+15 Points)', points: 15 },
  { text: 'restocked local community food drops! (+8 Points)', points: 8 },
  { text: 'got caught in a flash flood sector lag. (-5 Points)', points: -5 },
  {
    text: 'suffered grid power failure structural damage. (-10 Points)',
    points: -10,
  },
];

// Add Event Listeners because inline 'onclick' behaves differently in isolated browser shadow DOMs
document.getElementById('btn-p2').addEventListener('click', () => startGame(2));
document.getElementById('btn-p3').addEventListener('click', () => startGame(3));
document.getElementById('btn-p4').addEventListener('click', () => startGame(4));
document.getElementById('roll-btn').addEventListener('click', playTurn);

function startGame(num) {
  playerCount = num;
  currentPlayer = 0;
  scores = new Array(num).fill(0);
  gameActive = true;

  const board = document.getElementById('score-board');
  board.innerHTML = '';
  for (let i = 0; i < num; i++) {
    board.innerHTML += `
            <div id="player-${i}" class="player-badge ${
      i === 0 ? 'active' : ''
    }">
                <span class="p-name">PLAYER ${i + 1}</span>
                <span id="score-text-${i}" class="p-score">0</span>
            </div>
        `;
  }

  document.getElementById('roll-btn').disabled = false;
  document.getElementById('turn-display').innerText =
    "Player 1's Turn — Ready to Action!";

  const feed = document.getElementById('game-feed');
  feed.innerHTML = `<div class="log-item">🚀 A fresh ${num}-player arena match has commenced!</div>`;
}

function playTurn() {
  if (!gameActive) return;

  const randIndex = Math.floor(Math.random() * scenarios.length);
  const currentScenario = scenarios[randIndex];

  scores[currentPlayer] += currentScenario.points;
  if (scores[currentPlayer] < 0) scores[currentPlayer] = 0;

  document.getElementById(`score-text-${currentPlayer}`).innerText =
    scores[currentPlayer];
  addGameLog(`Player ${currentPlayer + 1} ${currentScenario.text}`);

  if (scores[currentPlayer] >= 50) {
    document.getElementById('turn-display').innerText = `🏆 PLAYER ${
      currentPlayer + 1
    } WINS THE MATCH!`;
    addGameLog(
      `🎉 MATCH OVER: Player ${currentPlayer + 1} dominated the resource grid!`
    );
    document.getElementById('roll-btn').disabled = true;
    gameActive = false;
    return;
  }

  document.getElementById(`player-${currentPlayer}`).classList.remove('active');
  currentPlayer = (currentPlayer + 1) % playerCount;
  document.getElementById(`player-${currentPlayer}`).classList.add('active');
  document.getElementById('turn-display').innerText = `Player ${
    currentPlayer + 1
  }'s Turn — Ready to Action!`;
}

function addGameLog(message) {
  const feed = document.getElementById('game-feed');
  const newItem = document.createElement('div');
  newItem.className = 'log-item';
  newItem.innerText = message;
  feed.insertBefore(newItem, feed.firstChild);
}
