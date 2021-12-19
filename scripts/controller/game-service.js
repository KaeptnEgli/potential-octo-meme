import { sortPlayers, addResultToLocalStorage, convertLocalStorageToArray } from '../model/local-storage.js';
import { renderPlayerPick, renderHistoryEntries } from '../view/game-page-dom.js';
import dataService from './data-service.js';

const LOAD_DELAY = 500;
export const GAME_DELAY = 3000;
export const INTERVAL_MS = 1000;
export const HANDS = ['Scissor', 'Rock', 'Paper', 'Lizard', 'Spock'];

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

export async function getRankingsFromPlayerStats() {
    const {sessionStorage} = window;
    if (String(sessionStorage.getItem('isConnected')) === 'false') {
      return sortPlayers(convertLocalStorageToArray(window.localStorage)).slice(0, 10);
    }
      const result = await dataService.getEntries();
      return sortPlayers(result.slice(0, 10));
}

export function resolveRankings(callback) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(callback), LOAD_DELAY);
    });
}

async function createNewDataEntry(gameEval, playerName) {
    if (gameEval === 1) {
      await dataService.createEntry({id: playerName, win: 1, lost: 0});
    } else {
      await dataService.createEntry({id: playerName, win: 0, lost: 1});
    }
}

async function updateDataEntry(gameEval, playerName, playerData) {
    if (gameEval === 1) {
     await dataService.updateEntry(playerName, {win: playerData.win + 1});
   } else {
     await dataService.updateEntry(playerName, {lost: playerData.lost + 1});
   }
}

async function addResultToDatabase(gameEval, playerName) {
    if (gameEval === 0) return;
    const playerData = await dataService.getEntries(playerName);
    if (!Object.keys(playerData).length) {
      await createNewDataEntry(gameEval, playerName);
    } else {
      await updateDataEntry(gameEval, playerName, playerData);
   }
}

function getGameEval(playerHand, systemHand) {
    return evalLookup[translateHand[playerHand]][translateHand[systemHand]];
}

function addGametoSessionHistory(gameEval, playerHand, systemHand) {
    const storedSessionHistory = sessionStorage.getItem('sessionHistory');
    const game = {gameEval, playerHand, systemHand};
    let sessionHistory = [];
    if (storedSessionHistory !== 'null') {
      sessionHistory = JSON.parse(storedSessionHistory);
    }
    sessionHistory.push(game);
    sessionStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
}

async function evaluateHand(playerName, playerHand, systemHand) {
    const gameEval = getGameEval(playerHand, systemHand);
    addResultToLocalStorage(gameEval, playerName);
    addGametoSessionHistory(gameEval, playerHand, systemHand);
    renderHistoryEntries(gameEval, playerHand, systemHand, HANDS);
}

async function serverEvaluation(playerName, playerHand) {
    let gameResult;
    if (sessionStorage.normalGame === 'true') {
      gameResult = await dataService.evaluateGame(`playerName=${playerName}`, `&playerHand=${playerHand}`, '&mode=normal');
    } else {
      gameResult = await dataService.evaluateGame(`playerName=${playerName}`, `&playerHand=${playerHand}`);
    }
    addResultToDatabase(gameResult.gameEval, playerName);
    addGametoSessionHistory(gameResult.gameEval, gameResult.playerHand, gameResult.systemHand);
    renderHistoryEntries(gameResult.gameEval, gameResult.playerHand, gameResult.systemHand, HANDS);
}

export async function play(event) {
    if (parseInt(event.target.id.length, 10) > 0) {
      const playerHandIndex = JSON.parse(event.target.id);
      const systemHand = Math.floor(Math.random() * 5);
      const playerName = sessionStorage.getItem('playerName');
      renderPlayerPick(HANDS[playerHandIndex], HANDS[systemHand]);
      if (sessionStorage.isConnected === 'false') {
        await evaluateHand(playerName, playerHandIndex, systemHand);
      } else {
        await serverEvaluation(playerName, playerHandIndex);
      }
    }
}
