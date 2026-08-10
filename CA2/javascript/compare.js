// ReadyPlayer3 - compare.html data
//
// Read-only game catalog, reused from the Games page for consistency.
// No "developer" field: that data doesn't actually exist anywhere in the
// site's catalog, so rather than inventing fictional studio names for real
// games, comparison categories stick to fields that are real.
const GAMES = [
    { id: 'fps-valorant', name: 'Valorant', image: '../images/valo.jpg', genre: 'FPS', platform: ['PC'], rating: 4.6, price: 0, releaseDate: '2020-06-02', year: 2020, difficulty: 'Hard', playtimeLabel: '100+ hrs', playtimeHours: 100, mode: 'Multiplayer', multiplayer: true },
    { id: 'fps-cod-mw3', name: 'Call of Duty: Modern Warfare III', image: '../images/CODMordenWarfare3.jpg', genre: 'FPS', platform: ['PC', 'PS5', 'Xbox'], rating: 4, price: 69.99, releaseDate: '2023-11-10', year: 2023, difficulty: 'Medium', playtimeLabel: '8 hrs campaign', playtimeHours: 8, mode: 'Singleplayer & Multiplayer', multiplayer: true },
    { id: 'fps-counter-strike-2', name: 'Counter-Strike 2', image: '../images/CS2.jpg', genre: 'FPS', platform: ['PC'], rating: 4.5, price: 0, releaseDate: '2023-09-27', year: 2023, difficulty: 'Hard', playtimeLabel: '500+ hrs', playtimeHours: 500, mode: 'Multiplayer', multiplayer: true },
    { id: 'fps-doom-eternal', name: 'DOOM Eternal', image: '../images/DoomEternalcover.jpg', genre: 'FPS', platform: ['PC', 'PS5', 'Xbox'], rating: 4.7, price: 39.99, releaseDate: '2020-03-20', year: 2020, difficulty: 'Hard', playtimeLabel: '15 hrs', playtimeHours: 15, mode: 'Singleplayer', multiplayer: false },
    { id: 'fps-overwatch-2', name: 'Overwatch 2', image: '../images/overwatch2.jpg', genre: 'FPS', platform: ['PC', 'PS5', 'Xbox'], rating: 4.1, price: 0, releaseDate: '2022-10-04', year: 2022, difficulty: 'Medium', playtimeLabel: '150+ hrs', playtimeHours: 150, mode: 'Multiplayer', multiplayer: true },
    { id: 'fps-left-4-dead-2', name: 'Left 4 Dead 2', image: '../images/Left4Dead2.jpg', genre: 'FPS', platform: ['PC'], rating: 4.6, price: 9.99, releaseDate: '2009-11-17', year: 2009, difficulty: 'Medium', playtimeLabel: '20 hrs', playtimeHours: 20, mode: 'Co-op', multiplayer: false },
    { id: 'action-adventure-devil-may-cry-5', name: 'Devil May Cry 5', image: '../images/dmc5.jpg', genre: 'Action-Adventure', platform: ['PC', 'PS5', 'Xbox'], rating: 4.8, price: 29.99, releaseDate: '2019-03-08', year: 2019, difficulty: 'Hard', playtimeLabel: '15 hrs', playtimeHours: 15, mode: 'Singleplayer', multiplayer: false },
    { id: 'action-adventure-viewfinder', name: 'Viewfinder', image: '../images/viewfinder.jpg', genre: 'Action-Adventure', platform: ['PC', 'PS5'], rating: 4.4, price: 24.99, releaseDate: '2023-07-18', year: 2023, difficulty: 'Easy', playtimeLabel: '6 hrs', playtimeHours: 6, mode: 'Singleplayer', multiplayer: false },
    { id: 'action-adventure-ghost-of-tsushima', name: 'Ghost of Tsushima', image: '../images/GhostOfTsushima.jpg', genre: 'Action-Adventure', platform: ['PS5', 'PC'], rating: 4.9, price: 59.99, releaseDate: '2020-07-17', year: 2020, difficulty: 'Medium', playtimeLabel: '40 hrs', playtimeHours: 40, mode: 'Singleplayer', multiplayer: false },
    { id: 'action-adventure-days-gone', name: 'Days Gone', image: '../images/DaysGone.jpg', genre: 'Action-Adventure', platform: ['PC', 'PS5'], rating: 4.2, price: 19.99, releaseDate: '2019-04-26', year: 2019, difficulty: 'Medium', playtimeLabel: '30 hrs', playtimeHours: 30, mode: 'Singleplayer', multiplayer: false },
    { id: 'action-adventure-batman-arkham-city', name: 'Batman: Arkham City', image: '../images/BatmanArkhamCity.jpg', genre: 'Action-Adventure', platform: ['PC', 'PS5', 'Xbox'], rating: 4.7, price: 19.99, releaseDate: '2011-10-18', year: 2011, difficulty: 'Medium', playtimeLabel: '20 hrs', playtimeHours: 20, mode: 'Singleplayer', multiplayer: false },
    { id: 'action-adventure-uncharted-3', name: 'Uncharted 3: Drake\'s Deception', image: '../images/Uncharted3.jpg', genre: 'Action-Adventure', platform: ['PS5', 'PC'], rating: 4.5, price: 19.99, releaseDate: '2011-11-01', year: 2011, difficulty: 'Medium', playtimeLabel: '12 hrs', playtimeHours: 12, mode: 'Singleplayer', multiplayer: false },
    { id: 'rpg-final-fantasy-7-remake', name: 'Final Fantasy VII Remake', image: '../images/ff7r.jpg', genre: 'RPG', platform: ['PC', 'PS5'], rating: 4.8, price: 59.99, releaseDate: '2020-04-10', year: 2020, difficulty: 'Medium', playtimeLabel: '35 hrs', playtimeHours: 35, mode: 'Singleplayer', multiplayer: false },
    { id: 'rpg-persona-5-royal', name: 'Persona 5 Royal', image: '../images/Persona5Royal.jpg', genre: 'RPG', platform: ['PC', 'PS5', 'Xbox'], rating: 4.9, price: 49.99, releaseDate: '2020-03-31', year: 2020, difficulty: 'Medium', playtimeLabel: '100 hrs', playtimeHours: 100, mode: 'Singleplayer', multiplayer: false },
    { id: 'rpg-fire-emblem-three-houses', name: 'Fire Emblem: Three Houses', image: '../images/FireEmblem3Houses.jpg', genre: 'RPG', platform: ['PC'], rating: 4.6, price: 59.99, releaseDate: '2019-07-26', year: 2019, difficulty: 'Medium', playtimeLabel: '60 hrs', playtimeHours: 60, mode: 'Singleplayer', multiplayer: false },
    { id: 'rpg-pokemon-white-2', name: 'Pokemon White 2', image: '../images/PokemonWhite2.jpg', genre: 'RPG', platform: ['PC'], rating: 4.5, price: 34.99, releaseDate: '2012-10-07', year: 2012, difficulty: 'Easy', playtimeLabel: '35 hrs', playtimeHours: 35, mode: 'Singleplayer', multiplayer: false },
    { id: 'rpg-fallout-4', name: 'Fallout 4', image: '../images/Fallout4.jpg', genre: 'RPG', platform: ['PC', 'PS5', 'Xbox'], rating: 4.3, price: 19.99, releaseDate: '2015-11-10', year: 2015, difficulty: 'Medium', playtimeLabel: '80 hrs', playtimeHours: 80, mode: 'Singleplayer', multiplayer: false },
    { id: 'rpg-undertale', name: 'Undertale', image: '../images/Undertale.jpg', genre: 'RPG', platform: ['PC'], rating: 4.8, price: 9.99, releaseDate: '2015-09-15', year: 2015, difficulty: 'Medium', playtimeLabel: '8 hrs', playtimeHours: 8, mode: 'Singleplayer', multiplayer: false },
    { id: 'strategy-civilization-6', name: 'Sid Meier\'s Civilization VI', image: '../images/SidMeier.jpg', genre: 'Strategy', platform: ['PC'], rating: 4.6, price: 59.99, releaseDate: '2016-10-21', year: 2016, difficulty: 'Hard', playtimeLabel: '60 hrs', playtimeHours: 60, mode: 'Singleplayer & Multiplayer', multiplayer: true },
    { id: 'strategy-age-of-empires-4', name: 'Age of Empires IV', image: '../images/AgeOfEmpires.jpg', genre: 'Strategy', platform: ['PC'], rating: 4.4, price: 39.99, releaseDate: '2021-10-28', year: 2021, difficulty: 'Hard', playtimeLabel: '25 hrs', playtimeHours: 25, mode: 'Singleplayer & Multiplayer', multiplayer: true },
    { id: 'strategy-xcom-2', name: 'XCOM 2', image: '../images/XCom2.jpg', genre: 'Strategy', platform: ['PC', 'PS5', 'Xbox'], rating: 4.5, price: 29.99, releaseDate: '2016-02-05', year: 2016, difficulty: 'Hard', playtimeLabel: '45 hrs', playtimeHours: 45, mode: 'Singleplayer', multiplayer: false },
    { id: 'strategy-starcraft-2', name: 'StarCraft II', image: '../images/StarCraft2.jpg', genre: 'Strategy', platform: ['PC'], rating: 4.7, price: 0, releaseDate: '2010-07-27', year: 2010, difficulty: 'Hard', playtimeLabel: '200+ hrs', playtimeHours: 200, mode: 'Singleplayer & Multiplayer', multiplayer: true },
    { id: 'strategy-total-war-warhammer-3', name: 'Total War: Warhammer III', image: '../images/TotalWar.jpg', genre: 'Strategy', platform: ['PC'], rating: 4.3, price: 59.99, releaseDate: '2022-02-17', year: 2022, difficulty: 'Hard', playtimeLabel: '80 hrs', playtimeHours: 80, mode: 'Singleplayer & Multiplayer', multiplayer: true },
    { id: 'strategy-project-zomboid', name: 'Project Zomboid', image: '../images/ProjectZomboid.jpg', genre: 'Strategy', platform: ['PC'], rating: 4.6, price: 19.99, releaseDate: '2013-11-08', year: 2013, difficulty: 'Hard', playtimeLabel: '100+ hrs', playtimeHours: 100, mode: 'Singleplayer & Multiplayer', multiplayer: true },
];
// ReadyPlayer3 - compare.html interactions
//
// Self-contained controller for the Game Comparison page: game selection,
// a persistent comparison tray, a dynamic side-by-side table (+ a visual
// progress-bar view), best-value highlighting, an overall winner score,
// swap/add/remove, saved comparisons, and Game Library hand-off.
//
// STATE MODEL: comparisonState.selectedGames is the single source of
// truth (an ordered array of gameIds - order is display/column order).
// The table, the tray, and the "available games" grid are all just
// different renderings of that one array plus GAMES, never stored
// separately - so add/remove/swap only ever have to touch one array.

