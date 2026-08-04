// ReadyPlayer3 - site interactions

document.addEventListener('DOMContentLoaded', function () {
    initRecommendGame();
    initChatWidget();
    if (typeof PERIPHERALS_DATA !== 'undefined') {
        PeripheralsPage.init();
    }
});

/**
 * "Recommend Me a Game" interaction.
 * Picks a random game from a small local catalog and renders it
 * into the #recommendResult container on the home page.
 */
function initRecommendGame() {
    var btn = document.getElementById('recommendBtn');
    var resultBox = document.getElementById('recommendResult');

    if (!btn || !resultBox) {
        return;
    }

    var catalog = [
        {
            title: 'Devil May Cry',
            genre: 'Action Fighting',
            rating: '4.8 / 5',
            price: '$36.90',
            blurb: 'Deep character builds and fast, combo-heavy combat.'
        },
        {
            title: 'Valorant',
            genre: 'Tactical Shooter',
            rating: '4.6 / 5',
            price: 'Free!',
            blurb: 'Ability usage and tactical battles that reward planning.'
        },
        {
            title: 'Final Fantasy 7 Remake',
            genre: 'JRPG',
            rating: '4.9 / 5',
            price: '$39.99',
            blurb: 'Squad up and take down enemies together.'
        },
        {
            title: 'Viewfinder',
            genre: 'Puzzle Adventure',
            rating: '4.7 / 5',
            price: '$24.99',
            blurb: 'Clever puzzles wrapped in a disorienting, reality warping world of photography.'
        }
    ];

    var lastIndex = -1;

    btn.addEventListener('click', function () {
        var index = Math.floor(Math.random() * catalog.length);

        // Avoid showing the same recommendation twice in a row when possible
        if (catalog.length > 1) {
            while (index === lastIndex) {
                index = Math.floor(Math.random() * catalog.length);
            }
        }
        lastIndex = index;

        var game = catalog[index];

        resultBox.innerHTML =
            '<div class="recommend-card-inner p-4 border rounded bg-white shadow-sm">' +
            '<h3 class="h5 mb-1">' + escapeHtml(game.title) + '</h3>' +
            '<p class="text-muted mb-1">' + escapeHtml(game.genre) + '</p>' +
            '<p class="mb-2">Rating: ' + escapeHtml(game.rating) + ' &middot; ' + escapeHtml(game.price) + '</p>' +
            '<p class="mb-0">' + escapeHtml(game.blurb) + '</p>' +
            '</div>';
    });
}

/**
 * Minimal HTML escaping helper so dynamically inserted text
 * never introduces markup from the data source.
 */
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Floating chat widget (bottom-left, fixed).
 * - Toggle button opens/closes a small chat panel.
 * - After the visitor has been on the page for 1 minute without
 *   opening the chat, a nudge notification appears above it.
 */
function initChatWidget() {
    var toggleBtn = document.getElementById('chatToggleBtn');
    var panel = document.getElementById('chatPanel');
    var panelCloseBtn = document.getElementById('chatPanelClose');
    var notification = document.getElementById('chatNotification');
    var notificationCloseBtn = document.getElementById('chatNotificationClose');
    var chatForm = document.getElementById('chatForm');

    if (!toggleBtn || !panel) {
        return; // Widget isn't on this page
    }

    var NUDGE_DELAY_MS = 60 * 1000; // 1 minute
    var chatOpenedAlready = false;
    var nudgeTimer = null;

    function openPanel() {
        panel.classList.remove('d-none');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-label', 'Close chat');
        chatOpenedAlready = true;
        hideNotification();
        if (nudgeTimer) {
            clearTimeout(nudgeTimer);
            nudgeTimer = null;
        }
        var input = document.getElementById('chatInput');
        if (input) {
            input.focus();
        }
    }

    function closePanel() {
        panel.classList.add('d-none');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Open chat');
    }

    function showNotification() {
        if (chatOpenedAlready || !notification) {
            return;
        }
        notification.classList.remove('d-none');
    }

    function hideNotification() {
        if (notification) {
            notification.classList.add('d-none');
        }
    }

    toggleBtn.addEventListener('click', function () {
        var isOpen = !panel.classList.contains('d-none');
        if (isOpen) {
            closePanel();
        } else {
            openPanel();
        }
    });

    if (panelCloseBtn) {
        panelCloseBtn.addEventListener('click', closePanel);
    }

    if (notificationCloseBtn) {
        notificationCloseBtn.addEventListener('click', hideNotification);
    }

    // Clicking the nudge notification itself opens the chat panel
    if (notification) {
        notification.addEventListener('click', function (event) {
            if (event.target === notificationCloseBtn || (notificationCloseBtn && notificationCloseBtn.contains(event.target))) {
                return;
            }
            openPanel();
        });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Placeholder submit handler until a real chat backend is wired up
            var input = document.getElementById('chatInput');
            if (input) {
                input.value = '';
            }
        });
    }

    nudgeTimer = setTimeout(showNotification, NUDGE_DELAY_MS);
}

