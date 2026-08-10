document.addEventListener('DOMContentLoaded', () => {
    SetupPlannerPage.init();
});

// ReadyPlayer3 - setupplanner.html data
// Product catalog, slot definitions, gaming style presets, and fictional
// pro-player setups used by setupplanner.js.

const SETUP_SLOTS = [
    { id: 'mouse', label: 'Mouse', icon: 'bi-mouse2-fill', required: true },
    { id: 'keyboard', label: 'Keyboard', icon: 'bi-keyboard-fill', required: true },
    { id: 'monitor', label: 'Monitor', icon: 'bi-display-fill', required: true },
    { id: 'headset', label: 'Headset', icon: 'bi-headset', required: true },
    { id: 'microphone', label: 'Microphone', icon: 'bi-mic-fill', required: true },
    { id: 'mousepad', label: 'Mousepad', icon: 'bi-square-fill', required: true },
    { id: 'earpiece', label: 'Earpiece', icon: 'bi-earbuds', required: true },
    { id: 'controller', label: 'Controller', icon: 'bi-controller', required: false }
];

const GAMING_STYLES = [
    { id: 'competitive-fps', label: 'Competitive FPS', icon: 'bi-crosshair' },
    { id: 'rpg', label: 'RPG', icon: 'bi-shield-fill' },
    { id: 'moba', label: 'MOBA', icon: 'bi-lightning-charge-fill' },
    { id: 'casual', label: 'Casual Gaming', icon: 'bi-emoji-smile-fill' },
    { id: 'streaming', label: 'Streaming', icon: 'bi-broadcast' },
    { id: 'content-creation', label: 'Content Creation', icon: 'bi-camera-reels-fill' }
];

const PLATFORMS = ['PC', 'PlayStation', 'Xbox'];

