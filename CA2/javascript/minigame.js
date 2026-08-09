// ReadyPlayer3 - minigame.html interactions
// "Guess the Game": 5 rounds. Each round shows a blurred cover and a genre
// badge for a random game. The player can reveal hints (which lowers the
// max score for that round) or type a guess. Favorites use the same
// localStorage key as games.js, and "View Full Details" links to
// games.html?id=... which opens that game's details modal automatically.

// ---- Settings ----
var TOTAL_ROUNDS = 5;
var MAX_ROUND_SCORE = 100;
var POINTS_PER_HINT = 20;
var MAX_HINTS = 4;
var FAVORITES_KEY = 'rp3-favorite-games';
var HISTORY_KEY = 'rp3-minigame-history';
var MAX_HISTORY_ENTRIES = 8;

// ---- Game state ----
var favorites = [];
var history = [];
var roundGames = [];
var roundNumber = 0;
var currentGame = null;
var hintsUsed = 0;
var answered = false;
var score = 0;
var streak = 0;
var bestStreak = 0;
var correctCount = 0;
var roundResults = [];

document.addEventListener('DOMContentLoaded', function () {
    // GAMES_DATA / GENRE_META come from games.js, loaded before this file.
    if (typeof GAMES_DATA === 'undefined') return;
    if (!document.getElementById('guessForm')) return; // not this page

    favorites = loadFromStorage(FAVORITES_KEY);
    history = loadFromStorage(HISTORY_KEY);

    fillTitleList();
    updateHistoryDisplay();
    setupButtons();
    startNewSession();
});

function setupButtons() {
    document.getElementById('hintBtn').addEventListener('click', showHint);
    document.getElementById('skipBtn').addEventListener('click', skipRound);
    document.getElementById('guessForm').addEventListener('submit', function (e) {
        e.preventDefault();
        checkGuess();
    });
    document.getElementById('revealFavoriteBtn').addEventListener('click', toggleFavorite);
    document.getElementById('nextRoundBtn').addEventListener('click', function () {
        loadRound(roundNumber + 1);
    });
    document.getElementById('playAgainBtn').addEventListener('click', startNewSession);
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
}

function fillTitleList() {
    var list = document.getElementById('gameTitleList');
    var options = '';
    for (var i = 0; i < GAMES_DATA.length; i++) {
        options += '<option value="' + escapeText(GAMES_DATA[i].title) + '"></option>';
    }
    list.innerHTML = options;
}

// ---------------------------------------------------------------
// Session / round flow
// ---------------------------------------------------------------

function startNewSession() {
    // Copy the games list, shuffle it, and keep the first few for this session.
    roundGames = GAMES_DATA.slice();
    roundGames.sort(function () { return Math.random() - 0.5; });
    roundGames = roundGames.slice(0, TOTAL_ROUNDS);

    roundNumber = 0;
    score = 0;
    streak = 0;
    bestStreak = 0;
    correctCount = 0;
    roundResults = [];

    document.getElementById('summaryPanel').classList.add('d-none');
    document.getElementById('roundPanel').classList.remove('d-none');
    updateScoreboard();
    loadRound(0);
}

function loadRound(index) {
    if (index >= roundGames.length) {
        endSession();
        return;
    }

    roundNumber = index;
    currentGame = roundGames[index];
    hintsUsed = 0;
    answered = false;

    document.getElementById('revealPanel').classList.add('d-none');
    document.getElementById('roundPanel').classList.remove('d-none');

    var guessInput = document.getElementById('guessInput');
    guessInput.value = '';
    guessInput.disabled = false;
    document.getElementById('skipBtn').disabled = false;
    document.getElementById('hintBtn').disabled = false;

    var feedback = document.getElementById('guessFeedback');
    feedback.textContent = '';
    feedback.className = 'small mb-0';

    var storyEl = document.getElementById('clueStory');
    storyEl.textContent = '';
    storyEl.classList.add('d-none');

    updateClueImage();
    updateClueChips();
    updateHintButton();

    document.getElementById('roundLabel').textContent = (index + 1) + ' / ' + roundGames.length;
    var percent = Math.round(((index + 1) / roundGames.length) * 100);
    var bar = document.getElementById('roundProgressBar');
    bar.style.width = percent + '%';
    bar.setAttribute('aria-valuenow', percent);

    guessInput.focus();
}

