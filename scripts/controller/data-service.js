const rankingsRESTServerURL = 'http://localhost:3000/';
const gameRESTServerURL = 'http://localhost:8080/';
const rankingRoute = 'rankings/';
const gameRoute = 'play/?';

async function getJson(url) {
    return fetch(url)
        .then((response) => response.json());
}

async function postJson(url, json) {
    const response = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    });
    return response.json();
}

async function patchJson(url, json) {
    const response = await fetch(url, {
        method: 'patch',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    });
    return response.json();
}

async function getEntries(entry = '') {
    return getJson(rankingsRESTServerURL + rankingRoute + entry);
}

async function evaluateGame(playerName, playerHand, gameMode = '') {
    return getJson(gameRESTServerURL + gameRoute + playerName + playerHand + gameMode);
}

async function createEntry(entry) {
    return postJson(rankingsRESTServerURL + rankingRoute, entry);
}

async function updateEntry(id, value) {
    return patchJson(rankingsRESTServerURL + rankingRoute + id, value);
}

export default {
    getEntries,
    evaluateGame,
    createEntry,
    updateEntry,
};