// scores are 0-100 and feed the Setup Score panel; platforms lists which
// consoles the item works on natively (PC is implied for anything without
// a dedicated console version).
const SETUP_PRODUCTS = [
    // ---- Mouse ----
    {
        id: 'mouse-superlight2', slot: 'mouse', brand: 'Logitech', name: 'G Pro X Superlight 2',
        price: 159.99, specs: 'Wireless \u00b7 32,000 DPI HERO 2 \u00b7 60 g', image: '../images/equipment/logitech-g-pro-x-superlight-2.jpg',
        platforms: ['PC'], styles: ['competitive-fps', 'moba'],
        scores: { performance: 95, comfort: 80, competitive: 98, value: 70 }
    },
    {
        id: 'mouse-viper8k', slot: 'mouse', brand: 'Razer', name: 'Viper 8KHz',
        price: 79.99, specs: 'Wired \u00b7 20,000 DPI \u00b7 8000 Hz polling', image: '../images/equipment/razer-viper-8khz.jpg',
        platforms: ['PC'], styles: ['competitive-fps', 'moba', 'casual'],
        scores: { performance: 90, comfort: 75, competitive: 92, value: 85 }
    },
    {
        id: 'mouse-g502x', slot: 'mouse', brand: 'Logitech', name: 'G502 X',
        price: 99.99, specs: 'Wireless \u00b7 25,600 DPI \u00b7 ergonomic shape', image: '../images/equipment/logitech-g502-x.jpg',
        platforms: ['PC'], styles: ['rpg', 'casual', 'content-creation'],
        scores: { performance: 80, comfort: 92, competitive: 75, value: 80 }
    },

    // ---- Keyboard ----
    {
        id: 'keyboard-wooting60he', slot: 'keyboard', brand: 'Wooting', name: '60HE',
        price: 174.99, specs: 'Wired \u00b7 Hall-effect analog \u00b7 60% layout', image: '../images/equipment/wooting-60he.jpg',
        platforms: ['PC'], styles: ['competitive-fps', 'moba'],
        scores: { performance: 95, comfort: 70, competitive: 97, value: 65 }
    },
    {
        id: 'keyboard-g915tkl', slot: 'keyboard', brand: 'Logitech', name: 'G915 TKL',
        price: 229.99, specs: 'Wireless \u00b7 Low-profile \u00b7 TKL layout', image: '../images/equipment/logitech-g915-tkl.jpg',
        platforms: ['PC'], styles: ['rpg', 'streaming', 'content-creation', 'casual'],
        scores: { performance: 85, comfort: 88, competitive: 80, value: 60 }
    },
    {
        id: 'keyboard-apexpro', slot: 'keyboard', brand: 'SteelSeries', name: 'Apex Pro',
        price: 199.99, specs: 'Wired \u00b7 Adjustable actuation \u00b7 Full-size', image: '../images/equipment/steelseries-apex-pro.jpg',
        platforms: ['PC'], styles: ['competitive-fps', 'rpg', 'moba'],
        scores: { performance: 92, comfort: 82, competitive: 90, value: 68 }
    },

    // ---- Monitor ----
    {
        id: 'monitor-pg27aqn', slot: 'monitor', brand: 'ASUS ROG', name: 'Swift PG27AQN',
        price: 899.00, specs: '27" \u00b7 360 Hz \u00b7 1440p Fast IPS', image: '../images/equipment/asus-rog-swift-pg27aqn.jpg',
        platforms: ['PC'], styles: ['competitive-fps', 'moba'],
        scores: { performance: 98, comfort: 85, competitive: 99, value: 40 }
    },
    {
        id: 'monitor-raptor27', slot: 'monitor', brand: 'Razer', name: 'Raptor 27',
        price: 699.99, specs: '27" \u00b7 165 Hz \u00b7 1440p IPS', image: '../images/equipment/razer-raptor-27.jpg',
        platforms: ['PC'], styles: ['rpg', 'casual', 'streaming', 'content-creation'],
        scores: { performance: 85, comfort: 88, competitive: 82, value: 55 }
    },
    {
        id: 'monitor-vg259qm', slot: 'monitor', brand: 'ASUS TUF', name: 'Gaming VG259QM',
        price: 259.99, specs: '24.5" \u00b7 280 Hz \u00b7 1080p IPS', image: '../images/equipment/asus-tuf-vg259qm.jpg',
        platforms: ['PC'], styles: ['competitive-fps', 'casual'],
        scores: { performance: 88, comfort: 78, competitive: 90, value: 85 }
    },

    // ---- Headset ----
    {
        id: 'headset-cloud2', slot: 'headset', brand: 'HyperX', name: 'Cloud II',
        price: 99.99, specs: 'Wired \u00b7 53 mm drivers \u00b7 Detachable mic', image: '../images/equipment/hyperx-cloud-ii.jpg',
        platforms: ['PC', 'PlayStation', 'Xbox'], styles: ['casual', 'rpg', 'competitive-fps'],
        scores: { performance: 78, comfort: 90, competitive: 75, value: 90 }
    },
    {
        id: 'headset-novapro', slot: 'headset', brand: 'SteelSeries', name: 'Arctis Nova Pro Wireless',
        price: 349.99, specs: 'Wireless \u00b7 Dual swappable battery \u00b7 ClearCast mic', image: '../images/equipment/steelseries-arctis-nova-pro-wireless.jpg',
        platforms: ['PC', 'PlayStation', 'Xbox'], styles: ['streaming', 'content-creation', 'rpg', 'competitive-fps'],
        scores: { performance: 95, comfort: 95, competitive: 88, value: 55 }
    },
    {
        id: 'headset-gprox2', slot: 'headset', brand: 'Logitech', name: 'G Pro X 2',
        price: 199.99, specs: 'Wireless \u00b7 Lightweight \u00b7 Graphene drivers', image: '../images/equipment/logitech-g-pro-x-2.jpg',
        platforms: ['PC', 'PlayStation'], styles: ['competitive-fps', 'moba'],
        scores: { performance: 90, comfort: 85, competitive: 93, value: 65 }
    },

    // ---- Microphone ----
    {
        id: 'mic-quadcasts', slot: 'microphone', brand: 'HyperX', name: 'QuadCast S',
        price: 159.99, specs: 'USB \u00b7 4 polar patterns \u00b7 RGB', image: '../images/equipment/hyperx-quadcast-s.jpg',
        platforms: ['PC'], styles: ['streaming', 'content-creation'],
        scores: { performance: 85, comfort: 80, competitive: 60, value: 75 }
    },
    {
        id: 'mic-yetix', slot: 'microphone', brand: 'Blue', name: 'Yeti X',
        price: 169.99, specs: 'USB \u00b7 4 polar patterns \u00b7 LED metering', image: '../images/equipment/blue-yeti-x.jpg',
        platforms: ['PC'], styles: ['streaming', 'content-creation', 'casual'],
        scores: { performance: 88, comfort: 82, competitive: 60, value: 70 }
    },
    {
        id: 'mic-solocast', slot: 'microphone', brand: 'HyperX', name: 'SoloCast',
        price: 59.99, specs: 'USB \u00b7 Cardioid \u00b7 Tap-to-mute', image: '../images/equipment/hyperx-solocast.jpg',
        platforms: ['PC'], styles: ['casual', 'competitive-fps', 'moba'],
        scores: { performance: 70, comfort: 75, competitive: 60, value: 92 }
    },

    // ---- Mousepad ----
    {
        id: 'mousepad-g840xl', slot: 'mousepad', brand: 'Logitech', name: 'G840 XL',
        price: 34.99, specs: 'Cloth \u00b7 900 x 400 mm \u00b7 Stitched edges', image: '../images/equipment/logitech-g840-xl.jpg',
        platforms: ['PC'], styles: ['rpg', 'casual', 'content-creation'],
        scores: { performance: 75, comfort: 85, competitive: 70, value: 90 }
    },
    {
        id: 'mousepad-goliathus', slot: 'mousepad', brand: 'Razer', name: 'Goliathus Extended Chroma',
        price: 59.99, specs: 'Cloth \u00b7 RGB \u00b7 920 x 294 mm', image: '../images/equipment/razer-goliathus-extended-chroma.jpg',
        platforms: ['PC'], styles: ['streaming', 'content-creation', 'casual'],
        scores: { performance: 78, comfort: 82, competitive: 72, value: 78 }
    },
    {
        id: 'mousepad-sphexv3', slot: 'mousepad', brand: 'Razer', name: 'Sphex V3',
        price: 29.99, specs: 'Hard surface \u00b7 Ultra-thin \u00b7 Speed-tuned', image: '../images/equipment/razer-sphex-v3.jpg',
        platforms: ['PC'], styles: ['competitive-fps', 'moba'],
        scores: { performance: 88, comfort: 65, competitive: 92, value: 88 }
    },

    // ---- Earpiece (true wireless earbuds) ----
    {
        id: 'earpiece-gfits', slot: 'earpiece', brand: 'Logitech', name: 'G FITS',
        price: 229.99, specs: 'True wireless \u00b7 Custom-molded fit', image: '../images/equipment/logitech-g-fits.jpg',
        platforms: ['PC'], styles: ['content-creation', 'casual'],
        scores: { performance: 80, comfort: 95, competitive: 65, value: 55 }
    },
    {
        id: 'earpiece-hammerhead', slot: 'earpiece', brand: 'Razer', name: 'Hammerhead True Wireless Pro',
        price: 179.99, specs: 'True wireless \u00b7 Hybrid ANC', image: '../images/equipment/razer-hammerhead-true-wireless-pro.jpg',
        platforms: ['PC', 'PlayStation', 'Xbox'], styles: ['casual', 'streaming', 'content-creation'],
        scores: { performance: 82, comfort: 88, competitive: 68, value: 65 }
    },

    // ---- Controller (optional slot) ----
    {
        id: 'controller-xbox', slot: 'controller', brand: 'Xbox', name: 'Wireless Controller',
        price: 59.99, specs: 'Wireless \u00b7 Hybrid D-pad', image: '../images/equipment/xbox-wireless-controller.jpg',
        platforms: ['PC', 'Xbox'], styles: ['casual', 'rpg'],
        scores: { performance: 75, comfort: 88, competitive: 65, value: 92 }
    },
    {
        id: 'controller-dualsense', slot: 'controller', brand: 'PlayStation', name: 'DualSense',
        price: 69.99, specs: 'Wireless \u00b7 Haptic feedback \u00b7 Adaptive triggers', image: '../images/equipment/playstation-dualsense.jpg',
        platforms: ['PlayStation'], styles: ['casual', 'rpg'],
        scores: { performance: 78, comfort: 90, competitive: 68, value: 88 }
    },
    {
        id: 'controller-wolverinev2', slot: 'controller', brand: 'Razer', name: 'Wolverine V2 Chroma',
        price: 99.99, specs: 'Wired \u00b7 Remappable buttons \u00b7 RGB', image: '../images/equipment/razer-wolverine-v2-chroma.jpg',
        platforms: ['PC', 'Xbox'], styles: ['competitive-fps', 'moba'],
        scores: { performance: 85, comfort: 80, competitive: 88, value: 70 }
    }
];

