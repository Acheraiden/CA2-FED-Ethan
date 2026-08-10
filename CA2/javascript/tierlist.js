// ReadyPlayer3 - tierlist.html data
//
// Game catalog for the Tier List Creator. Titles reused from the site's
// main Games catalog for consistency. Kept separate from the controller
// logic in tierlist.js so the data is easy to read/extend on its own.

const GAMES = [
    { id: 1, name: 'Valorant', image: '../images/valo.jpg', genre: 'Shooter', platform: ['PC'], type: 'Multiplayer', releaseDate: '2020', rating: 4.6, description: 'A 5v5 tactical shooter where precise aim and team coordination decide every round.' },
    { id: 2, name: 'Counter-Strike 2', image: '../images/CS2.jpeg', genre: 'Shooter', platform: ['PC'], type: 'Multiplayer', releaseDate: '2023', rating: 4.5, description: 'The long-running competitive shooter, rebuilt with refreshed maps and physics.' },
    { id: 3, name: 'DOOM Eternal', image: '../images/DoomEternalCover.jpg', genre: 'Shooter', platform: ['PC', 'PlayStation', 'Xbox'], type: 'Single-player', releaseDate: '2020', rating: 4.7, description: 'A fast, brutal single-player campaign built entirely around momentum and combat flow.' },
    { id: 4, name: 'Left 4 Dead 2', image: '../images/Left4Dead2.jpg', genre: 'Shooter', platform: ['PC'], type: 'Co-op', releaseDate: '2009', rating: 4.6, description: 'Four survivors fight through zombie-infested campaigns that reward teamwork.' },
    { id: 5, name: 'Ghost of Tsushima', image: '../images/GhostOfTsushima.jpg', genre: 'Action-Adventure', platform: ['PlayStation', 'PC'], type: 'Single-player', releaseDate: '2020', rating: 4.9, description: 'An open-world samurai epic built around exploration and cinematic combat.' },
    { id: 6, name: 'Devil May Cry 5', image: '../images/dmc5.jpg', genre: 'Action', platform: ['PC', 'PlayStation', 'Xbox'], type: 'Single-player', releaseDate: '2019', rating: 4.8, description: 'Stylish, technical combat across three distinct playable characters.' },
    { id: 7, name: 'Batman: Arkham City', image: '../images/BatmanArkhamCity.jpg', genre: 'Action-Adventure', platform: ['PC', 'PlayStation', 'Xbox'], type: 'Single-player', releaseDate: '2011', rating: 4.7, description: 'Iconic Freeflow combat inside a dense, atmospheric open prison district.' },
    { id: 8, name: 'Final Fantasy VII Remake', image: '../images/ff7r.jpg', genre: 'RPG', platform: ['PC', 'PlayStation'], type: 'Single-player', releaseDate: '2020', rating: 4.8, description: 'A gorgeous remake with a real-time/ATB hybrid combat system and deep story.' },
    { id: 9, name: 'Persona 5 Royal', image: '../images/Persona5Royal.jpg', genre: 'RPG', platform: ['PC', 'PlayStation', 'Xbox'], type: 'Single-player', releaseDate: '2020', rating: 4.9, description: 'A stylish turn-based RPG with a huge, character-driven story.' },
    { id: 10, name: 'Undertale', image: '../images/Undertale.jpg', genre: 'RPG', platform: ['PC'], type: 'Single-player', releaseDate: '2015', rating: 4.8, description: 'A short, endlessly clever RPG where every choice to fight or spare matters.' },
    { id: 11, name: 'Fallout 4', image: '../images/Fallout4.jpg', genre: 'RPG', platform: ['PC', 'PlayStation', 'Xbox'], type: 'Single-player', releaseDate: '2015', rating: 4.3, description: 'A massive open world to explore, with deep settlement building on top.' },
    { id: 12, name: "Sid Meier's Civilization VI", image: '../images/SidMeier.jpg', genre: 'Strategy', platform: ['PC'], type: 'Both', releaseDate: '2016', rating: 4.6, description: 'Build an empire from the Stone Age to the Information Age.' },
    { id: 13, name: 'XCOM 2', image: '../images/XCom2.jpg', genre: 'Strategy', platform: ['PC', 'PlayStation', 'Xbox'], type: 'Single-player', releaseDate: '2016', rating: 4.5, description: 'Punishing, tactical turn-based combat against an alien occupation.' },
    { id: 14, name: 'StarCraft II', image: '../images/StarCraft2.jpg', genre: 'Strategy', platform: ['PC'], type: 'Multiplayer', releaseDate: '2010', rating: 4.7, description: 'A genre-defining RTS with tight mechanics and a legendary esports scene.' },
    { id: 15, name: 'Project Zomboid', image: '../images/ProjectZomboid.jpg', genre: 'Survival', platform: ['PC'], type: 'Both', releaseDate: '2013', rating: 4.6, description: 'Deep survival and base-building against a relentless zombie apocalypse.' },
    { id: 16, name: 'Fire Emblem: Three Houses', image: '../images/FireEmblem3Houses.jpg', genre: 'Strategy', platform: ['PC'], type: 'Single-player', releaseDate: '2019', rating: 4.6, description: 'Tactical, turn-based battles woven into a deep academy-life sim.' },
    { id: 17, name: 'Pokemon White 2', image: '../images/PokemonWhite2.jpg', genre: 'RPG', platform: ['PC'], type: 'Both', releaseDate: '2012', rating: 4.5, description: 'A classic monster-collecting RPG with an expanded post-game region.' },
    { id: 18, name: 'Total War: Warhammer III', image: '../images/TotalWar.jpg', genre: 'Strategy', platform: ['PC'], type: 'Both', releaseDate: '2022', rating: 4.4, description: 'Massive real-time battles layered on top of turn-based empire management.' },
    { id: 19, name: 'Age of Empires IV', image: '../images/AgeOfEmpires.jpg', genre: 'Strategy', platform: ['PC'], type: 'Multiplayer', releaseDate: '2021', rating: 4.4, description: 'A modern take on the classic real-time strategy formula.' },
    { id: 20, name: 'Viewfinder', image: '../images/viewfinder.jpg', genre: 'Puzzle', platform: ['PC', 'PlayStation'], type: 'Single-player', releaseDate: '2023', rating: 4.7, description: 'Challenge perception, redefine reality, and reshape the world with an instant camera.' }
];

