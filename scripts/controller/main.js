import { renderStartHeader, renderForm, renderRankings, savePlayerName} from '../view/start-page-dom.js';
import { renderGameHands, renderEventListeners, renderGameTable, renderHistoryEntriesFromSession, renderHistoryTable, blockGameWhileEvaluating} from '../view/game-page-dom.js';
import { initializeLocalStorage } from '../model/local-storage.js';
import { play, GAME_DELAY, INTERVAL_MS, HANDS} from './game-service.js';

sessionStorage.setItem('isConnected', false);
sessionStorage.setItem('normalGame', false);

initializeLocalStorage();

async function startNewRound(event) {
    await blockGameWhileEvaluating(GAME_DELAY, INTERVAL_MS, HANDS, startNewRound);
    play(event);
}

function renderStartPage() {
    renderStartHeader();
    renderForm();
    renderRankings();
}

function renderGamePage(event) {
    event.preventDefault();
    savePlayerName();
    renderHistoryTable();
    renderGameTable();
    renderEventListeners(startNewRound);
    renderHistoryEntriesFromSession(HANDS);
    renderGameHands(HANDS);
    document.querySelector('.start-page-button').addEventListener('click', () => {
        renderStartPage();
        document.querySelector('form[name="start-game-form"]').addEventListener('submit', renderGamePage);
    });
}

renderStartPage();
document.querySelector('form[name="start-game-form"]').addEventListener('submit', renderGamePage);
