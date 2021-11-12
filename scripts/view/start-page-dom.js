import { createGameTable, createHistory, renderGameHands } from './game-page-dom.js';
import { resolveRankings, getRankingsFromPlayerStats, play, HANDS } from '../controller/game-service.js';

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
    return `<div>
              <button id="switch-mode" class="fill" type="button">Cahnge To Server Mode</button>
            </div>
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
    const rankingHtml = await resolveRankings(mapRankings(getRankingsFromPlayerStats()));
    return rankingHtml;
}

export function renderStartHeader() {
    const startHtml = createStartHeader();
    document.querySelector('.content-box-top').innerHTML = startHtml;
}

export async function renderRankings() {
    const rankingHtml = await createRankingsList();
    document.querySelector('.ranking').innerHTML = rankingHtml;
}

function savePlayerName() {
    const form = document.querySelector('form[name="start-game-form"]');
    const name = form.elements.name.value;
    document.cookie = `name=${name}; Secure`;
}

function renderGamePage() {
    savePlayerName();
    const gameHtml = createGameTable();
    const gameHistory = createHistory();
    document.querySelector('.content-box-top').innerHTML = gameHtml;
    document.querySelector('.content-box-bottom').innerHTML = gameHistory;
    document.querySelector('.start-page-button').addEventListener('click', () => {
        window.location.reload();
    });
    document.querySelector('.picks').addEventListener('click', play);
    renderGameHands(HANDS);
}

export function renderForm() {
    const startHtml = createForm();
    document.querySelector('.content-box-bottom').innerHTML = startHtml;
    document.querySelector('form[name="start-game-form"]').addEventListener('submit', renderGamePage);
}