// Default tiers every fresh/reset tier list starts with.
function createDefaultTiers() {
    return [
        { id: 'tier-s', name: 'S Tier', color: '#ff6b6b', games: [] },
        { id: 'tier-a', name: 'A Tier', color: '#ffa94d', games: [] },
        { id: 'tier-b', name: 'B Tier', color: '#ffd43b', games: [] },
        { id: 'tier-c', name: 'C Tier', color: '#69db7c', games: [] },
        { id: 'tier-d', name: 'D Tier', color: '#4dabf7', games: [] },
        { id: 'tier-f', name: 'F Tier', color: '#868e96', games: [] }
    ];
}

// ReadyPlayer3 - tierlist.html interactions
//
// Self-contained controller for the Tier List Creator: the game pool,
// drag-and-drop tier assignment, tier CRUD (add/remove/rename/recolor),
// search/filter, undo/redo, statistics, localStorage save/load, PNG
// export (html2canvas), and clipboard copy.
//
// STATE MODEL: a game's location (pool vs. a specific tier) is never
// stored twice. tierState.tiers[x].games holds ordered arrays of game
// IDs; the pool is DERIVED as "every game ID not currently in any tier."
// This makes the spec's "a game only exists in one place at a time"
// requirement structurally guaranteed rather than something we have to
// remember to enforce.

document.addEventListener('DOMContentLoaded', () => {
    TierListPage.init();
});