function endSession() {
    document.getElementById('roundPanel').classList.add('d-none');
    document.getElementById('revealPanel').classList.add('d-none');
    document.getElementById('summaryPanel').classList.remove('d-none');

    document.getElementById('summaryScore').textContent = score;
    document.getElementById('summaryStreak').textContent = bestStreak;
    document.getElementById('summaryCorrect').textContent = correctCount + ' / ' + roundGames.length;

    var breakdown = '';
    for (var i = 0; i < roundResults.length; i++) {
        var result = roundResults[i];
        var icon = result.correct ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger';
        breakdown += '<span class="badge minigame-summary-chip"><i class="bi ' + icon + ' me-1"></i>' +
            escapeText(result.title) + '</span>';
    }
    document.getElementById('summaryBreakdown').innerHTML = breakdown;

    saveSessionToHistory();
}

// ---------------------------------------------------------------
// Clues
// ---------------------------------------------------------------

function updateClueImage() {
    var image = document.getElementById('clueImage');
    var fallback = document.getElementById('clueImageFallback');
    var src = currentGame.screenshots[0];

    if (src && src !== 'placeholder.jpg') {
        var blur = 16 - (hintsUsed * 4);
        if (blur < 2) blur = 2;
        image.src = src;
        image.style.filter = 'blur(' + blur + 'px)';
        image.classList.remove('d-none');
        fallback.classList.add('d-none');
    } else {
        image.classList.add('d-none');
        fallback.classList.remove('d-none');
    }
}

function updateClueChips() {
    var chips = badge(GENRE_META[currentGame.genre].shortLabel, 'genre-badge');

    if (hintsUsed >= 1) {
        for (var i = 0; i < currentGame.platform.length; i++) {
            chips += badge(currentGame.platform[i], 'platform-badge');
        }
        chips += badge('Released ' + currentGame.releaseDate.slice(0, 4), 'platform-badge');
    }
    if (hintsUsed >= 2) {
        chips += badge(currentGame.difficulty + ' difficulty', 'platform-badge');
        chips += badge(currentGame.mode, 'platform-badge');
    }
    if (hintsUsed >= 3) {
        var priceText = currentGame.price === 0 ? 'Free to play' : '$' + currentGame.price.toFixed(2);
        chips += badge(priceText, 'platform-badge');
        chips += badge(starsText(currentGame.rating) + ' ' + currentGame.rating.toFixed(1), 'platform-badge');
    }

    document.getElementById('clueChips').innerHTML = chips;

    var storyEl = document.getElementById('clueStory');
    if (hintsUsed >= 4) {
        storyEl.textContent = currentGame.story;
        storyEl.classList.remove('d-none');
    } else {
        storyEl.classList.add('d-none');
    }
}

function badge(text, cssClass) {
    return '<span class="badge ' + cssClass + '">' + escapeText(text) + '</span>';
}

function updateHintButton() {
    var btn = document.getElementById('hintBtn');
    var label = document.getElementById('hintBtnLabel');
    var status = document.getElementById('hintStatus');

    if (hintsUsed >= MAX_HINTS) {
        btn.disabled = true;
        label.textContent = 'All hints revealed';
        status.textContent = 'Every hint is on the table - give it your best guess.';
        return;
    }

    var nextMaxScore = MAX_ROUND_SCORE - (hintsUsed + 1) * POINTS_PER_HINT;
    label.textContent = 'Reveal a hint (max score becomes ' + nextMaxScore + ')';

    if (hintsUsed === 0) {
        status.textContent = 'No hints used yet - guess now for up to ' + MAX_ROUND_SCORE + ' points.';
    } else {
        var currentMaxScore = MAX_ROUND_SCORE - hintsUsed * POINTS_PER_HINT;
        status.textContent = hintsUsed + ' hint(s) used - correct guesses now cap at ' + currentMaxScore + ' points.';
    }
}

function showHint() {
    if (answered || hintsUsed >= MAX_HINTS) return;
    hintsUsed++;
    updateClueImage();
    updateClueChips();
    updateHintButton();
}

// ---------------------------------------------------------------
// Guessing
// ---------------------------------------------------------------

