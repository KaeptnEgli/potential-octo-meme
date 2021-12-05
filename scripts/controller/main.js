import { renderStartHeader, renderForm, renderRankings } from '../view/start-page-dom.js';
import { initializeLocalStorage } from '../model/local-storage.js';

sessionStorage.setItem('isConnected', false);
sessionStorage.setItem('normalGame', false);

initializeLocalStorage();

renderStartHeader();
renderForm();
renderRankings();
