import http from 'http';

const PORT = 8080;

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

function getGameEval(playerHand, systemHand) {
    return evalLookup[translateHand[playerHand]][translateHand[systemHand]];
}

function evaluateHand(playerName, playerHand, mode) {
    const systemHand = Math.floor(Math.random() * mode);
    const gameEval = getGameEval(playerHand, systemHand);
    return `{"playerHand": ${playerHand}, "systemHand": ${systemHand}, "gameEval": ${gameEval}}`;
}

function normalGame(playerName, playerHand) {
  const gameEval = evaluateHand(playerName, playerHand, 3);
  return playerHand > 2 ? false : gameEval;
}

function fullGame(playerName, playerHand) {
  const gameEval = evaluateHand(playerName, playerHand, 5);
  return gameEval;
}

function requestHandler(request, response) {
if (request.url === '/favicon.ico') {
  response.writeHead(200, {'Content-Type': 'image/x-icon'});
  response.end();
  return;
}
  const parsedURL = new URL(request.url, `http://${request.headers.host}`);
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');

  const playerName = parsedURL.searchParams.get('playerName');
  const playerHand = parsedURL.searchParams.get('playerHand');
  const gameMode = parsedURL.searchParams.get('mode');
  let gameResult;

  if (gameMode !== undefined && String(gameMode) === 'normal') {
    gameResult = normalGame(playerName, playerHand);
  } else {
    gameResult = fullGame(playerName, playerHand);
  }

  response.statusCode = gameResult ? 200 : 406;
  response.end(gameResult);
}

const server = http.createServer();
server.on('request', requestHandler);
server.listen(PORT,
  () => console.log('Node listening on Port ', PORT));