function checkGuess() {
    if (answered) return;

    var guessInput = document.getElementById('guessInput');
    var guess = guessInput.value.trim().toLowerCase();
    var answer = currentGame.title.trim().toLowerCase();

    if (!guess) return;

    if (guess === answer) {
        var points = MAX_ROUND_SCORE - hintsUsed * POINTS_PER_HINT;
        if (points < 20) points = 20;

        score += points;
        streak++;
        if (streak > bestStreak) bestStreak = streak;
        correctCount++;
        roundResults.push({ title: currentGame.title, correct: true });

        finishRound(true, points);
    } else {
        var feedback = document.getElementById('guessFeedback');
        feedback.textContent = 'Not quite - try again, or reveal a hint if you\'re stuck.';
        feedback.className = 'small mb-0 text-danger';
        guessInput.classList.add('minigame-shake');
        setTimeout(function () { guessInput.classList.remove('minigame-shake'); }, 400);
        guessInput.select();
    }
}

function skipRound() {
    if (answered) return;
    streak = 0;
    roundResults.push({ title: currentGame.title, correct: false });
    finishRound(false, 0);
}

function finishRound(wasCorrect, points) {
    answered = true;
    document.getElementById('guessInput').disabled = true;
    document.getElementById('skipBtn').disabled = true;
    document.getElementById('hintBtn').disabled = true;

    updateScoreboard();
    showRevealCard(wasCorrect, points);
}

// ---------------------------------------------------------------
// Reveal card
// ---------------------------------------------------------------

function showRevealCard(wasCorrect, points) {
    var image = document.getElementById('revealImage');
    var fallback = document.getElementById('revealImageFallback');
    var src = currentGame.screenshots[0];

    if (src && src !== 'placeholder.jpg') {
        image.src = src;
        image.alt = 'Cover art for ' + currentGame.title;
        image.classList.remove('d-none');
        fallback.classList.add('d-none');
    } else {
        image.classList.add('d-none');
        fallback.classList.remove('d-none');
    }

    var feedback = document.getElementById('revealFeedback');
    if (wasCorrect) {
        feedback.innerHTML = '<i class="bi bi-check-circle-fill text-success me-1"></i>Correct! +' + points + ' points';
        feedback.className = 'fw-semibold mb-2 text-success';
    } else {
        feedback.innerHTML = '<i class="bi bi-x-circle-fill text-danger me-1"></i>The answer was:';
        feedback.className = 'fw-semibold mb-2 text-danger';
    }

    document.getElementById('revealTitle').textContent = currentGame.title;
    document.getElementById('revealBlurb').textContent = currentGame.story;

    var badges = badge(GENRE_META[currentGame.genre].shortLabel, 'genre-badge');
    for (var i = 0; i < currentGame.platform.length; i++) {
        badges += badge(currentGame.platform[i], 'platform-badge');
    }
    badges += badge(starsText(currentGame.rating) + ' ' + currentGame.rating.toFixed(1), 'platform-badge');
    badges += badge(currentGame.price === 0 ? 'Free' : '$' + currentGame.price.toFixed(2), 'platform-badge');
    document.getElementById('revealBadges').innerHTML = badges;

    updateFavoriteButton();
    document.getElementById('revealDetailsLink').href = '../html/games.html?id=' + currentGame.id;

    var nextBtn = document.getElementById('nextRoundBtn');
    if (roundNumber === roundGames.length - 1) {
        nextBtn.innerHTML = 'See Final Score<i class="bi bi-flag-fill ms-1"></i>';
    } else {
        nextBtn.innerHTML = 'Next Round<i class="bi bi-arrow-right ms-1"></i>';
    }

    document.getElementById('roundPanel').classList.add('d-none');
    document.getElementById('revealPanel').classList.remove('d-none');
}

function updateFavoriteButton() {
    var btn = document.getElementById('revealFavoriteBtn');
    var isFavorite = favorites.indexOf(currentGame.id) !== -1;

    if (isFavorite) {
        btn.innerHTML = '<i class="bi bi-heart-fill me-1"></i>Favorited';
    } else {
        btn.innerHTML = '<i class="bi bi-heart me-1"></i>Favorite';
    }
}

// ---------------------------------------------------------------
// Favorites (shared with games.js through the same localStorage key)
// ---------------------------------------------------------------

