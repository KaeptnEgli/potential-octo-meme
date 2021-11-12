import { renderStartHeader, renderForm, renderRankings } from '../view/start-page-dom.js';
import { initializeLocalStorage } from '../model/local-storage.js';

initializeLocalStorage();

renderStartHeader();
renderForm();
renderRankings();