/* ==========================================================
   Peripherals page - mock data + interactive controller.
   Depends on nothing else in this file; PERIPHERALS_DATA and
   PERIPHERAL_COMPARE_TRAITS below are consumed by PeripheralsPage.
   ========================================================== */

/**
 * Mock catalog data for the Peripherals page.
 *
 * Each item shares a common shape (name, type, brand, price, connectivity,
 * image, rating, stock, specs, reviews) so the grid, filter, detail panel,
 * and comparison table can all be driven generically instead of needing
 * per-category branching in the render code.
 *
 * `specs` keys are intentionally the same across every item of a given
 * `type` (see PERIPHERAL_COMPARE_TRAITS below) so the comparison table can
 * simply look up `item.specs[trait]` for whichever traits apply.
 */

// Which spec keys matter for a side-by-side comparison of each type.
// Order here also controls row order in the comparison table.
const PERIPHERAL_COMPARE_TRAITS = {
    Mouse: ['Sensor', 'DPI', 'Polling Rate', 'Weight', 'Battery Life', 'Buttons'],
    Keyboard: ['Switch Type', 'Layout', 'Backlight', 'Polling Rate', 'Connectivity', 'Battery Life'],
    Monitor: ['Panel Type', 'Refresh Rate', 'Resolution', 'Response Time', 'Screen Size', 'HDR'],
    Headset: ['Driver Size', 'Frequency Response', 'Microphone', 'Surround Sound', 'Battery Life', 'Weight'],
    Earpiece: ['Driver Size', 'Frequency Response', 'ANC', 'Water Resistance', 'Battery Life', 'Weight'],
    Mic: ['Polar Pattern', 'Frequency Response', 'Sample Rate', 'Bit Depth', 'Connectivity', 'Mounting'],
    Mousepad: ['Surface Type', 'Dimensions', 'Thickness', 'Base Material', 'Stitched Edges', 'RGB']
};

