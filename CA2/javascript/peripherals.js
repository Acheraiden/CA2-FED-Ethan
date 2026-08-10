// ReadyPlayer3 - peripherals.html interactions

document.addEventListener('DOMContentLoaded', function () {
    initChatWidget();
    PeripheralsPage.init();
});

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
    Mousepad: ['Surface Type', 'Dimensions', 'Thickness', 'Base Material', 'Stitched Edges', 'RGB'],
    Controller: ['Connectivity', 'Battery Life', 'Vibration/Haptics', 'Compatible Platforms', 'Buttons', 'Weight']
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
        image: '../images/equipment/logitech-g-pro-x-superlight-2.jpg',
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
        image: '../images/equipment/razer-viper-8khz.jpg',
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
    {
        id: 'mouse-logitech-g502x',
        type: 'Mouse',
        brand: 'Logitech',
        name: 'Logitech G502 X',
        price: 99.99,
        connectivity: 'Wireless',
        image: '../images/equipment/logitech-g502-x.jpg',
        rating: 4.6,
        reviewCount: 348,
        stock: 'in-stock',
        specs: {
            'Sensor': 'HERO 25K, optical',
            'DPI': '25,600',
            'Polling Rate': '1000 Hz',
            'Weight': '106 g',
            'Battery Life': '120 hrs',
            'Buttons': '13 programmable'
        },
        reviews: [
            { author: 'Elena R.', rating: 5, comment: 'Ergonomic shape fits my hand perfectly for long sessions.' },
            { author: 'Marcus T.', rating: 4, comment: 'Great all-round mouse, side buttons feel a bit stiff at first.' }
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
        image: '../images/equipment/wooting-60he.jpg',
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
        image: '../images/equipment/logitech-g915-tkl.jpg',
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
    {
        id: 'keyboard-steelseries-apex-pro',
        type: 'Keyboard',
        brand: 'SteelSeries',
        name: 'SteelSeries Apex Pro',
        price: 199.99,
        connectivity: 'Wired',
        image: '../images/equipment/steelseries-apex-pro.jpg',
        rating: 4.7,
        reviewCount: 296,
        stock: 'in-stock',
        specs: {
            'Switch Type': 'OmniPoint adjustable mechanical',
            'Layout': 'Full-size',
            'Backlight': 'Per-key RGB',
            'Polling Rate': '1000 Hz',
            'Connectivity': 'Wired (USB-C)',
            'Battery Life': 'N/A (wired)'
        },
        reviews: [
            { author: 'Grace L.', rating: 5, comment: 'Being able to tune actuation per key is amazing for competitive play.' },
            { author: 'Oscar N.', rating: 4, comment: 'Solid full-size board, OLED display is a nice touch.' }
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
        image: '../images/equipment/asus-rog-swift-pg27aqn.jpg',
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
        image: '../images/equipment/razer-raptor-27.jpg',
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
    {
        id: 'monitor-asus-tuf-vg259qm',
        type: 'Monitor',
        brand: 'ASUS TUF',
        name: 'ASUS TUF Gaming VG259QM',
        price: 259.99,
        connectivity: 'Wired',
        image: '../images/equipment/asus-tuf-vg259qm.jpg',
        rating: 4.5,
        reviewCount: 278,
        stock: 'in-stock',
        specs: {
            'Panel Type': 'Fast IPS',
            'Refresh Rate': '280 Hz',
            'Resolution': '1920 x 1080',
            'Response Time': '1 ms (GtG)',
            'Screen Size': '24.5 in',
            'HDR': 'HDR10 (Extreme Low Motion Blur Sync)'
        },
        reviews: [
            { author: 'Beth O.', rating: 5, comment: 'Best budget-friendly high-refresh monitor I have used.' },
            { author: 'Cole M.', rating: 4, comment: '280Hz is smooth, colors are decent for a fast IPS panel.' }
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
        image: '../images/equipment/hyperx-cloud-ii.jpg',
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
        image: '../images/equipment/steelseries-arctis-nova-pro-wireless.jpg',
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
    {
        id: 'headset-logitech-gprox2',
        type: 'Headset',
        brand: 'Logitech',
        name: 'Logitech G Pro X 2',
        price: 199.99,
        connectivity: 'Wireless',
        image: '../images/equipment/logitech-g-pro-x-2.jpg',
        rating: 4.6,
        reviewCount: 221,
        stock: 'in-stock',
        specs: {
            'Driver Size': '50 mm graphene',
            'Frequency Response': '20 Hz - 20 kHz',
            'Microphone': 'Blue VO!CE, detachable boom',
            'Surround Sound': 'DTS Headphone:X 2.0',
            'Battery Life': '50 hrs',
            'Weight': '278 g'
        },
        reviews: [
            { author: 'Priya S.', rating: 5, comment: 'Graphene drivers make a real difference in clarity.' },
            { author: 'Dev K.', rating: 4, comment: 'Comfortable for long sessions, mic quality is excellent.' }
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
        image: '../images/equipment/logitech-g-fits.jpg',
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
        image: '../images/equipment/razer-hammerhead-true-wireless-pro.jpg',
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
        image: '../images/equipment/hyperx-quadcast-s.jpg',
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
        image: '../images/equipment/blue-yeti-x.jpg',
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
    {
        id: 'mic-hyperx-solocast',
        type: 'Mic',
        brand: 'HyperX',
        name: 'HyperX SoloCast',
        price: 59.99,
        connectivity: 'Wired',
        image: '../images/equipment/hyperx-solocast.jpg',
        rating: 4.5,
        reviewCount: 389,
        stock: 'in-stock',
        specs: {
            'Polar Pattern': 'Cardioid',
            'Frequency Response': '20 Hz - 20 kHz',
            'Sample Rate': '48 kHz',
            'Bit Depth': '16-bit',
            'Connectivity': 'USB',
            'Mounting': 'Adjustable stand, tripod compatible'
        },
        reviews: [
            { author: 'Ruth D.', rating: 5, comment: 'Perfect budget mic for getting started, tap-to-mute is handy.' },
            { author: 'Jonas P.', rating: 4, comment: 'Simple and reliable, great value for the price.' }
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
        image: '../images/equipment/logitech-g840-xl.jpg',
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
        image: '../images/equipment/razer-goliathus-extended-chroma.jpg',
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
    },
    {
        id: 'mousepad-razer-sphex-v3',
        type: 'Mousepad',
        brand: 'Razer',
        name: 'Razer Sphex V3',
        price: 29.99,
        connectivity: 'Wired',
        image: '../images/equipment/razer-sphex-v3.jpg',
        rating: 4.4,
        reviewCount: 176,
        stock: 'in-stock',
        specs: {
            'Surface Type': 'Hard, speed-tuned',
            'Dimensions': '450 x 400 mm',
            'Thickness': '0.4 mm',
            'Base Material': 'Adhesive polycarbonate',
            'Stitched Edges': 'No',
            'RGB': 'No'
        },
        reviews: [
            { author: 'Miriam K.', rating: 5, comment: 'Ultra-thin and sticks flat to my desk, great for flick shots.' },
            { author: 'Owen P.', rating: 4, comment: 'Fast surface, wears a little faster than cloth pads.' }
        ]
    },

    // ---------- Controller ----------
    {
        id: 'controller-xbox-wireless',
        type: 'Controller',
        brand: 'Xbox',
        name: 'Xbox Wireless Controller',
        price: 59.99,
        connectivity: 'Wireless',
        image: '../images/equipment/xbox-wireless-controller.jpg',
        rating: 4.7,
        reviewCount: 512,
        stock: 'in-stock',
        specs: {
            'Connectivity': 'Bluetooth / Xbox Wireless',
            'Battery Life': '40 hrs (AA batteries)',
            'Vibration/Haptics': 'Dual rumble motors',
            'Compatible Platforms': 'PC, Xbox',
            'Buttons': 'Hybrid D-pad, standard layout',
            'Weight': '287 g'
        },
        reviews: [
            { author: 'Ivy C.', rating: 5, comment: 'Reliable and comfortable, exactly what you expect from Xbox.' },
            { author: 'Tariq A.', rating: 4, comment: 'Great value, wish it shipped with a rechargeable battery pack.' }
        ]
    },
    {
        id: 'controller-playstation-dualsense',
        type: 'Controller',
        brand: 'PlayStation',
        name: 'PlayStation DualSense',
        price: 69.99,
        connectivity: 'Wireless',
        image: '../images/equipment/playstation-dualsense.jpg',
        rating: 4.8,
        reviewCount: 640,
        stock: 'in-stock',
        specs: {
            'Connectivity': 'Bluetooth / USB-C wired',
            'Battery Life': '12 hrs',
            'Vibration/Haptics': 'Haptic feedback + adaptive triggers',
            'Compatible Platforms': 'PlayStation, PC (partial support)',
            'Buttons': 'Standard layout, built-in mic',
            'Weight': '280 g'
        },
        reviews: [
            { author: 'Grace L.', rating: 5, comment: 'Adaptive triggers add a whole new layer of immersion.' },
            { author: 'Colin P.', rating: 4, comment: 'Battery life could be better, but the haptics are unmatched.' }
        ]
    },
    {
        id: 'controller-razer-wolverine-v2-chroma',
        type: 'Controller',
        brand: 'Razer',
        name: 'Razer Wolverine V2 Chroma',
        price: 99.99,
        connectivity: 'Wired',
        image: '../images/equipment/razer-wolverine-v2-chroma.jpg',
        rating: 4.5,
        reviewCount: 158,
        stock: 'in-stock',
        specs: {
            'Connectivity': 'Wired (USB-C)',
            'Battery Life': 'N/A (wired)',
            'Vibration/Haptics': 'Dual rumble motors',
            'Compatible Platforms': 'PC, Xbox',
            'Buttons': '6 remappable multi-function buttons',
            'Weight': '315 g'
        },
        reviews: [
            { author: 'Beth O.', rating: 5, comment: 'Remappable back buttons are a huge edge in competitive shooters.' },
            { author: 'Cole M.', rating: 4, comment: 'Great build quality, Chroma lighting is a nice extra.' }
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
            '<div class="peripheral-card-image-wrap position-relative">' +
            '<img src="' + item.image + '" class="card-img-top" alt="' + escapeHtml(item.name) + ', a ' + escapeHtml(item.type.toLowerCase()) + ' by ' + escapeHtml(item.brand) + '" />' +
            '<span class="badge type-badge position-absolute">' + escapeHtml(item.type) + '</span>' +
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
        document.body.classList.add('overflow-hidden');

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
        document.body.classList.remove('overflow-hidden');
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
            '<button type="button" class="detail-panel-close position-absolute rounded-circle d-flex align-items-center justify-content-center" aria-label="Close details"><i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
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
            return '<div class="compare-tray-item position-relative" data-id="' + item.id + '">' +
                '<button type="button" class="remove-btn position-absolute rounded-circle d-flex align-items-center justify-content-center" aria-label="Remove ' + escapeHtml(item.name) + ' from comparison">&times;</button>' +
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
                '<img src="' + item.image + '" alt="' + escapeHtml(item.name) + '" class="w-100" />' +
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
        document.body.classList.add('overflow-hidden');
    }

    function closeCompareOverlay() {
        if (!els.compareOverlay) return;
        els.compareOverlay.classList.remove('is-open');
        document.body.classList.remove('overflow-hidden');
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