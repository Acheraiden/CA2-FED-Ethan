document.addEventListener('DOMContentLoaded', () => {
    initRecommendGame();
    initChatWidget();

    const heroSection = document.getElementById("heroSection");

    const gameCards = document.querySelectorAll(".hero-game-card, .game-card");

    if (!heroSection) {
        console.error("Hero Banner element with id='heroSection' was NOT found in the DOM!");
        return;
    }

    gameCards.forEach((card) => {
        const bgUrl = card.getAttribute("data-bg");
        if (bgUrl) {
            const img = new Image();
            img.src = bgUrl;
        }
    });

    gameCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            const newBg = card.getAttribute("data-bg");
            if (newBg) {

                heroSection.style.backgroundImage = `linear-gradient(rgba(17, 11, 41, 0.75), rgba(17, 11, 41, 0.85)), url("${newBg}")`;
            }
        });
    });
});

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

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function initChatWidget() {
    var toggleBtn = document.getElementById('chatToggleBtn');
    var panel = document.getElementById('chatPanel');
    var panelCloseBtn = document.getElementById('chatPanelClose');
    var notification = document.getElementById('chatNotification');
    var notificationCloseBtn = document.getElementById('chatNotificationClose');
    var chatForm = document.getElementById('chatForm');
    var chatInput = document.getElementById('chatInput');
    var messagesContainer = document.getElementById('chatMessages');

    if (!toggleBtn || !panel) {
        return;
    }

    var NUDGE_DELAY_MS = 60 * 1000;
    var INACTIVITY_DELAY_MS = 30 * 1000;
    var chatOpenedAlready = false;
    var nudgeTimer = null;
    var inactivityTimer = null;

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
        resetInactivityTimer();
        if (chatInput) {
            chatInput.focus();
        }
    }

    function closePanel() {
        panel.classList.add('d-none');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Open chat');
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
            inactivityTimer = null;
        }
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

    function resetInactivityTimer() {
        if (!messagesContainer) return;
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
        }
        inactivityTimer = setTimeout(function () {
            if (panel.classList.contains('d-none')) return;
            appendBotBubble('Still there? Let me know if you need any help finding games, genres, or gear!');
        }, INACTIVITY_DELAY_MS);
    }

    function appendUserBubble(text) {
        var bubble = document.createElement('div');
        bubble.className = 'p-2 px-3 text-white rounded-3 align-self-end small';
        bubble.style.backgroundColor = '#8b5cf6';
        bubble.style.maxWidth = '80%';
        bubble.style.wordBreak = 'break-word';
        bubble.textContent = text;
        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function appendBotBubble(text) {
        var bubble = document.createElement('div');
        bubble.className = 'p-2 px-3 text-light border border-secondary rounded-3 align-self-start small';
        bubble.style.backgroundColor = '#2a2244';
        bubble.style.maxWidth = '85%';
        bubble.style.wordBreak = 'break-word';
        bubble.textContent = text;
        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function buildBotReply(userText) {
        var lowerText = userText.toLowerCase();
        if (lowerText.indexOf('fps') !== -1 || lowerText.indexOf('shooter') !== -1) {
            return 'Check out our Top Rated FPS games like Valorant or CS2!';
        }
        if (lowerText.indexOf('mouse') !== -1 || lowerText.indexOf('keyboard') !== -1 || lowerText.indexOf('gear') !== -1) {
            return 'You can compare gaming mice and mechanical keyboards on our Peripherals page!';
        }
        if (lowerText.indexOf('survey') !== -1 || lowerText.indexOf('recommend') !== -1) {
            return 'Take our short survey to get personalized game recommendations!';
        }
        return 'Thanks for asking! You can explore our Games or Peripherals page to find recommendations tailored for you.';
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

    if (notification) {
        notification.addEventListener('click', function (event) {
            if (event.target === notificationCloseBtn || (notificationCloseBtn && notificationCloseBtn.contains(event.target))) {
                return;
            }
            openPanel();
        });
    }

    if (chatInput) {
        chatInput.addEventListener('input', resetInactivityTimer);
    }

    if (chatForm && chatInput && messagesContainer) {
        chatForm.addEventListener('submit', function (event) {
            event.preventDefault();

            var userText = chatInput.value.trim();
            if (!userText) return;

            appendUserBubble(userText);
            chatInput.value = '';
            resetInactivityTimer();

            setTimeout(function () {
                appendBotBubble(buildBotReply(userText));
                resetInactivityTimer();
            }, 600);
        });
    }

    nudgeTimer = setTimeout(showNotification, NUDGE_DELAY_MS);
}