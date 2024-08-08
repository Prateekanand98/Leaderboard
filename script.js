let leaderboard = [];


function addScore() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const country = document.getElementById('country').value;
    const playerScore = parseInt(document.getElementById('playerScore').value);
    const date = new Date().toLocaleDateString();

    if (firstName && lastName && country && !isNaN(playerScore)) {
        const player = {
            firstName: firstName,
            lastName: lastName,
            country: country,
            score: playerScore,
            date: date
        };
        leaderboard.push(player);
        leaderboard.sort((a, b) => b.score - a.score);
        updateLeaderboard();
        clearInputs();
    } else {
        alert("Please fill in all fields with valid data.");
    }
}

function updateLeaderboard() {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';

    leaderboard.forEach((player, index) => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';

        // Apply random background color
        playerCard.style.backgroundColor = getRandomColor();

        playerCard.innerHTML = `
            <div class="player-info">
                <div>${player.firstName} ${player.lastName}</div>
                <div>${player.date}</div>
                <div>${player.country}</div>
            </div>
            <div>${player.score}</div>
            <div class="player-actions">
                <button class="action-btn" onclick="deletePlayer(${index})">🗑️</button>
                <button class="action-btn" onclick="updateScore(${index}, -5)">-5</button>
                <button class="action-btn" onclick="updateScore(${index}, 5)">+5</button>
            </div>
        `;
        leaderboardElement.appendChild(playerCard);
    });
}

function deletePlayer(index) {
    leaderboard.splice(index, 1);
    updateLeaderboard();
}

function updateScore(index, delta) {
    leaderboard[index].score += delta;

    if (leaderboard[index].score < 0) {
        leaderboard[index].score = 0;
    }//this blocks runs going in negative


    leaderboard.sort((a, b) => b.score - a.score);
    updateLeaderboard();
}

function clearInputs() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('country').value = '';
    document.getElementById('playerScore').value = '';
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

