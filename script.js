const games = [
  { id: 1, name: 'Space Invaders', description: 'Defend the Earth from alien invaders!' },
  { id: 2, name: 'Racing Fever', description: 'Speed through the tracks and beat your opponents!' },
  { id: 3, name: 'Puzzle Master', description: 'Solve challenging puzzles to win!' }
];

const app = document.getElementById('app');

function renderGameList() {
  app.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${game.name}</h2>
      <p>${game.description}</p>
      <button class="button" onclick="startGame(${game.id})">Start Game</button>
    `;
    app.appendChild(card);
  });
}

function startGame(gameId) {
  const game = games.find(g => g.id === gameId);
  app.innerHTML = `
    <div class="card game-screen">
      <h2>${game.name}</h2>
      <p>${game.description}</p>
      <button class="button exit-button" onclick="renderGameList()">Exit Game</button>
    </div>
  `;
}

// Initial render
renderGameList();