const TierListPage = (() => {
    const SAVED_KEY = 'rp3-tierlist-saved';
    const MAX_UNDO_STEPS = 30;

    let tierState = {
        listName: null,
        tiers: createDefaultTiers()
    };

    const filters = { search: '', genre: 'all', platform: 'all', type: 'all' }; // filters.genre is 'all' or an array of selected genres

    let undoStack = [];
    let redoStack = [];
    let draggedGameId = null;
    let savedLists = [];
    let activeGameId = null; // game currently shown in the info modal

    const els = {};
    let gameInfoModal = null;
    let resetConfirmModal = null;
    let saveListModal = null;

    function init() {
        savedLists = loadFromStorage(SAVED_KEY, []);
        cacheElements();
        initModals();
        populateFilterOptions();
        bindEvents();
        renderAll();
        renderSavedLists();
        updateUndoRedoButtons();
    }

    function cacheElements() {
        els.gamePool = document.getElementById('gamePool');
        els.tierList = document.getElementById('tier-list');
        els.searchInput = document.getElementById('gameSearchInput');
        els.genreFilterOptions = document.getElementById('genreFilterOptions');
        els.platformFilter = document.getElementById('platformFilter');
        els.typeFilter = document.getElementById('typeFilter');

        els.undoBtn = document.getElementById('undoBtn');
        els.redoBtn = document.getElementById('redoBtn');
        els.resetBtn = document.getElementById('resetBtn');
        els.addTierBtn = document.getElementById('addTierBtn');
        els.saveListBtn = document.getElementById('saveListBtn');
        els.saveImageBtn = document.getElementById('saveImageBtn');
        els.copyListBtn = document.getElementById('copyListBtn');

        els.statsGamesRanked = document.getElementById('statsGamesRanked');
        els.statsPerTier = document.getElementById('statsPerTier');
        els.statsAvgRating = document.getElementById('statsAvgRating');
        els.statsTopGame = document.getElementById('statsTopGame');
        els.statsLowGame = document.getElementById('statsLowGame');
        els.statsTopGenre = document.getElementById('statsTopGenre');

        els.savedListsContainer = document.getElementById('savedListsContainer');

        els.gameInfoModalEl = document.getElementById('gameInfoModal');
        els.gameInfoModalBody = document.getElementById('gameInfoModalBody');
        els.gameInfoModalLabel = document.getElementById('gameInfoModalLabel');

        els.resetConfirmModalEl = document.getElementById('resetConfirmModal');
        els.confirmResetBtn = document.getElementById('confirmResetBtn');

        els.saveListModalEl = document.getElementById('saveListModal');
        els.listNameInput = document.getElementById('listNameInput');
        els.confirmSaveListBtn = document.getElementById('confirmSaveListBtn');

        els.toastContainer = document.getElementById('toastContainer');
    }

    function initModals() {
        if (!window.bootstrap) return;
        gameInfoModal = bootstrap.Modal.getOrCreateInstance(els.gameInfoModalEl);
        resetConfirmModal = bootstrap.Modal.getOrCreateInstance(els.resetConfirmModalEl);
        saveListModal = bootstrap.Modal.getOrCreateInstance(els.saveListModalEl);
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

    function findGame(id) {
        return GAMES.find((g) => g.id === Number(id)) || null;
    }

    function findTier(tierId) {
        return tierState.tiers.find((t) => t.id === tierId) || null;
    }

    // A game's ID is "assigned" if any tier's games array contains it.
    // The pool is simply every game NOT in that set - see file header.
    function getAssignedGameIds() {
        const assigned = new Set();
        tierState.tiers.forEach((tier) => tier.games.forEach((id) => assigned.add(id)));
        return assigned;
    }

    function getPoolGames() {
        const assigned = getAssignedGameIds();
        return GAMES.filter((g) => !assigned.has(g.id));
    }

    // ---------------------------------------------------------------
    // Central render + change commit
    // ---------------------------------------------------------------

    function renderAll() {
        renderTierList();
        renderGamePool();
        renderStatistics();
    }

    // Every state-mutating action calls this right after updating
    // tierState: it snapshots for undo, then re-renders everything that
    // could have changed as a result.
    function commitChange() {
        pushUndoSnapshot();
        renderAll();
    }

    // ---------------------------------------------------------------
    // Search & Filter (pool only - tiered games are unaffected)
    // ---------------------------------------------------------------

    function populateFilterOptions() {
        const genres = Array.from(new Set(GAMES.map((g) => g.genre))).sort();
        const platforms = Array.from(new Set(GAMES.flatMap((g) => g.platform))).sort();
        const types = Array.from(new Set(GAMES.map((g) => g.type))).sort();

        renderGenreFilterButtons(genres);
        appendOptions(els.platformFilter, platforms);
        appendOptions(els.typeFilter, types);
    }

    function renderGenreFilterButtons(genres) {
        if (!els.genreFilterOptions) return;
        els.genreFilterOptions.innerHTML = genres.map((genre) =>
            '<button type="button" class="btn genre-toggle-btn" data-genre="' + escapeHtml(genre) + '">' + escapeHtml(genre) + '</button>'
        ).join('');

        els.genreFilterOptions.querySelectorAll('.genre-toggle-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const active = Array.from(els.genreFilterOptions.querySelectorAll('.genre-toggle-btn.active'))
                    .map((b) => b.getAttribute('data-genre'));
                filters.genre = active.length ? active : 'all';
                renderGamePool();
            });
        });
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

    function getFilteredPoolGames() {
        return getPoolGames().filter((game) => {
            if (filters.search && game.name.toLowerCase().indexOf(filters.search) === -1) return false;
            if (Array.isArray(filters.genre) && filters.genre.indexOf(game.genre) === -1) return false;
            if (filters.platform !== 'all' && game.platform.indexOf(filters.platform) === -1) return false;
            if (filters.type !== 'all' && game.type !== filters.type) return false;
            return true;
        });
    }

    // ---------------------------------------------------------------
    // Game Pool
    // ---------------------------------------------------------------

    function renderGamePool() {
        if (!els.gamePool) return;
        const games = getFilteredPoolGames();
        const totalUnassigned = getPoolGames().length;

        if (games.length === 0) {
            els.gamePool.innerHTML = totalUnassigned === 0
                ? '<p class="text-muted small mb-0">Every game has been placed into a tier.</p>'
                : '<p class="text-muted small mb-0">No games match your search/filters.</p>';
        } else {
            els.gamePool.innerHTML = games.map(buildGameCard).join('');
        }

        bindPoolDropZone();
        bindGameCardEvents(els.gamePool);
    }

    function buildGameCard(game) {
        return (
            '<div class="tier-game-card" draggable="true" data-game-id="' + game.id + '">' +
            '<img src="' + game.image + '" class="tier-game-card-img" alt="Cover art for ' + escapeHtml(game.name) + '" />' +
            '<p class="tier-game-card-name">' + escapeHtml(game.name) + '</p>' +
            '</div>'
        );
    }

    function bindGameCardEvents(container) {
        container.querySelectorAll('.tier-game-card').forEach((card) => {
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragend', handleDragEnd);
            card.addEventListener('click', () => openGameInfoModal(card.getAttribute('data-game-id')));
        });
    }

    // ---------------------------------------------------------------
    // Tier list rendering
    // ---------------------------------------------------------------

    function renderTierList() {
        if (!els.tierList) return;
        els.tierList.innerHTML = tierState.tiers.map(buildTierRow).join('');

        tierState.tiers.forEach((tier) => {
            bindGameCardEvents(document.getElementById('tier-games-' + tier.id));
            bindTierDropZone(tier.id);
        });

        els.tierList.querySelectorAll('.tier-rename-btn').forEach((btn) => {
            btn.addEventListener('click', () => startRenameTier(btn.getAttribute('data-tier-id')));
        });
        els.tierList.querySelectorAll('.tier-remove-btn').forEach((btn) => {
            btn.addEventListener('click', () => removeTier(btn.getAttribute('data-tier-id')));
        });
        els.tierList.querySelectorAll('.tier-color-input').forEach((input) => {
            input.addEventListener('input', () => recolorTier(input.getAttribute('data-tier-id'), input.value));
        });
    }

    function buildTierRow(tier) {
        const games = tier.games.map(findGame).filter(Boolean);
        const cards = games.map(buildGameCard).join('');

        return (
            '<div class="tier-row" data-tier-id="' + tier.id + '">' +
            '<div class="tier-label" style="background-color: ' + tier.color + ';">' +
            '<span class="tier-name" id="tier-name-' + tier.id + '">' + escapeHtml(tier.name) + '</span>' +
            '<div class="tier-label-controls">' +
            '<input type="color" class="tier-color-input" data-tier-id="' + tier.id + '" value="' + tier.color + '" title="Change tier color" aria-label="Change color for ' + escapeHtml(tier.name) + '" />' +
            '<button type="button" class="btn btn-sm tier-rename-btn" data-tier-id="' + tier.id + '" title="Rename tier" aria-label="Rename ' + escapeHtml(tier.name) + '"><i class="bi bi-pencil-fill" aria-hidden="true"></i></button>' +
            '<button type="button" class="btn btn-sm tier-remove-btn" data-tier-id="' + tier.id + '" title="Remove tier" aria-label="Remove ' + escapeHtml(tier.name) + '"><i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
            '</div>' +
            '</div>' +
            '<div class="tier-games" id="tier-games-' + tier.id + '" data-tier-id="' + tier.id + '">' + cards + '</div>' +
            '</div>'
        );
    }

    // ---------------------------------------------------------------
    // Drag and drop
    // ---------------------------------------------------------------

    function handleDragStart(event) {
        draggedGameId = Number(event.currentTarget.getAttribute('data-game-id'));
        event.dataTransfer.effectAllowed = 'move';
        event.currentTarget.classList.add('dragging');
    }

    function handleDragEnd(event) {
        event.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.drag-over').forEach((el) => el.classList.remove('drag-over'));
    }

    function bindTierDropZone(tierId) {
        const zone = document.getElementById('tier-games-' + tierId);
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

            // Dropping onto a specific game card reorders to that position;
            // dropping on empty tier space just appends to the end.
            const targetCard = event.target.closest('.tier-game-card');
            const insertBeforeId = targetCard ? Number(targetCard.getAttribute('data-game-id')) : null;
            moveGame(draggedGameId, tierId, insertBeforeId);
            draggedGameId = null;
        });
    }

    function bindPoolDropZone() {
        if (!els.gamePool) return;
        els.gamePool.addEventListener('dragover', (event) => {
            event.preventDefault();
            els.gamePool.classList.add('drag-over');
        });
        els.gamePool.addEventListener('dragleave', () => els.gamePool.classList.remove('drag-over'));
        els.gamePool.addEventListener('drop', (event) => {
            event.preventDefault();
            els.gamePool.classList.remove('drag-over');
            if (draggedGameId == null) return;
            moveGame(draggedGameId, null, null); // null tier = back to pool
            draggedGameId = null;
        });
    }

    /**
     * Moves a game to a target tier (or back to the pool if targetTierId
     * is null), inserting before insertBeforeGameId if given, otherwise
     * appending to the end. Removes the game from wherever it currently
     * is first, so this single function covers every case the spec
     * lists: pool->tier, tier->tier, reorder within a tier, tier->pool.
     */
    function moveGame(gameId, targetTierId, insertBeforeGameId) {
        // Remove from every tier first (a game can only be in one place).
        tierState.tiers.forEach((tier) => {
            const index = tier.games.indexOf(gameId);
            if (index !== -1) tier.games.splice(index, 1);
        });

        if (targetTierId) {
            const tier = findTier(targetTierId);
            if (!tier) return;
            if (insertBeforeGameId != null) {
                const insertIndex = tier.games.indexOf(insertBeforeGameId);
                tier.games.splice(insertIndex === -1 ? tier.games.length : insertIndex, 0, gameId);
            } else {
                tier.games.push(gameId);
            }
        }
        // targetTierId === null: game has been removed from all tiers,
        // which means it's back in the pool - nothing further to do.

        commitChange();
    }

    // ---------------------------------------------------------------
    // Tier CRUD
    // ---------------------------------------------------------------

    const NEW_TIER_COLORS = ['#a78bfa', '#38bdf8', '#f472b6', '#facc15', '#34d399'];
    let newTierColorIndex = 0;

    function addTier() {
        const color = NEW_TIER_COLORS[newTierColorIndex % NEW_TIER_COLORS.length];
        newTierColorIndex += 1;
        tierState.tiers.push({
            id: 'tier-' + Date.now(),
            name: 'New Tier',
            color,
            games: []
        });
        commitChange();
        showToast('Tier added.', 'success');
    }

    function removeTier(tierId) {
        // Games in a removed tier are never deleted - since the pool is
        // derived from "not in any tier", simply removing the tier from
        // tierState.tiers automatically returns its games to the pool.
        tierState.tiers = tierState.tiers.filter((t) => t.id !== tierId);
        commitChange();
        showToast('Tier removed. Its games are back in the pool.', 'secondary');
    }

    function startRenameTier(tierId) {
        const tier = findTier(tierId);
        const labelEl = document.getElementById('tier-name-' + tierId);
        if (!tier || !labelEl) return;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'tier-name-input form-control form-control-sm';
        input.value = tier.name;
        input.maxLength = 40;
        labelEl.replaceWith(input);
        input.focus();
        input.select();

        function commitRename() {
            const newName = input.value.trim() || tier.name;
            tier.name = newName;
            commitChange();
        }

        input.addEventListener('blur', commitRename);
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') input.blur();
            if (event.key === 'Escape') { input.value = tier.name; input.blur(); }
        });
    }

    function recolorTier(tierId, color) {
        const tier = findTier(tierId);
        if (!tier) return;
        tier.color = color;
        commitChange();
    }

    // ---------------------------------------------------------------
    // Reset
    // ---------------------------------------------------------------

    function confirmReset() {
        tierState = { listName: null, tiers: createDefaultTiers() };
        commitChange();
        if (resetConfirmModal) resetConfirmModal.hide();
        showToast('Tier list reset.', 'secondary');
    }

    // ---------------------------------------------------------------
    // Game info modal (single, reused, repopulated per game)
    // ---------------------------------------------------------------

    function openGameInfoModal(gameId) {
        const game = findGame(gameId);
        if (!game || !els.gameInfoModalBody) return;
        activeGameId = game.id;

        if (els.gameInfoModalLabel) els.gameInfoModalLabel.textContent = game.name;

        const isAssigned = getAssignedGameIds().has(game.id);
        const platformBadges = game.platform.map((p) => '<span class="badge bg-secondary me-1">' + escapeHtml(p) + '</span>').join('');

        els.gameInfoModalBody.innerHTML =
            '<div class="row g-3">' +
            '<div class="col-md-5">' +
            '<img src="' + game.image + '" class="img-fluid rounded" alt="Cover art for ' + escapeHtml(game.name) + '" />' +
            '</div>' +
            '<div class="col-md-7">' +
            '<p class="mb-2">' + platformBadges + '<span class="badge bg-primary">' + escapeHtml(game.genre) + '</span></p>' +
            '<ul class="list-unstyled small mb-3">' +
            '<li><strong>Type:</strong> ' + escapeHtml(game.type) + '</li>' +
            '<li><strong>Released:</strong> ' + escapeHtml(game.releaseDate) + '</li>' +
            '<li><strong>Rating:</strong> ' + game.rating.toFixed(1) + ' / 5</li>' +
            '</ul>' +
            '<p class="small">' + escapeHtml(game.description) + '</p>' +
            (isAssigned
                ? '<p class="small text-muted mb-0"><i class="bi bi-check-circle-fill text-success me-1" aria-hidden="true"></i>Already in your tier list.</p>'
                : '<div id="modalTierButtons"></div>') +
            '</div>' +
            '</div>';

        if (!isAssigned) {
            const buttonsWrap = document.getElementById('modalTierButtons');
            if (buttonsWrap) {
                buttonsWrap.innerHTML =
                    '<label class="small text-muted d-block mb-1">Add to Tier List</label>' +
                    '<div class="d-flex flex-wrap gap-1">' +
                    tierState.tiers.map((tier) =>
                        '<button type="button" class="btn btn-sm modal-add-to-tier-btn" style="background-color: ' + tier.color + '; color: #1a1a1a;" data-tier-id="' + tier.id + '">' + escapeHtml(tier.name) + '</button>'
                    ).join('') +
                    '</div>';
                buttonsWrap.querySelectorAll('.modal-add-to-tier-btn').forEach((btn) => {
                    btn.addEventListener('click', () => {
                        moveGame(game.id, btn.getAttribute('data-tier-id'), null);
                        if (gameInfoModal) gameInfoModal.hide();
                        showToast(game.name + ' added to ' + findTier(btn.getAttribute('data-tier-id')).name + '.', 'success');
                    });
                });
            }
        }

        if (gameInfoModal) gameInfoModal.show();
    }

    // ---------------------------------------------------------------
    // Undo / Redo (full-state snapshots - simple to reason about and
    // covers every action the spec lists with one mechanism)
    // ---------------------------------------------------------------

    function pushUndoSnapshot() {
        undoStack.push(JSON.stringify(tierState));
        if (undoStack.length > MAX_UNDO_STEPS) undoStack.shift();
        redoStack = []; // a new action always invalidates redo history
        updateUndoRedoButtons();
    }

    function undo() {
        if (undoStack.length === 0) return;
        redoStack.push(JSON.stringify(tierState));
        tierState = JSON.parse(undoStack.pop());
        renderAll();
        updateUndoRedoButtons();
    }

    function redo() {
        if (redoStack.length === 0) return;
        undoStack.push(JSON.stringify(tierState));
        tierState = JSON.parse(redoStack.pop());
        renderAll();
        updateUndoRedoButtons();
    }

    function updateUndoRedoButtons() {
        if (els.undoBtn) els.undoBtn.disabled = undoStack.length === 0;
        if (els.redoBtn) els.redoBtn.disabled = redoStack.length === 0;
    }

    // ---------------------------------------------------------------
    // Statistics (only games placed into tiers count as "ranked")
    // ---------------------------------------------------------------

    function renderStatistics() {
        const rankedGames = tierState.tiers.flatMap((tier) => tier.games.map(findGame)).filter(Boolean);

        if (els.statsGamesRanked) els.statsGamesRanked.textContent = String(rankedGames.length);

        if (els.statsPerTier) {
            els.statsPerTier.innerHTML = tierState.tiers.map((tier) =>
                '<div class="d-flex justify-content-between small">' +
                '<span><span class="stats-tier-dot" style="background-color: ' + tier.color + ';"></span>' + escapeHtml(tier.name) + '</span>' +
                '<span>' + tier.games.length + '</span>' +
                '</div>'
            ).join('');
        }

        if (rankedGames.length === 0) {
            if (els.statsAvgRating) els.statsAvgRating.textContent = '\u2014';
            if (els.statsTopGame) els.statsTopGame.textContent = '\u2014';
            if (els.statsLowGame) els.statsLowGame.textContent = '\u2014';
            if (els.statsTopGenre) els.statsTopGenre.textContent = '\u2014';
            return;
        }

        const avgRating = rankedGames.reduce((sum, g) => sum + g.rating, 0) / rankedGames.length;
        const highest = rankedGames.reduce((a, b) => (a.rating >= b.rating ? a : b));
        const lowest = rankedGames.reduce((a, b) => (a.rating <= b.rating ? a : b));

        const genreCounts = {};
        rankedGames.forEach((g) => { genreCounts[g.genre] = (genreCounts[g.genre] || 0) + 1; });
        const topGenre = Object.keys(genreCounts).reduce((a, b) => (genreCounts[a] >= genreCounts[b] ? a : b));

        if (els.statsAvgRating) els.statsAvgRating.textContent = avgRating.toFixed(1) + ' / 5';
        if (els.statsTopGame) els.statsTopGame.textContent = highest.name + ' (' + highest.rating.toFixed(1) + ')';
        if (els.statsLowGame) els.statsLowGame.textContent = lowest.name + ' (' + lowest.rating.toFixed(1) + ')';
        if (els.statsTopGenre) els.statsTopGenre.textContent = topGenre;
    }

    // ---------------------------------------------------------------
    // Save / Load tier lists (localStorage)
    // ---------------------------------------------------------------

    function openSaveListModal() {
        if (els.listNameInput) els.listNameInput.value = tierState.listName || '';
        if (saveListModal) saveListModal.show();
    }

    function confirmSaveList() {
        const name = (els.listNameInput && els.listNameInput.value.trim()) || '';
        if (!name) {
            showToast('Give your tier list a name first.', 'warning');
            return;
        }
        tierState.listName = name;
        savedLists.push({
            id: 'list-' + Date.now(),
            name,
            tiers: JSON.parse(JSON.stringify(tierState.tiers)),
            createdAt: new Date().toISOString()
        });
        saveToStorage(SAVED_KEY, savedLists);
        renderSavedLists();
        if (saveListModal) saveListModal.hide();
        showToast('Saved "' + name + '".', 'success');
    }

    function loadSavedList(listId) {
        const saved = savedLists.find((l) => l.id === listId);
        if (!saved) return;
        tierState = { listName: saved.name, tiers: JSON.parse(JSON.stringify(saved.tiers)) };
        commitChange();
        showToast('Loaded "' + saved.name + '".', 'success');
    }

    function deleteSavedList(listId) {
        savedLists = savedLists.filter((l) => l.id !== listId);
        saveToStorage(SAVED_KEY, savedLists);
        renderSavedLists();
    }

    function renderSavedLists() {
        if (!els.savedListsContainer) return;
        if (savedLists.length === 0) {
            els.savedListsContainer.innerHTML = '<p class="text-muted small mb-0">No saved tier lists yet.</p>';
            return;
        }
        els.savedListsContainer.innerHTML = savedLists.map((list) => {
            const rankedCount = list.tiers.reduce((sum, t) => sum + t.games.length, 0);
            return '<div class="saved-setup-row d-flex justify-content-between align-items-center">' +
                '<div>' +
                '<p class="mb-0 fw-semibold small"><i class="bi bi-controller me-1" aria-hidden="true"></i>' + escapeHtml(list.name) + '</p>' +
                '<p class="mb-0 text-muted small">' + rankedCount + ' games ranked</p>' +
                '</div>' +
                '<div class="d-flex gap-2">' +
                '<button type="button" class="btn btn-sm btn-outline-primary saved-list-load-btn" data-list-id="' + list.id + '">Load</button>' +
                '<button type="button" class="btn btn-sm btn-outline-danger saved-list-delete-btn" data-list-id="' + list.id + '"><i class="bi bi-trash" aria-hidden="true"></i></button>' +
                '</div>' +
                '</div>';
        }).join('');

        els.savedListsContainer.querySelectorAll('.saved-list-load-btn').forEach((btn) => {
            btn.addEventListener('click', () => loadSavedList(btn.getAttribute('data-list-id')));
        });
        els.savedListsContainer.querySelectorAll('.saved-list-delete-btn').forEach((btn) => {
            btn.addEventListener('click', () => deleteSavedList(btn.getAttribute('data-list-id')));
        });
    }

    // ---------------------------------------------------------------
    // Save as Image (html2canvas) - works regardless of whether every
    // game has been assigned to a tier; only #tier-list is captured.
    // ---------------------------------------------------------------

    function saveAsImage() {
        if (typeof html2canvas === 'undefined') {
            showToast('Image export isn\u2019t available right now - please try again in a moment.', 'warning');
            return;
        }
        showToast('Generating image\u2026', 'secondary');
        html2canvas(els.tierList, { backgroundColor: '#0d0b18', useCORS: true }).then((canvas) => {
            const link = document.createElement('a');
            const fileName = (tierState.listName || 'tier-list').toLowerCase().replace(/[^a-z0-9]+/g, '-');
            link.download = fileName + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast('\u2713 Tier list image downloaded!', 'success');
        }).catch(() => {
            showToast('Couldn\u2019t generate the image - some game covers may not allow this.', 'warning');
        });
    }

    // ---------------------------------------------------------------
    // Copy tier list summary to clipboard
    // ---------------------------------------------------------------

    function copyTierListSummary() {
        const lines = [(tierState.listName || 'MY GAME TIER LIST').toUpperCase(), ''];
        tierState.tiers.forEach((tier) => {
            const names = tier.games.map(findGame).filter(Boolean).map((g) => g.name);
            lines.push(tier.name + ':');
            lines.push(names.length ? names.join(', ') : '(empty)');
            lines.push('');
        });
        const summary = lines.join('\n').trim();

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(summary)
                .then(() => showToast('\u2713 Tier list copied to clipboard!', 'success'))
                .catch(() => showToast('Couldn\u2019t copy to clipboard.', 'warning'));
        } else {
            showToast('Clipboard access isn\u2019t available in this browser.', 'warning');
        }
    }

    // ---------------------------------------------------------------
    // Event bindings
    // ---------------------------------------------------------------

    function bindEvents() {
        if (els.searchInput) {
            els.searchInput.addEventListener('input', function () {
                filters.search = this.value.trim().toLowerCase();
                renderGamePool();
            });
        }
        if (els.platformFilter) {
            els.platformFilter.addEventListener('change', function () { filters.platform = this.value; renderGamePool(); });
        }
        if (els.typeFilter) {
            els.typeFilter.addEventListener('change', function () { filters.type = this.value; renderGamePool(); });
        }

        if (els.undoBtn) els.undoBtn.addEventListener('click', undo);
        if (els.redoBtn) els.redoBtn.addEventListener('click', redo);
        if (els.addTierBtn) els.addTierBtn.addEventListener('click', addTier);
        if (els.resetBtn) els.resetBtn.addEventListener('click', () => { if (resetConfirmModal) resetConfirmModal.show(); });
        if (els.confirmResetBtn) els.confirmResetBtn.addEventListener('click', confirmReset);

        if (els.saveListBtn) els.saveListBtn.addEventListener('click', openSaveListModal);
        if (els.confirmSaveListBtn) els.confirmSaveListBtn.addEventListener('click', confirmSaveList);

        if (els.saveImageBtn) els.saveImageBtn.addEventListener('click', saveAsImage);
        if (els.copyListBtn) els.copyListBtn.addEventListener('click', copyTierListSummary);
    }

    return { init };
})();