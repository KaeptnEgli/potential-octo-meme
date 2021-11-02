import {HANDS, isConnected, getRankings, evaluateHand} from './game-service.js';
import {renderForm, renderStart, renderRankings} from './start-page-dom.js';
import {changePlayerPick, appendToHistory} from './game-page-dom.js'

// TODO: Replace the following is demo code which should not be included in the final solution

let localStorage = window.localStorage;

console.log('isConnected:', isConnected());

// const string = getRankings((rankings) => rankings.forEach((rankingEntry) =>
//   `Rank ${rankingEntry.rank} (${rankingEntry.wins} wins): ${rankingEntry.players}`,
// ).join(''));

export function play(playerHand) {
  const playerName = document.cookie.split('=')[1];
  changePlayerPick(HANDS[playerHand]);
  evaluateHand(playerName, playerHand, ({
    gameEval,
    playerHand,
    systemHand,
  }) => printWinner(gameEval, playerHand, systemHand));
}

function pickHand(handIndex) {
  //const handIndex = Math.floor(Math.random() * 3);
  return HANDS[handIndex];
}

let count = 1;
function printWinner(gameEval, playerHand, systemHand) {
  appendToHistory(gameEval, playerHand, systemHand);
}

//for (let i = 1; i < 10; i++) {
  //const playerHand = pickHand();
  //evaluateHand('peter', playerHand,
    //({
      // systemHand,
       //gameEval,
     //}) => printWinner(playerHand, systemHand, gameEval));
//}

renderStart();
renderForm();
renderRankings();
