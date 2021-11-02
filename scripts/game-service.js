// markus suggestion

const DELAY_MS = 3000;

localStorage.setItem('Markus', JSON.stringify({user: 'Markus', win: 3, lost: 6,}));
localStorage.setItem('Michael', JSON.stringify({user: 'Michael', win: 4, lost: 5,}));
localStorage.setItem('Nils', JSON.stringify({user: 'Nils', win: 2, lost: 7,}));
localStorage.setItem('Lisa', JSON.stringify({user: 'Lisa', win: 4, lost: 5,}));

function localStorageToArray() {
  let arr = [];
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      arr[i] = JSON.parse(localStorage.getItem(key));
  }
  return arr;
}

function orderPlayers(players){
  let orderPlayers = [];
  let rank = 1;
  do {
    let maxWin = 0;
    let maxPlayer = {};
    let maxPlayers = [];
    for (let i = 0; i < players.length; i++) {
      if (players[i].win > maxWin) {
        maxWin = players[i].win;
        maxPlayer = players[i];
      }
    }
    maxPlayers.push(maxPlayer.user);
    players.splice(players.indexOf(maxPlayer),1);
     for (let j = 0; j < players.length; j++) {
       if (players[j].win == maxPlayer.win) {
         maxPlayers.push(players[j].user);
         players.splice(players.indexOf(players[j]),1);
       }
    }
    orderPlayers[rank] = {rank: rank, wins: maxPlayer.win, players: maxPlayers};
    rank++;
  } while (players.length > 0)
  return orderPlayers;
}

export function getRankingsFromPlayerStats() {
  return orderPlayers(localStorageToArray());
}

export const HANDS = ['Schere', 'Stein', 'Papier', 'Echse', 'Spock'];

let isConnectedState = false;

export function setConnected(newIsConnected) {
  isConnectedState = Boolean(newIsConnected);
}

export function isConnected() {
  return isConnectedState;
}

export function getRankings(callback) {
   //const rankings = getRankingsFromPlayerStats();
   return new Promise(function(resolve) {
     setTimeout(() => {
       resolve(callback);
     }, 1000);
   });
  };

const evalLookup = {
  scissors: {
    scissors: 0,
    stone: 1,
    paper: -1,
  },
  stone: {
    scissors: -1,
    stone: 0,
    paper: 1,
  },
  paper: {
    scissors: 1,
    stone: -1,
    paper: 0,
  }
};

function translateHand(hand) {
  let name;
  switch (hand) {
    case 0:
      name = 'scissors';
      break;
    case 1:
      name = 'stone';
      break;
    case 2:
      name = 'paper';
      break;
  }
  return name;
  }

function getGameEval(playerHand, systemHand) {
  return evalLookup[translateHand(playerHand)][translateHand(systemHand)];
}

//console.log('eval scissors-scissors: ', getGameEval('scissors', 'scissors'));

export function evaluateHand(playerName, playerHand, gameRecordHandlerCallbackFn) {
  // todo: replace calculation of didWin and update rankings while doing so.
  // optional: in local-mode (isConnected == false) store rankings in the browser localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
  const systemHand = Math.floor(Math.random() * 3);
  //const gameEval = Math.floor(Math.random() * 3) - 1; // eval and hand do not match yet -> TODO
  const gameEval = getGameEval(playerHand, systemHand);
  console.log(gameEval);
  setTimeout(() => gameRecordHandlerCallbackFn({
    gameEval,
    playerHand,
    systemHand,
  }), DELAY_MS);
}

// local functions
