// ReadyPlayer3 - site interactions

document.addEventListener('DOMContentLoaded', function () {
    initRecommendGame();
    initChatWidget();
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