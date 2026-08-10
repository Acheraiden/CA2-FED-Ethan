// ReadyPlayer3 - gamelibrary.html data
//
// Read-only game catalog, reused from the Games page for consistency.
// Kept strictly separate from the user's library state (see LIBRARY_STATUSES
// and the library array in gamelibrary.js) - this is "what a game is",
// never "what the user did with it".
const GAMES = [
    { id: 'fps-valorant', name: 'Valorant', image: '../images/valo.jpg', genre: 'FPS', platform: ['PC'], type: 'Multiplayer', rating: 4.6, price: 0, releaseDate: '2020-06-02' },
    { id: 'fps-cod-mw3', name: 'Call of Duty: Modern Warfare III', image: '../images/CODMordenWarfare3.jpg', genre: 'FPS', platform: ['PC', 'PS5', 'Xbox'], type: 'Both', rating: 4, price: 69.99, releaseDate: '2023-11-10' },
    { id: 'fps-counter-strike-2', name: 'Counter-Strike 2', image: '../images/CS2.jpg', genre: 'FPS', platform: ['PC'], type: 'Multiplayer', rating: 4.5, price: 0, releaseDate: '2023-09-27' },
    { id: 'fps-doom-eternal', name: 'DOOM Eternal', image: '../images/DoomEternalcover.jpg', genre: 'FPS', platform: ['PC', 'PS5', 'Xbox'], type: 'Single-player', rating: 4.7, price: 39.99, releaseDate: '2020-03-20' },
    { id: 'fps-overwatch-2', name: 'Overwatch 2', image: '../images/overwatch2.jpg', genre: 'FPS', platform: ['PC', 'PS5', 'Xbox'], type: 'Multiplayer', rating: 4.1, price: 0, releaseDate: '2022-10-04' },
    { id: 'fps-left-4-dead-2', name: 'Left 4 Dead 2', image: '../images/Left4Dead2.jpg', genre: 'FPS', platform: ['PC'], type: 'Both', rating: 4.6, price: 9.99, releaseDate: '2009-11-17' },
    { id: 'action-adventure-devil-may-cry-5', name: 'Devil May Cry 5', image: '../images/dmc5.jpg', genre: 'Action-Adventure', platform: ['PC', 'PS5', 'Xbox'], type: 'Single-player', rating: 4.8, price: 29.99, releaseDate: '2019-03-08' },
    { id: 'action-adventure-viewfinder', name: 'Viewfinder', image: '../images/viewfinder.jpg', genre: 'Action-Adventure', platform: ['PC', 'PS5'], type: 'Single-player', rating: 4.4, price: 24.99, releaseDate: '2023-07-18' },
    { id: 'action-adventure-ghost-of-tsushima', name: 'Ghost of Tsushima', image: '../images/GhostOfTsushima.jpg', genre: 'Action-Adventure', platform: ['PS5', 'PC'], type: 'Single-player', rating: 4.9, price: 59.99, releaseDate: '2020-07-17' },
    { id: 'action-adventure-days-gone', name: 'Days Gone', image: '../images/DaysGone.jpg', genre: 'Action-Adventure', platform: ['PC', 'PS5'], type: 'Single-player', rating: 4.2, price: 19.99, releaseDate: '2019-04-26' },
    { id: 'action-adventure-batman-arkham-city', name: 'Batman: Arkham City', image: '../images/BatmanArkhamCity.jpg', genre: 'Action-Adventure', platform: ['PC', 'PS5', 'Xbox'], type: 'Single-player', rating: 4.7, price: 19.99, releaseDate: '2011-10-18' },
    { id: 'action-adventure-uncharted-3', name: 'Uncharted 3: Drake\'s Deception', image: '../images/Uncharted3.jpg', genre: 'Action-Adventure', platform: ['PS5', 'PC'], type: 'Single-player', rating: 4.5, price: 19.99, releaseDate: '2011-11-01' },
    { id: 'rpg-final-fantasy-7-remake', name: 'Final Fantasy VII Remake', image: '../images/ff7r.jpg', genre: 'RPG', platform: ['PC', 'PS5'], type: 'Single-player', rating: 4.8, price: 59.99, releaseDate: '2020-04-10' },
    { id: 'rpg-persona-5-royal', name: 'Persona 5 Royal', image: '../images/Persona5Royal.jpg', genre: 'RPG', platform: ['PC', 'PS5', 'Xbox'], type: 'Single-player', rating: 4.9, price: 49.99, releaseDate: '2020-03-31' },
    { id: 'rpg-fire-emblem-three-houses', name: 'Fire Emblem: Three Houses', image: '../images/FireEmblem3Houses.jpg', genre: 'RPG', platform: ['PC'], type: 'Single-player', rating: 4.6, price: 59.99, releaseDate: '2019-07-26' },
    { id: 'rpg-pokemon-white-2', name: 'Pokemon White 2', image: '../images/PokemonWhite2.jpg', genre: 'RPG', platform: ['PC'], type: 'Single-player', rating: 4.5, price: 34.99, releaseDate: '2012-10-07' },
    { id: 'rpg-fallout-4', name: 'Fallout 4', image: '../images/Fallout4.jpg', genre: 'RPG', platform: ['PC', 'PS5', 'Xbox'], type: 'Single-player', rating: 4.3, price: 19.99, releaseDate: '2015-11-10' },
    { id: 'rpg-undertale', name: 'Undertale', image: '../images/Undertale.jpg', genre: 'RPG', platform: ['PC'], type: 'Single-player', rating: 4.8, price: 9.99, releaseDate: '2015-09-15' },
    { id: 'strategy-civilization-6', name: 'Sid Meier\'s Civilization VI', image: '../images/SidMeier.jpg', genre: 'Strategy', platform: ['PC'], type: 'Both', rating: 4.6, price: 59.99, releaseDate: '2016-10-21' },
    { id: 'strategy-age-of-empires-4', name: 'Age of Empires IV', image: '../images/AgeOfEmpires.jpg', genre: 'Strategy', platform: ['PC'], type: 'Both', rating: 4.4, price: 39.99, releaseDate: '2021-10-28' },
    { id: 'strategy-xcom-2', name: 'XCOM 2', image: '../images/XCom2.jpg', genre: 'Strategy', platform: ['PC', 'PS5', 'Xbox'], type: 'Single-player', rating: 4.5, price: 29.99, releaseDate: '2016-02-05' },
    { id: 'strategy-starcraft-2', name: 'StarCraft II', image: '../images/StarCraft2.jpg', genre: 'Strategy', platform: ['PC'], type: 'Both', rating: 4.7, price: 0, releaseDate: '2010-07-27' },
    { id: 'strategy-total-war-warhammer-3', name: 'Total War: Warhammer III', image: '../images/TotalWar.jpg', genre: 'Strategy', platform: ['PC'], type: 'Both', rating: 4.3, price: 59.99, releaseDate: '2022-02-17' },
    { id: 'strategy-project-zomboid', name: 'Project Zomboid', image: '../images/ProjectZomboid.jpg', genre: 'Strategy', platform: ['PC'], type: 'Both', rating: 4.6, price: 19.99, releaseDate: '2013-11-08' },
];
// ReadyPlayer3 - gamelibrary.html interactions
//
// Self-contained controller for the Game Library: five drag-and-drop
// statuses, search/filter/sort, statistics, personal ratings/notes/
// playtime, a details modal, Wishlist/Comparison/Tier List hand-off, and
// localStorage persistence.
//
// STATE MODEL: two separate things, per the design brief.
//   GAMES (gamelibrary-data.js)  - read-only catalog: "what a game is".
//   library (below)              - mutable: "what the user did with it".
// A library entry exists at most once per gameId - that's how duplicate
// prevention works structurally, the same approach used on the Tier List
// and Setup Planner pages.