// Fictional esports personas (not real people) used for the "Pro Player
// Setups" section. Each maps slot id -> a SETUP_PRODUCTS id.
const PRO_SETUPS = [
    {
        id: 'pro-vex', name: 'Vex', game: 'Valorant', team: 'Nightfall Esports', role: 'Duelist', initials: 'VX',
        setup: { mouse: 'mouse-viper8k', keyboard: 'keyboard-wooting60he', monitor: 'monitor-vg259qm', headset: 'headset-gprox2', microphone: 'mic-quadcasts', mousepad: 'mousepad-sphexv3', earpiece: null, controller: null }
    },
    {
        id: 'pro-kestrel', name: 'Kestrel', game: 'Counter-Strike 2', team: 'Shadow Wolves', role: 'IGL', initials: 'KS',
        setup: { mouse: 'mouse-superlight2', keyboard: 'keyboard-apexpro', monitor: 'monitor-pg27aqn', headset: 'headset-cloud2', microphone: 'mic-solocast', mousepad: 'mousepad-g840xl', earpiece: null, controller: null }
    },
    {
        id: 'pro-juno', name: 'Juno', game: 'League of Legends', team: 'Arcane Five', role: 'Support', initials: 'JN',
        setup: { mouse: 'mouse-g502x', keyboard: 'keyboard-g915tkl', monitor: 'monitor-raptor27', headset: 'headset-novapro', microphone: 'mic-yetix', mousepad: 'mousepad-goliathus', earpiece: null, controller: null }
    },
    {
        id: 'pro-rook', name: 'Rook', game: 'Apex Legends', team: 'Static Order', role: 'Slayer', initials: 'RK',
        setup: { mouse: 'mouse-viper8k', keyboard: 'keyboard-wooting60he', monitor: 'monitor-pg27aqn', headset: 'headset-gprox2', microphone: 'mic-quadcasts', mousepad: 'mousepad-sphexv3', earpiece: 'earpiece-hammerhead', controller: 'controller-wolverinev2' }
    }
];

// ReadyPlayer3 - setupplanner.html interactions
//
// Self-contained controller for the Setup Planner tool. Owns: the 8
// equipment slots, live price/score/compatibility dashboards, the budget
// tracker, gaming-style recommendations, pro-player presets, a wishlist,
// saved/compared setups (persisted to localStorage), and the reset flow.
//
// Organized as small named functions grouped by feature so any one piece
// can be read or changed without touching the rest.

