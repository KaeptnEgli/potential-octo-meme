import { sortPlayers, addResultToLocalStorage } from '../model/local-storage.js';
import { renderPlayerPick, renderHistoryEntries, blockGameWhileEvaluating } from '../view/game-page-dom.js';

const DELAY_MS = 3000;
const INTERVAL_MS = 1000;
export const HANDS = ['Scissor', 'Rock', 'Paper', 'Lizard', 'Spock'];

let isConnectedState = false;

const evalLookup = {
    scissors: {
        scissors: 0,
        stone: -1,
        paper: 1,
        lizard: 1,
        spock: -1,
    },
    stone: {
        scissors: 1,
        stone: 0,
        paper: -1,
        lizard: 1,
        spock: -1,
    },
    paper: {
        scissors: -1,
        stone: 1,
        paper: 0,
        lizard: -1,
        spock: 1,
    },
    lizard: {
        scissors: -1,
        stone: -1,
        paper: 1,
        lizard: 0,
        spock: 1,
    },
    spock: {
        scissors: 1,
        stone: 1,
        paper: -1,
        lizard: -1,
        spock: 0,
    },
};

const translateHand = {
    0: 'scissors',
    1: 'stone',
    2: 'paper',
    3: 'lizard',
    4: 'spock',
};

export function setConnected(newIsConnected) {
    isConnectedState = Boolean(newIsConnected);
}

function isConnected() {
    return isConnectedState;
}

export function getRankingsFromPlayerStats() {
    return sortPlayers().slice(0, 11);
}

export function resolveRankings(callback) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(callback), DELAY_MS);
    });
}

function getGameEval(playerHand, systemHand) {
    return evalLookup[translateHand[playerHand]][translateHand[systemHand]];
}

function evaluateHand(playerName, playerHand, gameRecordHandlerCallbackFn) {
    const systemHand = Math.floor(Math.random() * 5);
    const gameEval = getGameEval(playerHand, systemHand);
    const user = document.cookie.split('=')[1];

    if (!isConnected()) {
        addResultToLocalStorage(gameEval, user);
    }

    gameRecordHandlerCallbackFn({
        gameEval,
        playerHand,
        systemHand,
    });
}

export async function play(event) {
    if (parseInt(event.target.id.length, 10) > 0) {
      const playerHandIndex = JSON.parse(event.target.id);
      const playerName = document.cookie.split('=')[1];
      renderPlayerPick(HANDS[playerHandIndex]);
      await blockGameWhileEvaluating(DELAY_MS, INTERVAL_MS, HANDS, play);

      evaluateHand(playerName, playerHandIndex, ({
        gameEval,
        playerHand,
        systemHand,
      }) => renderHistoryEntries(gameEval, playerHand, systemHand, HANDS));
    }
}
