// ReadyPlayer3 - minigame.html interactions
//
// "Guess the Game": five rounds, each built from one entry in GAMES_DATA
// (loaded globally by games.js, which this page also includes). A blurred
// cover and a genre badge are shown up front; the player can reveal up to
// four more hints (each one lowers that round's max score) or just guess.
//
// Favorites are written to the same localStorage key games.js uses, so a
// favorite picked up here shows up on the Games page too, and "View Full
// Details" deep-links to games.html?id=... which opens that game's real
// details modal (see the small addition at the end of GamesPage.init()).
//
// Session results (score, streak, accuracy) are also saved to their own
// localStorage key so a "High Scores" panel can show best/average score
// and a short history across visits, the same way Setup Planner persists
// saved setups.

var MinigamePage = (function () {
    var FAVORITES_KEY = 'rp3-favorite-games'; // must match games.js
    var HISTORY_KEY = 'rp3-minigame-history';
    var MAX_HISTORY_ENTRIES = 8;

    var TOTAL_ROUNDS = 5;
    var MAX_ROUND_SCORE = 100;
    var HINT_STEPS = 4; // 20 points deducted per hint revealed

    var state = {
        favorites: [],
        history: [],
        pool: [],
        roundIndex: 0,
        currentGame: null,
        hintsRevealed: 0,
        answered: false,
        score: 0,
        streak: 0,
        bestStreak: 0,
        correctCount: 0,
        results: [] // { game, correct, points }
    };

    var els = {};

    function init() {
        if (typeof GAMES_DATA === 'undefined') {
            return; // games.js failed to load; nothing we can do on this page
        }
        cacheElements();
        if (!els.guessForm) {
            return; // Minigame markup isn't on this page
        }

        state.favorites = loadFavorites();
        state.history = loadHistory();

        populateTitleDatalist();
        bindEvents();
        renderHistoryPanel();
        startSession();
    }

    function cacheElements() {
        els.roundLabel = document.getElementById('roundLabel');
        els.scoreLabel = document.getElementById('scoreLabel');
        els.streakLabel = document.getElementById('streakLabel');
        els.roundProgressBar = document.getElementById('roundProgressBar');

        els.roundPanel = document.getElementById('roundPanel');
        els.clueImage = document.getElementById('clueImage');
        els.clueImageFallback = document.getElementById('clueImageFallback');
        els.clueChips = document.getElementById('clueChips');
        els.clueStory = document.getElementById('clueStory');

        els.hintBtn = document.getElementById('hintBtn');
        els.hintBtnLabel = document.getElementById('hintBtnLabel');
        els.hintStatus = document.getElementById('hintStatus');

        els.guessForm = document.getElementById('guessForm');
        els.guessInput = document.getElementById('guessInput');
        els.guessFeedback = document.getElementById('guessFeedback');
        els.skipBtn = document.getElementById('skipBtn');
        els.gameTitleList = document.getElementById('gameTitleList');

        els.revealPanel = document.getElementById('revealPanel');
        els.revealImage = document.getElementById('revealImage');
        els.revealImageFallback = document.getElementById('revealImageFallback');
        els.revealFeedback = document.getElementById('revealFeedback');
        els.revealTitle = document.getElementById('revealTitle');
        els.revealBadges = document.getElementById('revealBadges');
        els.revealBlurb = document.getElementById('revealBlurb');
        els.revealFavoriteBtn = document.getElementById('revealFavoriteBtn');
        els.revealDetailsLink = document.getElementById('revealDetailsLink');
        els.nextRoundBtn = document.getElementById('nextRoundBtn');

        els.summaryPanel = document.getElementById('summaryPanel');
        els.summaryScore = document.getElementById('summaryScore');
        els.summaryStreak = document.getElementById('summaryStreak');
        els.summaryCorrect = document.getElementById('summaryCorrect');
        els.summaryBreakdown = document.getElementById('summaryBreakdown');
        els.playAgainBtn = document.getElementById('playAgainBtn');

        els.historyBestScore = document.getElementById('historyBestScore');
        els.historySessionsPlayed = document.getElementById('historySessionsPlayed');
        els.historyAverageScore = document.getElementById('historyAverageScore');
        els.historyBestStreak = document.getElementById('historyBestStreak');
        els.historyList = document.getElementById('historyList');
        els.historyEmptyState = document.getElementById('historyEmptyState');
        els.clearHistoryBtn = document.getElementById('clearHistoryBtn');

        els.toastContainer = document.getElementById('toastContainer');
    }

    function bindEvents() {
        els.hintBtn.addEventListener('click', revealNextHint);

        els.guessForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (state.answered) return;
            handleGuess(els.guessInput.value);
        });

        els.skipBtn.addEventListener('click', function () {
            if (state.answered) return;
            handleSkip();
        });

        els.revealFavoriteBtn.addEventListener('click', function () {
            if (state.currentGame) toggleFavorite(state.currentGame.id);
        });

        els.nextRoundBtn.addEventListener('click', function () {
            loadRound(state.roundIndex + 1);
        });

        els.playAgainBtn.addEventListener('click', startSession);

        els.clearHistoryBtn.addEventListener('click', clearHistory);
    }

    function populateTitleDatalist() {
        var titles = GAMES_DATA.map(function (g) { return g.title; }).sort();
        els.gameTitleList.innerHTML = titles.map(function (title) {
            return '<option value="' + escapeHtml(title) + '"></option>';
        }).join('');
    }

    // ---------------------------------------------------------------
    // Session / round flow
    // ---------------------------------------------------------------

    function startSession() {
        state.pool = shuffle(GAMES_DATA.slice()).slice(0, Math.min(TOTAL_ROUNDS, GAMES_DATA.length));
        state.roundIndex = 0;
        state.score = 0;
        state.streak = 0;
        state.bestStreak = 0;
        state.correctCount = 0;
        state.results = [];

        els.summaryPanel.classList.add('d-none');
        els.roundPanel.classList.remove('d-none');
        updateScoreboard();
        loadRound(0);
    }

    function loadRound(index) {
        if (index >= state.pool.length) {
            finishSession();
            return;
        }

        state.roundIndex = index;
        state.currentGame = state.pool[index];
        state.hintsRevealed = 0;
        state.answered = false;

        els.revealPanel.classList.add('d-none');
        els.roundPanel.classList.remove('d-none');

        els.guessInput.value = '';
        els.guessInput.disabled = false;
        els.skipBtn.disabled = false;
        els.guessFeedback.textContent = '';
        els.guessFeedback.className = 'small mb-0';

        els.hintBtn.disabled = false;
        els.clueStory.classList.add('d-none');
        els.clueStory.textContent = '';

        renderClueImage(0);
        renderClueChips();
        updateHintUi();

        els.roundLabel.textContent = (index + 1) + ' / ' + state.pool.length;
        var pct = Math.round(((index + 1) / state.pool.length) * 100);
        els.roundProgressBar.style.width = pct + '%';
        els.roundProgressBar.setAttribute('aria-valuenow', pct);

        els.guessInput.focus();
    }

    function finishSession() {
        els.roundPanel.classList.add('d-none');
        els.revealPanel.classList.add('d-none');
        els.summaryPanel.classList.remove('d-none');

        els.summaryScore.textContent = state.score;
        els.summaryStreak.textContent = state.bestStreak;
        els.summaryCorrect.textContent = state.correctCount + ' / ' + state.pool.length;

        els.summaryBreakdown.innerHTML = state.results.map(function (result) {
            var icon = result.correct ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger';
            return '<span class="badge minigame-summary-chip">' +
                '<i class="bi ' + icon + ' me-1" aria-hidden="true"></i>' +
                escapeHtml(result.game.title) +
                '</span>';
        }).join('');

        recordSession();
    }

    // ---------------------------------------------------------------
    // Clues
    // ---------------------------------------------------------------

    function renderClueImage(hintsRevealed) {
        var game = state.currentGame;
        var hasRealImage = game.screenshots && game.screenshots[0] && game.screenshots[0] !== 'placeholder.jpg';

        if (hasRealImage) {
            var blurPx = Math.max(2, 16 - hintsRevealed * 4);
            els.clueImage.src = game.screenshots[0];
            els.clueImage.alt = 'Mystery game cover';
            els.clueImage.style.filter = 'blur(' + blurPx + 'px)';
            els.clueImage.classList.remove('d-none');
            els.clueImageFallback.classList.add('d-none');
        } else {
            els.clueImage.classList.add('d-none');
            els.clueImageFallback.classList.remove('d-none');
        }
    }

    function renderClueChips() {
        var game = state.currentGame;
        var chips = [chip(GENRE_META[game.genre].shortLabel, 'genre-badge')];

        if (state.hintsRevealed >= 1) {
            game.platform.forEach(function (p) { chips.push(chip(p, 'platform-badge')); });
            chips.push(chip('Released ' + game.releaseDate.slice(0, 4), 'platform-badge'));
        }
        if (state.hintsRevealed >= 2) {
            chips.push(chip(game.difficulty + ' difficulty', 'platform-badge'));
            chips.push(chip(game.mode, 'platform-badge'));
        }
        if (state.hintsRevealed >= 3) {
            chips.push(chip(game.price === 0 ? 'Free to play' : '$' + game.price.toFixed(2), 'platform-badge'));
            chips.push(chip(buildStars(game.rating) + ' ' + game.rating.toFixed(1), 'platform-badge'));
        }

        els.clueChips.innerHTML = chips.join(' ');

        if (state.hintsRevealed >= 4) {
            els.clueStory.textContent = game.story;
            els.clueStory.classList.remove('d-none');
        } else {
            els.clueStory.classList.add('d-none');
        }
    }

    function chip(label, cssClass) {
        return '<span class="badge ' + cssClass + '">' + escapeHtml(label) + '</span>';
    }

    function updateHintUi() {
        if (state.hintsRevealed >= HINT_STEPS) {
            els.hintBtn.disabled = true;
            els.hintBtnLabel.textContent = 'All hints revealed';
            els.hintStatus.textContent = 'Every hint is on the table \u2014 give it your best guess.';
            return;
        }

        var nextPotentialScore = MAX_ROUND_SCORE - (state.hintsRevealed + 1) * 20;
        els.hintBtnLabel.textContent = 'Reveal a hint (max score becomes ' + nextPotentialScore + ')';
        els.hintStatus.textContent = state.hintsRevealed === 0
            ? 'No hints used yet \u2014 guess now for up to ' + MAX_ROUND_SCORE + ' points.'
            : state.hintsRevealed + ' hint' + (state.hintsRevealed === 1 ? '' : 's') + ' used \u2014 correct guesses now cap at ' + (MAX_ROUND_SCORE - state.hintsRevealed * 20) + ' points.';
    }

    function revealNextHint() {
        if (state.answered || state.hintsRevealed >= HINT_STEPS) return;
        state.hintsRevealed += 1;
        renderClueImage(state.hintsRevealed);
        renderClueChips();
        updateHintUi();
    }

    // ---------------------------------------------------------------
    // Guessing
    // ---------------------------------------------------------------

    function handleGuess(rawGuess) {
        var guess = normalize(rawGuess);
        if (!guess) return;

        var isMatch = guess === normalize(state.currentGame.title);

        if (isMatch) {
            var roundScore = Math.max(MAX_ROUND_SCORE - state.hintsRevealed * 20, 20);
            state.score += roundScore;
            state.streak += 1;
            state.bestStreak = Math.max(state.bestStreak, state.streak);
            state.correctCount += 1;
            state.results.push({ game: state.currentGame, correct: true, points: roundScore });
            settleRound(true, roundScore);
        } else {
            els.guessFeedback.textContent = 'Not quite \u2014 try again, or reveal a hint if you\u2019re stuck.';
            els.guessFeedback.className = 'small mb-0 text-danger';
            els.guessInput.classList.add('minigame-shake');
            setTimeout(function () { els.guessInput.classList.remove('minigame-shake'); }, 400);
            els.guessInput.select();
        }
    }

    function handleSkip() {
        state.streak = 0;
        state.results.push({ game: state.currentGame, correct: false, points: 0 });
        settleRound(false, 0);
    }

    function settleRound(wasCorrect, pointsEarned) {
        state.answered = true;
        els.guessInput.disabled = true;
        els.skipBtn.disabled = true;
        els.hintBtn.disabled = true;

        updateScoreboard();
        showReveal(wasCorrect, pointsEarned);
    }

    // ---------------------------------------------------------------
    // Reveal card
    // ---------------------------------------------------------------

    function showReveal(wasCorrect, pointsEarned) {
        var game = state.currentGame;
        var hasRealImage = game.screenshots && game.screenshots[0] && game.screenshots[0] !== 'placeholder.jpg';

        if (hasRealImage) {
            els.revealImage.src = game.screenshots[0];
            els.revealImage.alt = 'Cover art for ' + game.title;
            els.revealImage.classList.remove('d-none');
            els.revealImageFallback.classList.add('d-none');
        } else {
            els.revealImage.classList.add('d-none');
            els.revealImageFallback.classList.remove('d-none');
        }

        els.revealFeedback.innerHTML = wasCorrect
            ? '<i class="bi bi-check-circle-fill text-success me-1" aria-hidden="true"></i>Correct! +' + pointsEarned + ' points'
            : '<i class="bi bi-x-circle-fill text-danger me-1" aria-hidden="true"></i>The answer was:';
        els.revealFeedback.className = 'fw-semibold mb-2 ' + (wasCorrect ? 'text-success' : 'text-danger');

        els.revealTitle.textContent = game.title;
        els.revealBlurb.textContent = game.story;

        var platformBadges = game.platform.map(function (p) {
            return '<span class="badge platform-badge">' + escapeHtml(p) + '</span>';
        }).join(' ');
        els.revealBadges.innerHTML =
            '<span class="badge genre-badge">' + escapeHtml(GENRE_META[game.genre].shortLabel) + '</span>' +
            platformBadges +
            '<span class="badge platform-badge">' + buildStars(game.rating) + ' ' + game.rating.toFixed(1) + '</span>' +
            '<span class="badge platform-badge">' + (game.price === 0 ? 'Free' : '$' + game.price.toFixed(2)) + '</span>';

        updateRevealFavoriteButton();
        els.revealDetailsLink.href = '../html/games.html?id=' + encodeURIComponent(game.id);

        var isLastRound = state.roundIndex === state.pool.length - 1;
        els.nextRoundBtn.innerHTML = isLastRound
            ? 'See Final Score<i class="bi bi-flag-fill ms-1" aria-hidden="true"></i>'
            : 'Next Round<i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>';

        els.roundPanel.classList.add('d-none');
        els.revealPanel.classList.remove('d-none');
    }

    function updateRevealFavoriteButton() {
        var isFavorite = state.favorites.indexOf(state.currentGame.id) !== -1;
        els.revealFavoriteBtn.classList.toggle('active', isFavorite);
        els.revealFavoriteBtn.innerHTML = '<i class="bi ' + (isFavorite ? 'bi-heart-fill' : 'bi-heart') + ' me-1" aria-hidden="true"></i>' + (isFavorite ? 'Favorited' : 'Favorite');
    }

    // ---------------------------------------------------------------
    // Favorites (shared with games.js via the same localStorage key)
    // ---------------------------------------------------------------

    function loadFavorites() {
        try {
            var raw = window.localStorage.getItem(FAVORITES_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (error) {
            return [];
        }
    }

    function saveFavorites() {
        try {
            window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
        } catch (error) {
            // Storage unavailable - favorites just won't persist for this session.
        }
    }

    function toggleFavorite(id) {
        var index = state.favorites.indexOf(id);
        var justFavorited;

        if (index !== -1) {
            state.favorites.splice(index, 1);
            justFavorited = false;
        } else {
            state.favorites.push(id);
            justFavorited = true;
        }
        saveFavorites();
        updateRevealFavoriteButton();

        var game = state.currentGame;
        showToast(
            justFavorited ? (game.title + ' added to favorites.') : (game.title + ' removed from favorites.'),
            justFavorited ? 'success' : 'secondary'
        );
    }

    // ---------------------------------------------------------------
    // High Scores (session history, persisted globally via localStorage)
    // ---------------------------------------------------------------

    function loadHistory() {
        try {
            var raw = window.localStorage.getItem(HISTORY_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (error) {
            return [];
        }
    }

    function saveHistory() {
        try {
            window.localStorage.setItem(HISTORY_KEY, JSON.stringify(state.history));
        } catch (error) {
            // Storage unavailable - history just won't persist for this session.
        }
    }

    function recordSession() {
        state.history.unshift({
            score: state.score,
            correct: state.correctCount,
            rounds: state.pool.length,
            bestStreak: state.bestStreak,
            date: new Date().toISOString()
        });
        state.history = state.history.slice(0, MAX_HISTORY_ENTRIES);
        saveHistory();
        renderHistoryPanel();
    }

    function clearHistory() {
        state.history = [];
        saveHistory();
        renderHistoryPanel();
        showToast('High score history cleared.', 'secondary');
    }

    function renderHistoryPanel() {
        if (state.history.length === 0) {
            els.historyBestScore.textContent = '\u2014';
            els.historySessionsPlayed.textContent = '0';
            els.historyAverageScore.textContent = '\u2014';
            els.historyBestStreak.textContent = '\u2014';
            els.historyList.innerHTML = '';
            els.historyEmptyState.classList.remove('d-none');
            return;
        }

        els.historyEmptyState.classList.add('d-none');

        var scores = state.history.map(function (entry) { return entry.score; });
        var streaks = state.history.map(function (entry) { return entry.bestStreak; });
        var average = Math.round(scores.reduce(function (sum, s) { return sum + s; }, 0) / scores.length);

        els.historyBestScore.textContent = Math.max.apply(null, scores);
        els.historySessionsPlayed.textContent = state.history.length;
        els.historyAverageScore.textContent = average;
        els.historyBestStreak.textContent = Math.max.apply(null, streaks);

        els.historyList.innerHTML = state.history.map(function (entry) {
            var dateLabel = formatDate(entry.date);
            return '<div class="saved-setup-row d-flex justify-content-between align-items-center flex-wrap gap-2">' +
                '<span class="small text-muted">' + escapeHtml(dateLabel) + '</span>' +
                '<span>' + entry.correct + ' / ' + entry.rounds + ' correct</span>' +
                '<span>Best streak: ' + entry.bestStreak + '</span>' +
                '<span class="fw-bold">' + entry.score + ' pts</span>' +
                '</div>';
        }).join('');
    }

    function formatDate(isoString) {
        var date = new Date(isoString);
        if (isNaN(date.getTime())) return 'Unknown date';
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
            ' \u00b7 ' +
            date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    }

    // ---------------------------------------------------------------
    // Scoreboard / toasts / helpers
    // ---------------------------------------------------------------

    function updateScoreboard() {
        els.scoreLabel.textContent = state.score;
        els.streakLabel.textContent = state.streak;
    }

    function showToast(message, variant) {
        if (!els.toastContainer) return;

        var toastEl = document.createElement('div');
        toastEl.className = 'toast align-items-center border-0 text-bg-' + (variant || 'secondary');
        toastEl.setAttribute('role', 'status');
        toastEl.setAttribute('aria-live', 'polite');
        toastEl.setAttribute('aria-atomic', 'true');
        toastEl.innerHTML =
            '<div class="d-flex">' +
            '<div class="toast-body">' + escapeHtml(message) + '</div>' +
            '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
            '</div>';
        els.toastContainer.appendChild(toastEl);

        if (window.bootstrap) {
            var toast = new bootstrap.Toast(toastEl, { delay: 3500 });
            toastEl.addEventListener('hidden.bs.toast', function () { toastEl.remove(); });
            toast.show();
        } else {
            setTimeout(function () { toastEl.remove(); }, 3500);
        }
    }

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function normalize(value) {
        return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
    }

    function buildStars(rating) {
        var rounded = Math.round(rating);
        var stars = '';
        for (var i = 1; i <= 5; i++) {
            stars += i <= rounded ? '\u2605' : '\u2606';
        }
        return stars;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    return { init: init };
})();

document.addEventListener('DOMContentLoaded', function () {
    MinigamePage.init();
});