const PERIPHERALS_DATA = [
    // ---------- Mouse ----------
    {
        id: 'mouse-vortex-x1',
        type: 'Mouse',
        brand: 'Vortex',
        name: 'Vortex X1 Wireless Gaming Mouse',
        price: 79.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 4.7,
        reviewCount: 312,
        stock: 'in-stock',
        specs: {
            'Sensor': 'Optical, 26K',
            'DPI': '26,000',
            'Polling Rate': '1000 Hz',
            'Weight': '63 g',
            'Battery Life': '70 hrs',
            'Buttons': '6 programmable'
        },
        reviews: [
            { author: 'Alex R.', rating: 5, comment: 'Incredibly light and the sensor tracks perfectly at any speed.' },
            { author: 'Jamie T.', rating: 4, comment: 'Great mouse overall, wish the battery lasted a little longer.' }
        ]
    },
    {
        id: 'mouse-clutch-gx',
        type: 'Mouse',
        brand: 'ClutchPlay',
        name: 'ClutchPlay GX Wired Mouse',
        price: 34.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.3,
        reviewCount: 148,
        stock: 'low-stock',
        specs: {
            'Sensor': 'Optical, 16K',
            'DPI': '16,000',
            'Polling Rate': '1000 Hz',
            'Weight': '82 g',
            'Battery Life': 'N/A (wired)',
            'Buttons': '8 programmable'
        },
        reviews: [
            { author: 'Priya S.', rating: 4, comment: 'Solid budget mouse, cable is a bit stiff out of the box.' },
            { author: 'Dev K.', rating: 5, comment: 'Best value wired mouse I have used for FPS games.' }
        ]
    },

    // ---------- Keyboard ----------
    {
        id: 'keyboard-neotech-k80',
        type: 'Keyboard',
        brand: 'NeoTech',
        name: 'NeoTech K80 Mechanical Keyboard',
        price: 129.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.8,
        reviewCount: 421,
        stock: 'in-stock',
        specs: {
            'Switch Type': 'Hot-swap linear',
            'Layout': 'Full-size (104-key)',
            'Backlight': 'Per-key RGB',
            'Polling Rate': '1000 Hz',
            'Connectivity': 'Wired (USB-C)',
            'Battery Life': 'N/A (wired)'
        },
        reviews: [
            { author: 'Morgan L.', rating: 5, comment: 'Hot-swap sockets made it easy to try different switches.' },
            { author: 'Sam W.', rating: 5, comment: 'Sturdy aluminum plate, typing feels premium.' }
        ]
    },
    {
        id: 'keyboard-waveform-tkl',
        type: 'Keyboard',
        brand: 'WaveForm',
        name: 'WaveForm TKL Wireless Keyboard',
        price: 99.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 4.5,
        reviewCount: 203,
        stock: 'in-stock',
        specs: {
            'Switch Type': 'Tactile brown',
            'Layout': 'Tenkeyless (87-key)',
            'Backlight': 'White backlight',
            'Polling Rate': '1000 Hz (2.4 GHz)',
            'Connectivity': 'Wireless / Bluetooth',
            'Battery Life': '200 hrs (backlight off)'
        },
        reviews: [
            { author: 'Chris B.', rating: 4, comment: 'Great for a clean desk setup, latency feels the same as wired.' },
            { author: 'Nadia F.', rating: 5, comment: 'Love the compact layout, more desk space for mouse swings.' }
        ]
    },

    // ---------- Monitor ----------
    {
        id: 'monitor-pulsegear-27',
        type: 'Monitor',
        brand: 'PulseGear',
        name: 'PulseGear 27" 240Hz Gaming Monitor',
        price: 349.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.6,
        reviewCount: 178,
        stock: 'in-stock',
        specs: {
            'Panel Type': 'Fast IPS',
            'Refresh Rate': '240 Hz',
            'Resolution': '2560 x 1440',
            'Response Time': '1 ms (GtG)',
            'Screen Size': '27 in',
            'HDR': 'HDR400'
        },
        reviews: [
            { author: 'Owen P.', rating: 5, comment: 'Motion clarity is fantastic for fast-paced shooters.' },
            { author: 'Lena V.', rating: 4, comment: 'Colors are vivid, stand could be a bit more adjustable.' }
        ]
    },
    {
        id: 'monitor-gripline-24',
        type: 'Monitor',
        brand: 'GripLine',
        name: 'GripLine 24" 165Hz Gaming Monitor',
        price: 199.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.2,
        reviewCount: 96,
        stock: 'low-stock',
        specs: {
            'Panel Type': 'VA',
            'Refresh Rate': '165 Hz',
            'Resolution': '1920 x 1080',
            'Response Time': '4 ms (GtG)',
            'Screen Size': '24 in',
            'HDR': 'HDR10'
        },
        reviews: [
            { author: 'Tariq A.', rating: 4, comment: 'Great entry point into high refresh rate gaming.' },
            { author: 'Ivy C.', rating: 4, comment: 'Some black smearing in dark scenes, otherwise solid.' }
        ]
    },

    // ---------- Headset ----------
    {
        id: 'headset-sonicwave-h7',
        type: 'Headset',
        brand: 'SonicWave',
        name: 'SonicWave H7 Wireless Headset',
        price: 149.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 4.6,
        reviewCount: 265,
        stock: 'in-stock',
        specs: {
            'Driver Size': '50 mm',
            'Frequency Response': '20 Hz - 20 kHz',
            'Microphone': 'Detachable cardioid',
            'Surround Sound': '7.1 virtual',
            'Battery Life': '30 hrs',
            'Weight': '312 g'
        },
        reviews: [
            { author: 'Ruth N.', rating: 5, comment: 'Comfortable for long sessions and the mic sounds clean.' },
            { author: 'Ben H.', rating: 4, comment: 'Great sound, ear cups run a little warm after a few hours.' }
        ]
    },
    {
        id: 'headset-echoforge-e2',
        type: 'Headset',
        brand: 'EchoForge',
        name: 'EchoForge E2 Wired Headset',
        price: 59.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.1,
        reviewCount: 134,
        stock: 'in-stock',
        specs: {
            'Driver Size': '40 mm',
            'Frequency Response': '20 Hz - 20 kHz',
            'Microphone': 'Fixed boom',
            'Surround Sound': 'Stereo',
            'Battery Life': 'N/A (wired)',
            'Weight': '278 g'
        },
        reviews: [
            { author: 'Kelly M.', rating: 4, comment: 'Good budget headset for the price, mic is a little quiet.' },
            { author: 'Theo J.', rating: 4, comment: 'Comfortable clamp, does the job for casual gaming.' }
        ]
    },

    // ---------- Earpiece (true wireless earbuds) ----------
    {
        id: 'earpiece-airloop-buds',
        type: 'Earpiece',
        brand: 'AirLoop',
        name: 'AirLoop Buds Pro Gaming Earbuds',
        price: 89.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 4.4,
        reviewCount: 87,
        stock: 'in-stock',
        specs: {
            'Driver Size': '10 mm',
            'Frequency Response': '20 Hz - 20 kHz',
            'ANC': 'Yes, hybrid',
            'Water Resistance': 'IPX4',
            'Battery Life': '6 hrs (24 hrs w/ case)',
            'Weight': '4.8 g per bud'
        },
        reviews: [
            { author: 'Grace O.', rating: 4, comment: 'Low latency mode makes a real difference in shooters.' },
            { author: 'Marcus D.', rating: 5, comment: 'Surprisingly good bass for such a small driver.' }
        ]
    },
    {
        id: 'earpiece-nimbus-lite',
        type: 'Earpiece',
        brand: 'Nimbus',
        name: 'Nimbus Lite Wireless Earpiece',
        price: 39.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 3.9,
        reviewCount: 52,
        stock: 'out-of-stock',
        specs: {
            'Driver Size': '8 mm',
            'Frequency Response': '30 Hz - 18 kHz',
            'ANC': 'No',
            'Water Resistance': 'IPX2',
            'Battery Life': '4 hrs (16 hrs w/ case)',
            'Weight': '3.9 g per bud'
        },
        reviews: [
            { author: 'Faye L.', rating: 4, comment: 'Fine for casual listening, not ideal for competitive play.' },
            { author: 'Ken U.', rating: 4, comment: 'Fit is comfortable, sound is a bit thin on bass.' }
        ]
    },

    // ---------- Mic ----------
    {
        id: 'mic-broadcastr-usb1',
        type: 'Mic',
        brand: 'Broadcastr',
        name: 'Broadcastr USB-1 Streaming Mic',
        price: 119.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.7,
        reviewCount: 231,
        stock: 'in-stock',
        specs: {
            'Polar Pattern': 'Cardioid',
            'Frequency Response': '20 Hz - 20 kHz',
            'Sample Rate': '48 kHz',
            'Bit Depth': '24-bit',
            'Connectivity': 'USB-C',
            'Mounting': 'Desk stand + boom compatible'
        },
        reviews: [
            { author: 'Yara M.', rating: 5, comment: 'Crisp, clean audio right out of the box, no interface needed.' },
            { author: 'Colin P.', rating: 4, comment: 'Great mic, gain knob is a little sensitive at high levels.' }
        ]
    },
    {
        id: 'mic-quietroom-lav1',
        type: 'Mic',
        brand: 'QuietRoom',
        name: 'QuietRoom LAV-1 Condenser Mic',
        price: 69.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.3,
        reviewCount: 98,
        stock: 'low-stock',
        specs: {
            'Polar Pattern': 'Supercardioid',
            'Frequency Response': '30 Hz - 18 kHz',
            'Sample Rate': '44.1 kHz',
            'Bit Depth': '16-bit',
            'Connectivity': '3.5 mm (XLR adapter incl.)',
            'Mounting': 'Boom arm only'
        },
        reviews: [
            { author: 'Anya B.', rating: 4, comment: 'Great isolation from keyboard noise thanks to the tight pickup pattern.' },
            { author: 'Felix G.', rating: 4, comment: 'Good value if you already have an audio interface.' }
        ]
    },

    // ---------- Mousepad ----------
    {
        id: 'mousepad-driftmat-xl',
        type: 'Mousepad',
        brand: 'DriftMat',
        name: 'DriftMat XL Extended Mousepad',
        price: 24.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.6,
        reviewCount: 176,
        stock: 'in-stock',
        specs: {
            'Surface Type': 'Micro-woven cloth',
            'Dimensions': '900 x 400 mm',
            'Thickness': '4 mm',
            'Base Material': 'Natural rubber',
            'Stitched Edges': 'Yes',
            'RGB': 'No'
        },
        reviews: [
            { author: 'Wren S.', rating: 5, comment: 'Covers my whole desk, edges have held up after months of use.' },
            { author: 'Idris K.', rating: 4, comment: 'Great glide, a bit thin for wrist comfort.' }
        ]
    },
    {
        id: 'mousepad-glowbase-rgb',
        type: 'Mousepad',
        brand: 'GlowBase',
        name: 'GlowBase RGB Hard Mousepad',
        price: 44.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.0,
        reviewCount: 61,
        stock: 'in-stock',
        specs: {
            'Surface Type': 'Hard polycarbonate',
            'Dimensions': '350 x 250 mm',
            'Thickness': '3 mm',
            'Base Material': 'ABS plastic',
            'Stitched Edges': 'N/A (hard edge)',
            'RGB': 'Yes, 16.8M colors'
        },
        reviews: [
            { author: 'Talia R.', rating: 4, comment: 'RGB looks great and syncs with the rest of my setup.' },
            { author: 'Noah E.', rating: 4, comment: 'Fast surface, a bit loud with mechanical mouse feet.' }
        ]
    }
];