const SetupPlannerPage = (() => {
    const SAVED_SETUPS_KEY = 'rp3-setup-planner-saved';
    const WISHLIST_KEY = 'rp3-setup-planner-wishlist';

    const state = {
        slots: {}, // slotId -> productId | null
        platform: 'PC',
        activeStyle: null,
        budget: 800,
        wishlist: [], // array of productId
        savedSetups: [], // array of { id, name, slots, createdAt }
        activePickerSlot: null // slot currently open in the item-picker modal
    };

    const els = {};
    let itemPickerModal = null;
    let proSetupModal = null;
    let saveSetupModal = null;
    let resetConfirmModal = null;
    let comparisonModal = null;

    function init() {
        SETUP_SLOTS.forEach((slot) => { state.slots[slot.id] = null; });
        state.wishlist = loadFromStorage(WISHLIST_KEY, []);
        state.savedSetups = loadFromStorage(SAVED_SETUPS_KEY, []);

        cacheElements();
        initModals();
        renderStyleSelector();
        renderProPlayers();
        renderWishlist();
        renderSavedSetups();
        populateComparisonSelects();
        bindEvents();
        recalculateEverything();
    }

    function cacheElements() {
        els.slotsGrid = document.getElementById('setupSlotsGrid');
        els.styleSelectorGroup = document.getElementById('styleSelectorGroup');
        els.styleRecommendations = document.getElementById('styleRecommendations');
        els.platformSelect = document.getElementById('platformSelect');

        els.totalCost = document.getElementById('totalCost');
        els.itemCount = document.getElementById('itemCount');
        els.cheapestItem = document.getElementById('cheapestItem');
        els.priciestItem = document.getElementById('priciestItem');

        els.budgetInput = document.getElementById('budgetInput');
        els.budgetSlider = document.getElementById('budgetSlider');
        els.budgetCurrent = document.getElementById('budgetCurrent');
        els.budgetSpending = document.getElementById('budgetSpending');
        els.budgetRemaining = document.getElementById('budgetRemaining');
        els.budgetOverWrap = document.getElementById('budgetOverWrap');
        els.budgetOverAmount = document.getElementById('budgetOverAmount');
        els.budgetProgressBar = document.getElementById('budgetProgressBar');
        els.budgetWarning = document.getElementById('budgetWarning');

        els.scoreOverall = document.getElementById('scoreOverall');
        els.scorePerformance = document.getElementById('scorePerformance');
        els.scoreComfort = document.getElementById('scoreComfort');
        els.scoreCompetitive = document.getElementById('scoreCompetitive');
        els.scoreValue = document.getElementById('scoreValue');
        els.scorePerformanceBar = document.getElementById('scorePerformanceBar');
        els.scoreComfortBar = document.getElementById('scoreComfortBar');
        els.scoreCompetitiveBar = document.getElementById('scoreCompetitiveBar');
        els.scoreValueBar = document.getElementById('scoreValueBar');

        els.compatibilityList = document.getElementById('compatibilityList');

        els.proPlayersRow = document.getElementById('proPlayersRow');
        els.proSetupModalEl = document.getElementById('proSetupModal');
        els.proSetupModalLabel = document.getElementById('proSetupModalLabel');
        els.proSetupModalBody = document.getElementById('proSetupModalBody');
        els.proSetupModalFooter = document.getElementById('proSetupModalFooter');

        els.wishlistRow = document.getElementById('wishlistRow');

        els.savedSetupsList = document.getElementById('savedSetupsList');
        els.saveSetupBtn = document.getElementById('saveSetupBtn');
        els.saveSetupModalEl = document.getElementById('saveSetupModal');
        els.setupNameInput = document.getElementById('setupNameInput');
        els.confirmSaveSetupBtn = document.getElementById('confirmSaveSetupBtn');

        els.compareSetupA = document.getElementById('compareSetupA');
        els.compareSetupB = document.getElementById('compareSetupB');
        els.compareSetupsBtn = document.getElementById('compareSetupsBtn');
        els.comparisonModalEl = document.getElementById('comparisonModal');
        els.comparisonModalBody = document.getElementById('comparisonModalBody');

        els.resetSetupBtn = document.getElementById('resetSetupBtn');
        els.resetConfirmModalEl = document.getElementById('resetConfirmModal');
        els.confirmResetBtn = document.getElementById('confirmResetBtn');

        els.itemPickerModalEl = document.getElementById('itemPickerModal');
        els.itemPickerModalLabel = document.getElementById('itemPickerModalLabel');
        els.itemPickerModalBody = document.getElementById('itemPickerModalBody');

        els.offcanvasTotalCost = document.getElementById('offcanvasTotalCost');
        els.offcanvasItemCount = document.getElementById('offcanvasItemCount');
        els.offcanvasScoreOverall = document.getElementById('offcanvasScoreOverall');

        els.toastContainer = document.getElementById('toastContainer');
    }

    function initModals() {
        if (!window.bootstrap) return;
        itemPickerModal = bootstrap.Modal.getOrCreateInstance(els.itemPickerModalEl);
        proSetupModal = bootstrap.Modal.getOrCreateInstance(els.proSetupModalEl);
        saveSetupModal = bootstrap.Modal.getOrCreateInstance(els.saveSetupModalEl);
        resetConfirmModal = bootstrap.Modal.getOrCreateInstance(els.resetConfirmModalEl);
        comparisonModal = bootstrap.Modal.getOrCreateInstance(els.comparisonModalEl);

        // Enable Bootstrap tooltips (used on the compatibility badges)
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
            new bootstrap.Tooltip(el);
        });
    }

    // ---------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------

    function findProduct(productId) {
        return SETUP_PRODUCTS.find((p) => p.id === productId) || null;
    }

    function findSlotMeta(slotId) {
        return SETUP_SLOTS.find((s) => s.id === slotId) || null;
    }

    function filledEntries() {
        return Object.keys(state.slots)
            .filter((slotId) => state.slots[slotId])
            .map((slotId) => ({ slotId, product: findProduct(state.slots[slotId]) }))
            .filter((entry) => entry.product);
    }

    function formatPrice(value) {
        return '$' + value.toFixed(2);
    }

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
            // Storage unavailable - fail silently, feature just won't persist.
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

    // One place that re-runs every derived panel after any state change.
    function recalculateEverything() {
        renderSlots();
        renderPriceDashboard();
        renderBudget();
        renderScore();
        renderCompatibility();
    }

    // ---------------------------------------------------------------
    // Setup Builder Slots
    // ---------------------------------------------------------------

    function renderSlots() {
        if (!els.slotsGrid) return;
        els.slotsGrid.innerHTML = SETUP_SLOTS.map(buildSlotCard).join('');

        SETUP_SLOTS.forEach((slot) => {
            const card = document.getElementById('slot-' + slot.id);
            if (!card) return;
            const addBtn = card.querySelector('.slot-add-btn');
            const replaceBtn = card.querySelector('.slot-replace-btn');
            const removeBtn = card.querySelector('.slot-remove-btn');
            if (addBtn) addBtn.addEventListener('click', () => openItemPicker(slot.id));
            if (replaceBtn) replaceBtn.addEventListener('click', () => openItemPicker(slot.id));
            if (removeBtn) removeBtn.addEventListener('click', () => removeItem(slot.id));
        });
    }

    function buildSlotCard(slot) {
        const productId = state.slots[slot.id];
        const product = productId ? findProduct(productId) : null;
        const optionalBadge = slot.required ? '' : '<span class="badge bg-secondary ms-2">Optional</span>';

        if (!product) {
            return (
                '<div class="col">' +
                '<div class="card setup-slot setup-slot-empty h-100" id="slot-' + slot.id + '">' +
                '<i class="bi ' + slot.icon + ' setup-slot-icon" aria-hidden="true"></i>' +
                '<p class="mb-1 fw-semibold">No ' + escapeHtml(slot.label) + ' Selected' + optionalBadge + '</p>' +
                '<button type="button" class="btn btn-sm btn-outline-primary slot-add-btn mt-2">' +
                '<i class="bi bi-plus-lg me-1" aria-hidden="true"></i>Add ' + escapeHtml(slot.label) +
                '</button>' +
                '</div>' +
                '</div>'
            );
        }

        return (
            '<div class="col">' +
            '<div class="card setup-slot setup-slot-filled h-100" id="slot-' + slot.id + '">' +
            '<div class="d-flex justify-content-between align-items-start mb-2">' +
            '<span class="badge bg-secondary">' + escapeHtml(slot.label) + '</span>' +
            '<span class="fw-bold">' + formatPrice(product.price) + '</span>' +
            '</div>' +
            '<img src="' + product.image + '" class="setup-slot-img mb-2" alt="' + escapeHtml(product.brand + ' ' + product.name) + '" />' +
            '<h3 class="h6 mb-1">' + escapeHtml(product.brand) + ' ' + escapeHtml(product.name) + '</h3>' +
            '<p class="small text-muted mb-3">' + escapeHtml(product.specs) + '</p>' +
            '<div class="mt-auto d-flex gap-2">' +
            '<button type="button" class="btn btn-sm btn-outline-secondary flex-grow-1 slot-replace-btn">Replace</button>' +
            '<button type="button" class="btn btn-sm btn-outline-danger slot-remove-btn">Remove</button>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function removeItem(slotId) {
        const product = findProduct(state.slots[slotId]);
        state.slots[slotId] = null;
        recalculateEverything();
        if (product) showToast(product.name + ' removed from your setup.', 'secondary');
    }

    // ---------------------------------------------------------------
    // Item picker modal (used for both Add and Replace)
    // ---------------------------------------------------------------

    function openItemPicker(slotId) {
        const slot = findSlotMeta(slotId);
        if (!slot || !els.itemPickerModalBody) return;

        state.activePickerSlot = slotId;
        if (els.itemPickerModalLabel) {
            els.itemPickerModalLabel.textContent = 'Choose a ' + slot.label;
        }

        const options = SETUP_PRODUCTS.filter((p) => p.slot === slotId);
        const currentId = state.slots[slotId];

        els.itemPickerModalBody.innerHTML = options.map((product) => {
            const isCurrent = product.id === currentId;
            const inWishlist = state.wishlist.indexOf(product.id) !== -1;
            return (
                '<div class="col-md-6">' +
                '<div class="card h-100 item-picker-card' + (isCurrent ? ' item-picker-card-selected' : '') + '" data-product-id="' + product.id + '">' +
                '<div class="card-body d-flex flex-column">' +
                '<div class="d-flex justify-content-between align-items-start">' +
                '<h3 class="h6 mb-1">' + escapeHtml(product.brand) + ' ' + escapeHtml(product.name) + '</h3>' +
                '<button type="button" class="btn btn-sm btn-link p-0 item-picker-wishlist-btn' + (inWishlist ? ' active' : '') + '" data-product-id="' + product.id + '" aria-label="Toggle wishlist for ' + escapeHtml(product.name) + '" title="Wishlist">' +
                '<i class="bi ' + (inWishlist ? 'bi-heart-fill' : 'bi-heart') + '" aria-hidden="true"></i>' +
                '</button>' +
                '</div>' +
                '<p class="small text-muted mb-2">' + escapeHtml(product.specs) + '</p>' +
                '<p class="fw-bold mb-3">' + formatPrice(product.price) + '</p>' +
                '<button type="button" class="btn btn-sm mt-auto item-picker-select-btn ' + (isCurrent ? 'btn-success' : 'btn-primary') + '" data-product-id="' + product.id + '">' +
                (isCurrent ? '\u2713 Currently Selected' : 'Select This Item') +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }).join('');

        els.itemPickerModalBody.querySelectorAll('.item-picker-select-btn').forEach((btn) => {
            btn.addEventListener('click', () => selectItem(slotId, btn.getAttribute('data-product-id')));
        });
        els.itemPickerModalBody.querySelectorAll('.item-picker-wishlist-btn').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleWishlist(btn.getAttribute('data-product-id'));
                openItemPicker(slotId); // re-render so the heart icon updates
            });
        });

        if (itemPickerModal) itemPickerModal.show();
    }

    function selectItem(slotId, productId) {
        const slot = findSlotMeta(slotId);
        const product = findProduct(productId);
        if (!slot || !product) return;

        // Prevent duplicates: the same product can't fill two slots at once.
        const duplicateSlot = Object.keys(state.slots).find((id) => id !== slotId && state.slots[id] === productId);
        if (duplicateSlot) {
            showToast(product.name + ' is already in your ' + findSlotMeta(duplicateSlot).label + ' slot.', 'warning');
            return;
        }

        state.slots[slotId] = productId;
        recalculateEverything();
        if (itemPickerModal) itemPickerModal.hide();
        showToast(product.brand + ' ' + product.name + ' added to ' + slot.label + '.', 'success');
    }

    // ---------------------------------------------------------------
    // Live Price Dashboard
    // ---------------------------------------------------------------

    function renderPriceDashboard() {
        const entries = filledEntries();
        const total = entries.reduce((sum, e) => sum + e.product.price, 0);

        if (els.totalCost) els.totalCost.textContent = formatPrice(total);
        if (els.itemCount) els.itemCount.textContent = String(entries.length);
        if (els.offcanvasTotalCost) els.offcanvasTotalCost.textContent = formatPrice(total);
        if (els.offcanvasItemCount) els.offcanvasItemCount.textContent = String(entries.length);

        if (entries.length === 0) {
            if (els.cheapestItem) els.cheapestItem.textContent = '\u2014';
            if (els.priciestItem) els.priciestItem.textContent = '\u2014';
            return;
        }

        const cheapest = entries.reduce((a, b) => (a.product.price <= b.product.price ? a : b));
        const priciest = entries.reduce((a, b) => (a.product.price >= b.product.price ? a : b));
        if (els.cheapestItem) els.cheapestItem.textContent = cheapest.product.name + ' (' + formatPrice(cheapest.product.price) + ')';
        if (els.priciestItem) els.priciestItem.textContent = priciest.product.name + ' (' + formatPrice(priciest.product.price) + ')';
    }

    // ---------------------------------------------------------------
    // Dynamic Budget System
    // ---------------------------------------------------------------

    function renderBudget() {
        const entries = filledEntries();
        const spending = entries.reduce((sum, e) => sum + e.product.price, 0);
        const remaining = state.budget - spending;
        const overAmount = spending > state.budget ? spending - state.budget : 0;
        const percent = state.budget > 0 ? Math.min(100, (spending / state.budget) * 100) : 0;

        if (els.budgetCurrent) els.budgetCurrent.textContent = formatPrice(state.budget);
        if (els.budgetSpending) els.budgetSpending.textContent = formatPrice(spending);
        if (els.budgetRemaining) els.budgetRemaining.textContent = formatPrice(Math.max(0, remaining));

        if (els.budgetOverWrap && els.budgetOverAmount) {
            if (overAmount > 0) {
                els.budgetOverWrap.classList.remove('d-none');
                els.budgetOverAmount.textContent = formatPrice(overAmount);
            } else {
                els.budgetOverWrap.classList.add('d-none');
            }
        }

        if (els.budgetProgressBar) {
            els.budgetProgressBar.style.width = percent + '%';
            els.budgetProgressBar.setAttribute('aria-valuenow', String(Math.round(percent)));
            els.budgetProgressBar.classList.remove('bg-success', 'bg-warning', 'bg-danger');
            if (overAmount > 0) {
                els.budgetProgressBar.classList.add('bg-danger');
            } else if (percent >= 80) {
                els.budgetProgressBar.classList.add('bg-warning');
            } else {
                els.budgetProgressBar.classList.add('bg-success');
            }
        }

        if (els.budgetWarning) {
            if (overAmount > 0) {
                els.budgetWarning.classList.remove('d-none');
                els.budgetWarning.textContent = 'You are ' + formatPrice(overAmount) + ' over budget. Consider swapping a pricier slot.';
            } else {
                els.budgetWarning.classList.add('d-none');
            }
        }
    }

    // ---------------------------------------------------------------
    // Dynamic Setup Score
    // ---------------------------------------------------------------

    function renderScore() {
        const entries = filledEntries();

        const metrics = { performance: 0, comfort: 0, competitive: 0, value: 0 };
        if (entries.length > 0) {
            ['performance', 'comfort', 'competitive', 'value'].forEach((key) => {
                const sum = entries.reduce((total, e) => total + e.product.scores[key], 0);
                metrics[key] = Math.round(sum / entries.length);
            });
        }
        const overall = Math.round((metrics.performance + metrics.comfort + metrics.competitive + metrics.value) / 4);

        if (els.scoreOverall) els.scoreOverall.textContent = String(overall);
        if (els.offcanvasScoreOverall) els.offcanvasScoreOverall.textContent = String(overall);
        setScoreMetric(els.scorePerformance, els.scorePerformanceBar, metrics.performance);
        setScoreMetric(els.scoreComfort, els.scoreComfortBar, metrics.comfort);
        setScoreMetric(els.scoreCompetitive, els.scoreCompetitiveBar, metrics.competitive);
        setScoreMetric(els.scoreValue, els.scoreValueBar, metrics.value);
    }

    function setScoreMetric(labelEl, barEl, value) {
        if (labelEl) labelEl.textContent = String(value);
        if (barEl) {
            barEl.style.width = value + '%';
            barEl.setAttribute('aria-valuenow', String(value));
        }
    }

    // ---------------------------------------------------------------
    // Compatibility Checker
    // ---------------------------------------------------------------

    function renderCompatibility() {
        if (!els.compatibilityList) return;
        const entries = filledEntries();

        if (entries.length === 0) {
            els.compatibilityList.innerHTML = '<p class="text-muted small mb-0">Add equipment to see compatibility with your selected platform.</p>';
            return;
        }

        els.compatibilityList.innerHTML = entries.map((entry) => {
            const compatible = entry.product.platforms.indexOf(state.platform) !== -1;
            const slot = findSlotMeta(entry.slotId);
            if (compatible) {
                return '<li class="list-group-item d-flex align-items-center gap-2">' +
                    '<i class="bi bi-check-circle-fill text-success" aria-hidden="true"></i>' +
                    '<span>' + escapeHtml(slot.label) + ' compatible with ' + escapeHtml(state.platform) + '</span>' +
                    '</li>';
            }
            return '<li class="list-group-item d-flex align-items-center gap-2">' +
                '<i class="bi bi-exclamation-triangle-fill text-warning" aria-hidden="true"></i>' +
                '<span>' + escapeHtml(slot.label) + ' requires an adapter for ' + escapeHtml(state.platform) + ' (native: ' + escapeHtml(entry.product.platforms.join(', ')) + ')</span>' +
                '</li>';
        }).join('');
    }

    // ---------------------------------------------------------------
    // Gaming Style Selector
    // ---------------------------------------------------------------

    function renderStyleSelector() {
        if (!els.styleSelectorGroup) return;
        els.styleSelectorGroup.innerHTML = GAMING_STYLES.map((style) => {
            return '<button type="button" class="btn style-toggle-btn" data-style="' + style.id + '">' +
                '<i class="bi ' + style.icon + ' me-1" aria-hidden="true"></i>' + escapeHtml(style.label) +
                '</button>';
        }).join('');

        els.styleSelectorGroup.querySelectorAll('.style-toggle-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const styleId = btn.getAttribute('data-style');
                state.activeStyle = state.activeStyle === styleId ? null : styleId;
                renderStyleActiveState();
                renderStyleRecommendations();
            });
        });
        renderStyleActiveState();
        renderStyleRecommendations();
    }

    function renderStyleActiveState() {
        if (!els.styleSelectorGroup) return;
        els.styleSelectorGroup.querySelectorAll('.style-toggle-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.getAttribute('data-style') === state.activeStyle);
        });
    }

    function renderStyleRecommendations() {
        if (!els.styleRecommendations) return;

        if (!state.activeStyle) {
            els.styleRecommendations.innerHTML = '<p class="text-muted small mb-0">Pick a gaming style above to see tailored equipment suggestions for every slot.</p>';
            return;
        }

        const requestedStyle = state.activeStyle;
        els.styleRecommendations.innerHTML =
            '<div class="d-flex align-items-center gap-2 text-muted small py-3">' +
            '<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Finding recommendations\u2026</span></div>' +
            '<span>Finding recommendations\u2026</span>' +
            '</div>';

        // Brief simulated delay so the spinner is perceptible; bail out if
        // the user picked a different style before this one finished.
        setTimeout(() => {
            if (state.activeStyle !== requestedStyle) return;
            paintStyleRecommendations(requestedStyle);
        }, 350);
    }

    function paintStyleRecommendations(styleId) {
        const styleMeta = GAMING_STYLES.find((s) => s.id === styleId);
        const bySlot = SETUP_SLOTS.map((slot) => {
            const matches = SETUP_PRODUCTS.filter((p) => p.slot === slot.id && p.styles.indexOf(styleId) !== -1)
                .sort((a, b) => b.scores.performance - a.scores.performance);
            return { slot, matches };
        }).filter((entry) => entry.matches.length > 0);

        const header = '<h3 class="h6 mb-3"><i class="bi ' + styleMeta.icon + ' me-2" aria-hidden="true"></i>Recommended for ' + escapeHtml(styleMeta.label) + '</h3>';

        const rows = bySlot.map((entry) => {
            const top = entry.matches[0];
            return '<div class="col-md-6 col-lg-4">' +
                '<div class="card style-recommendation-card h-100">' +
                '<span class="badge bg-secondary mb-2">' + escapeHtml(entry.slot.label) + '</span>' +
                '<p class="mb-1 fw-semibold small">' + escapeHtml(top.brand) + ' ' + escapeHtml(top.name) + '</p>' +
                '<p class="mb-2 text-muted small">' + formatPrice(top.price) + '</p>' +
                '<button type="button" class="btn btn-sm btn-outline-primary w-100 style-recommendation-select" data-slot="' + entry.slot.id + '" data-product-id="' + top.id + '">Add to Setup</button>' +
                '</div>' +
                '</div>';
        }).join('');

        els.styleRecommendations.innerHTML = header + '<div class="row g-3">' + rows + '</div>';

        els.styleRecommendations.querySelectorAll('.style-recommendation-select').forEach((btn) => {
            btn.addEventListener('click', () => {
                selectItem(btn.getAttribute('data-slot'), btn.getAttribute('data-product-id'));
            });
        });
    }

    // ---------------------------------------------------------------
    // Pro Player Setups
    // ---------------------------------------------------------------

    function renderProPlayers() {
        if (!els.proPlayersRow) return;
        els.proPlayersRow.innerHTML = PRO_SETUPS.map((pro) => {
            const items = Object.keys(pro.setup).map((slotId) => pro.setup[slotId]).filter(Boolean).map(findProduct).filter(Boolean);
            const preview = items.slice(0, 3).map((p) => p.name).join(' \u00b7 ');
            return '<div class="card pro-player-card" data-pro-id="' + pro.id + '">' +
                '<div class="pro-player-avatar">' + escapeHtml(pro.initials) + '</div>' +
                '<h3 class="h6 mb-0">' + escapeHtml(pro.name) + '</h3>' +
                '<p class="small text-muted mb-1">' + escapeHtml(pro.team) + ' \u00b7 ' + escapeHtml(pro.role) + '</p>' +
                '<p class="small mb-2"><span class="badge bg-secondary">' + escapeHtml(pro.game) + '</span></p>' +
                '<p class="small text-muted mb-3 pro-player-preview">' + escapeHtml(preview) + '</p>' +
                '<div class="d-flex gap-2">' +
                '<button type="button" class="btn btn-sm btn-outline-primary flex-grow-1 pro-view-btn" data-pro-id="' + pro.id + '">View Setup</button>' +
                '<button type="button" class="btn btn-sm btn-outline-success pro-copy-btn" data-pro-id="' + pro.id + '" title="Copy Setup"><i class="bi bi-clipboard-plus" aria-hidden="true"></i></button>' +
                '</div>' +
                '</div>';
        }).join('');

        els.proPlayersRow.querySelectorAll('.pro-view-btn').forEach((btn) => {
            btn.addEventListener('click', () => openProSetupModal(btn.getAttribute('data-pro-id')));
        });
        els.proPlayersRow.querySelectorAll('.pro-copy-btn').forEach((btn) => {
            btn.addEventListener('click', () => copyProSetup(btn.getAttribute('data-pro-id')));
        });
    }

    function openProSetupModal(proId) {
        const pro = PRO_SETUPS.find((p) => p.id === proId);
        if (!pro || !els.proSetupModalBody) return;

        if (els.proSetupModalLabel) {
            els.proSetupModalLabel.textContent = pro.name + ' \u2014 ' + pro.team;
        }

        const rows = Object.keys(pro.setup).map((slotId) => {
            const productId = pro.setup[slotId];
            const slot = findSlotMeta(slotId);
            if (!productId) {
                return '<tr><td>' + escapeHtml(slot.label) + '</td><td class="text-muted" colspan="2">Not used</td></tr>';
            }
            const product = findProduct(productId);
            return '<tr>' +
                '<td>' + escapeHtml(slot.label) + '</td>' +
                '<td>' + escapeHtml(product.brand) + ' ' + escapeHtml(product.name) + '</td>' +
                '<td class="text-end">' + formatPrice(product.price) +
                ' <button type="button" class="btn btn-sm btn-link p-0 ms-2 pro-add-individual-btn" data-slot="' + slotId + '" data-product-id="' + productId + '" title="Add just this item to your setup"><i class="bi bi-plus-circle" aria-hidden="true"></i></button>' +
                '</td>' +
                '</tr>';
        }).join('');

        const total = Object.keys(pro.setup).map((slotId) => pro.setup[slotId]).filter(Boolean).map(findProduct).filter(Boolean)
            .reduce((sum, p) => sum + p.price, 0);

        els.proSetupModalBody.innerHTML =
            '<div class="table-responsive">' +
            '<table class="table table-sm pro-setup-table align-middle">' +
            '<thead><tr><th>Slot</th><th>Item</th><th class="text-end">Price</th></tr></thead>' +
            '<tbody>' + rows + '</tbody>' +
            '<tfoot><tr><th colspan="2">Total</th><th class="text-end">' + formatPrice(total) + '</th></tr></tfoot>' +
            '</table>' +
            '</div>';

        els.proSetupModalBody.querySelectorAll('.pro-add-individual-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                selectItem(btn.getAttribute('data-slot'), btn.getAttribute('data-product-id'));
            });
        });

        if (els.proSetupModalFooter) {
            els.proSetupModalFooter.innerHTML =
                '<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>' +
                '<button type="button" class="btn btn-primary pro-copy-entire-btn" data-pro-id="' + pro.id + '">Copy Entire Setup</button>';
            const copyBtn = els.proSetupModalFooter.querySelector('.pro-copy-entire-btn');
            if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                    copyProSetup(pro.id);
                    if (proSetupModal) proSetupModal.hide();
                });
            }
        }

        if (proSetupModal) proSetupModal.show();
    }

    function copyProSetup(proId) {
        const pro = PRO_SETUPS.find((p) => p.id === proId);
        if (!pro) return;

        Object.keys(pro.setup).forEach((slotId) => {
            state.slots[slotId] = pro.setup[slotId];
        });
        recalculateEverything();
        showToast('\u2713 ' + pro.name + '\u2019s setup copied!', 'success');
    }

    // ---------------------------------------------------------------
    // Wishlist
    // ---------------------------------------------------------------

    function toggleWishlist(productId) {
        const index = state.wishlist.indexOf(productId);
        if (index !== -1) {
            state.wishlist.splice(index, 1);
        } else {
            state.wishlist.push(productId);
        }
        saveToStorage(WISHLIST_KEY, state.wishlist);
        renderWishlist();
    }

    function renderWishlist() {
        if (!els.wishlistRow) return;

        if (state.wishlist.length === 0) {
            els.wishlistRow.innerHTML = '<p class="text-muted small mb-0">No wishlist items yet. Use the heart icon in the item picker to save gear for later.</p>';
            return;
        }

        els.wishlistRow.innerHTML = state.wishlist.map((productId) => {
            const product = findProduct(productId);
            if (!product) return '';
            return '<div class="card wishlist-card" data-product-id="' + product.id + '">' +
                '<div class="d-flex justify-content-between align-items-start">' +
                '<p class="small fw-semibold mb-1">' + escapeHtml(product.brand) + ' ' + escapeHtml(product.name) + '</p>' +
                '<button type="button" class="btn btn-sm btn-link p-0 text-danger wishlist-remove-btn" data-product-id="' + product.id + '" aria-label="Remove from wishlist"><i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
                '</div>' +
                '<p class="small text-muted mb-2">' + formatPrice(product.price) + '</p>' +
                '<button type="button" class="btn btn-sm btn-outline-primary w-100 wishlist-add-btn" data-product-id="' + product.id + '">Add to Setup</button>' +
                '</div>';
        }).join('');

        els.wishlistRow.querySelectorAll('.wishlist-remove-btn').forEach((btn) => {
            btn.addEventListener('click', () => toggleWishlist(btn.getAttribute('data-product-id')));
        });
        els.wishlistRow.querySelectorAll('.wishlist-add-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const productId = btn.getAttribute('data-product-id');
                const product = findProduct(productId);
                if (product) selectItem(product.slot, productId);
            });
        });
    }

    // ---------------------------------------------------------------
    // Save / Load Setups (localStorage)
    // ---------------------------------------------------------------

    function openSaveSetupModal() {
        if (filledEntries().length === 0) {
            showToast('Add at least one item before saving your setup.', 'warning');
            return;
        }
        if (els.setupNameInput) els.setupNameInput.value = '';
        if (saveSetupModal) saveSetupModal.show();
    }

    function confirmSaveSetup() {
        const name = (els.setupNameInput && els.setupNameInput.value.trim()) || '';
        if (!name) {
            showToast('Give your setup a name first.', 'warning');
            return;
        }
        state.savedSetups.push({
            id: 'setup-' + Date.now(),
            name,
            slots: Object.assign({}, state.slots),
            createdAt: new Date().toISOString()
        });
        saveToStorage(SAVED_SETUPS_KEY, state.savedSetups);
        renderSavedSetups();
        populateComparisonSelects();
        if (saveSetupModal) saveSetupModal.hide();
        showToast('Saved "' + name + '".', 'success');
    }

    function loadSavedSetup(setupId) {
        const saved = state.savedSetups.find((s) => s.id === setupId);
        if (!saved) return;
        state.slots = Object.assign({}, saved.slots);
        recalculateEverything();
        showToast('Loaded "' + saved.name + '".', 'success');
    }

    function deleteSavedSetup(setupId) {
        state.savedSetups = state.savedSetups.filter((s) => s.id !== setupId);
        saveToStorage(SAVED_SETUPS_KEY, state.savedSetups);
        renderSavedSetups();
        populateComparisonSelects();
    }

    function renderSavedSetups() {
        if (!els.savedSetupsList) return;

        if (state.savedSetups.length === 0) {
            els.savedSetupsList.innerHTML = '<p class="text-muted small mb-0">No saved setups yet. Build a layout and click Save Setup.</p>';
            return;
        }

        els.savedSetupsList.innerHTML = state.savedSetups.map((saved) => {
            const itemCount = Object.keys(saved.slots).filter((slotId) => saved.slots[slotId]).length;
            return '<div class="saved-setup-row d-flex justify-content-between align-items-center">' +
                '<div>' +
                '<p class="mb-0 fw-semibold small">' + escapeHtml(saved.name) + '</p>' +
                '<p class="mb-0 text-muted small">' + itemCount + ' items</p>' +
                '</div>' +
                '<div class="d-flex gap-2">' +
                '<button type="button" class="btn btn-sm btn-outline-primary saved-setup-load-btn" data-setup-id="' + saved.id + '">Load</button>' +
                '<button type="button" class="btn btn-sm btn-outline-danger saved-setup-delete-btn" data-setup-id="' + saved.id + '"><i class="bi bi-trash" aria-hidden="true"></i></button>' +
                '</div>' +
                '</div>';
        }).join('');

        els.savedSetupsList.querySelectorAll('.saved-setup-load-btn').forEach((btn) => {
            btn.addEventListener('click', () => loadSavedSetup(btn.getAttribute('data-setup-id')));
        });
        els.savedSetupsList.querySelectorAll('.saved-setup-delete-btn').forEach((btn) => {
            btn.addEventListener('click', () => deleteSavedSetup(btn.getAttribute('data-setup-id')));
        });
    }

    // ---------------------------------------------------------------
    // Setup Comparison Matrix
    // ---------------------------------------------------------------

    function populateComparisonSelects() {
        [els.compareSetupA, els.compareSetupB].forEach((select) => {
            if (!select) return;
            const previousValue = select.value;
            select.innerHTML = '<option value="">Select a saved setup\u2026</option>' +
                state.savedSetups.map((s) => '<option value="' + s.id + '">' + escapeHtml(s.name) + '</option>').join('');
            if (state.savedSetups.some((s) => s.id === previousValue)) {
                select.value = previousValue;
            }
        });
    }

    function computeSetupTotalsAndScore(slots) {
        const entries = Object.keys(slots)
            .filter((slotId) => slots[slotId])
            .map((slotId) => ({ slotId, product: findProduct(slots[slotId]) }))
            .filter((entry) => entry.product);
        const total = entries.reduce((sum, e) => sum + e.product.price, 0);
        let overall = 0;
        if (entries.length > 0) {
            const metricSum = entries.reduce((sum, e) => sum + (e.product.scores.performance + e.product.scores.comfort + e.product.scores.competitive + e.product.scores.value) / 4, 0);
            overall = Math.round(metricSum / entries.length);
        }
        return { entries, total, overall };
    }

    function openComparison() {
        const idA = els.compareSetupA && els.compareSetupA.value;
        const idB = els.compareSetupB && els.compareSetupB.value;
        if (!idA || !idB) {
            showToast('Choose two saved setups to compare.', 'warning');
            return;
        }
        if (idA === idB) {
            showToast('Choose two different setups to compare.', 'warning');
            return;
        }
        const setupA = state.savedSetups.find((s) => s.id === idA);
        const setupB = state.savedSetups.find((s) => s.id === idB);
        if (!setupA || !setupB) return;

        const dataA = computeSetupTotalsAndScore(setupA.slots);
        const dataB = computeSetupTotalsAndScore(setupB.slots);

        const rows = SETUP_SLOTS.map((slot) => {
            const productA = setupA.slots[slot.id] ? findProduct(setupA.slots[slot.id]) : null;
            const productB = setupB.slots[slot.id] ? findProduct(setupB.slots[slot.id]) : null;
            return '<tr>' +
                '<th scope="row">' + escapeHtml(slot.label) + '</th>' +
                '<td>' + (productA ? escapeHtml(productA.brand + ' ' + productA.name) : '<span class="text-muted">\u2014</span>') + '</td>' +
                '<td>' + (productB ? escapeHtml(productB.brand + ' ' + productB.name) : '<span class="text-muted">\u2014</span>') + '</td>' +
                '</tr>';
        }).join('');

        const priceHighlightA = dataA.total <= dataB.total ? ' class="highlight-best"' : '';
        const priceHighlightB = dataB.total <= dataA.total ? ' class="highlight-best"' : '';
        const scoreHighlightA = dataA.overall >= dataB.overall ? ' class="highlight-best"' : '';
        const scoreHighlightB = dataB.overall >= dataA.overall ? ' class="highlight-best"' : '';

        els.comparisonModalBody.innerHTML =
            '<div class="table-responsive">' +
            '<table class="table table-bordered compare-table align-middle">' +
            '<thead><tr><th></th><th>' + escapeHtml(setupA.name) + '</th><th>' + escapeHtml(setupB.name) + '</th></tr></thead>' +
            '<tbody>' +
            rows +
            '<tr><th scope="row">Total Price</th><td' + priceHighlightA + '>' + formatPrice(dataA.total) + '</td><td' + priceHighlightB + '>' + formatPrice(dataB.total) + '</td></tr>' +
            '<tr><th scope="row">Setup Score</th><td' + scoreHighlightA + '>' + dataA.overall + ' / 100</td><td' + scoreHighlightB + '>' + dataB.overall + ' / 100</td></tr>' +
            '</tbody>' +
            '</table>' +
            '</div>' +
            '<p class="small text-muted mb-0"><span class="highlight-best-swatch d-inline-block align-middle"></span> = lower price or higher score.</p>';

        if (comparisonModal) comparisonModal.show();
    }

    // ---------------------------------------------------------------
    // Reset Logic
    // ---------------------------------------------------------------

    function confirmReset() {
        SETUP_SLOTS.forEach((slot) => { state.slots[slot.id] = null; });
        state.activeStyle = null;
        renderStyleActiveState();
        renderStyleRecommendations();
        recalculateEverything();
        if (resetConfirmModal) resetConfirmModal.hide();
        showToast('Setup reset.', 'secondary');
    }

    // ---------------------------------------------------------------
    // Event bindings
    // ---------------------------------------------------------------

    function bindEvents() {
        if (els.platformSelect) {
            els.platformSelect.addEventListener('change', function () {
                state.platform = this.value;
                renderCompatibility();
            });
        }

        if (els.budgetInput) {
            els.budgetInput.addEventListener('input', function () {
                const value = parseFloat(this.value) || 0;
                state.budget = value;
                if (els.budgetSlider) els.budgetSlider.value = String(Math.min(value, parseFloat(els.budgetSlider.max)));
                renderBudget();
            });
        }
        if (els.budgetSlider) {
            els.budgetSlider.addEventListener('input', function () {
                const value = parseFloat(this.value) || 0;
                state.budget = value;
                if (els.budgetInput) els.budgetInput.value = String(value);
                renderBudget();
            });
        }

        if (els.saveSetupBtn) els.saveSetupBtn.addEventListener('click', openSaveSetupModal);
        if (els.confirmSaveSetupBtn) els.confirmSaveSetupBtn.addEventListener('click', confirmSaveSetup);
        if (els.compareSetupsBtn) els.compareSetupsBtn.addEventListener('click', openComparison);
        if (els.resetSetupBtn) {
            els.resetSetupBtn.addEventListener('click', () => {
                if (resetConfirmModal) resetConfirmModal.show();
            });
        }
        if (els.confirmResetBtn) els.confirmResetBtn.addEventListener('click', confirmReset);
    }

    return { init };
})();