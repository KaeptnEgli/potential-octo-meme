const shiftGameEvalInPositiveRange = 1;
const translateEval = {
    0: 'Loss',
    1: 'Tie',
    2: 'Win',
};

export function createGameTable() {
    const name = document.cookie.split('=')[1];
    return `<h2 class="game-intro">${name}! Pick Your Hand!</h2>
          <table>
            <tr class="picks"></tr>
          </table>
          <div class="countdown"></div>
          <h2 class="player-pick">Player Pick...</h2>
          <button class="fill start-page-button" >Back To Start</button>`;
}

function createGameHands(HANDS) {
    return `<td id="0">${HANDS[0]}</td>
          <td id="1">${HANDS[1]}</td>
          <td id="2">${HANDS[2]}</td>
          <td id="3">${HANDS[3]}</td>
          <td id="4">${HANDS[4]}</td>`;
}

function createStrikeThroughGameHands(HANDS) {
    return `<td id="0"><s>${HANDS[0]}</s></td>
          <td id="1"><s>${HANDS[1]}</s></td>
          <td id="2"><s>${HANDS[2]}</s></td>
          <td id="3"><s>${HANDS[3]}</s></td>
          <td id="4"><s>${HANDS[4]}</s></td>`;
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
    const historyEntries = document.querySelector('.game-results').innerHTML;
    document.querySelector('.game-results').innerHTML = historyEntries + historyEntry;
}

export function renderPlayerPick(playerHand) {
    document.querySelector('.player-pick').innerText = playerHand;
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