var PeripheralsPage = (function () {
    // ---- State ----
    var state = {
        filters: {
            category: 'all',
            priceMax: null,
            brand: 'all',
            connectivity: 'all'
        },
        compareList: [] // array of peripheral ids
    };

    // ---- Cached DOM references (populated in init) ----
    var els = {};

    function init() {
        cacheElements();
        populateFilterOptions();
        bindFilterEvents();
        bindOverlayEvents();
        bindTrayEvents();
        renderGrid();
    }

    function cacheElements() {
        els.grid = document.getElementById('peripheralsGrid');
        els.resultsCount = document.getElementById('resultsCount');
        els.emptyState = document.getElementById('emptyState');

        els.categorySelect = document.getElementById('filterCategory');
        els.priceSelect = document.getElementById('filterPrice');
        els.brandSelect = document.getElementById('filterBrand');
        els.connectivitySelect = document.getElementById('filterConnectivity');
        els.resetFiltersBtn = document.getElementById('resetFiltersBtn');

        els.detailOverlay = document.getElementById('detailOverlay');
        els.detailPanel = document.getElementById('detailPanel');

        els.compareTray = document.getElementById('compareTray');
        els.compareTrayItems = document.getElementById('compareTrayItems');
        els.compareTrayMeta = document.getElementById('compareTrayMeta');
        els.compareBtn = document.getElementById('compareBtn');
        els.clearTrayBtn = document.getElementById('clearTrayBtn');

        els.compareOverlay = document.getElementById('compareOverlay');
        els.compareOverlayBody = document.getElementById('compareOverlayBody');
        els.compareOverlayTitle = document.getElementById('compareOverlayTitle');
        els.compareOverlayCloseBtn = document.getElementById('compareOverlayCloseBtn');

        els.toastRegion = document.getElementById('filterToastRegion');
    }

    // ---------------------------------------------------------------
    // Filter bar
    // ---------------------------------------------------------------

    function populateFilterOptions() {
        var categories = uniqueValues(PERIPHERALS_DATA, 'type').sort();
        var brands = uniqueValues(PERIPHERALS_DATA, 'brand').sort();

        appendOptions(els.categorySelect, categories);
        appendOptions(els.brandSelect, brands);
    }

    function uniqueValues(list, key) {
        var seen = {};
        var result = [];
        list.forEach(function (item) {
            if (!seen[item[key]]) {
                seen[item[key]] = true;
                result.push(item[key]);
            }
        });
        return result;
    }

    function appendOptions(selectEl, values) {
        if (!selectEl) return;
        values.forEach(function (value) {
            var option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectEl.appendChild(option);
        });
    }

    function bindFilterEvents() {
        if (els.categorySelect) {
            els.categorySelect.addEventListener('change', function () {
                state.filters.category = this.value;
                renderGrid();
            });
        }
        if (els.priceSelect) {
            els.priceSelect.addEventListener('change', function () {
                state.filters.priceMax = this.value === 'all' ? null : parseFloat(this.value);
                renderGrid();
            });
        }
        if (els.brandSelect) {
            els.brandSelect.addEventListener('change', function () {
                state.filters.brand = this.value;
                renderGrid();
            });
        }
        if (els.connectivitySelect) {
            els.connectivitySelect.addEventListener('change', function () {
                state.filters.connectivity = this.value;
                renderGrid();
            });
        }
        if (els.resetFiltersBtn) {
            els.resetFiltersBtn.addEventListener('click', resetFilters);
        }
    }

    function resetFilters() {
        state.filters = { category: 'all', priceMax: null, brand: 'all', connectivity: 'all' };
        if (els.categorySelect) els.categorySelect.value = 'all';
        if (els.priceSelect) els.priceSelect.value = 'all';
        if (els.brandSelect) els.brandSelect.value = 'all';
        if (els.connectivitySelect) els.connectivitySelect.value = 'all';
        renderGrid();
    }

    function getFilteredData() {
        return PERIPHERALS_DATA.filter(function (item) {
            if (state.filters.category !== 'all' && item.type !== state.filters.category) {
                return false;
            }
            if (state.filters.priceMax !== null && item.price > state.filters.priceMax) {
                return false;
            }
            if (state.filters.brand !== 'all' && item.brand !== state.filters.brand) {
                return false;
            }
            if (state.filters.connectivity !== 'all' && item.connectivity !== state.filters.connectivity) {
                return false;
            }
            return true;
        });
    }

    // ---------------------------------------------------------------
    // Grid + cards
    // ---------------------------------------------------------------

    function renderGrid() {
        var filtered = getFilteredData();

        if (els.resultsCount) {
            els.resultsCount.textContent = 'Showing ' + filtered.length + ' of ' + PERIPHERALS_DATA.length + ' peripherals';
        }

        if (!els.grid) return;
        els.grid.innerHTML = '';

        if (filtered.length === 0) {
            if (els.emptyState) els.emptyState.classList.remove('d-none');
            return;
        }
        if (els.emptyState) els.emptyState.classList.add('d-none');

        filtered.forEach(function (item) {
            els.grid.appendChild(buildCard(item));
        });
    }

    function buildCard(item) {
        var col = document.createElement('div');
        col.className = 'col';

        var isComparing = state.compareList.indexOf(item.id) !== -1;

        col.innerHTML =
            '<div class="card peripheral-card h-100" data-id="' + item.id + '" tabindex="0" role="button" ' +
            'aria-label="View details for ' + escapeHtml(item.name) + '">' +
            '<div class="peripheral-card-image-wrap">' +
            '<img src="' + item.image + '" class="card-img-top" alt="' + escapeHtml(item.name) + ', a ' + escapeHtml(item.type.toLowerCase()) + ' by ' + escapeHtml(item.brand) + '" />' +
            '<span class="badge type-badge">' + escapeHtml(item.type) + '</span>' +
            '</div>' +
            '<div class="card-body d-flex flex-column">' +
            '<h3 class="h6 card-title mb-1">' + escapeHtml(item.name) + '</h3>' +
            '<p class="card-text text-muted small mb-2">' + escapeHtml(item.brand) + ' &middot; ' + escapeHtml(item.connectivity) + '</p>' +
            '<p class="card-text card-price fw-bold mb-3">$' + item.price.toFixed(2) + '</p>' +
            '<div class="mt-auto d-flex gap-2">' +
            '<button type="button" class="btn btn-sm btn-outline-primary flex-grow-1 view-details-btn">View Details</button>' +
            '<button type="button" class="btn btn-sm btn-outline-success compare-toggle-btn' + (isComparing ? ' active' : '') + '" aria-pressed="' + isComparing + '">' +
            (isComparing ? '&check; Added' : '+ Compare') +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>';

        var cardEl = col.querySelector('.peripheral-card');
        var viewBtn = col.querySelector('.view-details-btn');
        var compareBtn = col.querySelector('.compare-toggle-btn');

        function triggerOpen(event) {
            openDetailOverlay(item, cardEl);
        }

        cardEl.addEventListener('click', triggerOpen);
        cardEl.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                triggerOpen(event);
            }
        });

        viewBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            openDetailOverlay(item, cardEl);
        });

        compareBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleCompareItem(item.id);
        });

        return col;
    }

    // ---------------------------------------------------------------
    // Detail / expanded overlay
    // ---------------------------------------------------------------

    function openDetailOverlay(item, originEl) {
        if (!els.detailOverlay || !els.detailPanel) return;

        els.detailPanel.innerHTML = buildDetailContent(item);

        // Grow the panel from roughly where the card was clicked, for a
        // "popping out of the grid" feel rather than a generic centered fade.
        if (originEl) {
            var rect = originEl.getBoundingClientRect();
            var originX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
            var originY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
            els.detailPanel.style.transformOrigin = originX + '% ' + originY + '%';
        }

        els.detailOverlay.removeAttribute('hidden');
        // Force a reflow so the transition triggers rather than jump-cutting straight to open.
        void els.detailOverlay.offsetWidth;
        els.detailOverlay.classList.add('is-open');
        document.body.classList.add('overlay-open');

        var closeBtn = els.detailPanel.querySelector('.detail-panel-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeDetailOverlay);
        }
        var compareBtn = els.detailPanel.querySelector('.detail-compare-btn');
        if (compareBtn) {
            compareBtn.addEventListener('click', function () {
                toggleCompareItem(item.id);
                compareBtn.classList.toggle('active', state.compareList.indexOf(item.id) !== -1);
                compareBtn.textContent = state.compareList.indexOf(item.id) !== -1 ? '\u2713 Added to Compare' : '+ Add to Compare';
            });
        }
    }

    function closeDetailOverlay() {
        if (!els.detailOverlay) return;
        els.detailOverlay.classList.remove('is-open');
        document.body.classList.remove('overlay-open');
        setTimeout(function () {
            els.detailOverlay.setAttribute('hidden', '');
        }, 260); // matches the CSS transition duration
    }

    function buildDetailContent(item) {
        var isComparing = state.compareList.indexOf(item.id) !== -1;
        var stars = buildStarRating(item.rating);

        var specsRows = Object.keys(item.specs).map(function (key) {
            return '<tr><th scope="row">' + escapeHtml(key) + '</th><td>' + escapeHtml(item.specs[key]) + '</td></tr>';
        }).join('');

        var reviewsHtml = item.reviews.map(function (review) {
            return '<div class="detail-review">' +
                '<div class="d-flex justify-content-between">' +
                '<strong>' + escapeHtml(review.author) + '</strong>' +
                '<span class="text-warning">' + buildStarRating(review.rating) + '</span>' +
                '</div>' +
                '<p class="mb-0 text-muted small">' + escapeHtml(review.comment) + '</p>' +
                '</div>';
        }).join('');

        return (
            '<button type="button" class="detail-panel-close" aria-label="Close details"><i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
            '<div class="row g-0">' +
            '<div class="col-md-5">' +
            '<img src="' + item.image + '" class="img-fluid w-100 h-100" style="object-fit:cover; max-height:420px;" alt="' + escapeHtml(item.name) + '" />' +
            '</div>' +
            '<div class="col-md-7">' +
            '<div class="p-4">' +
            '<span class="badge bg-primary mb-2">' + escapeHtml(item.type) + '</span>' +
            '<h2 class="h4 mb-1">' + escapeHtml(item.name) + '</h2>' +
            '<p class="text-muted mb-2">' + escapeHtml(item.brand) + ' &middot; ' + escapeHtml(item.connectivity) + '</p>' +
            '<div class="d-flex align-items-center gap-2 mb-2">' +
            '<span class="text-warning">' + stars + '</span>' +
            '<span class="text-muted small">' + item.rating.toFixed(1) + ' (' + item.reviewCount + ' reviews)</span>' +
            '</div>' +
            '<p class="fs-4 fw-bold mb-2">$' + item.price.toFixed(2) + '</p>' +
            '<span class="badge stock-badge ' + item.stock + ' mb-3 d-inline-block">' + stockLabel(item.stock) + '</span>' +
            '<h3 class="h6 mt-3">Specifications</h3>' +
            '<table class="table table-sm detail-specs-table mb-3">' +
            '<tbody>' + specsRows + '</tbody>' +
            '</table>' +
            '<button type="button" class="btn btn-outline-success detail-compare-btn' + (isComparing ? ' active' : '') + ' mb-4">' +
            (isComparing ? '\u2713 Added to Compare' : '+ Add to Compare') +
            '</button>' +
            '<h3 class="h6">Reviews</h3>' +
            reviewsHtml +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function buildStarRating(rating) {
        var rounded = Math.round(rating);
        var stars = '';
        for (var i = 1; i <= 5; i++) {
            stars += i <= rounded ? '\u2605' : '\u2606';
        }
        return stars;
    }

    function stockLabel(stock) {
        if (stock === 'in-stock') return 'In Stock';
        if (stock === 'low-stock') return 'Low Stock';
        if (stock === 'out-of-stock') return 'Out of Stock';
        return stock;
    }

    function bindOverlayEvents() {
        if (!els.detailOverlay) return;

        var backdrop = els.detailOverlay.querySelector('.detail-overlay-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeDetailOverlay);
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                if (els.detailOverlay && els.detailOverlay.classList.contains('is-open')) {
                    closeDetailOverlay();
                }
                if (els.compareOverlay && els.compareOverlay.classList.contains('is-open')) {
                    closeCompareOverlay();
                }
            }
        });
    }

    // ---------------------------------------------------------------
    // Comparison tray + overlay
    // ---------------------------------------------------------------

    function toggleCompareItem(id) {
        var index = state.compareList.indexOf(id);
        if (index !== -1) {
            state.compareList.splice(index, 1);
            renderTray();
            renderGrid();
            return;
        }

        var item = findById(id);
        if (!item) return;

        // Enforce the "same type only" rule with a gentle, non-blocking toast
        // rather than throwing an exception or blocking the click.
        var currentType = getTrayType();
        if (currentType && item.type !== currentType) {
            showToast('You can only compare items of the same type. Clear the tray first to compare ' + item.type + 's instead.');
            return;
        }

        state.compareList.push(id);
        renderTray();
        renderGrid();
    }

    function getTrayType() {
        if (state.compareList.length === 0) return null;
        var first = findById(state.compareList[0]);
        return first ? first.type : null;
    }

    function findById(id) {
        for (var i = 0; i < PERIPHERALS_DATA.length; i++) {
            if (PERIPHERALS_DATA[i].id === id) return PERIPHERALS_DATA[i];
        }
        return null;
    }

    function renderTray() {
        if (!els.compareTray) return;

        if (state.compareList.length === 0) {
            els.compareTray.classList.remove('is-visible');
            document.body.classList.remove('has-compare-tray');
            return;
        }

        els.compareTray.classList.add('is-visible');
        document.body.classList.add('has-compare-tray');

        var type = getTrayType();

        els.compareTrayItems.innerHTML = state.compareList.map(function (id) {
            var item = findById(id);
            if (!item) return '';
            return '<div class="compare-tray-item" data-id="' + item.id + '">' +
                '<button type="button" class="remove-btn" aria-label="Remove ' + escapeHtml(item.name) + ' from comparison">&times;</button>' +
                '<img src="' + item.image + '" alt="" />' +
                '<span class="item-name">' + escapeHtml(item.name) + '</span>' +
                '</div>';
        }).join('');

        // Wire up each remove button
        var removeButtons = els.compareTrayItems.querySelectorAll('.remove-btn');
        removeButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var wrapper = btn.closest('.compare-tray-item');
                if (wrapper) {
                    toggleCompareItem(wrapper.getAttribute('data-id'));
                }
            });
        });

        els.compareTrayMeta.textContent = state.compareList.length + ' ' + type + (state.compareList.length > 1 ? 's' : '') + ' selected';

        if (els.compareBtn) {
            els.compareBtn.disabled = state.compareList.length < 2;
        }
    }

    function bindTrayEvents() {
        if (els.clearTrayBtn) {
            els.clearTrayBtn.addEventListener('click', function () {
                state.compareList = [];
                renderTray();
                renderGrid();
            });
        }
        if (els.compareBtn) {
            els.compareBtn.addEventListener('click', openCompareOverlay);
        }
        if (els.compareOverlayCloseBtn) {
            els.compareOverlayCloseBtn.addEventListener('click', closeCompareOverlay);
        }
    }

    function openCompareOverlay() {
        if (!els.compareOverlay || state.compareList.length < 2) return;

        var type = getTrayType();
        var items = state.compareList.map(findById).filter(Boolean);
        var traits = PERIPHERAL_COMPARE_TRAITS[type] || [];

        if (els.compareOverlayTitle) {
            els.compareOverlayTitle.textContent = 'Comparing ' + items.length + ' ' + type + (items.length > 1 ? 's' : '');
        }

        var headerCells = items.map(function (item) {
            return '<th class="compare-item-header text-center">' +
                '<img src="' + item.image + '" alt="' + escapeHtml(item.name) + '" />' +
                '<div class="mt-2 small fw-semibold">' + escapeHtml(item.name) + '</div>' +
                '<div class="text-muted small">$' + item.price.toFixed(2) + '</div>' +
                '</th>';
        }).join('');

        var rows = traits.map(function (trait) {
            var cells = items.map(function (item) {
                return '<td class="text-center">' + escapeHtml(item.specs[trait] || '\u2014') + '</td>';
            }).join('');
            return '<tr><th scope="row">' + escapeHtml(trait) + '</th>' + cells + '</tr>';
        }).join('');

        els.compareOverlayBody.innerHTML =
            '<div class="table-responsive">' +
            '<table class="table table-bordered compare-table">' +
            '<thead><tr><th></th>' + headerCells + '</tr></thead>' +
            '<tbody>' + rows + '</tbody>' +
            '</table>' +
            '</div>';

        els.compareOverlay.removeAttribute('hidden');
        void els.compareOverlay.offsetWidth;
        els.compareOverlay.classList.add('is-open');
        document.body.classList.add('overlay-open');
    }

    function closeCompareOverlay() {
        if (!els.compareOverlay) return;
        els.compareOverlay.classList.remove('is-open');
        document.body.classList.remove('overlay-open');
        setTimeout(function () {
            els.compareOverlay.setAttribute('hidden', '');
        }, 260);
    }

    // ---------------------------------------------------------------
    // Toast (gentle, non-blocking alert)
    // ---------------------------------------------------------------

    function showToast(message) {
        if (!els.toastRegion) {
            window.alert(message); // fallback, should not normally happen
            return;
        }
        var toast = document.createElement('div');
        toast.className = 'alert alert-warning shadow-sm mb-2';
        toast.setAttribute('role', 'alert');
        toast.textContent = message;
        els.toastRegion.appendChild(toast);

        setTimeout(function () {
            toast.style.transition = 'opacity 0.3s ease';
            toast.style.opacity = '0';
            setTimeout(function () {
                toast.remove();
            }, 300);
        }, 3500);
    }

    // ---------------------------------------------------------------
    // Shared helpers
    // ---------------------------------------------------------------

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