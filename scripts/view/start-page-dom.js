import { createGameTable, createHistory, renderGameHands, renderHistoryEntriesFromSession, blockGameWhileEvaluating } from './game-page-dom.js';
import { resolveRankings, getRankingsFromPlayerStats, play, HANDS, GAME_DELAY, INTERVAL_MS } from '../controller/game-service.js';

const {sessionStorage} = window;

function createForm() {
    return `<hr>
          <h3>Choose A Name And Start The Game!</h3>
          <form name="start-game-form" action="javascript:void(0);">
            <div class="form-element">
              <label for="name">Name: </label>
              <input type="text" name="name" required>
            </div>
            <div class="form-element">
              <button type="submit" class="fill">Start Game!</button>
            </div>
          </form>`;
}

function createStartHeader() {
    return `
            <button class="switch-mode fill" type="button">Change To Server Mode</button>
            <h1>Rock, Paper, Scissors</h1>
            <h2>Rankings:</h1>
            <div class="ranking"></div>`;
}

function mapRankings(rankings) {
    return rankings
        .map((entry) => `
    <li class="ranking-tile">
     <h3>Rank #${entry.rank}</h3>
     <p>Wins: ${entry.wins}</p>
     <p>Name: ${entry.players}</p>
    </li>`).join('');
}

async function createRankingsList() {
    const rankingHtml = await resolveRankings(mapRankings(await getRankingsFromPlayerStats()));
    return rankingHtml;
}

export async function renderRankings() {
    const rankingHtml = await createRankingsList();
    document.querySelector('.ranking').innerHTML = rankingHtml;
}

function changeGameMode(contentBoxTop) {
  const button = contentBoxTop.children[0];
  if (sessionStorage.getItem('isConnected') === 'true') {
    sessionStorage.setItem('isConnected', false);
    button.innerHTML = 'Change To Server Mode';
  } else {
    sessionStorage.setItem('isConnected', true);
    button.innerHTML = 'Change To Local Mode';
  }
  contentBoxTop.children[3].innerHTML = '';
  renderRankings();
}

export function renderStartHeader() {
    const startHtml = createStartHeader();
    const contentBoxTop = document.querySelector('.content-box-top');
    contentBoxTop.innerHTML = startHtml;
    contentBoxTop.children[0].addEventListener('click', () => {
      changeGameMode(contentBoxTop);
    });
}

function savePlayerName() {
    const form = document.querySelector('form[name="start-game-form"]');
    const playerName = form.elements.name.value;
    if (sessionStorage.getItem('playerName') !== playerName) {
      sessionStorage.setItem('sessionHistory', null);
      sessionStorage.setItem('playerName', playerName);
    }
}

async function startNewRound(event) {
  await blockGameWhileEvaluating(GAME_DELAY, INTERVAL_MS, HANDS, startNewRound);
  play(event);
}

function renderGamePage(event) {
    event.preventDefault();
    savePlayerName();
    const gameHtml = createGameTable();
    const gameHistory = createHistory();
    document.querySelector('.content-box-top').innerHTML = gameHtml;
    document.querySelector('.content-box-bottom').innerHTML = gameHistory;
    document.querySelector('.normal').addEventListener('click', () => {
      if (sessionStorage.getItem('normalGame') === 'true') {
        sessionStorage.setItem('normalGame', false);
      } else {
        sessionStorage.setItem('normalGame', true);
      }
    });
    document.querySelector('.start-page-button').addEventListener('click', () => {
        window.location.reload();
    });
    document.querySelector('.picks').addEventListener('click', startNewRound);
    renderHistoryEntriesFromSession(HANDS);
    renderGameHands(HANDS);
}

export function renderForm() {
    const startHtml = createForm();
    document.querySelector('.content-box-bottom').innerHTML = startHtml;
    document.querySelector('form[name="start-game-form"]').addEventListener('submit', renderGamePage);
}