function toggleFavorite() {
    var index = favorites.indexOf(currentGame.id);
    var justFavorited;

    if (index !== -1) {
        favorites.splice(index, 1);
        justFavorited = false;
    } else {
        favorites.push(currentGame.id);
        justFavorited = true;
    }

    saveToStorage(FAVORITES_KEY, favorites);
    updateFavoriteButton();

    if (justFavorited) {
        showToast(currentGame.title + ' added to favorites.', 'success');
    } else {
        showToast(currentGame.title + ' removed from favorites.', 'secondary');
    }
}

// ---------------------------------------------------------------
// High scores / history
// ---------------------------------------------------------------

function saveSessionToHistory() {
    history.unshift({
        score: score,
        correct: correctCount,
        rounds: roundGames.length,
        bestStreak: bestStreak,
        date: new Date().toISOString()
    });
    history = history.slice(0, MAX_HISTORY_ENTRIES);
    saveToStorage(HISTORY_KEY, history);
    updateHistoryDisplay();
}

function clearHistory() {
    history = [];
    saveToStorage(HISTORY_KEY, history);
    updateHistoryDisplay();
    showToast('High score history cleared.', 'secondary');
}

function updateHistoryDisplay() {
    if (history.length === 0) {
        document.getElementById('historyBestScore').textContent = '-';
        document.getElementById('historySessionsPlayed').textContent = '0';
        document.getElementById('historyAverageScore').textContent = '-';
        document.getElementById('historyBestStreak').textContent = '-';
        document.getElementById('historyList').innerHTML = '';
        document.getElementById('historyEmptyState').classList.remove('d-none');
        return;
    }

    document.getElementById('historyEmptyState').classList.add('d-none');

    var totalScore = 0;
    var bestScore = 0;
    var longestStreak = 0;
    var rows = '';

    for (var i = 0; i < history.length; i++) {
        var entry = history[i];
        totalScore += entry.score;
        if (entry.score > bestScore) bestScore = entry.score;
        if (entry.bestStreak > longestStreak) longestStreak = entry.bestStreak;

        rows += '<div class="saved-setup-row d-flex justify-content-between align-items-center flex-wrap gap-2">' +
            '<span class="small text-muted">' + formatDate(entry.date) + '</span>' +
            '<span>' + entry.correct + ' / ' + entry.rounds + ' correct</span>' +
            '<span>Best streak: ' + entry.bestStreak + '</span>' +
            '<span class="fw-bold">' + entry.score + ' pts</span>' +
            '</div>';
    }

    document.getElementById('historyBestScore').textContent = bestScore;
    document.getElementById('historySessionsPlayed').textContent = history.length;
    document.getElementById('historyAverageScore').textContent = Math.round(totalScore / history.length);
    document.getElementById('historyBestStreak').textContent = longestStreak;
    document.getElementById('historyList').innerHTML = rows;
}

function formatDate(isoString) {
    var date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Unknown date';
    var datePart = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    var timePart = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    return datePart + ' - ' + timePart;
}

// ---------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------

function updateScoreboard() {
    document.getElementById('scoreLabel').textContent = score;
    document.getElementById('streakLabel').textContent = streak;
}

function starsText(rating) {
    var rounded = Math.round(rating);
    var stars = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= rounded) {
            stars += '\u2605';
        } else {
            stars += '\u2606';
        }
    }
    return stars;
}

function loadFromStorage(key) {
    try {
        var raw = window.localStorage.getItem(key);
        if (raw) return JSON.parse(raw);
        return [];
    } catch (error) {
        return [];
    }
}

function saveToStorage(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // Storage unavailable - data just won't persist for this session.
    }
}

function showToast(message, variant) {
    var container = document.getElementById('toastContainer');
    if (!container) return;

    var toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center border-0 text-bg-' + variant;
    toastEl.innerHTML =
        '<div class="d-flex">' +
        '<div class="toast-body">' + escapeText(message) + '</div>' +
        '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>' +
        '</div>';
    container.appendChild(toastEl);

    var toast = new bootstrap.Toast(toastEl, { delay: 3500 });
    toastEl.addEventListener('hidden.bs.toast', function () { toastEl.remove(); });
    toast.show();
}

function escapeText(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
