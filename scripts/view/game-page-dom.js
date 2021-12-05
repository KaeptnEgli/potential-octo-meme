const shiftGameEvalInPositiveRange = 1;
const {sessionStorage} = window;
const translateEval = {
    0: 'Loss',
    1: 'Tie',
    2: 'Win',
};

export function createGameTable() {
    const playerName = sessionStorage.getItem('playerName');
    return `<h2 class="game-intro">${playerName}! Pick Your Hand!</h2>
            <button class="normal fill">Normal Mode</button>
            <div class="picks"></div>
            <div class="countdown"></div>
            <h2 class="player-pick">VS</h2>
            <button class="fill start-page-button" >Back To Start</button>`;
}

function createGameHands(HANDS) {
    return `<div id="0">${HANDS[0]}</div>
            <div id="1">${HANDS[1]}</div>
            <div id="2">${HANDS[2]}</div>
            <div id="3">${HANDS[3]}</div>
            <div id="4">${HANDS[4]}</div>`;
}

function createStrikeThroughGameHands(HANDS) {
    return `<div id="0"><s>${HANDS[0]}</s></div>
            <div id="1"><s>${HANDS[1]}</s></div>
            <div id="2"><s>${HANDS[2]}</s></div>
            <div id="3"><s>${HANDS[3]}</s></div>
            <div id="4"><s>${HANDS[4]}</s></div>`;
}

export function createHistory() {
    return `<hr>
          <h3>History</h3>
          <table class="history">
            <thead>
              <th>Result</th>
              <th>You</th>
              <th>COM</th>
            </thead>
            <tbody class="game-results">
            </tbody>
          </table>`;
}

function createHistoryEntries(gameEval, playerHand, systemHand, HANDS) {
    return `<tr>
            <td>${translateEval[gameEval + shiftGameEvalInPositiveRange]}</td>
            <td>${HANDS[playerHand]}</td>
            <td>${HANDS[systemHand]}</td>
          </tr>`;
}

export function renderGameHands(HANDS) {
    document.querySelector('.picks').innerHTML = createGameHands(HANDS);
}

function renderStrikeThroughGameHands(HANDS) {
    document.querySelector('.picks').innerHTML = createStrikeThroughGameHands(HANDS);
}

export function renderHistoryEntries(gameEval, playerHand, systemHand, HANDS) {
    const historyEntry = createHistoryEntries(gameEval, playerHand, systemHand, HANDS);
    const historyEntries = document.querySelector('.game-results');
    historyEntries.innerHTML += historyEntry;
}

export function renderHistoryEntriesFromSession(HANDS) {
  const storedSessionHistory = sessionStorage.getItem('sessionHistory');
  const sessionHistory = JSON.parse(storedSessionHistory);
  const historyEntries = document.querySelector('.game-results');
  sessionHistory.forEach((item) => {
    const historyEntry = createHistoryEntries(
      item.gameEval,
      item.playerHand,
      item.systemHand,
      HANDS,
    );
    historyEntries.innerHTML += historyEntry;
  });
}

export function renderPlayerPick(playerHand, systemHand) {
    document.querySelector('.player-pick').innerText = `${playerHand} VS ${systemHand}`;
}

export function blockGameWhileEvaluating(DELAY_MS, INTERVAL_MS, HANDS, playCallBackFn) {
    return new Promise((resolve) => {
        let timeLeft = DELAY_MS / 1000;
        document.querySelector('.picks').removeEventListener('click', playCallBackFn);
        renderStrikeThroughGameHands(HANDS);
        const blockCountDown = setInterval(() => {
            if (timeLeft <= 0) {
                renderGameHands(HANDS);
                document.querySelector('.countdown').innerText = '';
                document.querySelector('.picks').addEventListener('click', playCallBackFn);
                clearInterval(blockCountDown);
                resolve();
            } else {
                document.querySelector('.countdown').textContent = timeLeft;
                timeLeft--;
            }
        }, INTERVAL_MS);
    });
}
