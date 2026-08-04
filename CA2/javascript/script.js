// ReadyPlayer3 - site interactions

document.addEventListener('DOMContentLoaded', function () {
    initRecommendGame();
    initChatWidget();
    if (typeof PERIPHERALS_DATA !== 'undefined') {
        PeripheralsPage.init();
    }
    if (document.body.dataset.genre && typeof GAMES_DATA !== 'undefined') {
        GenrePage.init();
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
        id: 'mouse-logitech-superlight-2',
        type: 'Mouse',
        brand: 'Logitech',
        name: 'Logitech G Pro X Superlight 2',
        price: 159.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 4.8,
        reviewCount: 512,
        stock: 'in-stock',
        specs: {
            'Sensor': 'HERO 2, optical',
            'DPI': '32,000',
            'Polling Rate': '1000 Hz (4000 Hz w/ adapter)',
            'Weight': '60 g',
            'Battery Life': '95 hrs',
            'Buttons': '5 programmable'
        },
        reviews: [
            { author: 'Alex R.', rating: 5, comment: 'Incredibly light and the sensor tracks perfectly at any speed.' },
            { author: 'Jamie T.', rating: 5, comment: 'Best competitive mouse I have used, worth the price.' }
        ]
    },
    {
        id: 'mouse-razer-viper-8khz',
        type: 'Mouse',
        brand: 'Razer',
        name: 'Razer Viper 8KHz',
        price: 79.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.5,
        reviewCount: 289,
        stock: 'low-stock',
        specs: {
            'Sensor': 'Focus+ 20K, optical',
            'DPI': '20,000',
            'Polling Rate': '8000 Hz',
            'Weight': '71 g',
            'Battery Life': 'N/A (wired)',
            'Buttons': '8 programmable'
        },
        reviews: [
            { author: 'Priya S.', rating: 4, comment: 'Cable is light and flexible, barely notice it is wired.' },
            { author: 'Dev K.', rating: 5, comment: 'The 8000Hz polling makes flicks feel razor sharp.' }
        ]
    },

    // ---------- Keyboard ----------
    {
        id: 'keyboard-wooting-60he',
        type: 'Keyboard',
        brand: 'Wooting',
        name: 'Wooting 60HE',
        price: 174.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.7,
        reviewCount: 231,
        stock: 'in-stock',
        specs: {
            'Switch Type': 'Lekker analog (Hall effect)',
            'Layout': '60% (61-key)',
            'Backlight': 'Per-key RGB',
            'Polling Rate': '1000 Hz',
            'Connectivity': 'Wired (USB-C)',
            'Battery Life': 'N/A (wired)'
        },
        reviews: [
            { author: 'Morgan L.', rating: 5, comment: 'Adjustable actuation points are a game changer for rapid trigger.' },
            { author: 'Sam W.', rating: 4, comment: 'Great board, takes some setup time to dial in the analog curves.' }
        ]
    },
    {
        id: 'keyboard-logitech-g915-tkl',
        type: 'Keyboard',
        brand: 'Logitech',
        name: 'Logitech G915 TKL',
        price: 229.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 4.6,
        reviewCount: 347,
        stock: 'in-stock',
        specs: {
            'Switch Type': 'GL Tactile, low-profile',
            'Layout': 'Tenkeyless (87-key)',
            'Backlight': 'LIGHTSYNC RGB',
            'Polling Rate': '1000 Hz (LIGHTSPEED)',
            'Connectivity': 'Wireless / Bluetooth / USB-C',
            'Battery Life': '40 hrs (RGB on)'
        },
        reviews: [
            { author: 'Chris B.', rating: 5, comment: 'Low-profile switches feel great and the wireless latency is unnoticeable.' },
            { author: 'Nadia F.', rating: 4, comment: 'Love the compact layout, wish the battery lasted longer with RGB on.' }
        ]
    },

    // ---------- Monitor ----------
    {
        id: 'monitor-asus-rog-swift-pg27aqn',
        type: 'Monitor',
        brand: 'ASUS ROG',
        name: 'ASUS ROG Swift PG27AQN',
        price: 899.00,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.7,
        reviewCount: 164,
        stock: 'in-stock',
        specs: {
            'Panel Type': 'Fast IPS',
            'Refresh Rate': '360 Hz',
            'Resolution': '2560 x 1440',
            'Response Time': '1 ms (GtG)',
            'Screen Size': '27 in',
            'HDR': 'HDR400 (G-SYNC Ultimate)'
        },
        reviews: [
            { author: 'Owen P.', rating: 5, comment: 'Motion clarity at 360Hz is fantastic for fast-paced shooters.' },
            { author: 'Lena V.', rating: 4, comment: 'Stunning panel, premium price to match.' }
        ]
    },
    {
        id: 'monitor-razer-raptor-27',
        type: 'Monitor',
        brand: 'Razer',
        name: 'Razer Raptor 27',
        price: 699.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.3,
        reviewCount: 98,
        stock: 'low-stock',
        specs: {
            'Panel Type': 'IPS',
            'Refresh Rate': '165 Hz',
            'Resolution': '2560 x 1440',
            'Response Time': '1 ms (GtG, overdrive)',
            'Screen Size': '27 in',
            'HDR': 'HDR400'
        },
        reviews: [
            { author: 'Tariq A.', rating: 4, comment: 'Cable management built into the stand is a nice touch.' },
            { author: 'Ivy C.', rating: 4, comment: 'Great colors out of the box, stand is sturdy.' }
        ]
    },

    // ---------- Headset ----------
    {
        id: 'headset-hyperx-cloud-2',
        type: 'Headset',
        brand: 'HyperX',
        name: 'HyperX Cloud II',
        price: 99.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.6,
        reviewCount: 401,
        stock: 'in-stock',
        specs: {
            'Driver Size': '53 mm',
            'Frequency Response': '15 Hz - 25 kHz',
            'Microphone': 'Detachable noise-cancelling',
            'Surround Sound': '7.1 (USB sound card)',
            'Battery Life': 'N/A (wired)',
            'Weight': '320 g'
        },
        reviews: [
            { author: 'Ruth N.', rating: 5, comment: 'Memory foam ear cushions make long sessions comfortable.' },
            { author: 'Ben H.', rating: 4, comment: 'Great value headset, mic quality is solid for the price.' }
        ]
    },
    {
        id: 'headset-steelseries-arctis-nova-pro-wireless',
        type: 'Headset',
        brand: 'SteelSeries',
        name: 'SteelSeries Arctis Nova Pro Wireless',
        price: 349.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 4.7,
        reviewCount: 187,
        stock: 'in-stock',
        specs: {
            'Driver Size': '40 mm neodymium',
            'Frequency Response': '10 Hz - 40 kHz',
            'Microphone': 'ClearCast Gen 2, retractable',
            'Surround Sound': 'Sonar virtual 360',
            'Battery Life': '44 hrs (dual swappable batteries)',
            'Weight': '337 g'
        },
        reviews: [
            { author: 'Kelly M.', rating: 5, comment: 'Swappable batteries mean I never have to stop mid-session to charge.' },
            { author: 'Theo J.', rating: 4, comment: 'Premium sound and build, priced accordingly.' }
        ]
    },

    // ---------- Earpiece (true wireless earbuds) ----------
    {
        id: 'earpiece-logitech-g-fits',
        type: 'Earpiece',
        brand: 'Logitech',
        name: 'Logitech G FITS',
        price: 229.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 4.3,
        reviewCount: 76,
        stock: 'in-stock',
        specs: {
            'Driver Size': '10 mm',
            'Frequency Response': '20 Hz - 20 kHz',
            'ANC': 'No',
            'Water Resistance': 'IPX4',
            'Battery Life': '8 hrs (24 hrs w/ case)',
            'Weight': '5.4 g per bud'
        },
        reviews: [
            { author: 'Grace O.', rating: 4, comment: 'The custom-molded fit is genuinely unique and very comfortable.' },
            { author: 'Marcus D.', rating: 4, comment: 'Low latency mode works well for competitive play.' }
        ]
    },
    {
        id: 'earpiece-razer-hammerhead-true-wireless-pro',
        type: 'Earpiece',
        brand: 'Razer',
        name: 'Razer Hammerhead True Wireless Pro',
        price: 179.99,
        connectivity: 'Wireless',
        image: 'placeholder.jpg',
        rating: 4.2,
        reviewCount: 112,
        stock: 'out-of-stock',
        specs: {
            'Driver Size': '10 mm',
            'Frequency Response': '20 Hz - 20 kHz',
            'ANC': 'Yes, hybrid',
            'Water Resistance': 'IPX4',
            'Battery Life': '6 hrs (24 hrs w/ case)',
            'Weight': '5 g per bud'
        },
        reviews: [
            { author: 'Faye L.', rating: 4, comment: 'ANC is solid for the size, low-latency mode is a nice bonus.' },
            { author: 'Ken U.', rating: 4, comment: 'Fit is comfortable, case feels a little bulky in a pocket.' }
        ]
    },

    // ---------- Mic ----------
    {
        id: 'mic-hyperx-quadcast-s',
        type: 'Mic',
        brand: 'HyperX',
        name: 'HyperX QuadCast S',
        price: 159.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.6,
        reviewCount: 264,
        stock: 'in-stock',
        specs: {
            'Polar Pattern': 'Selectable (4 patterns)',
            'Frequency Response': '20 Hz - 20 kHz',
            'Sample Rate': '48 kHz',
            'Bit Depth': '16-bit',
            'Connectivity': 'USB',
            'Mounting': 'Built-in shock mount + boom compatible'
        },
        reviews: [
            { author: 'Yara M.', rating: 5, comment: 'RGB lighting looks great and the built-in shock mount really works.' },
            { author: 'Colin P.', rating: 4, comment: 'Great all-rounder mic, gain knob is a little sensitive.' }
        ]
    },
    {
        id: 'mic-blue-yeti-x',
        type: 'Mic',
        brand: 'Blue',
        name: 'Blue Yeti X',
        price: 169.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.5,
        reviewCount: 318,
        stock: 'low-stock',
        specs: {
            'Polar Pattern': 'Selectable (4 patterns)',
            'Frequency Response': '20 Hz - 20 kHz',
            'Sample Rate': '48 kHz',
            'Bit Depth': '24-bit',
            'Connectivity': 'USB',
            'Mounting': 'Desk stand + boom arm compatible'
        },
        reviews: [
            { author: 'Anya B.', rating: 5, comment: 'The LED metering makes it easy to keep levels in check while streaming.' },
            { author: 'Felix G.', rating: 4, comment: 'Studio-quality sound straight out of the box.' }
        ]
    },

    // ---------- Mousepad ----------
    {
        id: 'mousepad-logitech-g840-xl',
        type: 'Mousepad',
        brand: 'Logitech',
        name: 'Logitech G840 XL',
        price: 34.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.6,
        reviewCount: 203,
        stock: 'in-stock',
        specs: {
            'Surface Type': 'Woven cloth',
            'Dimensions': '900 x 400 mm',
            'Thickness': '3 mm',
            'Base Material': 'Natural rubber',
            'Stitched Edges': 'Yes',
            'RGB': 'No'
        },
        reviews: [
            { author: 'Wren S.', rating: 5, comment: 'Covers my whole desk, edges have held up after months of daily use.' },
            { author: 'Idris K.', rating: 4, comment: 'Consistent glide across the whole surface.' }
        ]
    },
    {
        id: 'mousepad-razer-goliathus-extended-chroma',
        type: 'Mousepad',
        brand: 'Razer',
        name: 'Razer Goliathus Extended Chroma',
        price: 59.99,
        connectivity: 'Wired',
        image: 'placeholder.jpg',
        rating: 4.1,
        reviewCount: 87,
        stock: 'in-stock',
        specs: {
            'Surface Type': 'Micro-woven cloth',
            'Dimensions': '920 x 294 mm',
            'Thickness': '3 mm',
            'Base Material': 'Natural rubber',
            'Stitched Edges': 'Yes',
            'RGB': 'Yes, Chroma RGB'
        },
        reviews: [
            { author: 'Talia R.', rating: 4, comment: 'Chroma lighting syncs nicely with the rest of my Razer gear.' },
            { author: 'Noah E.', rating: 4, comment: 'Good glide and stitching, USB cable is a bit short.' }
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
/* ==========================================================
   Genre pages (g1-g4) - shared game catalog, metadata, and
   the GenrePage controller that drives search/filter/sort,
   favorites, comparison, and the details modal on each page.

   Each HTML page sets <body data-genre="..."> to one of the
   keys in GENRE_META below; GenrePage reads that attribute,
   filters GAMES_DATA down to that genre, and renders the UI.
   Favorites persist globally across all pages via localStorage;
   the compare tray is intentionally page-scoped (comparisons
   only make sense within a single genre's line-up).
   ========================================================== */

const GENRE_META = {
    'fps': {
        label: 'First-Person Shooters',
        shortLabel: 'FPS',
        breadcrumb: 'FPS',
        description: 'Fast reflexes, precise aim, and split-second decisions. Browse the sharpest first-person shooters, from tactical 5v5s to brutal single-player campaigns.'
    },
    'action-adventure': {
        label: 'Action-Adventure',
        shortLabel: 'Action-Adventure',
        breadcrumb: 'Action-Adventure',
        description: 'Sprawling worlds, cinematic combat, and stories worth exploring at your own pace. Browse the best action-adventure and open-world titles.'
    },
    'rpg': {
        label: 'Role-Playing Games',
        shortLabel: 'RPG',
        breadcrumb: 'RPG',
        description: "Build your character, shape the story, and lose yourself in a world built for the long haul. Browse the best RPGs, from turn-based classics to modern epics."
    },
    'strategy': {
        label: 'Strategy Games',
        shortLabel: 'Strategy',
        breadcrumb: 'Strategy',
        description: 'Outthink, outbuild, and outmaneuver. Browse the best strategy games, from empire-building 4X to tense turn-based tactics.'
    }
};

const GAMES_DATA = [
    // ============================== FPS ==============================
    {
        id: 'fps-valorant',
        title: 'Valorant',
        genre: 'fps',
        price: 0,
        platform: ['PC'],
        rating: 4.6,
        releaseDate: '2020-06-02',
        difficulty: 'Hard',
        playTime: '100+ hrs',
        mode: 'Multiplayer',
        story: '5v5 tactical shooter blending precise gunplay with unique agent abilities across competitive maps.',
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: true,
        screenshots: ['../images/valo.jpg', 'placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i3-4150',
            'Memory': '4 GB RAM',
            'Graphics': 'Intel HD 4000',
            'Storage': '30 GB available space'
        },
        pros: ['Free to play', 'Highly competitive ranked ladder', 'Frequent content updates'],
        cons: ['Steep learning curve', 'Toxic community in low ranks'],
        similarTo: { text: "If you liked Valorant, you'll love Counter-Strike 2.", relatedId: 'fps-counter-strike-2' }
    },
    {
        id: 'fps-cod-mw3',
        title: 'Call of Duty: Modern Warfare III',
        genre: 'fps',
        price: 69.99,
        platform: ['PC', 'PS5', 'Xbox'],
        rating: 4.0,
        releaseDate: '2023-11-10',
        difficulty: 'Medium',
        playTime: '8 hrs campaign',
        mode: 'Singleplayer & Multiplayer',
        story: 'Task Force 141 races to stop Makarov as his ultranationalist forces threaten global stability.',
        trailerUrl: '',
        openWorld: false,
        replayability: 4,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10/11 64-bit',
            'Processor': 'Intel i5-6600K',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 970',
            'Storage': '150 GB available space'
        },
        pros: ['Polished gunplay', 'Huge multiplayer map roster', 'Cross-platform play'],
        cons: ['Short campaign', 'Large install size'],
        similarTo: { text: "If you liked Modern Warfare III, you'll love Valorant.", relatedId: 'fps-valorant' }
    },
    {
        id: 'fps-counter-strike-2',
        title: 'Counter-Strike 2',
        genre: 'fps',
        price: 0,
        platform: ['PC'],
        rating: 4.5,
        releaseDate: '2023-09-27',
        difficulty: 'Hard',
        playTime: '500+ hrs',
        mode: 'Multiplayer',
        story: 'The long-running competitive shooter rebuilt on Source 2 with refreshed maps and smoke dynamics.',
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10',
            'Processor': 'Intel i5-750',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 660',
            'Storage': '85 GB available space'
        },
        pros: ['Legendary competitive scene', 'Free to play', 'Deep economy and utility play'],
        cons: ['Unforgiving for newcomers', 'Requires phone verification for competitive'],
        similarTo: { text: "If you liked Counter-Strike 2, you'll love Valorant.", relatedId: 'fps-valorant' }
    },
    {
        id: 'fps-doom-eternal',
        title: 'DOOM Eternal',
        genre: 'fps',
        price: 39.99,
        platform: ['PC', 'PS5', 'Xbox'],
        rating: 4.7,
        releaseDate: '2020-03-20',
        difficulty: 'Hard',
        playTime: '15 hrs',
        mode: 'Singleplayer',
        story: "The Doom Slayer returns to Earth to battle Hell's invasion in a fast, brutal single-player campaign.",
        trailerUrl: '',
        openWorld: false,
        replayability: 4,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i5-3570',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 970',
            'Storage': '50 GB available space'
        },
        pros: ['Exceptional movement and combat flow', 'Great soundtrack', 'Strong single-player value'],
        cons: ['No traditional multiplayer modes', 'Intense difficulty for newcomers'],
        similarTo: { text: "If you liked DOOM Eternal, you'll love Overwatch 2.", relatedId: 'fps-overwatch-2' }
    },
    {
        id: 'fps-overwatch-2',
        title: 'Overwatch 2',
        genre: 'fps',
        price: 0,
        platform: ['PC', 'PS5', 'Xbox'],
        rating: 4.1,
        releaseDate: '2022-10-04',
        difficulty: 'Medium',
        playTime: '150+ hrs',
        mode: 'Multiplayer',
        story: 'Team-based hero shooter with an ever-expanding roster across objective-based game modes.',
        trailerUrl: '',
        openWorld: false,
        replayability: 4,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i3',
            'Memory': '6 GB RAM',
            'Graphics': 'NVIDIA GTX 600 series',
            'Storage': '50 GB available space'
        },
        pros: ['Free to play', 'Distinct hero kits', 'Regular seasonal content'],
        cons: ['Monetization can feel aggressive', 'Long queue times for some roles'],
        similarTo: { text: "If you liked Overwatch 2, you'll love Valorant.", relatedId: 'fps-valorant' }
    },
    {
        id: 'fps-left-4-dead-2',
        title: 'Left 4 Dead 2',
        genre: 'fps',
        price: 9.99,
        platform: ['PC'],
        rating: 4.6,
        releaseDate: '2009-11-17',
        difficulty: 'Medium',
        playTime: '20 hrs',
        mode: 'Co-op',
        story: 'Four survivors fight through zombie-infested campaigns using teamwork and limited resources.',
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 7',
            'Processor': 'Intel Pentium 4, 3.0 GHz',
            'Memory': '2 GB RAM',
            'Graphics': 'DirectX 9 compatible',
            'Storage': '13 GB available space'
        },
        pros: ['Great co-op replayability', 'AI Director keeps runs unpredictable', 'Huge modding community'],
        cons: ['Dated visuals', 'No modern matchmaking features'],
        similarTo: { text: "If you liked Left 4 Dead 2, you'll love DOOM Eternal.", relatedId: 'fps-doom-eternal' }
    },

    // ======================= Action-Adventure =========================
    {
        id: 'action-adventure-devil-may-cry-5',
        title: 'Devil May Cry 5',
        genre: 'action-adventure',
        price: 29.99,
        platform: ['PC', 'PS5', 'Xbox'],
        rating: 4.8,
        releaseDate: '2019-03-08',
        difficulty: 'Hard',
        playTime: '15 hrs',
        mode: 'Singleplayer',
        story: 'Dante, Nero, and newcomer V team up to stop the demon king Urizen from consuming the world.',
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: true,
        screenshots: ['../images/dmc5.jpg', 'placeholder.jpg'],
        specs: {
            'OS': 'Windows 7/8/10 64-bit',
            'Processor': 'Intel i5-4460',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 760',
            'Storage': '35 GB available space'
        },
        pros: ['Stylish, technical combat', 'Three distinct playable characters', 'Great replay value via difficulty tiers'],
        cons: ['Story can be hard to follow for newcomers', 'Camera struggles in tight spaces'],
        similarTo: { text: "If you liked Devil May Cry 5, you'll love Ghost of Tsushima.", relatedId: 'action-adventure-ghost-of-tsushima' }
    },
    {
        id: 'action-adventure-viewfinder',
        title: 'Viewfinder',
        genre: 'action-adventure',
        price: 24.99,
        platform: ['PC', 'PS5'],
        rating: 4.4,
        releaseDate: '2023-07-18',
        difficulty: 'Easy',
        playTime: '6 hrs',
        mode: 'Singleplayer',
        story: 'A disorienting puzzle-adventure where photographs can be placed into the world to reshape reality.',
        trailerUrl: '',
        openWorld: false,
        replayability: 3,
        editorsPick: false,
        screenshots: ['../images/viewfinder.jpg', 'placeholder.jpg'],
        specs: {
            'OS': 'Windows 10',
            'Processor': 'Intel i5',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 970',
            'Storage': '10 GB available space'
        },
        pros: ['Wonderfully original mechanic', 'Relaxed pacing', 'Gorgeous, surreal art direction'],
        cons: ['Short campaign', 'Limited replay incentive once solved'],
        similarTo: { text: "If you liked Viewfinder, you'll love Devil May Cry 5.", relatedId: 'action-adventure-devil-may-cry-5' }
    },
    {
        id: 'action-adventure-ghost-of-tsushima',
        title: 'Ghost of Tsushima',
        genre: 'action-adventure',
        price: 59.99,
        platform: ['PS5', 'PC'],
        rating: 4.9,
        releaseDate: '2020-07-17',
        difficulty: 'Medium',
        playTime: '40 hrs',
        mode: 'Singleplayer',
        story: 'A samurai turned rogue warrior defends 13th-century Tsushima Island from Mongol invasion.',
        trailerUrl: '',
        openWorld: true,
        replayability: 4,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i7-8700',
            'Memory': '16 GB RAM',
            'Graphics': 'NVIDIA GTX 1070',
            'Storage': '75 GB available space'
        },
        pros: ['Breathtaking open world', 'Fluid samurai combat', 'Strong photo mode and exploration'],
        cons: ['Story pacing slows in the middle act', 'Some side content feels repetitive'],
        similarTo: { text: "If you liked Ghost of Tsushima, you'll love Days Gone.", relatedId: 'action-adventure-days-gone' }
    },
    {
        id: 'action-adventure-days-gone',
        title: 'Days Gone',
        genre: 'action-adventure',
        price: 19.99,
        platform: ['PC', 'PS5'],
        rating: 4.2,
        releaseDate: '2019-04-26',
        difficulty: 'Medium',
        playTime: '30 hrs',
        mode: 'Singleplayer',
        story: 'A drifter and bounty hunter survives a post-apocalyptic Pacific Northwest overrun by feral hordes.',
        trailerUrl: '',
        openWorld: true,
        replayability: 3,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i5-4670K',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 970',
            'Storage': '70 GB available space'
        },
        pros: ['Tense horde encounters', 'Strong sense of place', 'Satisfying bike upgrade loop'],
        cons: ['Slow opening hours', 'Occasional technical rough edges'],
        similarTo: { text: "If you liked Days Gone, you'll love Ghost of Tsushima.", relatedId: 'action-adventure-ghost-of-tsushima' }
    },
    {
        id: 'action-adventure-batman-arkham-city',
        title: 'Batman: Arkham City',
        genre: 'action-adventure',
        price: 19.99,
        platform: ['PC', 'PS5', 'Xbox'],
        rating: 4.7,
        releaseDate: '2011-10-18',
        difficulty: 'Medium',
        playTime: '20 hrs',
        mode: 'Singleplayer',
        story: "Batman infiltrates a walled-off super-prison district to stop Hugo Strange's endgame.",
        trailerUrl: '',
        openWorld: true,
        replayability: 4,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 7/8/10',
            'Processor': 'Intel Core 2 Duo E8400',
            'Memory': '2 GB RAM',
            'Graphics': 'NVIDIA GeForce 8800 GT',
            'Storage': '12.5 GB available space'
        },
        pros: ['Iconic Freeflow combat', 'Dense, atmospheric open world', 'Excellent side content and boss fights'],
        cons: ['Aging visuals by modern standards', 'Detective vision overused for navigation'],
        similarTo: { text: "If you liked Batman: Arkham City, you'll love Uncharted 3: Drake's Deception.", relatedId: 'action-adventure-uncharted-3' }
    },
    {
        id: 'action-adventure-uncharted-3',
        title: "Uncharted 3: Drake's Deception",
        genre: 'action-adventure',
        price: 19.99,
        platform: ['PS5', 'PC'],
        rating: 4.5,
        releaseDate: '2011-11-01',
        difficulty: 'Medium',
        playTime: '12 hrs',
        mode: 'Singleplayer',
        story: 'Nathan Drake chases a lost city in the Arabian desert while confronting his own past.',
        trailerUrl: '',
        openWorld: false,
        replayability: 3,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i5-2500K',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 960',
            'Storage': '50 GB available space'
        },
        pros: ['Cinematic set-piece action', 'Charming character writing', 'Polished, precise platforming'],
        cons: ['Linear structure limits exploration', 'Combat encounters can drag'],
        similarTo: { text: "If you liked Uncharted 3, you'll love Batman: Arkham City.", relatedId: 'action-adventure-batman-arkham-city' }
    },

    // ================================ RPG ================================
    {
        id: 'rpg-final-fantasy-7-remake',
        title: 'Final Fantasy VII Remake',
        genre: 'rpg',
        price: 59.99,
        platform: ['PC', 'PS5'],
        rating: 4.8,
        releaseDate: '2020-04-10',
        difficulty: 'Medium',
        playTime: '35 hrs',
        mode: 'Singleplayer',
        story: "Cloud Strife and Avalanche fight the Shinra Corporation to save Midgar's Mako-powered future.",
        trailerUrl: '',
        openWorld: false,
        replayability: 4,
        editorsPick: true,
        screenshots: ['../images/ff7r.jpg', 'placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i7-3770',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 1080',
            'Storage': '100 GB available space'
        },
        pros: ['Gorgeous remake of a classic', 'Real-time/ATB hybrid combat shines', 'Deep character-driven story'],
        cons: ['Covers only the Midgar section', 'Some padded side content'],
        similarTo: { text: "If you liked Final Fantasy VII Remake, you'll love Persona 5 Royal.", relatedId: 'rpg-persona-5-royal' }
    },
    {
        id: 'rpg-persona-5-royal',
        title: 'Persona 5 Royal',
        genre: 'rpg',
        price: 49.99,
        platform: ['PC', 'PS5', 'Xbox'],
        rating: 4.9,
        releaseDate: '2020-03-31',
        difficulty: 'Medium',
        playTime: '100 hrs',
        mode: 'Singleplayer',
        story: "Stylish Tokyo high-schoolers become Phantom Thieves, stealing the corrupted hearts of society's worst.",
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i5-4460',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 760',
            'Storage': '40 GB available space'
        },
        pros: ['Incredible style and soundtrack', 'Deep social-sim + turn-based combat blend', 'Huge amount of content'],
        cons: ['Very long playtime commitment', 'Slow opening hours'],
        similarTo: { text: "If you liked Persona 5 Royal, you'll love Fire Emblem: Three Houses.", relatedId: 'rpg-fire-emblem-three-houses' }
    },
    {
        id: 'rpg-fire-emblem-three-houses',
        title: 'Fire Emblem: Three Houses',
        genre: 'rpg',
        price: 59.99,
        platform: ['PC'],
        rating: 4.6,
        releaseDate: '2019-07-26',
        difficulty: 'Medium',
        playTime: '60 hrs',
        mode: 'Singleplayer',
        story: "A mercenary-turned-professor guides one of three houses through war-torn Fodlan's academy and battlefields.",
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i5',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 1050',
            'Storage': '8 GB available space'
        },
        pros: ['Four distinct story routes', 'Deep tactics-meets-social-sim gameplay', 'Memorable cast of characters'],
        cons: ['Repetitive monastery loop between chapters', 'Slower-paced early chapters'],
        similarTo: { text: "If you liked Fire Emblem: Three Houses, you'll love Civilization VI.", relatedId: 'strategy-civilization-6' }
    },
    {
        id: 'rpg-pokemon-white-2',
        title: 'Pokemon White 2',
        genre: 'rpg',
        price: 34.99,
        platform: ['PC'],
        rating: 4.5,
        releaseDate: '2012-10-07',
        difficulty: 'Easy',
        playTime: '35 hrs',
        mode: 'Singleplayer',
        story: "Two years after Team Plasma's fall, a new trainer explores an expanded Unova region.",
        trailerUrl: '',
        openWorld: false,
        replayability: 4,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 (emulated)',
            'Processor': 'Intel i3',
            'Memory': '4 GB RAM',
            'Graphics': 'Integrated graphics',
            'Storage': '1 GB available space'
        },
        pros: ['Expanded post-game content', 'Solid difficulty options', 'Great pacing for newcomers'],
        cons: ['Dated visuals compared to modern entries', 'Limited online features'],
        similarTo: { text: "If you liked Pokemon White 2, you'll love Fallout 4.", relatedId: 'rpg-fallout-4' }
    },
    {
        id: 'rpg-fallout-4',
        title: 'Fallout 4',
        genre: 'rpg',
        price: 19.99,
        platform: ['PC', 'PS5', 'Xbox'],
        rating: 4.3,
        releaseDate: '2015-11-10',
        difficulty: 'Medium',
        playTime: '80 hrs',
        mode: 'Singleplayer',
        story: 'A lone survivor emerges from Vault 111 to search the irradiated Commonwealth for their missing son.',
        trailerUrl: '',
        openWorld: true,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 7/8/10 64-bit',
            'Processor': 'Intel i5-2300',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 550 Ti',
            'Storage': '30 GB available space'
        },
        pros: ['Massive open world to explore', 'Deep settlement building', 'Huge modding community'],
        cons: ['Combat feels dated compared to genre peers', 'Writing weaker than previous Fallout titles'],
        similarTo: { text: "If you liked Fallout 4, you'll love Pokemon White 2.", relatedId: 'rpg-pokemon-white-2' }
    },
    {
        id: 'rpg-undertale',
        title: 'Undertale',
        genre: 'rpg',
        price: 9.99,
        platform: ['PC'],
        rating: 4.8,
        releaseDate: '2015-09-15',
        difficulty: 'Medium',
        playTime: '8 hrs',
        mode: 'Singleplayer',
        story: 'A child falls into an underground world of monsters, where every choice to fight or spare matters.',
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows XP or later',
            'Processor': '1.6 GHz or faster',
            'Memory': '2 GB RAM',
            'Graphics': 'Integrated graphics',
            'Storage': '200 MB available space'
        },
        pros: ['Uniquely clever writing and humor', 'Multiple endings reward replaying', 'Iconic soundtrack'],
        cons: ['Simple bullet-hell combat may not appeal to all', 'Short single playthrough length'],
        similarTo: { text: "If you liked Undertale, you'll love Persona 5 Royal.", relatedId: 'rpg-persona-5-royal' }
    },

    // ============================== Strategy ==============================
    {
        id: 'strategy-civilization-6',
        title: "Sid Meier's Civilization VI",
        genre: 'strategy',
        price: 59.99,
        platform: ['PC'],
        rating: 4.6,
        releaseDate: '2016-10-21',
        difficulty: 'Hard',
        playTime: '60 hrs',
        mode: 'Singleplayer & Multiplayer',
        story: 'Build an empire from the Stone Age to the Information Age through diplomacy, war, and culture.',
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: true,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 7/8.1/10 64-bit',
            'Processor': 'Intel i3, 2.5 GHz',
            'Memory': '6 GB RAM',
            'Graphics': 'NVIDIA GTX 660 2GB',
            'Storage': '12 GB available space'
        },
        pros: ['Endless replayability across civilizations', 'Deep diplomacy and culture systems', 'Strong modding support'],
        cons: ['AI can be inconsistent on higher difficulties', 'Turns can slow down significantly late-game'],
        similarTo: { text: "If you liked Civilization VI, you'll love Age of Empires IV.", relatedId: 'strategy-age-of-empires-4' }
    },
    {
        id: 'strategy-age-of-empires-4',
        title: 'Age of Empires IV',
        genre: 'strategy',
        price: 39.99,
        platform: ['PC'],
        rating: 4.4,
        releaseDate: '2021-10-28',
        difficulty: 'Hard',
        playTime: '25 hrs',
        mode: 'Singleplayer & Multiplayer',
        story: 'Command historic civilizations through medieval campaigns spanning centuries of real-world conflict.',
        trailerUrl: '',
        openWorld: false,
        replayability: 4,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i5-6300U',
            'Memory': '8 GB RAM',
            'Graphics': 'Intel HD 620',
            'Storage': '26 GB available space'
        },
        pros: ['Faithful classic RTS feel with modern polish', 'Strong campaign storytelling', 'Distinct civilization playstyles'],
        cons: ['Steep learning curve for RTS newcomers', 'Multiplayer balance still evolving'],
        similarTo: { text: "If you liked Age of Empires IV, you'll love StarCraft II.", relatedId: 'strategy-starcraft-2' }
    },
    {
        id: 'strategy-xcom-2',
        title: 'XCOM 2',
        genre: 'strategy',
        price: 29.99,
        platform: ['PC', 'PS5', 'Xbox'],
        rating: 4.5,
        releaseDate: '2016-02-05',
        difficulty: 'Hard',
        playTime: '45 hrs',
        mode: 'Singleplayer',
        story: 'Lead the resistance in guerrilla warfare against an alien occupation twenty years after Earth fell.',
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 7 64-bit',
            'Processor': 'Intel i3, 2.4 GHz',
            'Memory': '4 GB RAM',
            'Graphics': '512 MB, NVIDIA GTX 460',
            'Storage': '45 GB available space'
        },
        pros: ['Punishing, tactical turn-based combat', 'High replay value with procedural maps', 'Deep base and squad management'],
        cons: ['Missed shots can feel unfair at times', 'Long mission and turn times'],
        similarTo: { text: "If you liked XCOM 2, you'll love Total War: Warhammer III.", relatedId: 'strategy-total-war-warhammer-3' }
    },
    {
        id: 'strategy-starcraft-2',
        title: 'StarCraft II',
        genre: 'strategy',
        price: 0,
        platform: ['PC'],
        rating: 4.7,
        releaseDate: '2010-07-27',
        difficulty: 'Hard',
        playTime: '200+ hrs',
        mode: 'Singleplayer & Multiplayer',
        story: 'Terran, Zerg, and Protoss factions clash across the Koprulu sector in a genre-defining RTS.',
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 7/8/10 64-bit',
            'Processor': 'Intel Core i3',
            'Memory': '4 GB RAM',
            'Graphics': 'NVIDIA GeForce 8600 GT',
            'Storage': '30 GB available space'
        },
        pros: ['Legendary competitive esports scene', 'Free base game and campaign', 'Tight, responsive RTS mechanics'],
        cons: ['Very high skill ceiling to enjoy multiplayer', 'Interface feels dated to newcomers'],
        similarTo: { text: "If you liked StarCraft II, you'll love Age of Empires IV.", relatedId: 'strategy-age-of-empires-4' }
    },
    {
        id: 'strategy-total-war-warhammer-3',
        title: 'Total War: Warhammer III',
        genre: 'strategy',
        price: 59.99,
        platform: ['PC'],
        rating: 4.3,
        releaseDate: '2022-02-17',
        difficulty: 'Hard',
        playTime: '80 hrs',
        mode: 'Singleplayer & Multiplayer',
        story: 'Massive real-time battles and turn-based empire management across a fantastical, faction-rich world.',
        trailerUrl: '',
        openWorld: false,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 10 64-bit',
            'Processor': 'Intel i5-6600K',
            'Memory': '8 GB RAM',
            'Graphics': 'NVIDIA GTX 970',
            'Storage': '120 GB available space'
        },
        pros: ['Spectacular large-scale battles', 'Wildly different playable factions', 'Huge amount of post-launch content'],
        cons: ['Can be overwhelming for RTS newcomers', 'Large install size and demanding requirements'],
        similarTo: { text: "If you liked Total War: Warhammer III, you'll love XCOM 2.", relatedId: 'strategy-xcom-2' }
    },
    {
        id: 'strategy-project-zomboid',
        title: 'Project Zomboid',
        genre: 'strategy',
        price: 19.99,
        platform: ['PC'],
        rating: 4.6,
        releaseDate: '2013-11-08',
        difficulty: 'Hard',
        playTime: '100+ hrs',
        mode: 'Singleplayer & Multiplayer',
        story: 'Manage survival, base-building, and resource strategy against a relentless zombie apocalypse.',
        trailerUrl: '',
        openWorld: true,
        replayability: 5,
        editorsPick: false,
        screenshots: ['placeholder.jpg'],
        specs: {
            'OS': 'Windows 7/8/10',
            'Processor': 'Intel i3 or better',
            'Memory': '4 GB RAM',
            'Graphics': 'Integrated graphics',
            'Storage': '2 GB available space'
        },
        pros: ['Deep survival and base-building systems', 'Punishing, tension-filled gameplay loop', 'Strong ongoing community updates'],
        cons: ['Steep learning curve', 'Permadeath can be frustrating for newcomers'],
        similarTo: { text: "If you liked Project Zomboid, you'll love XCOM 2.", relatedId: 'strategy-xcom-2' }
    }
];

