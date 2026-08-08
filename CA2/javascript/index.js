// ReadyPlayer3 - index.html interactions

document.addEventListener('DOMContentLoaded', function () {
    initRecommendGame();
    initChatWidget();
});

document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.getElementById("heroSection");
    const gameCards = document.querySelectorAll(".game-card");

    if (!heroSection) {
        console.error("Hero Banner element with id='heroSection' was NOT found in the DOM!");
        return;
    }

    // Preload background GIFs so switching feels instant
    gameCards.forEach((card) => {
        const bgUrl = card.getAttribute("data-bg");
        if (bgUrl) {
            const img = new Image();
            img.src = bgUrl;
        }
    });

    // Update background on hover and KEEP IT
    gameCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            const newBg = card.getAttribute("data-bg");
            if (newBg) {
                heroSection.style.backgroundImage = `linear-gradient(rgba(17, 11, 41, 0.75), rgba(17, 11, 41, 0.85)), url("${newBg}")`;
            }
        });
        // "mouseleave" listener removed so the background stays on the last hovered game!
    });
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

if (chatForm) {
  var inactivityTimer = null;
  var messagesContainer = document.getElementById('chatMessages');
  var input = document.getElementById('chatInput');

  // Function to start or reset the 30-second inactivity timer
  function resetInactivityTimer() {
    // Clear any existing active timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    // Set a new timer for 30 seconds (30,000 ms)
    inactivityTimer = setTimeout(function () {
      // Only show the prompt if the chat panel is actually open
      var panel = document.getElementById('chatPanel');
      if (panel && !panel.classList.contains('d-none')) {
        
        // Create Bot Inactivity Prompt Bubble
        var botPrompt = document.createElement('div');
        botPrompt.className = 'p-2 px-3 text-light border border-secondary rounded-3 align-self-start small';
        botPrompt.style.backgroundColor = '#2a2244';
        botPrompt.style.maxWidth = '85%';
        botPrompt.style.wordBreak = 'break-word';
        botPrompt.textContent = "Still there? Let me know if you need any help finding games, genres, or gear!";

        messagesContainer.appendChild(botPrompt);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 30000); // 30 seconds
  }

  // 1. Reset timer whenever the user types in the input field
  input.addEventListener('input', function () {
    resetInactivityTimer();
  });

  // 2. Start the timer when the user opens the chat panel
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      // If panel is being opened, start timer
      if (!panel.classList.contains('d-none')) {
        resetInactivityTimer();
      } else if (inactivityTimer) {
        clearTimeout(inactivityTimer); // Stop timer if panel is closed
      }
    });
  }

  // 3. Handle Chat Form Submission
  chatForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var userText = input.value.trim();
    if (!userText) return;

    // Reset inactivity timer when user sends a message
    resetInactivityTimer();

    // Create User Message Bubble
    var userBubble = document.createElement('div');
    userBubble.className = 'p-2 px-3 text-white rounded-3 align-self-end small';
    userBubble.style.backgroundColor = '#8b5cf6';
    userBubble.style.maxWidth = '80%';
    userBubble.style.wordBreak = 'break-word';
    userBubble.textContent = userText;

    messagesContainer.appendChild(userBubble);
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulated Bot Response
    setTimeout(function () {
      var botBubble = document.createElement('div');
      botBubble.className = 'p-2 px-3 text-light border border-secondary rounded-3 align-self-start small';
      botBubble.style.backgroundColor = '#2a2244';
      botBubble.style.maxWidth = '85%';
      botBubble.style.wordBreak = 'break-word';

      var lowerText = userText.toLowerCase();
      if (lowerText.includes('fps') || lowerText.includes('shooter')) {
        botBubble.textContent = "Check out our Top Rated FPS games like Valorant or CS2!";
      } else if (lowerText.includes('mouse') || lowerText.includes('keyboard') || lowerText.includes('gear')) {
        botBubble.textContent = "You can compare gaming mice and mechanical keyboards on our Peripherals page!";
      } else if (lowerText.includes('survey') || lowerText.includes('recommend')) {
        botBubble.textContent = "Take our short survey to get personalized game recommendations!";
      } else {
        botBubble.textContent = "Thanks for asking! You can explore our Game Genres or Peripherals page to find recommendations tailored for you.";
      }

      messagesContainer.appendChild(botBubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Restart timer after bot responds
      resetInactivityTimer();
    }, 600);
  });
}