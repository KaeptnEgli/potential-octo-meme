export function initializeLocalStorage() {
    if (parseInt(localStorage.length, 10) === 0) {
        localStorage.setItem('Markus', JSON.stringify({ id: 'Markus', win: 3, lost: 6 }));
        localStorage.setItem('Michael', JSON.stringify({ id: 'Michael', win: 4, lost: 5 }));
        localStorage.setItem('Nils', JSON.stringify({ id: 'Nils', win: 2, lost: 7 }));
        localStorage.setItem('Lisa', JSON.stringify({ id: 'Lisa', win: 5, lost: 5 }));
        localStorage.setItem('Luisa', JSON.stringify({ id: 'Luisa', win: 9, lost: 5 }));
        localStorage.setItem('Melanie', JSON.stringify({ id: 'Melanie', win: 1, lost: 7 }));
        localStorage.setItem('Klara', JSON.stringify({ id: 'Klara', win: 6, lost: 5 }));
        localStorage.setItem('Mirko', JSON.stringify({ id: 'Mirko', win: 7, lost: 5 }));
        localStorage.setItem('John', JSON.stringify({ id: 'John', win: 19, lost: 5 }));
        localStorage.setItem('Petra', JSON.stringify({ id: 'Petra', win: 11, lost: 7 }));
        localStorage.setItem('Anders', JSON.stringify({ id: 'Anders', win: 13, lost: 5 }));
    }
}

export function convertLocalStorageToArray() {
    const array = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        array[i] = JSON.parse(localStorage.getItem(key));
    }
    return array;
}

export function sortPlayers(players) {
    const orderPlayers = [];
    let rank = 1;
    while (players.length > 0) {
        let maxWin = 0;
        let maxPlayer = {};
        const maxPlayers = [];
        for (let i = 0; i < players.length; i++) {
            if (parseInt(players[i].win, 10) > maxWin) {
                maxWin = players[i].win;
                maxPlayer = players[i];
            }
        }
        maxPlayers.push(maxPlayer.id);
        players.splice(players.indexOf(maxPlayer), 1);
        for (let j = 0; j < players.length; j++) {
            if (parseInt(players[j].win, 10) === parseInt(maxPlayer.win, 10)) {
                maxPlayers.push(players[j].id);
                players.splice(players.indexOf(players[j]), 1);
            }
        }
        orderPlayers[rank] = { rank, wins: maxPlayer.win, players: maxPlayers };
        rank++;
    }
    return orderPlayers;
}

function addScoreToUser(userName, userRecords, gameEval, index) {
    if (parseInt(gameEval, 10) === 1) {
        userRecords[index].win++;
        localStorage.setItem(userName, JSON.stringify(userRecords[index]));
    } else if (parseInt(gameEval, 10) === -1) {
        userRecords[index].lost++;
        localStorage.setItem(userName, JSON.stringify(userRecords[index]));
    }
}

export function addResultToLocalStorage(gameEval, userName) {
    const userRecords = convertLocalStorageToArray();
    for (let i = 0; i < userRecords.length; i++) {
        if (String(userRecords[i].id) === String(userName)) {
            addScoreToUser(userName, userRecords, gameEval, i);
            break;
        } else if (i === parseInt(userRecords.length - 1, 10)) {
            localStorage.setItem(userName, JSON.stringify({ id: userName, win: 0, lost: 0 }));
            addScoreToUser(userName, userRecords, gameEval, i + 1);
        }
    }
}