/**
 * GenrePage controller.
 *
 * Reads the current page's genre from <body data-genre="...">, filters
 * GAMES_DATA down to that genre, and drives the whole page: search,
 * filters, sorting, favorites (persisted in localStorage across every
 * page), the comparison tray/modal, and the game details modal.
 *
 * Kept as small, named functions grouped by responsibility so any one
 * piece (favorites, compare, filters) can be read or changed on its own.
 */
var GenrePage = (function () {
    var FAVORITES_KEY = 'rp3-favorite-games';
    var MAX_COMPARE = 4;

    var state = {
        genre: null,
        genreGames: [],
        filters: {
            search: '',
            price: 'all',
            platform: 'all',
            rating: 'all',
            mode: 'all',
            difficulty: 'all',
            favoritesOnly: false
        },
        sort: 'rating-desc',
        favorites: [],
        compareList: [],
        activeGameId: null // last game opened in the details modal, for "similarTo" jumps
    };

    var els = {};
    var detailsModal = null;
    var compareModal = null;

    function init() {
        state.genre = document.body.dataset.genre;
        state.genreGames = GAMES_DATA.filter(function (g) { return g.genre === state.genre; });
        state.favorites = loadFavorites();

        cacheElements();
        renderHero();
        populateFilterOptions();
        bindFilterEvents();
        bindModalEvents();
        bindCompareTrayEvents();
        bindRandomPickEvent();
        renderGrid();
        renderCompareTray();
    }

    function cacheElements() {
        els.heroTitle = document.getElementById('genreHeroTitle');
        els.heroDescription = document.getElementById('genreHeroDescription');
        els.breadcrumbGenre = document.getElementById('breadcrumbGenre');
        els.editorsPickCard = document.getElementById('editorsPickCard');

        els.searchInput = document.getElementById('searchInput');
        els.priceFilter = document.getElementById('priceFilter');
        els.platformOptions = document.getElementById('platformFilterOptions');
        els.ratingFilter = document.getElementById('ratingFilter');
        els.modeFilter = document.getElementById('modeFilter');
        els.difficultyFilter = document.getElementById('difficultyFilter');
        els.favoritesOnlyToggle = document.getElementById('favoritesOnlyToggle');
        els.sortSelect = document.getElementById('sortSelect');
        els.resetFiltersBtn = document.getElementById('resetFiltersBtn');

        els.resultsCount = document.getElementById('resultsCount');
        els.activeFilterChips = document.getElementById('activeFilterChips');
        els.gamesGrid = document.getElementById('gamesGrid');
        els.emptyState = document.getElementById('emptyState');

        els.randomPickBtn = document.getElementById('randomPickBtn');

        els.gameDetailsModalEl = document.getElementById('gameDetailsModal');
        els.gameDetailsModalLabel = document.getElementById('gameDetailsModalLabel');
        els.gameDetailsModalBody = document.getElementById('gameDetailsModalBody');
        els.gameDetailsModalFooter = document.getElementById('gameDetailsModalFooter');

        els.compareTray = document.getElementById('compareTray');
        els.compareTrayCounter = document.getElementById('compareTrayCounter');
        els.compareTrayItems = document.getElementById('compareTrayItems');
        els.clearCompareBtn = document.getElementById('clearCompareBtn');
        els.openCompareModalBtn = document.getElementById('openCompareModalBtn');

        els.compareModalEl = document.getElementById('compareModal');
        els.compareModalBody = document.getElementById('compareModalBody');

        els.toastContainer = document.getElementById('toastContainer');

        if (window.bootstrap) {
            if (els.gameDetailsModalEl) {
                detailsModal = bootstrap.Modal.getOrCreateInstance(els.gameDetailsModalEl);
            }
            if (els.compareModalEl) {
                compareModal = bootstrap.Modal.getOrCreateInstance(els.compareModalEl);
            }
        }
    }

    // ---------------------------------------------------------------
    // Hero (title/description/editor's pick)
    // ---------------------------------------------------------------

    function renderHero() {
        var meta = GENRE_META[state.genre];
        if (!meta) return;

        if (els.heroTitle) els.heroTitle.textContent = meta.label;
        if (els.heroDescription) els.heroDescription.textContent = meta.description;
        if (els.breadcrumbGenre) els.breadcrumbGenre.textContent = meta.breadcrumb;
        document.title = meta.label + ' | ReadyPlayer3';

        var pick = state.genreGames.find(function (g) { return g.editorsPick; });
        if (pick && els.editorsPickCard) {
            els.editorsPickCard.innerHTML =
                '<div class="editors-pick-card">' +
                '<span class="badge editors-pick-badge mb-2"><i class="bi bi-award-fill me-1" aria-hidden="true"></i>Editor\'s Pick</span>' +
                '<div class="d-flex gap-3 align-items-center">' +
                '<img src="' + pick.screenshots[0] + '" alt="' + escapeHtml(pick.title) + '" class="editors-pick-thumb" />' +
                '<div>' +
                '<h2 class="h5 mb-1">' + escapeHtml(pick.title) + '</h2>' +
                '<p class="mb-2 small text-muted">' + buildStars(pick.rating) + ' ' + pick.rating.toFixed(1) + '</p>' +
                '<button type="button" class="btn btn-sm btn-primary" data-view-details="' + pick.id + '">View Details</button>' +
                '</div>' +
                '</div>' +
                '</div>';

            var btn = els.editorsPickCard.querySelector('[data-view-details]');
            if (btn) {
                btn.addEventListener('click', function () {
                    openDetailsModal(pick.id);
                });
            }
        }
    }

    // ---------------------------------------------------------------
    // Filters
    // ---------------------------------------------------------------

    function populateFilterOptions() {
        var platforms = uniqueValues(state.genreGames, 'platform').sort();
        if (els.platformOptions) {
            els.platformOptions.innerHTML = platforms.map(function (platform, index) {
                var id = 'platform-opt-' + index;
                return '<div class="form-check">' +
                    '<input class="form-check-input platform-checkbox" type="checkbox" value="' + escapeHtml(platform) + '" id="' + id + '">' +
                    '<label class="form-check-label small" for="' + id + '">' + escapeHtml(platform) + '</label>' +
                    '</div>';
            }).join('');
        }

        var modes = uniqueValues(state.genreGames, 'mode').sort();
        if (els.modeFilter) {
            modes.forEach(function (mode) {
                var option = document.createElement('option');
                option.value = mode;
                option.textContent = mode;
                els.modeFilter.appendChild(option);
            });
        }
    }

    function uniqueValues(list, key) {
        var seen = {};
        var result = [];
        list.forEach(function (item) {
            var value = item[key];
            var values = Array.isArray(value) ? value : [value];
            values.forEach(function (v) {
                if (!seen[v]) {
                    seen[v] = true;
                    result.push(v);
                }
            });
        });
        return result;
    }

    function bindFilterEvents() {
        if (els.searchInput) {
            els.searchInput.addEventListener('input', function () {
                state.filters.search = this.value.trim().toLowerCase();
                renderGrid();
            });
        }
        if (els.priceFilter) {
            els.priceFilter.addEventListener('change', function () {
                state.filters.price = this.value;
                renderGrid();
            });
        }
        if (els.platformOptions) {
            els.platformOptions.addEventListener('change', function () {
                var checked = Array.prototype.slice.call(
                    els.platformOptions.querySelectorAll('.platform-checkbox:checked')
                ).map(function (cb) { return cb.value; });
                state.filters.platform = checked.length ? checked : 'all';
                renderGrid();
            });
        }
        if (els.ratingFilter) {
            els.ratingFilter.addEventListener('change', function () {
                state.filters.rating = this.value;
                renderGrid();
            });
        }
        if (els.modeFilter) {
            els.modeFilter.addEventListener('change', function () {
                state.filters.mode = this.value;
                renderGrid();
            });
        }
        if (els.difficultyFilter) {
            els.difficultyFilter.addEventListener('change', function () {
                state.filters.difficulty = this.value;
                renderGrid();
            });
        }
        if (els.favoritesOnlyToggle) {
            els.favoritesOnlyToggle.addEventListener('change', function () {
                state.filters.favoritesOnly = this.checked;
                renderGrid();
            });
        }
        if (els.sortSelect) {
            els.sortSelect.addEventListener('change', function () {
                state.sort = this.value;
                renderGrid();
            });
        }
        if (els.resetFiltersBtn) {
            els.resetFiltersBtn.addEventListener('click', resetFilters);
        }
    }

    function resetFilters() {
        state.filters = { search: '', price: 'all', platform: 'all', rating: 'all', mode: 'all', difficulty: 'all', favoritesOnly: false };
        if (els.searchInput) els.searchInput.value = '';
        if (els.priceFilter) els.priceFilter.value = 'all';
        if (els.ratingFilter) els.ratingFilter.value = 'all';
        if (els.modeFilter) els.modeFilter.value = 'all';
        if (els.difficultyFilter) els.difficultyFilter.value = 'all';
        if (els.favoritesOnlyToggle) els.favoritesOnlyToggle.checked = false;
        if (els.platformOptions) {
            els.platformOptions.querySelectorAll('.platform-checkbox').forEach(function (cb) { cb.checked = false; });
        }
        renderGrid();
    }

    function getFilteredSortedGames() {
        var filtered = state.genreGames.filter(function (game) {
            if (state.filters.search && game.title.toLowerCase().indexOf(state.filters.search) === -1) {
                return false;
            }
            if (state.filters.price === 'free' && game.price !== 0) return false;
            if (state.filters.price === 'paid' && game.price === 0) return false;
            if (Array.isArray(state.filters.platform)) {
                var hasPlatform = state.filters.platform.some(function (p) { return game.platform.indexOf(p) !== -1; });
                if (!hasPlatform) return false;
            }
            if (state.filters.rating === '4' && game.rating < 4) return false;
            if (state.filters.rating === '5' && game.rating < 5) return false;
            if (state.filters.mode !== 'all' && game.mode !== state.filters.mode) return false;
            if (state.filters.difficulty !== 'all' && game.difficulty !== state.filters.difficulty) return false;
            if (state.filters.favoritesOnly && state.favorites.indexOf(game.id) === -1) return false;
            return true;
        });

        var sorters = {
            'rating-desc': function (a, b) { return b.rating - a.rating; },
            'price-asc': function (a, b) { return a.price - b.price; },
            'price-desc': function (a, b) { return b.price - a.price; },
            'date-desc': function (a, b) { return new Date(b.releaseDate) - new Date(a.releaseDate); },
            'alpha-asc': function (a, b) { return a.title.localeCompare(b.title); }
        };
        var sorter = sorters[state.sort] || sorters['rating-desc'];
        return filtered.slice().sort(sorter);
    }

    function renderActiveFilterChips() {
        if (!els.activeFilterChips) return;
        var chips = [];

        if (state.filters.search) chips.push({ label: 'Search: "' + state.filters.search + '"', clear: function () { state.filters.search = ''; if (els.searchInput) els.searchInput.value = ''; } });
        if (state.filters.price !== 'all') chips.push({ label: state.filters.price === 'free' ? 'Free' : 'Paid', clear: function () { state.filters.price = 'all'; if (els.priceFilter) els.priceFilter.value = 'all'; } });
        if (Array.isArray(state.filters.platform)) {
            chips.push({ label: state.filters.platform.join(', '), clear: function () {
                state.filters.platform = 'all';
                if (els.platformOptions) els.platformOptions.querySelectorAll('.platform-checkbox').forEach(function (cb) { cb.checked = false; });
            } });
        }
        if (state.filters.rating !== 'all') chips.push({ label: state.filters.rating + '\u2605 & up', clear: function () { state.filters.rating = 'all'; if (els.ratingFilter) els.ratingFilter.value = 'all'; } });
        if (state.filters.mode !== 'all') chips.push({ label: state.filters.mode, clear: function () { state.filters.mode = 'all'; if (els.modeFilter) els.modeFilter.value = 'all'; } });
        if (state.filters.difficulty !== 'all') chips.push({ label: state.filters.difficulty, clear: function () { state.filters.difficulty = 'all'; if (els.difficultyFilter) els.difficultyFilter.value = 'all'; } });
        if (state.filters.favoritesOnly) chips.push({ label: 'Favorites only', clear: function () { state.filters.favoritesOnly = false; if (els.favoritesOnlyToggle) els.favoritesOnlyToggle.checked = false; } });

        if (chips.length === 0) {
            els.activeFilterChips.innerHTML = '';
            return;
        }

        els.activeFilterChips.innerHTML = chips.map(function (chip, index) {
            return '<span class="filter-chip badge" data-chip-index="' + index + '">' + escapeHtml(chip.label) + ' <i class="bi bi-x-lg" aria-hidden="true"></i></span>';
        }).join('');

        els.activeFilterChips.querySelectorAll('.filter-chip').forEach(function (chipEl, index) {
            chipEl.addEventListener('click', function () {
                chips[index].clear();
                renderGrid();
            });
        });
    }

    // ---------------------------------------------------------------
    // Grid + cards
    // ---------------------------------------------------------------

    function renderGrid() {
        var results = getFilteredSortedGames();

        if (els.resultsCount) {
            els.resultsCount.textContent = 'Showing ' + results.length + ' of ' + state.genreGames.length + ' games';
        }
        renderActiveFilterChips();

        if (!els.gamesGrid) return;
        els.gamesGrid.innerHTML = '';

        if (results.length === 0) {
            if (els.emptyState) els.emptyState.classList.remove('d-none');
            return;
        }
        if (els.emptyState) els.emptyState.classList.add('d-none');

        results.forEach(function (game) {
            els.gamesGrid.appendChild(buildCard(game));
        });
    }

    function buildCard(game) {
        var col = document.createElement('div');
        col.className = 'col';

        var isFavorite = state.favorites.indexOf(game.id) !== -1;
        var isComparing = state.compareList.indexOf(game.id) !== -1;
        var priceLabel = game.price === 0 ? 'Free' : '$' + game.price.toFixed(2);
        var platformBadges = game.platform.map(function (p) {
            return '<span class="badge platform-badge">' + escapeHtml(p) + '</span>';
        }).join(' ');

        col.innerHTML =
            '<div class="card game-card h-100" id="game-card-' + game.id + '" data-id="' + game.id + '">' +
            '<div class="game-card-image-wrap">' +
            '<img src="' + game.screenshots[0] + '" class="card-img-top" alt="Cover art for ' + escapeHtml(game.title) + '" />' +
            '<button type="button" class="favorite-btn' + (isFavorite ? ' active' : '') + '" aria-pressed="' + isFavorite + '" aria-label="Toggle favorite for ' + escapeHtml(game.title) + '">' +
            '<i class="bi ' + (isFavorite ? 'bi-heart-fill' : 'bi-heart') + '" aria-hidden="true"></i>' +
            '</button>' +
            '</div>' +
            '<div class="card-body d-flex flex-column">' +
            '<h3 class="h6 card-title mb-1">' + escapeHtml(game.title) + '</h3>' +
            '<p class="mb-1 small text-warning">' + buildStars(game.rating) + ' <span class="text-muted">' + game.rating.toFixed(1) + '</span></p>' +
            '<p class="mb-2">' + platformBadges + '</p>' +
            '<p class="card-text fw-bold mb-3">' + priceLabel + '</p>' +
            '<div class="mt-auto d-flex flex-wrap gap-2">' +
            '<button type="button" class="btn btn-sm btn-outline-primary flex-grow-1 view-details-btn">View Details</button>' +
            '<button type="button" class="btn btn-sm btn-outline-success compare-toggle-btn' + (isComparing ? ' active' : '') + '">' +
            (isComparing ? '\u2713 Added' : '+ Compare') +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>';

        var favoriteBtn = col.querySelector('.favorite-btn');
        var viewBtn = col.querySelector('.view-details-btn');
        var compareBtn = col.querySelector('.compare-toggle-btn');

        favoriteBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleFavorite(game.id);
        });
        viewBtn.addEventListener('click', function () {
            openDetailsModal(game.id);
        });
        compareBtn.addEventListener('click', function () {
            toggleCompare(game.id);
        });

        return col;
    }

    // ---------------------------------------------------------------
    // Favorites (persisted globally via localStorage)
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
            // Storage unavailable (private browsing, quota, etc.) - fail silently,
            // favorites just won't persist for this session.
        }
    }

    function toggleFavorite(id) {
        var index = state.favorites.indexOf(id);
        var game = findById(id);
        var justFavorited;

        if (index !== -1) {
            state.favorites.splice(index, 1);
            justFavorited = false;
        } else {
            state.favorites.push(id);
            justFavorited = true;
        }
        saveFavorites();
        renderGrid();
        updateModalFavoriteButton(id);

        if (game) {
            showToast(
                justFavorited ? (game.title + ' added to favorites.') : (game.title + ' removed from favorites.'),
                justFavorited ? 'success' : 'secondary'
            );
        }
    }

    function updateModalFavoriteButton(id) {
        if (state.activeGameId !== id || !els.gameDetailsModalFooter) return;
        var btn = els.gameDetailsModalFooter.querySelector('.modal-favorite-btn');
        if (!btn) return;
        var isFavorite = state.favorites.indexOf(id) !== -1;
        btn.classList.toggle('active', isFavorite);
        btn.innerHTML = '<i class="bi ' + (isFavorite ? 'bi-heart-fill' : 'bi-heart') + ' me-1" aria-hidden="true"></i>' + (isFavorite ? 'Favorited' : 'Favorite');
    }

    // ---------------------------------------------------------------
    // Details modal
    // ---------------------------------------------------------------

    function findById(id) {
        return GAMES_DATA.find(function (g) { return g.id === id; }) || null;
    }

    function openDetailsModal(id) {
        var game = findById(id);
        if (!game || !els.gameDetailsModalBody) return;

        state.activeGameId = id;

        if (els.gameDetailsModalLabel) els.gameDetailsModalLabel.textContent = game.title;
        els.gameDetailsModalBody.innerHTML = buildDetailsBody(game);
        els.gameDetailsModalFooter.innerHTML = buildDetailsFooter(game);

        var similarLink = els.gameDetailsModalBody.querySelector('.similar-to-link');
        if (similarLink) {
            similarLink.addEventListener('click', function (event) {
                event.preventDefault();
                openDetailsModal(similarLink.getAttribute('data-related-id'));
            });
        }

        var favoriteBtn = els.gameDetailsModalFooter.querySelector('.modal-favorite-btn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', function () { toggleFavorite(game.id); });
        }
        var compareBtn = els.gameDetailsModalFooter.querySelector('.modal-compare-btn');
        if (compareBtn) {
            compareBtn.addEventListener('click', function () {
                toggleCompare(game.id);
                compareBtn.classList.toggle('active', state.compareList.indexOf(game.id) !== -1);
                compareBtn.innerHTML = state.compareList.indexOf(game.id) !== -1 ? '\u2713 Added to Compare' : '+ Add to Compare';
            });
        }

        if (detailsModal) {
            detailsModal.show();
        } else if (els.gameDetailsModalEl) {
            els.gameDetailsModalEl.classList.add('show');
            els.gameDetailsModalEl.style.display = 'block';
        }
    }

    function buildDetailsBody(game) {
        var carouselItems = game.screenshots.map(function (src, index) {
            return '<div class="carousel-item' + (index === 0 ? ' active' : '') + '">' +
                '<img src="' + src + '" class="d-block w-100" alt="Screenshot ' + (index + 1) + ' of ' + escapeHtml(game.title) + '" />' +
                '</div>';
        }).join('');

        var carouselIndicators = game.screenshots.map(function (src, index) {
            return '<button type="button" data-bs-target="#gameScreenshotCarousel" data-bs-slide-to="' + index + '"' +
                (index === 0 ? ' class="active" aria-current="true"' : '') +
                ' aria-label="Screenshot ' + (index + 1) + '"></button>';
        }).join('');

        var specsRows = Object.keys(game.specs).map(function (key) {
            return '<tr><th scope="row">' + escapeHtml(key) + '</th><td>' + escapeHtml(game.specs[key]) + '</td></tr>';
        }).join('');

        var prosHtml = game.pros.map(function (pro) { return '<li>' + escapeHtml(pro) + '</li>'; }).join('');
        var consHtml = game.cons.map(function (con) { return '<li>' + escapeHtml(con) + '</li>'; }).join('');

        var trailerHtml = game.trailerUrl
            ? '<div class="ratio ratio-16x9 mb-3"><iframe src="' + game.trailerUrl + '" title="' + escapeHtml(game.title) + ' trailer" allowfullscreen></iframe></div>'
            : '<p class="text-muted small mb-3"><i class="bi bi-camera-reels me-1" aria-hidden="true"></i>Trailer not available yet.</p>';

        var similarHtml = game.similarTo
            ? ('<p class="mb-4">' +
                (game.similarTo.relatedId
                    ? ('<a href="#" class="similar-to-link" data-related-id="' + game.similarTo.relatedId + '">' + escapeHtml(game.similarTo.text) + '</a>')
                    : escapeHtml(game.similarTo.text)) +
                '</p>')
            : '';

        return (
            '<div id="gameScreenshotCarousel" class="carousel slide mb-4" data-bs-ride="false">' +
            '<div class="carousel-indicators">' + carouselIndicators + '</div>' +
            '<div class="carousel-inner">' + carouselItems + '</div>' +
            (game.screenshots.length > 1
                ? '<button class="carousel-control-prev" type="button" data-bs-target="#gameScreenshotCarousel" data-bs-slide="prev">' +
                  '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button>' +
                  '<button class="carousel-control-next" type="button" data-bs-target="#gameScreenshotCarousel" data-bs-slide="next">' +
                  '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>'
                : '') +
            '</div>' +

            '<div class="d-flex flex-wrap gap-2 mb-3">' +
            game.platform.map(function (p) { return '<span class="badge platform-badge">' + escapeHtml(p) + '</span>'; }).join(' ') +
            '<span class="badge bg-secondary">' + escapeHtml(game.difficulty) + '</span>' +
            '<span class="badge bg-secondary">' + escapeHtml(game.mode) + '</span>' +
            (game.openWorld ? '<span class="badge bg-secondary">Open World</span>' : '') +
            '</div>' +

            '<p class="mb-3">' + escapeHtml(game.story) + '</p>' +

            '<div class="row g-3 mb-3 small">' +
            '<div class="col-6 col-md-3"><span class="text-muted d-block">Price</span>' + (game.price === 0 ? 'Free' : '$' + game.price.toFixed(2)) + '</div>' +
            '<div class="col-6 col-md-3"><span class="text-muted d-block">Rating</span>' + buildStars(game.rating) + ' ' + game.rating.toFixed(1) + '</div>' +
            '<div class="col-6 col-md-3"><span class="text-muted d-block">Playtime</span>' + escapeHtml(game.playTime) + '</div>' +
            '<div class="col-6 col-md-3"><span class="text-muted d-block">Released</span>' + escapeHtml(game.releaseDate) + '</div>' +
            '</div>' +

            trailerHtml +

            '<div class="accordion mb-3" id="specsAccordion">' +
            '<div class="accordion-item">' +
            '<h4 class="accordion-header">' +
            '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#specsCollapse">System Requirements</button>' +
            '</h4>' +
            '<div id="specsCollapse" class="accordion-collapse collapse" data-bs-parent="#specsAccordion">' +
            '<div class="accordion-body p-0">' +
            '<table class="table table-sm mb-0 specs-table"><tbody>' + specsRows + '</tbody></table>' +
            '</div></div></div></div>' +

            '<div class="row g-3 mb-3">' +
            '<div class="col-md-6"><h4 class="h6">Pros</h4><ul class="mb-0">' + prosHtml + '</ul></div>' +
            '<div class="col-md-6"><h4 class="h6">Cons</h4><ul class="mb-0">' + consHtml + '</ul></div>' +
            '</div>' +

            similarHtml
        );
    }

    function buildDetailsFooter(game) {
        var isFavorite = state.favorites.indexOf(game.id) !== -1;
        var isComparing = state.compareList.indexOf(game.id) !== -1;
        return (
            '<button type="button" class="btn btn-outline-danger modal-favorite-btn' + (isFavorite ? ' active' : '') + '">' +
            '<i class="bi ' + (isFavorite ? 'bi-heart-fill' : 'bi-heart') + ' me-1" aria-hidden="true"></i>' + (isFavorite ? 'Favorited' : 'Favorite') +
            '</button>' +
            '<button type="button" class="btn btn-outline-success modal-compare-btn' + (isComparing ? ' active' : '') + '">' +
            (isComparing ? '\u2713 Added to Compare' : '+ Add to Compare') +
            '</button>'
        );
    }

    function bindModalEvents() {
        // Bootstrap handles open/close via data attributes and the Modal API;
        // nothing extra needed here beyond what openDetailsModal wires up
        // per-render (favorite/compare buttons, similar-to links).
    }

    // ---------------------------------------------------------------
    // Comparison tray + modal
    // ---------------------------------------------------------------

    function toggleCompare(id) {
        var index = state.compareList.indexOf(id);
        var game = findById(id);

        if (index !== -1) {
            state.compareList.splice(index, 1);
        } else {
            if (state.compareList.length >= MAX_COMPARE) {
                showToast('You can only compare up to ' + MAX_COMPARE + ' games at a time.', 'warning');
                return;
            }
            state.compareList.push(id);
        }

        renderCompareTray();
        renderGrid();
        if (game) updateModalCompareButton(game.id);
    }

    function updateModalCompareButton(id) {
        if (state.activeGameId !== id || !els.gameDetailsModalFooter) return;
        var btn = els.gameDetailsModalFooter.querySelector('.modal-compare-btn');
        if (!btn) return;
        var isComparing = state.compareList.indexOf(id) !== -1;
        btn.classList.toggle('active', isComparing);
        btn.innerHTML = isComparing ? '\u2713 Added to Compare' : '+ Add to Compare';
    }

    function renderCompareTray() {
        if (!els.compareTray) return;

        if (state.compareList.length === 0) {
            els.compareTray.classList.add('d-none');
            return;
        }
        els.compareTray.classList.remove('d-none');

        if (els.compareTrayCounter) {
            els.compareTrayCounter.textContent = state.compareList.length + ' / ' + MAX_COMPARE + ' Selected';
        }

        if (els.compareTrayItems) {
            els.compareTrayItems.innerHTML = state.compareList.map(function (id) {
                var game = findById(id);
                if (!game) return '';
                return '<div class="game-compare-tray-item" data-id="' + game.id + '">' +
                    '<img src="' + game.screenshots[0] + '" alt="" />' +
                    '<button type="button" class="remove-btn" aria-label="Remove ' + escapeHtml(game.title) + ' from comparison">&times;</button>' +
                    '</div>';
            }).join('');

            els.compareTrayItems.querySelectorAll('.remove-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var wrapper = btn.closest('.game-compare-tray-item');
                    if (wrapper) toggleCompare(wrapper.getAttribute('data-id'));
                });
            });
        }

        if (els.openCompareModalBtn) {
            els.openCompareModalBtn.disabled = state.compareList.length < 2;
        }
    }

    function bindCompareTrayEvents() {
        if (els.clearCompareBtn) {
            els.clearCompareBtn.addEventListener('click', function () {
                state.compareList = [];
                renderCompareTray();
                renderGrid();
            });
        }
        if (els.openCompareModalBtn) {
            els.openCompareModalBtn.addEventListener('click', openCompareModal);
        }
    }

    function openCompareModal() {
        if (!els.compareModalBody || state.compareList.length < 2) return;

        var games = state.compareList.map(findById).filter(Boolean);

        var bestRating = Math.max.apply(null, games.map(function (g) { return g.rating; }));
        var lowestPrice = Math.min.apply(null, games.map(function (g) { return g.price; }));
        var bestReplayability = Math.max.apply(null, games.map(function (g) { return g.replayability; }));

        var headerCells = games.map(function (game) {
            return '<th class="text-center compare-item-header">' +
                '<img src="' + game.screenshots[0] + '" alt="' + escapeHtml(game.title) + '" />' +
                '<div class="small fw-semibold mt-2">' + escapeHtml(game.title) + '</div>' +
                '</th>';
        }).join('');

        function row(label, cellFn) {
            var cells = games.map(cellFn).join('');
            return '<tr><th scope="row">' + label + '</th>' + cells + '</tr>';
        }

        var rowsHtml =
            row('Price', function (g) {
                var highlight = g.price === lowestPrice ? ' class="highlight-best"' : '';
                return '<td' + highlight + '>' + (g.price === 0 ? 'Free' : '$' + g.price.toFixed(2)) + '</td>';
            }) +
            row('Rating', function (g) {
                var highlight = g.rating === bestRating ? ' class="highlight-best"' : '';
                return '<td' + highlight + '>' + buildStars(g.rating) + ' ' + g.rating.toFixed(1) + '</td>';
            }) +
            row('Platforms', function (g) { return '<td>' + escapeHtml(g.platform.join(', ')) + '</td>'; }) +
            row('Playtime', function (g) { return '<td>' + escapeHtml(g.playTime) + '</td>'; }) +
            row('Difficulty', function (g) { return '<td>' + escapeHtml(g.difficulty) + '</td>'; }) +
            row('Mode', function (g) { return '<td>' + escapeHtml(g.mode) + '</td>'; }) +
            row('Open World', function (g) { return '<td>' + (g.openWorld ? 'Yes' : 'No') + '</td>'; }) +
            row('Replayability', function (g) {
                var highlight = g.replayability === bestReplayability ? ' class="highlight-best"' : '';
                return '<td' + highlight + '>' + g.replayability + ' / 5</td>';
            });

        els.compareModalBody.innerHTML =
            '<div class="table-responsive">' +
            '<table class="table table-bordered compare-table align-middle">' +
            '<thead><tr><th></th>' + headerCells + '</tr></thead>' +
            '<tbody>' + rowsHtml + '</tbody>' +
            '</table>' +
            '</div>' +
            '<p class="small text-muted mb-0"><span class="highlight-best-swatch"></span> = highest rated, lowest price, or best replayability.</p>';

        if (compareModal) {
            compareModal.show();
        }
    }

    // ---------------------------------------------------------------
    // "Can't Decide?" random recommendation
    // ---------------------------------------------------------------

    function bindRandomPickEvent() {
        if (!els.randomPickBtn) return;
        els.randomPickBtn.addEventListener('click', function () {
            var results = getFilteredSortedGames();
            if (results.length === 0) {
                showToast('No games match your current filters to pick from.', 'warning');
                return;
            }
            var pick = results[Math.floor(Math.random() * results.length)];
            var cardEl = document.getElementById('game-card-' + pick.id);
            if (!cardEl) return;

            cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            cardEl.classList.add('flash-highlight');
            setTimeout(function () {
                cardEl.classList.remove('flash-highlight');
            }, 1600);
        });
    }

    // ---------------------------------------------------------------
    // Toasts (Bootstrap Toast component)
    // ---------------------------------------------------------------

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

    // ---------------------------------------------------------------
    // Shared helpers
    // ---------------------------------------------------------------

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