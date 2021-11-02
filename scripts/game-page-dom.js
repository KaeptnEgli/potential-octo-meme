export function createGame(HANDS) {
  const name = document.cookie.split('=')[1];
  return `${name}! Wähle deine Hand!
          <table>
            <tr>
              <td id="pick-0">${HANDS[0]}</td>
              <td id="pick-1">${HANDS[1]}</td>
              <td id="pick-2">${HANDS[2]}</td>
              <td id="pick-3">${HANDS[3]}</td>
              <td id="pick-4">${HANDS[4]}</td>
            </tr>
          </table>

          <p>VS</p>

          <table>
            <tr>
              <td id="playerPick">?</td>
            </tr>
          </table>
          <button id="mainPageBtn">Zurück zum Start.</button>`;
}

export function createHistory() {
  return `<hr>
          <p>History</p>
          <table id="history">
            <tr>
              <th>Resultat</th>
              <th>Spieler</th>
              <th>Gegener</th>
            </tr>
          </table>`;
}

export function changePlayerPick(playerHand) {
  document.querySelector('#playerPick').innerText = playerHand;
}

export function appendToHistory(gameEval, playerHand, systemHand) {
  console.log(gameEval, playerHand, systemHand);
  const trElement = document.createElement('tr');
  for(let i = 0; i < 3; i++) {
    const tdElement = document.createElement('td');
    if (i == 0) {
      tdElement.textContent = gameEval;
    } else if ( i == 1 ) {
      tdElement.textContent = playerHand;
    } else {
      tdElement.textContent = systemHand;
    }
    trElement.appendChild(tdElement);
  }
  document.querySelector('#history').appendChild(trElement);
}