document.addEventListener('DOMContentLoaded', () => {
    GameLibraryPage.init();
});

const GameLibraryPage = (() => {
    const LIBRARY_KEY = 'rp3-game-library';
    const COMPARISON_KEY = 'rp3-comparison-list';
    const TIERLIST_INBOX_KEY = 'rp3-tierlist-inbox';
    const MAX_COMPARISON = 3;

    const STATUSES = [
        { id: 'playing', label: 'Playing', icon: '\ud83c\udfae' },
        { id: 'completed', label: 'Completed', icon: '\u2705' },
        { id: 'paused', label: 'Paused', icon: '\u23f8\ufe0f' },
        { id: 'wishlist', label: 'Wishlist', icon: '\u2764\ufe0f' },
        { id: 'dropped', label: 'Dropped', icon: '\u274c' }
    ];

    let library = [];
    let comparisonList = [];
    const filters = { search: '', genre: 'all', platform: 'all', type: 'all', rating: 'all' };
    let currentSort = 'recent';
    let viewMode = 'grid'; // 'grid' | 'list'
    let draggedGameId = null;
    let activeGameId = null; // game currently open in the details modal
    let lastRemoved = null; // { entry, index } - for the Undo toast

    const els = {};
    let detailsModal = null;
    let removeConfirmModal = null;
    let resetConfirmModal = null;
    let addGameModal = null;
    let detailsTabInstance = null;

    function init() {
        library = loadFromStorage(LIBRARY_KEY, []);
        comparisonList = loadFromStorage(COMPARISON_KEY, []);

        cacheElements();
        initModals();
        populateFilterOptions();
        bindEvents();
        renderAll();
    }

    function cacheElements() {
        els.statsTotalGames = document.getElementById('statsTotalGames');
        els.statsCompleted = document.getElementById('statsCompleted');
        els.statsPlaying = document.getElementById('statsPlaying');
        els.statsWishlist = document.getElementById('statsWishlist');
        els.statsPlaytime = document.getElementById('statsPlaytime');

        els.genreBreakdown = document.getElementById('genreBreakdown');
        els.completionBar = document.getElementById('completionBar');
        els.completionLabel = document.getElementById('completionLabel');
        els.recentlyAddedList = document.getElementById('recentlyAddedList');
        els.recentlyPlayedList = document.getElementById('recentlyPlayedList');

        els.searchInput = document.getElementById('librarySearchInput');
        els.genreFilter = document.getElementById('libraryGenreFilter');
        els.platformFilter = document.getElementById('libraryPlatformFilter');
        els.typeFilter = document.getElementById('libraryTypeFilter');
        els.ratingFilter = document.getElementById('libraryRatingFilter');
        els.sortSelect = document.getElementById('librarySortSelect');
        els.gridViewBtn = document.getElementById('gridViewBtn');
        els.listViewBtn = document.getElementById('listViewBtn');
        els.addGameBtn = document.getElementById('addGameBtn');
        els.resetLibraryBtn = document.getElementById('resetLibraryBtn');

        els.libraryBoard = document.getElementById('libraryBoard');

        els.addGameModalEl = document.getElementById('addGameModal');
        els.addGameModalBody = document.getElementById('addGameModalBody');

        els.detailsModalEl = document.getElementById('gameDetailsModal');
        els.detailsModalLabel = document.getElementById('gameDetailsModalLabel');
        els.detailsModalBody = document.getElementById('gameDetailsModalBody');
        els.detailsModalFooter = document.getElementById('gameDetailsModalFooter');

        els.removeConfirmModalEl = document.getElementById('removeConfirmModal');
        els.removeConfirmText = document.getElementById('removeConfirmText');
        els.confirmRemoveBtn = document.getElementById('confirmRemoveBtn');

        els.resetConfirmModalEl = document.getElementById('resetConfirmModal');
        els.confirmResetBtn = document.getElementById('confirmResetBtn');

        els.toastContainer = document.getElementById('toastContainer');
    }

    function initModals() {
        if (!window.bootstrap) return;
        detailsModal = bootstrap.Modal.getOrCreateInstance(els.detailsModalEl);
        removeConfirmModal = bootstrap.Modal.getOrCreateInstance(els.removeConfirmModalEl);
        resetConfirmModal = bootstrap.Modal.getOrCreateInstance(els.resetConfirmModalEl);
        addGameModal = bootstrap.Modal.getOrCreateInstance(els.addGameModalEl);
    }

    // ---------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function loadFromStorage(key, fallback) {
        try {
            const raw = window.localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function saveToStorage(key, value) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // Storage unavailable - fail silently.
        }
    }

    function saveLibrary() {
        saveToStorage(LIBRARY_KEY, library);
    }

    function showToast(message, variant, actionLabel, actionFn) {
        if (!els.toastContainer) return;
        const toastEl = document.createElement('div');
        toastEl.className = 'toast align-items-center border-0 text-bg-' + (variant || 'secondary');
        toastEl.setAttribute('role', 'status');
        toastEl.setAttribute('aria-live', 'polite');
        toastEl.setAttribute('aria-atomic', 'true');
        toastEl.innerHTML =
            '<div class="d-flex">' +
            '<div class="toast-body">' + escapeHtml(message) +
            (actionLabel ? ' <button type="button" class="btn btn-sm btn-light ms-2 toast-action-btn">' + escapeHtml(actionLabel) + '</button>' : '') +
            '</div>' +
            '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
            '</div>';
        els.toastContainer.appendChild(toastEl);

        if (actionLabel && actionFn) {
            const actionBtn = toastEl.querySelector('.toast-action-btn');
            actionBtn.addEventListener('click', () => {
                actionFn();
                if (window.bootstrap) bootstrap.Toast.getOrCreateInstance(toastEl).hide();
            });
        }

        if (window.bootstrap) {
            const toast = new bootstrap.Toast(toastEl, { delay: actionLabel ? 6000 : 3200 });
            toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
            toast.show();
        } else {
            setTimeout(() => toastEl.remove(), 3200);
        }
    }

    function findGame(gameId) {
        return GAMES.find((g) => g.id === gameId) || null;
    }

    function findEntry(gameId) {
        return library.find((e) => e.gameId === gameId) || null;
    }

    function findStatusMeta(statusId) {
        return STATUSES.find((s) => s.id === statusId) || null;
    }

    function isInLibrary(gameId) {
        return library.some((e) => e.gameId === gameId);
    }

    function formatRelativeDate(isoString) {
        const then = new Date(isoString);
        const diffMs = Date.now() - then.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return diffDays + ' days ago';
        return then.toLocaleDateString();
    }

    // ---------------------------------------------------------------
    // Central render
    // ---------------------------------------------------------------

    function renderAll() {
        renderBoard();
        renderStatistics();
        renderGenreBreakdown();
        renderCompletionProgress();
        renderRecentlyAdded();
        renderRecentlyPlayed();
    }

    // Every state-mutating action calls this right after updating
    // `library`: saves to storage, then re-renders everything that could
    // have changed as a result.
    function commitChange() {
        saveLibrary();
        renderAll();
    }

    // ---------------------------------------------------------------
    // Search / Filter / Sort pipeline - these compose, not replace
    // each other, since each is just a step feeding into the next.
    // ---------------------------------------------------------------

    function populateFilterOptions() {
        const genres = Array.from(new Set(GAMES.map((g) => g.genre))).sort();
        const platforms = Array.from(new Set(GAMES.flatMap((g) => g.platform))).sort();
        const types = Array.from(new Set(GAMES.map((g) => g.type))).sort();
        appendOptions(els.genreFilter, genres);
        appendOptions(els.platformFilter, platforms);
        appendOptions(els.typeFilter, types);
    }

    function appendOptions(selectEl, values) {
        if (!selectEl) return;
        values.forEach((value) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectEl.appendChild(option);
        });
    }

    function matchesFilters(pair) {
        const game = pair.game;
        if (filters.search && game.name.toLowerCase().indexOf(filters.search) === -1) return false;
        if (filters.genre !== 'all' && game.genre !== filters.genre) return false;
        if (filters.platform !== 'all' && game.platform.indexOf(filters.platform) === -1) return false;
        if (filters.type !== 'all' && game.type !== filters.type) return false;
        if (filters.rating !== 'all' && (pair.entry.userRating == null || pair.entry.userRating < Number(filters.rating))) return false;
        return true;
    }

    function getSortComparator() {
        switch (currentSort) {
            case 'az': return (a, b) => a.game.name.localeCompare(b.game.name);
            case 'za': return (a, b) => b.game.name.localeCompare(a.game.name);
            case 'rating-high': return (a, b) => (b.entry.userRating || 0) - (a.entry.userRating || 0);
            case 'rating-low': return (a, b) => (a.entry.userRating || 0) - (b.entry.userRating || 0);
            case 'release-date': return (a, b) => new Date(b.game.releaseDate) - new Date(a.game.releaseDate);
            case 'playtime': return (a, b) => b.entry.playtime - a.entry.playtime;
            case 'recent':
            default: return (a, b) => new Date(b.entry.dateAdded) - new Date(a.entry.dateAdded);
        }
    }

    function getVisibleEntries(statusId) {
        return library
            .filter((entry) => entry.status === statusId)
            .map((entry) => ({ entry, game: findGame(entry.gameId) }))
            .filter((pair) => pair.game)
            .filter(matchesFilters)
            .sort(getSortComparator());
    }

    // ---------------------------------------------------------------
    // Board (5 status sections, all visible - required so drag-and-drop
    // has every drop zone on screen at once)
    // ---------------------------------------------------------------

    function renderBoard() {
        if (!els.libraryBoard) return;
        els.libraryBoard.innerHTML = STATUSES.map(buildStatusSection).join('');

        STATUSES.forEach((status) => {
            bindStatusDropZone(status.id);
            bindCardEvents(document.getElementById('status-cards-' + status.id));
        });
    }

    function buildStatusSection(status) {
        const visible = getVisibleEntries(status.id);
        const totalInStatus = library.filter((e) => e.status === status.id).length;

        let body;
        if (totalInStatus === 0) {
            body = '<p class="text-muted small mb-0 empty-status-msg">Drag a game here, or use + Add Game.</p>';
        } else if (visible.length === 0) {
            body = '<p class="text-muted small mb-0 empty-status-msg">No games match your search/filters.</p>';
        } else {
            body = visible.map((pair) => buildGameCard(pair.entry, pair.game)).join('');
        }

        return (
            '<section class="library-status-section" data-status="' + status.id + '">' +
            '<div class="d-flex align-items-center gap-2 mb-2">' +
            '<h2 class="h6 mb-0">' + status.icon + ' ' + escapeHtml(status.label) + '</h2>' +
            '<span class="badge bg-secondary">' + totalInStatus + '</span>' +
            '</div>' +
            '<div class="library-status-cards ' + (viewMode === 'list' ? 'library-list-mode' : 'library-grid-mode') + '" id="status-cards-' + status.id + '" data-status="' + status.id + '">' +
            body +
            '</div>' +
            '</section>'
        );
    }

    function buildGameCard(entry, game) {
        const ratingDisplay = entry.userRating != null ? entry.userRating + ' / 10' : 'Not rated';
        if (viewMode === 'list') {
            return (
                '<div class="library-card library-card-list" draggable="true" data-game-id="' + game.id + '">' +
                '<img src="' + game.image + '" class="library-card-list-img" alt="Cover art for ' + escapeHtml(game.name) + '" />' +
                '<div class="library-card-list-info">' +
                '<span class="fw-semibold">' + escapeHtml(game.name) + '</span>' +
                '<span class="text-muted small">' + escapeHtml(game.genre) + ' \u00b7 \u2b50 ' + ratingDisplay + ' \u00b7 ' + entry.playtime + ' hrs</span>' +
                '</div>' +
                '<button type="button" class="btn btn-sm btn-outline-light library-card-details-btn" data-game-id="' + game.id + '">Details</button>' +
                '</div>'
            );
        }
        return (
            '<div class="card library-card" draggable="true" data-game-id="' + game.id + '">' +
            '<img src="' + game.image + '" class="library-card-img" alt="Cover art for ' + escapeHtml(game.name) + '" />' +
            '<div class="library-card-body">' +
            '<h3 class="h6 mb-1">' + escapeHtml(game.name) + '</h3>' +
            '<p class="small text-muted mb-2">' + escapeHtml(game.genre) + '</p>' +
            '<p class="small mb-1">\u2b50 ' + ratingDisplay + '</p>' +
            '<p class="small text-muted mb-2"><span class="badge bg-secondary">' + escapeHtml(game.platform[0]) + (game.platform.length > 1 ? ' +' + (game.platform.length - 1) : '') + '</span> \u00b7 ' + entry.playtime + ' hrs</p>' +
            '<div class="d-flex gap-2">' +
            '<button type="button" class="btn btn-sm btn-outline-primary flex-grow-1 library-card-details-btn" data-game-id="' + game.id + '">Details</button>' +
            '<button type="button" class="btn btn-sm btn-outline-danger library-card-remove-btn" data-game-id="' + game.id + '" title="Remove"><i class="bi bi-trash" aria-hidden="true"></i></button>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function bindCardEvents(container) {
        if (!container) return;
        container.querySelectorAll('.library-card').forEach((card) => {
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragend', handleDragEnd);
        });
        container.querySelectorAll('.library-card-details-btn').forEach((btn) => {
            btn.addEventListener('click', () => openDetailsModal(btn.getAttribute('data-game-id')));
        });
        container.querySelectorAll('.library-card-remove-btn').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                requestRemoveGame(btn.getAttribute('data-game-id'));
            });
        });
    }

    // ---------------------------------------------------------------
    // Drag and drop between statuses
    // ---------------------------------------------------------------

    function handleDragStart(event) {
        draggedGameId = event.currentTarget.getAttribute('data-game-id');
        event.dataTransfer.effectAllowed = 'move';
        event.currentTarget.classList.add('dragging');
    }

    function handleDragEnd(event) {
        event.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.drag-over').forEach((el) => el.classList.remove('drag-over'));
    }

    function bindStatusDropZone(statusId) {
        const zone = document.getElementById('status-cards-' + statusId);
        if (!zone) return;
        zone.addEventListener('dragover', (event) => {
            event.preventDefault();
            zone.classList.add('drag-over');
        });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', (event) => {
            event.preventDefault();
            zone.classList.remove('drag-over');
            if (draggedGameId == null) return;
            moveGameToStatus(draggedGameId, statusId);
            draggedGameId = null;
        });
    }

    function moveGameToStatus(gameId, newStatus) {
        const entry = findEntry(gameId);
        if (!entry || entry.status === newStatus) return;
        entry.status = newStatus;
        commitChange();
    }

    // ---------------------------------------------------------------
    // Statistics (pure derived values, recalculated every render -
    // never stored, so they can never drift out of sync)
    // ---------------------------------------------------------------

    function renderStatistics() {
        const totalPlaytime = library.reduce((sum, e) => sum + (e.playtime || 0), 0);
        if (els.statsTotalGames) els.statsTotalGames.textContent = String(library.length);
        if (els.statsCompleted) els.statsCompleted.textContent = String(library.filter((e) => e.status === 'completed').length);
        if (els.statsPlaying) els.statsPlaying.textContent = String(library.filter((e) => e.status === 'playing').length);
        if (els.statsWishlist) els.statsWishlist.textContent = String(library.filter((e) => e.status === 'wishlist').length);
        if (els.statsPlaytime) els.statsPlaytime.textContent = totalPlaytime + ' hrs';
    }

    function renderGenreBreakdown() {
        if (!els.genreBreakdown) return;
        if (library.length === 0) {
            els.genreBreakdown.innerHTML = '<p class="text-muted small mb-0">Add games to see your genre breakdown.</p>';
            return;
        }

        const counts = {};
        library.forEach((entry) => {
            const game = findGame(entry.gameId);
            if (!game) return;
            counts[game.genre] = (counts[game.genre] || 0) + 1;
        });
        const max = Math.max.apply(null, Object.values(counts));

        els.genreBreakdown.innerHTML = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).map((genre) => {
            const percent = Math.round((counts[genre] / max) * 100);
            return '<div class="mb-2">' +
                '<div class="d-flex justify-content-between small mb-1"><span>' + escapeHtml(genre) + '</span><span>' + counts[genre] + '</span></div>' +
                '<div class="progress" style="height: 6px;"><div class="progress-bar bg-primary" role="progressbar" style="width: ' + percent + '%;"></div></div>' +
                '</div>';
        }).join('');
    }

    function renderCompletionProgress() {
        if (!els.completionBar || !els.completionLabel) return;
        const total = library.length;
        const completed = library.filter((e) => e.status === 'completed').length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        els.completionBar.style.width = percent + '%';
        els.completionBar.setAttribute('aria-valuenow', String(percent));
        els.completionLabel.textContent = completed + ' / ' + total + ' Games Completed';
    }

    function renderRecentlyAdded() {
        if (!els.recentlyAddedList) return;
        const recent = library.slice().sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 5);
        if (recent.length === 0) {
            els.recentlyAddedList.innerHTML = '<p class="text-muted small mb-0">Nothing added yet.</p>';
            return;
        }
        els.recentlyAddedList.innerHTML = '<ol class="small ps-3 mb-0">' + recent.map((entry) => {
            const game = findGame(entry.gameId);
            return game ? '<li>' + escapeHtml(game.name) + '</li>' : '';
        }).join('') + '</ol>';
    }

    function renderRecentlyPlayed() {
        if (!els.recentlyPlayedList) return;
        const played = library.filter((e) => e.lastPlayedAt).slice().sort((a, b) => new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt)).slice(0, 5);
        if (played.length === 0) {
            els.recentlyPlayedList.innerHTML = '<p class="text-muted small mb-0">No play sessions logged yet.</p>';
            return;
        }
        els.recentlyPlayedList.innerHTML = played.map((entry) => {
            const game = findGame(entry.gameId);
            if (!game) return '';
            return '<p class="small mb-1">\ud83c\udfae ' + escapeHtml(game.name) + ' \u2014 ' + formatRelativeDate(entry.lastPlayedAt) + '</p>';
        }).join('');
    }

    // ---------------------------------------------------------------
    // Add Game (from the catalog, or effectively "from Wishlist" when
    // status is set to wishlist - same flow either way)
    // ---------------------------------------------------------------

    function openAddGameModal() {
        if (!els.addGameModalBody) return;
        const availableGames = GAMES.filter((g) => !isInLibrary(g.id));

        if (availableGames.length === 0) {
            els.addGameModalBody.innerHTML = '<p class="text-muted mb-0">Every catalog game is already in your library.</p>';
        } else {
            els.addGameModalBody.innerHTML = availableGames.map((game) => {
                return '<div class="col-md-6">' +
                    '<div class="card add-game-card h-100">' +
                    '<div class="d-flex gap-2">' +
                    '<img src="' + game.image + '" class="add-game-card-img" alt="Cover art for ' + escapeHtml(game.name) + '" />' +
                    '<div class="flex-grow-1">' +
                    '<p class="small fw-semibold mb-1">' + escapeHtml(game.name) + '</p>' +
                    '<p class="small text-muted mb-2">' + escapeHtml(game.genre) + '</p>' +
                    '<select class="form-select form-select-sm mb-2 add-game-status-select" data-game-id="' + game.id + '">' +
                    STATUSES.map((s) => '<option value="' + s.id + '">' + s.icon + ' ' + escapeHtml(s.label) + '</option>').join('') +
                    '</select>' +
                    '<button type="button" class="btn btn-sm btn-primary w-100 add-game-confirm-btn" data-game-id="' + game.id + '">Add to Library</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }).join('');

            els.addGameModalBody.querySelectorAll('.add-game-confirm-btn').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const gameId = btn.getAttribute('data-game-id');
                    const select = els.addGameModalBody.querySelector('.add-game-status-select[data-game-id="' + gameId + '"]');
                    addGameToLibrary(gameId, select ? select.value : 'playing');
                    openAddGameModal(); // re-render the remaining list
                });
            });
        }

        if (addGameModal) addGameModal.show();
    }

    function addGameToLibrary(gameId, status) {
        if (isInLibrary(gameId)) {
            showToast('That game is already in your library.', 'warning');
            return;
        }
        const game = findGame(gameId);
        if (!game) return;

        library.push({
            gameId,
            status: status || 'playing',
            userRating: null,
            notes: '',
            playtime: 0,
            dateAdded: new Date().toISOString(),
            lastPlayedAt: null
        });
        commitChange();
        showToast(game.name + ' added to your library.', 'success');
    }

    // ---------------------------------------------------------------
    // Game Details Modal (single, reused, repopulated per game).
    // Uses Bootstrap Tabs internally: Details / My Rating & Notes / Playtime.
    // ---------------------------------------------------------------

    function openDetailsModal(gameId) {
        const game = findGame(gameId);
        const entry = findEntry(gameId);
        if (!game || !entry || !els.detailsModalBody) return;
        activeGameId = gameId;

        if (els.detailsModalLabel) els.detailsModalLabel.textContent = game.name;

        const platformBadges = game.platform.map((p) => '<span class="badge bg-secondary me-1">' + escapeHtml(p) + '</span>').join('');
        const statusMeta = findStatusMeta(entry.status);

        els.detailsModalBody.innerHTML =
            '<div class="row g-3 mb-3">' +
            '<div class="col-md-5">' +
            '<img src="' + game.image + '" class="img-fluid rounded" alt="Cover art for ' + escapeHtml(game.name) + '" />' +
            '</div>' +
            '<div class="col-md-7">' +
            '<p class="mb-2">' + platformBadges + '<span class="badge bg-primary">' + escapeHtml(game.genre) + '</span></p>' +
            '<ul class="list-unstyled small mb-3">' +
            '<li><strong>Type:</strong> ' + escapeHtml(game.type) + '</li>' +
            '<li><strong>Released:</strong> ' + escapeHtml(game.releaseDate) + '</li>' +
            '<li><strong>Game Rating:</strong> ' + game.rating.toFixed(1) + ' / 5</li>' +
            '<li><strong>Status:</strong> ' + statusMeta.icon + ' ' + escapeHtml(statusMeta.label) + '</li>' +
            '</ul>' +
            '<label for="detailsStatusSelect" class="form-label small text-muted mb-1">Change Status</label>' +
            '<select id="detailsStatusSelect" class="form-select form-select-sm">' +
            STATUSES.map((s) => '<option value="' + s.id + '"' + (s.id === entry.status ? ' selected' : '') + '>' + s.icon + ' ' + escapeHtml(s.label) + '</option>').join('') +
            '</select>' +
            '</div>' +
            '</div>' +
            buildDetailsTabs(entry);

        document.getElementById('detailsStatusSelect').addEventListener('change', function () {
            moveGameToStatus(gameId, this.value);
            openDetailsModal(gameId); // refresh the modal's own status label too
        });

        bindDetailsTabEvents(entry);
        buildDetailsModalFooter(game, entry);

        if (detailsModal) detailsModal.show();
    }

    function buildDetailsTabs(entry) {
        const starsHtml = buildStarRating(entry.userRating);
        return (
            '<ul class="nav nav-tabs" id="detailsTabs" role="tablist">' +
            '<li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-rating" type="button" role="tab">My Rating &amp; Notes</button></li>' +
            '<li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-playtime" type="button" role="tab">Playtime</button></li>' +
            '</ul>' +
            '<div class="tab-content details-tab-content p-3">' +
            '<div class="tab-pane fade show active" id="tab-rating" role="tabpanel">' +
            '<label class="form-label small text-muted mb-1">My Rating</label>' +
            '<div id="starRatingWrap" class="mb-3">' + starsHtml + '</div>' +
            '<label for="notesTextarea" class="form-label small text-muted mb-1">My Notes</label>' +
            '<textarea id="notesTextarea" class="form-control form-control-sm" rows="3" placeholder="Write a note about this game...">' + escapeHtml(entry.notes || '') + '</textarea>' +
            '<button type="button" id="saveNotesBtn" class="btn btn-sm btn-outline-primary mt-2">Save Notes</button>' +
            '</div>' +
            '<div class="tab-pane fade" id="tab-playtime" role="tabpanel">' +
            '<label for="playtimeInput" class="form-label small text-muted mb-1">Playtime (hours)</label>' +
            '<div class="input-group input-group-sm" style="max-width: 220px;">' +
            '<input type="number" id="playtimeInput" class="form-control" min="0" step="1" value="' + entry.playtime + '" />' +
            '<button type="button" id="savePlaytimeBtn" class="btn btn-outline-primary">Save</button>' +
            '</div>' +
            '<button type="button" id="logSessionBtn" class="btn btn-sm btn-outline-secondary mt-2">Log a Play Session Today</button>' +
            '</div>' +
            '</div>'
        );
    }

    function buildStarRating(userRating) {
        // 5 clickable stars, each representing 2 points, so the stored
        // scale stays 0-10 as specced while the UI stays a simple 5-star
        // control - clicking star N sets rating to N*2.
        const filledCount = userRating != null ? Math.round(userRating / 2) : 0;
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += '<button type="button" class="btn btn-link p-0 star-btn" data-star="' + i + '" aria-label="Rate ' + (i * 2) + ' out of 10">' +
                '<i class="bi ' + (i <= filledCount ? 'bi-star-fill' : 'bi-star') + '" aria-hidden="true"></i>' +
                '</button>';
        }
        return stars + '<span class="small text-muted ms-2" id="ratingNumberLabel">' + (userRating != null ? userRating + ' / 10' : 'Not rated') + '</span>';
    }

    function bindDetailsTabEvents(entry) {
        document.querySelectorAll('.star-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const stars = Number(btn.getAttribute('data-star'));
                entry.userRating = stars * 2;
                saveLibrary();
                document.getElementById('starRatingWrap').innerHTML = buildStarRating(entry.userRating);
                bindDetailsTabEvents(entry); // rebind the freshly-redrawn stars
                renderBoard(); // card's rating display needs updating too
                renderStatistics();
            });
        });

        const saveNotesBtn = document.getElementById('saveNotesBtn');
        if (saveNotesBtn) {
            saveNotesBtn.addEventListener('click', () => {
                entry.notes = document.getElementById('notesTextarea').value;
                saveLibrary();
                showToast('Notes saved.', 'success');
            });
        }

        const savePlaytimeBtn = document.getElementById('savePlaytimeBtn');
        if (savePlaytimeBtn) {
            savePlaytimeBtn.addEventListener('click', () => {
                const value = Math.max(0, Number(document.getElementById('playtimeInput').value) || 0);
                entry.playtime = value;
                commitChange();
                showToast('Playtime updated.', 'success');
            });
        }

        const logSessionBtn = document.getElementById('logSessionBtn');
        if (logSessionBtn) {
            logSessionBtn.addEventListener('click', () => {
                entry.lastPlayedAt = new Date().toISOString();
                saveLibrary();
                renderRecentlyPlayed();
                showToast('Logged a play session today.', 'success');
            });
        }
    }

    function buildDetailsModalFooter(game, entry) {
        if (!els.detailsModalFooter) return;
        const inComparison = comparisonList.indexOf(game.id) !== -1;
        els.detailsModalFooter.innerHTML =
            '<button type="button" class="btn btn-outline-danger me-auto" id="modalRemoveBtn">Remove from Library</button>' +
            '<button type="button" class="btn btn-outline-secondary" id="modalAddComparisonBtn"' + (inComparison ? ' disabled' : '') + '>' + (inComparison ? '\u2713 In Comparison' : 'Add to Comparison') + '</button>' +
            '<button type="button" class="btn btn-outline-secondary" id="modalAddTierListBtn">Add to Tier List</button>' +
            '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>';

        document.getElementById('modalRemoveBtn').addEventListener('click', () => {
            if (detailsModal) detailsModal.hide();
            requestRemoveGame(game.id);
        });
        document.getElementById('modalAddComparisonBtn').addEventListener('click', () => addToComparison(game));
        document.getElementById('modalAddTierListBtn').addEventListener('click', () => addToTierListInbox(game));
    }

    // ---------------------------------------------------------------
    // Remove + Undo
    // ---------------------------------------------------------------

    function requestRemoveGame(gameId) {
        const game = findGame(gameId);
        if (!game || !els.removeConfirmText) return;
        activeGameId = gameId;
        els.removeConfirmText.textContent = 'Are you sure you want to remove ' + game.name + ' from your library?';
        if (removeConfirmModal) removeConfirmModal.show();
    }

    function confirmRemoveGame() {
        const gameId = activeGameId;
        const index = library.findIndex((e) => e.gameId === gameId);
        if (index === -1) return;

        const game = findGame(gameId);
        lastRemoved = { entry: library[index], index };
        library.splice(index, 1);
        commitChange();
        if (removeConfirmModal) removeConfirmModal.hide();

        showToast('\u2713 ' + (game ? game.name : 'Game') + ' removed', 'secondary', 'Undo', undoRemove);
    }

    function undoRemove() {
        if (!lastRemoved) return;
        const insertAt = Math.min(lastRemoved.index, library.length);
        library.splice(insertAt, 0, lastRemoved.entry);
        lastRemoved = null;
        commitChange();
        showToast('Removal undone.', 'success');
    }

    // ---------------------------------------------------------------
    // Reset Library (only clears the library - Wishlist status is just
    // one of the 5 statuses here, and Comparison/Tier List data live
    // under their own separate keys, so they're untouched)
    // ---------------------------------------------------------------

    function confirmResetLibrary() {
        library = [];
        commitChange();
        if (resetConfirmModal) resetConfirmModal.hide();
        showToast('Library reset.', 'secondary');
    }

    // ---------------------------------------------------------------
    // Cross-page integration: Comparison + Tier List
    // (Wishlist integration is just moveGameToStatus(id, 'wishlist') -
    // "Wishlist" is one of the 5 statuses already, so no extra channel
    // is needed for that one.)
    // ---------------------------------------------------------------

    function addToComparison(game) {
        if (comparisonList.indexOf(game.id) !== -1) return;
        if (comparisonList.length >= MAX_COMPARISON) {
            showToast('You can compare up to ' + MAX_COMPARISON + ' games at a time.', 'warning');
            return;
        }
        comparisonList.push(game.id);
        saveToStorage(COMPARISON_KEY, comparisonList);
        showToast(game.name + ' added to Comparison.', 'success');
        if (activeGameId) buildDetailsModalFooter(game, findEntry(game.id)); // refresh the button state
    }

    function addToTierListInbox(game) {
        const inbox = loadFromStorage(TIERLIST_INBOX_KEY, []);
        if (inbox.some((g) => g.name === game.name)) {
            showToast(game.name + ' is already waiting in your Tier List inbox.', 'warning');
            return;
        }
        inbox.push({ name: game.name, image: game.image, genre: game.genre });
        saveToStorage(TIERLIST_INBOX_KEY, inbox);
        showToast(game.name + ' sent to the Tier List Creator.', 'success');
    }

    // ---------------------------------------------------------------
    // Grid / List view toggle
    // ---------------------------------------------------------------

    function setViewMode(mode) {
        viewMode = mode;
        if (els.gridViewBtn) els.gridViewBtn.classList.toggle('active', mode === 'grid');
        if (els.listViewBtn) els.listViewBtn.classList.toggle('active', mode === 'list');
        renderBoard();
    }

    // ---------------------------------------------------------------
    // Event bindings
    // ---------------------------------------------------------------

    function bindEvents() {
        if (els.searchInput) {
            els.searchInput.addEventListener('input', function () {
                filters.search = this.value.trim().toLowerCase();
                renderBoard();
            });
        }
        if (els.genreFilter) els.genreFilter.addEventListener('change', function () { filters.genre = this.value; renderBoard(); });
        if (els.platformFilter) els.platformFilter.addEventListener('change', function () { filters.platform = this.value; renderBoard(); });
        if (els.typeFilter) els.typeFilter.addEventListener('change', function () { filters.type = this.value; renderBoard(); });
        if (els.ratingFilter) els.ratingFilter.addEventListener('change', function () { filters.rating = this.value; renderBoard(); });
        if (els.sortSelect) els.sortSelect.addEventListener('change', function () { currentSort = this.value; renderBoard(); });

        if (els.gridViewBtn) els.gridViewBtn.addEventListener('click', () => setViewMode('grid'));
        if (els.listViewBtn) els.listViewBtn.addEventListener('click', () => setViewMode('list'));

        if (els.addGameBtn) els.addGameBtn.addEventListener('click', openAddGameModal);
        if (els.resetLibraryBtn) els.resetLibraryBtn.addEventListener('click', () => { if (resetConfirmModal) resetConfirmModal.show(); });
        if (els.confirmResetBtn) els.confirmResetBtn.addEventListener('click', confirmResetLibrary);
        if (els.confirmRemoveBtn) els.confirmRemoveBtn.addEventListener('click', confirmRemoveGame);
    }

    return { init };
})();