document.addEventListener('DOMContentLoaded', () => {
    ComparePage.init();
});

const ComparePage = (() => {
    const SAVED_KEY = 'rp3-comparisons-saved';
    const LIBRARY_INBOX_KEY = 'rp3-comparison-list'; // written by Game Library's "Add to Comparison"

    let comparisonState = {
        selectedGames: [],
        maxGames: 4,
        filters: { genre: 'all', platform: 'all', price: 'all', rating: 'all', type: 'all', year: 'all' },
        sort: 'name'
    };
    let searchTerm = '';
    let savedComparisons = [];
    let swapFirstPick = null; // gameId picked first in the Swap flow
    let activeGameId = null; // game currently shown in the details modal

    const els = {};
    let detailsModal = null;
    let saveModal = null;
    let resetModal = null;
    let swapModal = null;

    function init() {
        savedComparisons = loadFromStorage(SAVED_KEY, []);

        cacheElements();
        initModals();
        populateFilterOptions();
        bindEvents();
        importFromLibraryInbox();
        renderSelectionGrid();
        renderTray();
        renderSavedComparisons();
    }

    function cacheElements() {
        els.searchInput = document.getElementById('compareSearchInput');
        els.genreFilter = document.getElementById('compareGenreFilter');
        els.platformFilter = document.getElementById('comparePlatformFilter');
        els.priceFilter = document.getElementById('comparePriceFilter');
        els.ratingFilter = document.getElementById('compareRatingFilter');
        els.typeFilter = document.getElementById('compareTypeFilter');
        els.yearFilter = document.getElementById('compareYearFilter');
        els.sortSelect = document.getElementById('compareSortSelect');

        els.selectionGrid = document.getElementById('gameSelectionGrid');

        els.compareTray = document.getElementById('compareTray');
        els.trayItems = document.getElementById('trayItems');
        els.trayCounter = document.getElementById('trayCounter');
        els.compareNowBtn = document.getElementById('compareNowBtn');

        els.resultSection = document.getElementById('comparisonResultSection');
        els.comparisonResult = document.getElementById('comparison-result');
        els.tableViewPane = document.getElementById('tableViewPane');
        els.barsViewPane = document.getElementById('barsViewPane');
        els.overallWinner = document.getElementById('overallWinner');
        els.bestForRow = document.getElementById('bestForRow');

        els.addAnotherBtn = document.getElementById('addAnotherBtn');
        els.swapGamesBtn = document.getElementById('swapGamesBtn');
        els.saveComparisonBtn = document.getElementById('saveComparisonBtn');
        els.resetComparisonBtn = document.getElementById('resetComparisonBtn');

        els.savedComparisonsList = document.getElementById('savedComparisonsList');

        els.detailsModalEl = document.getElementById('gameDetailsModal');
        els.detailsModalLabel = document.getElementById('gameDetailsModalLabel');
        els.detailsModalBody = document.getElementById('gameDetailsModalBody');

        els.saveModalEl = document.getElementById('saveComparisonModal');
        els.comparisonNameInput = document.getElementById('comparisonNameInput');
        els.confirmSaveBtn = document.getElementById('confirmSaveComparisonBtn');

        els.resetModalEl = document.getElementById('resetComparisonModal');
        els.confirmResetBtn = document.getElementById('confirmResetComparisonBtn');

        els.swapModalEl = document.getElementById('swapGamesModal');
        els.swapModalBody = document.getElementById('swapGamesModalBody');

        els.toastContainer = document.getElementById('toastContainer');
    }

    function initModals() {
        if (!window.bootstrap) return;
        detailsModal = bootstrap.Modal.getOrCreateInstance(els.detailsModalEl);
        saveModal = bootstrap.Modal.getOrCreateInstance(els.saveModalEl);
        resetModal = bootstrap.Modal.getOrCreateInstance(els.resetModalEl);
        swapModal = bootstrap.Modal.getOrCreateInstance(els.swapModalEl);
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el));
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

    function showToast(message, variant) {
        if (!els.toastContainer) return;
        const toastEl = document.createElement('div');
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
            const toast = new bootstrap.Toast(toastEl, { delay: 3200 });
            toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
            toast.show();
        } else {
            setTimeout(() => toastEl.remove(), 3200);
        }
    }

    function findGame(gameId) {
        return GAMES.find((g) => g.id === gameId) || null;
    }

    function getSelectedGames() {
        return comparisonState.selectedGames.map(findGame).filter(Boolean);
    }

    // Reads whatever the Game Library's "Add to Comparison" button has
    // queued up (if anything) and pulls it into this page's own state,
    // then clears the inbox so it isn't re-imported on every visit.
    function importFromLibraryInbox() {
        const inbox = loadFromStorage(LIBRARY_INBOX_KEY, []);
        if (!inbox.length) return;
        let importedCount = 0;
        inbox.forEach((gameId) => {
            if (comparisonState.selectedGames.length >= comparisonState.maxGames) return;
            if (comparisonState.selectedGames.indexOf(gameId) !== -1) return;
            if (!findGame(gameId)) return;
            comparisonState.selectedGames.push(gameId);
            importedCount += 1;
        });
        saveToStorage(LIBRARY_INBOX_KEY, []);
        if (importedCount > 0) {
            showToast(importedCount + ' game(s) brought in from your Game Library.', 'success');
        }
    }

    // ---------------------------------------------------------------
    // Game Selection grid (search + filter + sort, all composing)
    // ---------------------------------------------------------------

    function populateFilterOptions() {
        const genres = Array.from(new Set(GAMES.map((g) => g.genre))).sort();
        const platforms = Array.from(new Set(GAMES.flatMap((g) => g.platform))).sort();
        const years = Array.from(new Set(GAMES.map((g) => g.year))).sort((a, b) => b - a);
        appendOptions(els.genreFilter, genres);
        appendOptions(els.platformFilter, platforms);
        appendOptions(els.yearFilter, years);
    }

    function appendOptions(selectEl, values) {
        if (!selectEl) return;
        values.forEach((value) => {
            const option = document.createElement('option');
            option.value = String(value);
            option.textContent = String(value);
            selectEl.appendChild(option);
        });
    }

    function matchesFilters(game) {
        const f = comparisonState.filters;
        if (searchTerm && game.name.toLowerCase().indexOf(searchTerm) === -1) return false;
        if (f.genre !== 'all' && game.genre !== f.genre) return false;
        if (f.platform !== 'all' && game.platform.indexOf(f.platform) === -1) return false;
        if (f.price !== 'all') {
            if (f.price === 'free' && game.price !== 0) return false;
            if (f.price === 'paid' && game.price === 0) return false;
        }
        if (f.rating !== 'all' && game.rating < Number(f.rating)) return false;
        if (f.type !== 'all') {
            if (f.type === 'multiplayer' && !game.multiplayer) return false;
            if (f.type === 'singleplayer' && game.multiplayer) return false;
        }
        if (f.year !== 'all' && String(game.year) !== f.year) return false;
        return true;
    }

    function getSortComparator() {
        switch (comparisonState.sort) {
            case 'za': return (a, b) => b.name.localeCompare(a.name);
            case 'rating-high': return (a, b) => b.rating - a.rating;
            case 'rating-low': return (a, b) => a.rating - b.rating;
            case 'newest': return (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate);
            case 'oldest': return (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate);
            case 'price-low': return (a, b) => a.price - b.price;
            case 'price-high': return (a, b) => b.price - a.price;
            case 'name':
            default: return (a, b) => a.name.localeCompare(b.name);
        }
    }

    function renderSelectionGrid() {
        if (!els.selectionGrid) return;
        const visible = GAMES.filter(matchesFilters).sort(getSortComparator());

        if (visible.length === 0) {
            els.selectionGrid.innerHTML = '<p class="text-muted small mb-0">No games match your search/filters.</p>';
            return;
        }

        els.selectionGrid.innerHTML = visible.map(buildSelectionCard).join('');
        els.selectionGrid.querySelectorAll('.selection-add-btn').forEach((btn) => {
            btn.addEventListener('click', () => addGameToComparison(btn.getAttribute('data-game-id')));
        });
        els.selectionGrid.querySelectorAll('.selection-card-img, .selection-card-name').forEach((el) => {
            el.addEventListener('click', () => openDetailsModal(el.getAttribute('data-game-id')));
        });
    }

    function buildSelectionCard(game) {
        const isSelected = comparisonState.selectedGames.indexOf(game.id) !== -1;
        return (
            '<div class="col">' +
            '<div class="card selection-card h-100' + (isSelected ? ' selection-card-selected' : '') + '">' +
            '<img src="' + game.image + '" class="selection-card-img" data-game-id="' + game.id + '" alt="Cover art for ' + escapeHtml(game.name) + '" />' +
            '<div class="card-body d-flex flex-column">' +
            '<p class="small fw-semibold mb-1 selection-card-name" data-game-id="' + game.id + '">' + escapeHtml(game.name) + '</p>' +
            '<p class="small text-muted mb-2">' + escapeHtml(game.genre) + ' \u00b7 ' + (game.price === 0 ? 'Free' : '$' + game.price.toFixed(2)) + '</p>' +
            '<button type="button" class="btn btn-sm mt-auto selection-add-btn ' + (isSelected ? 'btn-success' : 'btn-outline-primary') + '" data-game-id="' + game.id + '"' + (isSelected ? ' disabled' : '') + '>' +
            (isSelected ? '\u2713 Selected' : '+ Add') +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    // ---------------------------------------------------------------
    // Comparison Tray (persistent while selecting)
    // ---------------------------------------------------------------

    function addGameToComparison(gameId) {
        if (comparisonState.selectedGames.indexOf(gameId) !== -1) {
            showToast('That game is already selected.', 'warning');
            return;
        }
        if (comparisonState.selectedGames.length >= comparisonState.maxGames) {
            showToast('You can compare up to ' + comparisonState.maxGames + ' games at a time.', 'warning');
            return;
        }
        comparisonState.selectedGames.push(gameId);
        afterSelectionChange();
    }

    function removeGameFromComparison(gameId) {
        const index = comparisonState.selectedGames.indexOf(gameId);
        if (index === -1) return;
        comparisonState.selectedGames.splice(index, 1);
        afterSelectionChange();
    }

    // One place that re-runs after any change to selectedGames: keeps the
    // tray, the "available games" grid (Selected badges), and - if a
    // comparison is already showing - the live table/bars in sync.
    function afterSelectionChange() {
        renderTray();
        renderSelectionGrid();
        if (!els.resultSection.classList.contains('d-none')) {
            renderComparisonResult();
        }
    }

    function renderTray() {
        if (!els.compareTray) return;
        const games = getSelectedGames();

        if (els.trayCounter) {
            els.trayCounter.textContent = 'Selected: ' + games.length + ' / ' + comparisonState.maxGames;
        }

        if (els.trayItems) {
            if (games.length === 0) {
                els.trayItems.innerHTML = '<p class="text-muted small mb-0">Add games below to start comparing.</p>';
            } else {
                els.trayItems.innerHTML = games.map((game) =>
                    '<div class="compare-tray-item position-relative" data-id="' + game.id + '">' +
                    '<button type="button" class="remove-btn position-absolute rounded-circle d-flex align-items-center justify-content-center" aria-label="Remove ' + escapeHtml(game.name) + '">&times;</button>' +
                    '<img src="' + game.image + '" alt="" />' +
                    '<span class="item-name">' + escapeHtml(game.name) + '</span>' +
                    '</div>'
                ).join('');
                els.trayItems.querySelectorAll('.remove-btn').forEach((btn) => {
                    btn.addEventListener('click', () => {
                        const wrapper = btn.closest('.compare-tray-item');
                        if (wrapper) removeGameFromComparison(wrapper.getAttribute('data-id'));
                    });
                });
            }
        }

        if (els.compareNowBtn) els.compareNowBtn.disabled = games.length < 2;
        if (els.addAnotherBtn) els.addAnotherBtn.disabled = games.length >= comparisonState.maxGames;
        if (els.swapGamesBtn) els.swapGamesBtn.disabled = games.length < 2;
    }

    // ---------------------------------------------------------------
    // Swap Games
    // ---------------------------------------------------------------

    function openSwapModal() {
        const games = getSelectedGames();
        if (games.length < 2 || !els.swapModalBody) return;
        swapFirstPick = null;

        els.swapModalBody.innerHTML =
            '<p class="small text-muted mb-3">Pick two games to swap their positions in the comparison.</p>' +
            '<div class="d-flex flex-wrap gap-2" id="swapPickRow">' +
            games.map((game) =>
                '<button type="button" class="btn btn-outline-light swap-pick-btn" data-game-id="' + game.id + '">' + escapeHtml(game.name) + '</button>'
            ).join('') +
            '</div>';

        els.swapModalBody.querySelectorAll('.swap-pick-btn').forEach((btn) => {
            btn.addEventListener('click', () => handleSwapPick(btn));
        });

        if (swapModal) swapModal.show();
    }

    function handleSwapPick(btn) {
        const gameId = btn.getAttribute('data-game-id');
        if (!swapFirstPick) {
            swapFirstPick = gameId;
            btn.classList.add('active');
            return;
        }
        if (swapFirstPick === gameId) return; // same button clicked twice, ignore

        const indexA = comparisonState.selectedGames.indexOf(swapFirstPick);
        const indexB = comparisonState.selectedGames.indexOf(gameId);
        if (indexA !== -1 && indexB !== -1) {
            const tmp = comparisonState.selectedGames[indexA];
            comparisonState.selectedGames[indexA] = comparisonState.selectedGames[indexB];
            comparisonState.selectedGames[indexB] = tmp;
        }

        swapFirstPick = null;
        if (swapModal) swapModal.hide();
        afterSelectionChange();
        showToast('Games swapped.', 'success');
    }

    // ---------------------------------------------------------------
    // Comparison Result (Table View + Visual Bars tabs)
    // ---------------------------------------------------------------

    function runComparison() {
        if (comparisonState.selectedGames.length < 2) {
            showToast('Select at least 2 games to compare.', 'warning');
            return;
        }
        els.resultSection.classList.remove('d-none');
        renderComparisonResult();
        els.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function renderComparisonResult() {
        const games = getSelectedGames();
        if (games.length < 2) {
            els.resultSection.classList.add('d-none');
            return;
        }
        renderTableView(games);
        renderBarsView(games);
        renderOverallWinner(games);
        renderBestFor(games);
    }

    // Finds the "best" game(s) for a metric so cells/bars can be
    // highlighted - higherIsBetter=false is used for price (lowest wins).
    function findBestValue(games, getValue, higherIsBetter) {
        const values = games.map(getValue);
        return higherIsBetter ? Math.max.apply(null, values) : Math.min.apply(null, values);
    }

    function renderTableView(games) {
        if (!els.tableViewPane) return;

        const bestRating = findBestValue(games, (g) => g.rating, true);
        const bestPrice = findBestValue(games, (g) => g.price, false);
        const bestPlaytime = findBestValue(games, (g) => g.playtimeHours, true);
        const bestPlatformCount = findBestValue(games, (g) => g.platform.length, true);

        const headerCells = games.map((g) =>
            '<th class="text-center compare-item-header">' +
            '<img src="' + g.image + '" alt="' + escapeHtml(g.name) + '" class="w-100 comparison-clickable" data-game-id="' + g.id + '" />' +
            '<div class="small fw-semibold mt-2 comparison-clickable" data-game-id="' + g.id + '">' + escapeHtml(g.name) + '</div>' +
            '</th>'
        ).join('');

        function row(label, cellFn, tooltip) {
            const cells = games.map(cellFn).join('');
            const labelHtml = tooltip
                ? '<th scope="row" data-bs-toggle="tooltip" title="' + escapeHtml(tooltip) + '">' + label + '</th>'
                : '<th scope="row">' + label + '</th>';
            return '<tr>' + labelHtml + cells + '</tr>';
        }

        const rowsHtml =
            row('Genre', (g) => '<td>' + escapeHtml(g.genre) + '</td>') +
            row('Rating', (g) => '<td' + (g.rating === bestRating ? ' class="highlight-best"' : '') + '>\u2b50 ' + g.rating.toFixed(1) + (g.rating === bestRating ? ' \ud83c\udfc6' : '') + '</td>', 'Highest user rating wins') +
            row('Price', (g) => '<td' + (g.price === bestPrice ? ' class="highlight-best"' : '') + '>' + (g.price === 0 ? 'Free' : '$' + g.price.toFixed(2)) + (g.price === bestPrice ? ' \ud83c\udfc6' : '') + '</td>', 'Lowest price wins') +
            row('Platforms', (g) => '<td' + (g.platform.length === bestPlatformCount ? ' class="highlight-best"' : '') + '>' + escapeHtml(g.platform.join(', ')) + '</td>', 'Most platform availability wins') +
            row('Multiplayer', (g) => '<td>' + (g.multiplayer ? 'Yes' : 'No') + '</td>') +
            row('Difficulty', (g) => '<td>' + escapeHtml(g.difficulty) + '</td>') +
            row('Est. Playtime', (g) => '<td' + (g.playtimeHours === bestPlaytime ? ' class="highlight-best"' : '') + '>' + escapeHtml(g.playtimeLabel) + (g.playtimeHours === bestPlaytime ? ' \ud83c\udfc6' : '') + '</td>', 'Longest estimated playtime wins') +
            row('Release Date', (g) => '<td>' + escapeHtml(g.releaseDate) + '</td>');

        els.tableViewPane.innerHTML =
            '<div class="table-responsive">' +
            '<table class="table table-bordered compare-table align-middle">' +
            '<thead><tr><th></th>' + headerCells + '</tr></thead>' +
            '<tbody>' + rowsHtml + '</tbody>' +
            '</table>' +
            '</div>' +
            '<p class="small text-muted mb-0"><span class="highlight-best-swatch d-inline-block align-middle"></span> = best value in that category. Hover a row label for details.</p>';

        els.tableViewPane.querySelectorAll('.comparison-clickable').forEach((el) => {
            el.addEventListener('click', () => openDetailsModal(el.getAttribute('data-game-id')));
        });
        if (window.bootstrap) {
            els.tableViewPane.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el));
        }
    }

    function renderBarsView(games) {
        if (!els.barsViewPane) return;

        const metrics = [
            { key: 'rating', label: 'Rating', max: 5, getValue: (g) => g.rating, format: (v) => v.toFixed(1) + ' / 5' },
            { key: 'price', label: 'Price (lower is better)', max: Math.max.apply(null, games.map((g) => g.price)) || 1, getValue: (g) => g.price, format: (v) => (v === 0 ? 'Free' : '$' + v.toFixed(2)), lowerIsBetter: true },
            { key: 'playtime', label: 'Est. Playtime', max: Math.max.apply(null, games.map((g) => g.playtimeHours)) || 1, getValue: (g) => g.playtimeHours, format: (v) => v + ' hrs' }
        ];

        els.barsViewPane.innerHTML = metrics.map((metric) => {
            const bestValue = findBestValue(games, metric.getValue, !metric.lowerIsBetter);
            const rows = games.map((g) => {
                const value = metric.getValue(g);
                const percent = metric.max > 0 ? Math.max(4, Math.round((value / metric.max) * 100)) : 0;
                const isBest = value === bestValue;
                return '<div class="mb-2">' +
                    '<div class="d-flex justify-content-between small mb-1">' +
                    '<span>' + escapeHtml(g.name) + (isBest ? ' \ud83c\udfc6' : '') + '</span>' +
                    '<span>' + metric.format(value) + '</span>' +
                    '</div>' +
                    '<div class="progress" style="height: 8px;"><div class="progress-bar ' + (isBest ? 'bg-success' : 'bg-primary') + '" role="progressbar" style="width: ' + percent + '%;"></div></div>' +
                    '</div>';
            }).join('');
            return '<div class="mb-4"><h3 class="h6 text-uppercase text-muted mb-2">' + escapeHtml(metric.label) + '</h3>' + rows + '</div>';
        }).join('');
    }

    /**
     * Transparent point-scoring for the Overall Winner: each game earns a
     * point for winning each individual category, rather than just being
     * whoever has the single highest rating. Ties are allowed - a
     * category can award points to more than one game.
     */
    function calculateOverallWinner(games) {
        const scores = {};
        const wins = {};
        games.forEach((g) => { scores[g.id] = 0; wins[g.id] = []; });

        function awardCategory(label, getValue, higherIsBetter) {
            const best = findBestValue(games, getValue, higherIsBetter);
            games.forEach((g) => {
                if (getValue(g) === best) {
                    scores[g.id] += 1;
                    wins[g.id].push(label);
                }
            });
        }

        awardCategory('Best Rating', (g) => g.rating, true);
        awardCategory('Best Price', (g) => g.price, false);
        awardCategory('Longest Playtime', (g) => g.playtimeHours, true);
        awardCategory('Most Platforms', (g) => g.platform.length, true);
        games.forEach((g) => { if (g.multiplayer) { scores[g.id] += 1; wins[g.id].push('Multiplayer Support'); } });

        const winnerId = games.reduce((bestId, g) => (scores[g.id] > scores[bestId] ? g.id : bestId), games[0].id);
        return { winner: findGame(winnerId), reasons: wins[winnerId], score: scores[winnerId] };
    }

    function renderOverallWinner(games) {
        if (!els.overallWinner) return;
        const result = calculateOverallWinner(games);
        els.overallWinner.innerHTML =
            '<p class="text-uppercase small text-muted mb-1">\ud83c\udfc6 Overall Winner</p>' +
            '<h3 class="h5 mb-2">' + escapeHtml(result.winner.name) + '</h3>' +
            '<ul class="small mb-0 ps-3">' +
            (result.reasons.length
                ? result.reasons.map((r) => '<li>' + escapeHtml(r) + '</li>').join('')
                : '<li>Closest overall match across the compared categories.</li>') +
            '</ul>';
    }

    function renderBestFor(games) {
        if (!els.bestForRow) return;
        const bestOverall = calculateOverallWinner(games).winner;
        const bestValue = games.reduce((a, b) => ((a.rating / Math.max(1, a.price || 1)) >= (b.rating / Math.max(1, b.price || 1)) ? a : b));
        const multiplayerGames = games.filter((g) => g.multiplayer);
        const bestMultiplayer = multiplayerGames.length ? multiplayerGames.reduce((a, b) => (a.rating >= b.rating ? a : b)) : null;
        const longest = games.reduce((a, b) => (a.playtimeHours >= b.playtimeHours ? a : b));

        const cards = [
            { icon: '\ud83c\udfc6', label: 'Best Overall', name: bestOverall.name },
            { icon: '\ud83d\udcb0', label: 'Best Value', name: bestValue.price === 0 ? bestValue.name + ' (Free)' : bestValue.name },
            { icon: '\ud83c\udfae', label: 'Best Multiplayer', name: bestMultiplayer ? bestMultiplayer.name : 'None selected support multiplayer' },
            { icon: '\u23f1\ufe0f', label: 'Longest Experience', name: longest.name }
        ];

        els.bestForRow.innerHTML = cards.map((card) =>
            '<div class="col-6 col-md-3">' +
            '<div class="card dashboard-card text-center h-100">' +
            '<span class="fs-4">' + card.icon + '</span>' +
            '<p class="small text-muted mb-1 mt-1">' + card.label + '</p>' +
            '<p class="small fw-semibold mb-0">' + escapeHtml(card.name) + '</p>' +
            '</div>' +
            '</div>'
        ).join('');
    }

    // ---------------------------------------------------------------
    // Game Details Modal (single, reused, repopulated per game)
    // ---------------------------------------------------------------

    function openDetailsModal(gameId) {
        const game = findGame(gameId);
        if (!game || !els.detailsModalBody) return;
        activeGameId = gameId;

        if (els.detailsModalLabel) els.detailsModalLabel.textContent = game.name;

        const platformBadges = game.platform.map((p) => '<span class="badge bg-secondary me-1">' + escapeHtml(p) + '</span>').join('');
        const isSelected = comparisonState.selectedGames.indexOf(game.id) !== -1;

        els.detailsModalBody.innerHTML =
            '<div class="row g-3">' +
            '<div class="col-md-5">' +
            '<img src="' + game.image + '" class="img-fluid rounded" alt="Cover art for ' + escapeHtml(game.name) + '" />' +
            '</div>' +
            '<div class="col-md-7">' +
            '<p class="mb-2">' + platformBadges + '<span class="badge bg-primary">' + escapeHtml(game.genre) + '</span></p>' +
            '<ul class="list-unstyled small mb-3">' +
            '<li><strong>Rating:</strong> \u2b50 ' + game.rating.toFixed(1) + ' / 5</li>' +
            '<li><strong>Price:</strong> ' + (game.price === 0 ? 'Free' : '$' + game.price.toFixed(2)) + '</li>' +
            '<li><strong>Released:</strong> ' + escapeHtml(game.releaseDate) + '</li>' +
            '<li><strong>Difficulty:</strong> ' + escapeHtml(game.difficulty) + '</li>' +
            '<li><strong>Playtime:</strong> ' + escapeHtml(game.playtimeLabel) + '</li>' +
            '<li><strong>Mode:</strong> ' + escapeHtml(game.mode) + '</li>' +
            '</ul>' +
            '<button type="button" class="btn btn-sm ' + (isSelected ? 'btn-success' : 'btn-outline-primary') + '" id="modalAddToCompareBtn"' + (isSelected ? ' disabled' : '') + '>' +
            (isSelected ? '\u2713 In Comparison' : '+ Add to Comparison') +
            '</button>' +
            '</div>' +
            '</div>';

        const addBtn = document.getElementById('modalAddToCompareBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                addGameToComparison(game.id);
                if (detailsModal) detailsModal.hide();
            });
        }

        if (detailsModal) detailsModal.show();
    }

    // ---------------------------------------------------------------
    // Reset Comparison (clears the working comparison, not saved ones)
    // ---------------------------------------------------------------

    function confirmResetComparison() {
        comparisonState.selectedGames = [];
        comparisonState.filters = { genre: 'all', platform: 'all', price: 'all', rating: 'all', type: 'all', year: 'all' };
        comparisonState.sort = 'name';
        searchTerm = '';

        if (els.searchInput) els.searchInput.value = '';
        [els.genreFilter, els.platformFilter, els.priceFilter, els.ratingFilter, els.typeFilter, els.yearFilter].forEach((el) => { if (el) el.value = 'all'; });
        if (els.sortSelect) els.sortSelect.value = 'name';

        els.resultSection.classList.add('d-none');
        renderSelectionGrid();
        renderTray();
        if (resetModal) resetModal.hide();
        showToast('Comparison reset.', 'secondary');
    }

    // ---------------------------------------------------------------
    // Save / Load Comparisons
    // ---------------------------------------------------------------

    function openSaveModal() {
        if (comparisonState.selectedGames.length < 2) {
            showToast('Compare at least 2 games before saving.', 'warning');
            return;
        }
        if (els.comparisonNameInput) els.comparisonNameInput.value = '';
        if (saveModal) saveModal.show();
    }

    function confirmSaveComparison() {
        const name = (els.comparisonNameInput && els.comparisonNameInput.value.trim()) || '';
        if (!name) {
            showToast('Give your comparison a name first.', 'warning');
            return;
        }
        savedComparisons.push({
            id: 'comparison-' + Date.now(),
            name,
            gameIds: comparisonState.selectedGames.slice(),
            createdAt: new Date().toISOString()
        });
        saveToStorage(SAVED_KEY, savedComparisons);
        renderSavedComparisons();
        if (saveModal) saveModal.hide();
        showToast('Saved "' + name + '".', 'success');
    }

    function loadSavedComparison(id) {
        const saved = savedComparisons.find((c) => c.id === id);
        if (!saved) return;
        comparisonState.selectedGames = saved.gameIds.filter((gameId) => findGame(gameId));
        renderSelectionGrid();
        renderTray();
        runComparison();
        showToast('Loaded "' + saved.name + '".', 'success');
    }

    function deleteSavedComparison(id) {
        savedComparisons = savedComparisons.filter((c) => c.id !== id);
        saveToStorage(SAVED_KEY, savedComparisons);
        renderSavedComparisons();
    }

    function renderSavedComparisons() {
        if (!els.savedComparisonsList) return;
        if (savedComparisons.length === 0) {
            els.savedComparisonsList.innerHTML = '<p class="text-muted small mb-0">No saved comparisons yet.</p>';
            return;
        }
        els.savedComparisonsList.innerHTML = savedComparisons.map((comparison) => {
            const names = comparison.gameIds.map((id) => { const g = findGame(id); return g ? g.name : null; }).filter(Boolean);
            return '<div class="saved-setup-row d-flex justify-content-between align-items-center">' +
                '<div>' +
                '<p class="mb-0 fw-semibold small"><i class="bi bi-controller me-1" aria-hidden="true"></i>' + escapeHtml(comparison.name) + '</p>' +
                '<p class="mb-0 text-muted small">' + escapeHtml(names.join(' vs ')) + '</p>' +
                '</div>' +
                '<div class="d-flex gap-2">' +
                '<button type="button" class="btn btn-sm btn-outline-primary saved-comparison-load-btn" data-id="' + comparison.id + '">Load</button>' +
                '<button type="button" class="btn btn-sm btn-outline-danger saved-comparison-delete-btn" data-id="' + comparison.id + '"><i class="bi bi-trash" aria-hidden="true"></i></button>' +
                '</div>' +
                '</div>';
        }).join('');

        els.savedComparisonsList.querySelectorAll('.saved-comparison-load-btn').forEach((btn) => {
            btn.addEventListener('click', () => loadSavedComparison(btn.getAttribute('data-id')));
        });
        els.savedComparisonsList.querySelectorAll('.saved-comparison-delete-btn').forEach((btn) => {
            btn.addEventListener('click', () => deleteSavedComparison(btn.getAttribute('data-id')));
        });
    }

    // ---------------------------------------------------------------
    // Event bindings
    // ---------------------------------------------------------------

    function bindEvents() {
        if (els.searchInput) {
            els.searchInput.addEventListener('input', function () {
                searchTerm = this.value.trim().toLowerCase();
                renderSelectionGrid();
            });
        }
        if (els.genreFilter) els.genreFilter.addEventListener('change', function () { comparisonState.filters.genre = this.value; renderSelectionGrid(); });
        if (els.platformFilter) els.platformFilter.addEventListener('change', function () { comparisonState.filters.platform = this.value; renderSelectionGrid(); });
        if (els.priceFilter) els.priceFilter.addEventListener('change', function () { comparisonState.filters.price = this.value; renderSelectionGrid(); });
        if (els.ratingFilter) els.ratingFilter.addEventListener('change', function () { comparisonState.filters.rating = this.value; renderSelectionGrid(); });
        if (els.typeFilter) els.typeFilter.addEventListener('change', function () { comparisonState.filters.type = this.value; renderSelectionGrid(); });
        if (els.yearFilter) els.yearFilter.addEventListener('change', function () { comparisonState.filters.year = this.value; renderSelectionGrid(); });
        if (els.sortSelect) els.sortSelect.addEventListener('change', function () { comparisonState.sort = this.value; renderSelectionGrid(); });

        if (els.compareNowBtn) els.compareNowBtn.addEventListener('click', runComparison);
        if (els.addAnotherBtn) {
            els.addAnotherBtn.addEventListener('click', () => {
                document.getElementById('gameSelectionHeading').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
        if (els.swapGamesBtn) els.swapGamesBtn.addEventListener('click', openSwapModal);
        if (els.saveComparisonBtn) els.saveComparisonBtn.addEventListener('click', openSaveModal);
        if (els.confirmSaveBtn) els.confirmSaveBtn.addEventListener('click', confirmSaveComparison);
        if (els.resetComparisonBtn) els.resetComparisonBtn.addEventListener('click', () => { if (resetModal) resetModal.show(); });
        if (els.confirmResetBtn) els.confirmResetBtn.addEventListener('click', confirmResetComparison);
    }

    return { init };
})();