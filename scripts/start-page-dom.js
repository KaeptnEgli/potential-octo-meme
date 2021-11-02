import {createGame, createHistory} from './game-page-dom.js';
import {HANDS, getRankings, getRankingsFromPlayerStats} from './game-service.js';
import {play} from './main.js'

function createForm() {
  return `<hr>
<form name="startGameForm">
  <div class="form-example">
    <label for="name">Name: </label>
    <input type="text" name="name" id="name" required>
  </div>
  <div class="form-example">
    <input id="startGameBtn" type="button" value="Spiel Starten!">
  </div>
</form>`;
}

function createStartHeader() {
      return `<div class="d-grid gap-2">
                <button id="switchMode" class="btn btn-primary" type="button">Wechsel zu Server</button>
              </div>
              <h1>Rangliste</h1>
              <div id="ranking"></div>`;
}

function mapRankings(rankings) {
  return rankings.map(entry =>
   `<li>
     <h3>${entry.rank}</h3>
     <p>${entry.wins}</p>
     <p>${entry.players}</p>
    </li>`).join('')
  }

// Todo write a proppper promise funciton lool..
async function createRankingsList() {
  const rankingHtml = await getRankings(mapRankings(getRankingsFromPlayerStats()));
  document.querySelector('#ranking').innerHTML = rankingHtml;
  return String(rankingHtml);
};

export function renderStart() {
        const startHtml = createStartHeader();
        document.querySelector('#content-box-top').innerHTML = startHtml;
}

export function renderRankings() {
  const rankingHtml = createRankingsList();
  console.log(rankingHtml);
  //document.querySelector('#ranking').innerHTML = rankingHtml;
}

export function renderForm() {
  const startHtml = createForm();
  document.querySelector('#content-box-bottom').innerHTML = startHtml;
  document.querySelector('#startGameBtn').addEventListener('click', renderGamePage);
}

function renderMainPage() {
  renderStart();
  renderForm();
  renderRankings();
}

export function renderGamePage() {
  const form = document.forms.startGameForm;
  const name = form.elements.name.value;
  document.cookie = `name=${name}; Secure`;
  const gameHtml = createGame(HANDS);
  const gameHistory = createHistory();
  document.querySelector('#content-box-top').innerHTML = gameHtml;
  document.querySelector('#content-box-bottom').innerHTML = gameHistory;
  document.querySelector('#mainPageBtn').addEventListener('click', renderMainPage);
  for(let i = 0; i < 5; i++) {
    let id = `#pick-${i}`
    document.querySelector(id).addEventListener('click', function() {
      play(i);
    });
  }
}
