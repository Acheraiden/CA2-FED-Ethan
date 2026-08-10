// ReadyPlayer3 - survey.html (Game Finder Survey) data
//
// Questions the survey asks, the game catalog it recommends from, and
// the gamer-personality lookup. Kept separate from the controller logic.

const QUESTIONS = [
    {
        id: 'story', section: 'Play Style', type: 'slider',
        prompt: 'How important is story to you?',
        min: 0, max: 10, default: 5,
        lowLabel: 'Not Important', highLabel: 'Very Important'
    },
    {
        id: 'exploration', section: 'Play Style', type: 'slider',
        prompt: 'How much do you enjoy exploring open worlds?',
        min: 0, max: 10, default: 5,
        lowLabel: 'Stay on Track', highLabel: 'Explore Everything'
    },
    {
        id: 'action', section: 'Gameplay', type: 'slider',
        prompt: 'How much do you enjoy fast-paced action?',
        min: 0, max: 10, default: 5,
        lowLabel: 'Slow & Methodical', highLabel: 'Non-Stop Action'
    },
    {
        id: 'difficulty', section: 'Gameplay', type: 'slider',
        prompt: 'How much of a challenge do you want?',
        min: 0, max: 10, default: 5,
        lowLabel: 'Relaxing', highLabel: 'Brutal'
    },
    {
        id: 'strategy', section: 'Gameplay', type: 'slider',
        prompt: 'How important is strategic thinking?',
        min: 0, max: 10, default: 5,
        lowLabel: 'Just React', highLabel: 'Plan Everything'
    },
    {
        id: 'multiplayer', section: 'Social', type: 'slider',
        prompt: 'How important is playing with others?',
        min: 0, max: 10, default: 3,
        lowLabel: 'Solo Only', highLabel: 'Always With Others'
    },
    {
        id: 'playStyle', section: 'Social', type: 'buttons',
        prompt: 'How do you usually play?',
        options: [
            { value: 'solo', label: 'Solo' },
            { value: 'friends', label: 'With Friends' },
            { value: 'both', label: 'Both' },
            { value: 'local', label: 'Local / Couch Co-op' }
        ]
    },
    {
        id: 'sessionLength', section: 'Time', type: 'buttons',
        prompt: 'How much time do you usually have to play?',
        options: [
            { value: '30m', label: '< 30 minutes' },
            { value: '1h', label: '30\u201360 minutes' },
            { value: '3h', label: '1\u20133 hours' },
            { value: '3h+', label: '3+ hours' }
        ]
    },
    {
        id: 'gameLength', section: 'Time', type: 'buttons',
        prompt: 'What game length do you prefer?',
        options: [
            { value: 'short', label: 'Short (under 10 hrs)' },
            { value: 'medium', label: 'Medium (10\u201330 hrs)' },
            { value: 'long', label: 'Long (30+ hrs)' },
            { value: 'ongoing', label: 'Ongoing / Live Service' }
        ]
    },
    {
        id: 'platforms', section: 'Preferences', type: 'checkboxes',
        prompt: 'Which platforms do you play on?',
        options: [
            { value: 'PC', label: 'PC' },
            { value: 'PlayStation', label: 'PlayStation' },
            { value: 'Xbox', label: 'Xbox' },
            { value: 'Switch', label: 'Nintendo Switch' }
        ]
    },
    {
        id: 'budget', section: 'Preferences', type: 'buttons',
        prompt: 'What\u2019s your preferred budget?',
        options: [
            { value: 'free', label: 'Free' },
            { value: 'under20', label: 'Under $20' },
            { value: '20to50', label: '$20\u2013$50' },
            { value: '50plus', label: '$50+' }
        ]
    }
];

// Neutral starting answers - seeds the summary if a step is skipped, and
// defines the shape every answers object should match.
const DEFAULT_ANSWERS = {
    story: 5, exploration: 5, action: 5, difficulty: 5, strategy: 5, multiplayer: 3,
    playStyle: null,
    sessionLength: null,
    gameLength: null,
    platforms: [],
    budget: null
};

// Each game is rated 0-10 on the same six traits as the sliders, so
// matching is a straight subtraction. Titles reused from Games catalog.
const GAMES = [
    {
        id: 'valorant', name: 'Valorant', genre: 'Tactical Shooter',
        story: 1, action: 9, difficulty: 8, exploration: 1, strategy: 7, multiplayer: 10,
        price: 0, platforms: ['PC'], mode: 'both', sessionLength: '3h', gameLength: 'ongoing',
        blurb: 'A 5v5 tactical shooter where precise aim and team coordination decide every round.'
    },
    {
        id: 'counter-strike-2', name: 'Counter-Strike 2', genre: 'Tactical Shooter',
        story: 1, action: 9, difficulty: 9, exploration: 1, strategy: 8, multiplayer: 10,
        price: 0, platforms: ['PC'], mode: 'both', sessionLength: '3h', gameLength: 'ongoing',
        blurb: 'The long-running competitive shooter, rebuilt with refreshed maps and physics.'
    },
    {
        id: 'doom-eternal', name: 'DOOM Eternal', genre: 'FPS',
        story: 4, action: 10, difficulty: 8, exploration: 4, strategy: 3, multiplayer: 1,
        price: 39.99, platforms: ['PC', 'PlayStation', 'Xbox'], mode: 'solo', sessionLength: '1h', gameLength: 'medium',
        blurb: 'A fast, brutal single-player campaign built entirely around momentum and combat flow.'
    },
    {
        id: 'left-4-dead-2', name: 'Left 4 Dead 2', genre: 'Co-op Shooter',
        story: 3, action: 8, difficulty: 7, exploration: 3, strategy: 5, multiplayer: 9,
        price: 9.99, platforms: ['PC'], mode: 'friends', sessionLength: '1h', gameLength: 'medium',
        blurb: 'Four survivors fight through zombie-infested campaigns that reward teamwork.'
    },
    {
        id: 'ghost-of-tsushima', name: 'Ghost of Tsushima', genre: 'Action-Adventure',
        story: 9, action: 7, difficulty: 5, exploration: 10, strategy: 4, multiplayer: 1,
        price: 59.99, platforms: ['PlayStation', 'PC'], mode: 'solo', sessionLength: '3h+', gameLength: 'long',
        blurb: 'An open-world samurai epic built around exploration and cinematic combat.'
    },
    {
        id: 'devil-may-cry-5', name: 'Devil May Cry 5', genre: 'Action',
        story: 6, action: 10, difficulty: 8, exploration: 2, strategy: 3, multiplayer: 1,
        price: 29.99, platforms: ['PC', 'PlayStation', 'Xbox'], mode: 'solo', sessionLength: '1h', gameLength: 'medium',
        blurb: 'Stylish, technical combat across three distinct playable characters.'
    },
    {
        id: 'batman-arkham-city', name: 'Batman: Arkham City', genre: 'Action-Adventure',
        story: 8, action: 7, difficulty: 5, exploration: 8, strategy: 4, multiplayer: 1,
        price: 19.99, platforms: ['PC', 'PlayStation', 'Xbox'], mode: 'solo', sessionLength: '3h', gameLength: 'medium',
        blurb: 'Iconic Freeflow combat inside a dense, atmospheric open prison district.'
    },
    {
        id: 'final-fantasy-7-remake', name: 'Final Fantasy VII Remake', genre: 'RPG',
        story: 10, action: 6, difficulty: 5, exploration: 6, strategy: 5, multiplayer: 1,
        price: 59.99, platforms: ['PC', 'PlayStation'], mode: 'solo', sessionLength: '3h+', gameLength: 'long',
        blurb: 'A gorgeous remake with a real-time/ATB hybrid combat system and deep story.'
    },
    {
        id: 'persona-5-royal', name: 'Persona 5 Royal', genre: 'RPG',
        story: 10, action: 5, difficulty: 5, exploration: 6, strategy: 6, multiplayer: 1,
        price: 49.99, platforms: ['PC', 'PlayStation', 'Xbox'], mode: 'solo', sessionLength: '3h+', gameLength: 'long',
        blurb: 'A stylish turn-based RPG with a huge, character-driven story.'
    },
    {
        id: 'undertale', name: 'Undertale', genre: 'RPG',
        story: 9, action: 3, difficulty: 5, exploration: 6, strategy: 4, multiplayer: 1,
        price: 9.99, platforms: ['PC'], mode: 'solo', sessionLength: '1h', gameLength: 'short',
        blurb: 'A short, endlessly clever RPG where every choice to fight or spare matters.'
    },
    {
        id: 'fallout-4', name: 'Fallout 4', genre: 'RPG',
        story: 7, action: 6, difficulty: 5, exploration: 10, strategy: 5, multiplayer: 1,
        price: 19.99, platforms: ['PC', 'PlayStation', 'Xbox'], mode: 'solo', sessionLength: '3h+', gameLength: 'long',
        blurb: 'A massive open world to explore, with deep settlement building on top.'
    },
    {
        id: 'civilization-6', name: 'Sid Meier\u2019s Civilization VI', genre: 'Strategy',
        story: 3, action: 1, difficulty: 7, exploration: 7, strategy: 10, multiplayer: 5,
        price: 59.99, platforms: ['PC'], mode: 'both', sessionLength: '3h+', gameLength: 'ongoing',
        blurb: 'Build an empire from the Stone Age to the Information Age.'
    },
    {
        id: 'xcom-2', name: 'XCOM 2', genre: 'Strategy',
        story: 5, action: 5, difficulty: 9, exploration: 4, strategy: 10, multiplayer: 1,
        price: 29.99, platforms: ['PC', 'PlayStation', 'Xbox'], mode: 'solo', sessionLength: '1h', gameLength: 'long',
        blurb: 'Punishing, tactical turn-based combat against an alien occupation.'
    },
    {
        id: 'starcraft-2', name: 'StarCraft II', genre: 'Strategy',
        story: 4, action: 6, difficulty: 9, exploration: 2, strategy: 10, multiplayer: 9,
        price: 0, platforms: ['PC'], mode: 'both', sessionLength: '1h', gameLength: 'ongoing',
        blurb: 'A genre-defining RTS with tight mechanics and a legendary esports scene.'
    },
    {
        id: 'project-zomboid', name: 'Project Zomboid', genre: 'Survival',
        story: 4, action: 5, difficulty: 9, exploration: 8, strategy: 7, multiplayer: 6,
        price: 19.99, platforms: ['PC'], mode: 'both', sessionLength: '3h+', gameLength: 'ongoing',
        blurb: 'Deep survival and base-building against a relentless zombie apocalypse.'
    }
];

// Survey and Games each keep their own id scheme (Survey's 'valorant' vs
// Games' 'fps-valorant'), so this maps Survey ids to Games ids for the
// "View in Games" link, which deep-links via ?id=<gameId>.
const GAMES_PAGE_ID_MAP = {
    'valorant': 'fps-valorant',
    'counter-strike-2': 'fps-counter-strike-2',
    'doom-eternal': 'fps-doom-eternal',
    'left-4-dead-2': 'fps-left-4-dead-2',
    'ghost-of-tsushima': 'action-adventure-ghost-of-tsushima',
    'devil-may-cry-5': 'action-adventure-devil-may-cry-5',
    'batman-arkham-city': 'action-adventure-batman-arkham-city',
    'final-fantasy-7-remake': 'rpg-final-fantasy-7-remake',
    'persona-5-royal': 'rpg-persona-5-royal',
    'undertale': 'rpg-undertale',
    'fallout-4': 'rpg-fallout-4',
    'civilization-6': 'strategy-civilization-6',
    'xcom-2': 'strategy-xcom-2',
    'starcraft-2': 'strategy-starcraft-2',
    'project-zomboid': 'strategy-project-zomboid'
};

// Personality is decided by the single highest-rated trait.
const PERSONALITY_BY_TRAIT = {
    action: { emoji: '\u2694\ufe0f', name: 'The Competitor', description: 'You want fast, skill-testing action where every reflex matters.' },
    story: { emoji: '\ud83d\udcd6', name: 'The Storyteller', description: 'You play games for the narrative \u2014 characters, choices, and worlds worth remembering.' },
    strategy: { emoji: '\ud83e\udde0', name: 'The Strategist', description: 'You\u2019d rather out-think an opponent than out-react them.' },
    multiplayer: { emoji: '\ud83e\udd1d', name: 'The Social Gamer', description: 'Games are better with people \u2014 you play to connect, not just to win.' },
    exploration: { emoji: '\ud83d\uddfa\ufe0f', name: 'The Explorer', description: 'You enjoy discovering new worlds, hidden areas, and immersing yourself in large game worlds.' },
    difficulty: { emoji: '\ud83d\udc80', name: 'The Hardcore Gamer', description: 'If it doesn\u2019t push back, it\u2019s not worth playing.' }
};

// ReadyPlayer3 - survey.html (Game Finder Survey) interactions
//
// Controller for the survey: question flow, scoring, results (with
// per-game "Why?"), gamer personality, wishlist, compare modal, and
// recommendation history - all persisted to localStorage.

document.addEventListener('DOMContentLoaded', () => {
    GameFinderPage.init();
});

const GameFinderPage = (() => {
    const WISHLIST_KEY = 'rp3-survey-wishlist';
    const HISTORY_KEY = 'rp3-survey-history';
    const MAX_HISTORY = 5;
    const MAX_COMPARE = 3;

    const state = {
        screen: 'intro', // 'intro' | 'survey' | 'summary' | 'results'
        currentQuestionIndex: 0,
        answers: Object.assign({}, DEFAULT_ANSWERS, { platforms: [] }),
        results: [], // ranked [{ game, score, why }] after Find My Games
        personality: null,
        wishlist: [],
        history: [],
        compareList: [] // game ids picked for the compare modal
    };

    const els = {};
    let compareModal = null;

    function init() {
        state.wishlist = loadFromStorage(WISHLIST_KEY, []);
        state.history = loadFromStorage(HISTORY_KEY, []);

        cacheElements();
        initModals();
        bindEvents();
        showScreen('intro');
        renderWishlist();
        renderHistory();
    }

    function cacheElements() {
        els.introScreen = document.getElementById('introScreen');
        els.surveyScreen = document.getElementById('surveyScreen');
        els.summaryScreen = document.getElementById('summaryScreen');
        els.resultsScreen = document.getElementById('resultsScreen');

        els.startSurveyBtn = document.getElementById('startSurveyBtn');
        els.historyIntroWrap = document.getElementById('historyIntroWrap');

        els.progressBar = document.getElementById('surveyProgressBar');
        els.progressLabel = document.getElementById('surveyProgressLabel');
        els.sectionLabel = document.getElementById('questionSectionLabel');
        els.questionContainer = document.getElementById('questionContainer');
        els.validationAlert = document.getElementById('validationAlert');
        els.backBtn = document.getElementById('backBtn');
        els.nextBtn = document.getElementById('nextBtn');

        els.summaryList = document.getElementById('summaryList');
        els.changeAnswersBtn = document.getElementById('changeAnswersBtn');
        els.findGamesBtn = document.getElementById('findGamesBtn');
        els.resultsLoadingSpinner = document.getElementById('resultsLoadingSpinner');

        els.personalityCard = document.getElementById('personalityCard');
        els.topMatchesRow = document.getElementById('topMatchesRow');
        els.fullRankedList = document.getElementById('fullRankedList');
        els.retakeSurveyBtn = document.getElementById('retakeSurveyBtn');
        els.editAnswersBtn = document.getElementById('editAnswersBtn');
        els.surpriseMeBtn = document.getElementById('surpriseMeBtn');
        els.compareSelectedBtn = document.getElementById('compareSelectedBtn');
        els.saveResultsBtn = document.getElementById('saveResultsBtn');

        els.wishlistRow = document.getElementById('wishlistRow');
        els.historyList = document.getElementById('historyList');

        els.compareModalEl = document.getElementById('compareModal');
        els.compareModalBody = document.getElementById('compareModalBody');

        els.toastContainer = document.getElementById('toastContainer');
    }

    function initModals() {
        if (!window.bootstrap) return;
        compareModal = bootstrap.Modal.getOrCreateInstance(els.compareModalEl);
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el));
    }

    // ---------------------------------------------------------------
    // Screen switching
    // ---------------------------------------------------------------

    function showScreen(screen) {
        state.screen = screen;
        [els.introScreen, els.surveyScreen, els.summaryScreen, els.resultsScreen].forEach((el) => {
            if (el) el.classList.add('d-none');
        });
        const map = { intro: els.introScreen, survey: els.surveyScreen, summary: els.summaryScreen, results: els.resultsScreen };
        if (map[screen]) map[screen].classList.remove('d-none');
        window.scrollTo({ top: document.getElementById('surveyApp').offsetTop - 80, behavior: 'smooth' });
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

    function findGame(id) {
        return GAMES.find((g) => g.id === id) || null;
    }

    // ---------------------------------------------------------------
    // Recommendation algorithm
    // ---------------------------------------------------------------

    /**
     * Stepped over-budget penalty (first dollars cost the most, then
     * levels off): $5 over -> -5, $10 -> -8, $20 -> -10, $40 -> -15,
     * beyond that -> -20 (capped).
     */
    function getOverBudgetPenalty(overBy) {
        if (overBy <= 5) return 5;
        if (overBy <= 10) return 8;
        if (overBy <= 20) return 10;
        if (overBy <= 40) return 15;
        return 20;
    }

    /**
     * Match score = 75% trait match + 25% practical fit.
     *   Trait match: per-trait similarity (0-10 diff -> 100-0 score),
     *     averaged across story/action/difficulty/exploration/
     *     strategy/multiplayer.
     *   Practical fit: budget, play style, session/game length as
     *     bonuses/penalties around a neutral baseline of 50.
     * Platform compatibility isn't scored - incompatible games are
     * filtered out entirely first, since that's a hard requirement.
     */
    function computeMatchScore(answers, game) {
        const traits = ['story', 'action', 'difficulty', 'exploration', 'strategy', 'multiplayer'];
        const traitScores = traits.map((trait) => 100 - Math.abs(answers[trait] - game[trait]) * 10);
        const traitMatchAverage = traitScores.reduce((sum, s) => sum + s, 0) / traitScores.length;

        let practicalFit = 50;

        const budgetCeilings = { free: 0, under20: 20, '20to50': 50, '50plus': Infinity };
        const ceiling = budgetCeilings[answers.budget];
        if (game.price <= ceiling) {
            practicalFit += 15;
        } else {
            practicalFit -= getOverBudgetPenalty(game.price - ceiling);
        }

        if (game.mode === answers.playStyle || game.mode === 'both') {
            practicalFit += 10;
        } else {
            practicalFit -= 10;
        }

        if (game.sessionLength === answers.sessionLength) practicalFit += 5;
        if (game.gameLength === answers.gameLength) practicalFit += 10;

        practicalFit = Math.max(0, Math.min(100, practicalFit));

        const finalScore = (traitMatchAverage * 0.75) + (practicalFit * 0.25);
        return Math.round(Math.max(0, Math.min(100, finalScore)));
    }

    /**
     * Builds "Why?" bullets: traits the user cared about (>= 7) that
     * the game also delivers on (>= 7).
     */
    function buildWhyExplanation(answers, game) {
        const reasons = [];
        const traitPhrases = {
            difficulty: 'You enjoy a real challenge, and this delivers.',
            story: 'You value story, and this is built around one.',
            exploration: 'You like exploring, and this has a world worth exploring.',
            action: 'You enjoy fast-paced action, and this is packed with it.',
            strategy: 'You like strategic thinking, and this rewards it.',
            multiplayer: 'You enjoy playing with others, and this is built for that.'
        };
        Object.keys(traitPhrases).forEach((trait) => {
            if (answers[trait] >= 7 && game[trait] >= 7) {
                reasons.push(traitPhrases[trait]);
            }
        });

        if (answers.playStyle && (game.mode === answers.playStyle || game.mode === 'both')) {
            reasons.push('It fits how you like to play (' + playStyleLabel(answers.playStyle) + ').');
        }
        if (answers.gameLength && game.gameLength === answers.gameLength) {
            reasons.push('The game length matches what you\u2019re after.');
        }
        if (game.price === 0) {
            reasons.push('It\u2019s free to play.');
        }

        if (reasons.length === 0) {
            reasons.push('It\u2019s the closest overall match to your answers, even without one standout trait.');
        }
        return reasons;
    }

    function playStyleLabel(value) {
        const found = QUESTIONS.find((q) => q.id === 'playStyle');
        const option = found && found.options.find((o) => o.value === value);
        return option ? option.label : value;
    }

    function getRankedRecommendations(answers) {
        const selectedPlatforms = answers.platforms && answers.platforms.length ? answers.platforms : ['PC', 'PlayStation', 'Xbox', 'Switch'];
        const compatibleGames = GAMES.filter((game) => selectedPlatforms.some((p) => game.platforms.includes(p)));

        return compatibleGames
            .map((game) => ({ game, score: computeMatchScore(answers, game), why: buildWhyExplanation(answers, game) }))
            .sort((a, b) => b.score - a.score);
    }

    function determinePersonality(answers) {
        const traits = ['action', 'story', 'strategy', 'multiplayer', 'exploration', 'difficulty'];
        const topTrait = traits.reduce((highest, trait) => (answers[trait] > answers[highest] ? trait : highest));
        return PERSONALITY_BY_TRAIT[topTrait];
    }

    // ---------------------------------------------------------------
    // Survey questions
    // ---------------------------------------------------------------

    function startSurvey() {
        state.currentQuestionIndex = 0;
        showScreen('survey');
        renderQuestion();
    }

    function renderQuestion() {
        const question = QUESTIONS[state.currentQuestionIndex];
        if (!question || !els.questionContainer) return;

        hideValidationAlert();
        updateProgressBar();

        if (els.sectionLabel) els.sectionLabel.textContent = question.section;

        if (question.type === 'slider') {
            renderSliderQuestion(question);
        } else if (question.type === 'buttons') {
            renderButtonQuestion(question);
        } else if (question.type === 'checkboxes') {
            renderCheckboxQuestion(question);
        }

        if (els.backBtn) els.backBtn.disabled = state.currentQuestionIndex === 0;
        if (els.nextBtn) {
            els.nextBtn.textContent = state.currentQuestionIndex === QUESTIONS.length - 1 ? 'See Summary' : 'Next';
        }
    }

    function renderSliderQuestion(question) {
        const currentValue = state.answers[question.id] != null ? state.answers[question.id] : question.default;
        state.answers[question.id] = currentValue;

        els.questionContainer.innerHTML =
            '<p class="survey-question-prompt">' + escapeHtml(question.prompt) + '</p>' +
            '<div class="d-flex justify-content-between small text-muted mb-1">' +
            '<span>' + escapeHtml(question.lowLabel) + '</span>' +
            '<span>' + escapeHtml(question.highLabel) + '</span>' +
            '</div>' +
            '<input type="range" class="form-range" id="sliderInput" min="' + question.min + '" max="' + question.max + '" value="' + currentValue + '" />' +
            '<p class="text-center mt-2 mb-0"><span class="badge bg-primary fs-6" id="sliderValueBadge">' + currentValue + ' / ' + question.max + '</span></p>';

        const sliderInput = document.getElementById('sliderInput');
        const valueBadge = document.getElementById('sliderValueBadge');
        sliderInput.addEventListener('input', function () {
            state.answers[question.id] = Number(this.value);
            valueBadge.textContent = this.value + ' / ' + question.max;
        });
    }

    function renderButtonQuestion(question) {
        const currentValue = state.answers[question.id];

        els.questionContainer.innerHTML =
            '<p class="survey-question-prompt">' + escapeHtml(question.prompt) + '</p>' +
            '<div class="d-flex flex-wrap gap-2" role="group" aria-label="' + escapeHtml(question.prompt) + '">' +
            question.options.map((option) => {
                const isActive = option.value === currentValue;
                return '<button type="button" class="btn survey-option-btn' + (isActive ? ' active' : '') + '" data-value="' + escapeHtml(option.value) + '">' + escapeHtml(option.label) + '</button>';
            }).join('') +
            '</div>';

        els.questionContainer.querySelectorAll('.survey-option-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                state.answers[question.id] = btn.getAttribute('data-value');
                els.questionContainer.querySelectorAll('.survey-option-btn').forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                hideValidationAlert();
            });
        });
    }

    function renderCheckboxQuestion(question) {
        const currentValues = state.answers[question.id] || [];

        els.questionContainer.innerHTML =
            '<p class="survey-question-prompt">' + escapeHtml(question.prompt) + '</p>' +
            '<div class="d-flex flex-wrap gap-2">' +
            question.options.map((option, index) => {
                const isChecked = currentValues.indexOf(option.value) !== -1;
                const id = 'checkbox-' + question.id + '-' + index;
                return '<div class="form-check form-check-inline survey-checkbox-pill' + (isChecked ? ' checked' : '') + '">' +
                    '<input class="form-check-input" type="checkbox" value="' + escapeHtml(option.value) + '" id="' + id + '"' + (isChecked ? ' checked' : '') + '>' +
                    '<label class="form-check-label" for="' + id + '">' + escapeHtml(option.label) + '</label>' +
                    '</div>';
            }).join('') +
            '</div>';

        els.questionContainer.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.addEventListener('change', function () {
                const values = state.answers[question.id] || [];
                const index = values.indexOf(this.value);
                if (this.checked && index === -1) values.push(this.value);
                if (!this.checked && index !== -1) values.splice(index, 1);
                state.answers[question.id] = values;
                this.closest('.survey-checkbox-pill').classList.toggle('checked', this.checked);
                hideValidationAlert();
            });
        });
    }

    // ---------------------------------------------------------------
    // Progress bar + validation
    // ---------------------------------------------------------------

    function updateProgressBar() {
        const current = state.currentQuestionIndex + 1;
        const total = QUESTIONS.length;
        const percent = Math.round((current / total) * 100);

        if (els.progressBar) {
            els.progressBar.style.width = percent + '%';
            els.progressBar.setAttribute('aria-valuenow', String(percent));
        }
        if (els.progressLabel) {
            els.progressLabel.textContent = 'Question ' + current + ' / ' + total + ' \u00b7 ' + percent + '% complete';
        }
    }

    function isCurrentQuestionAnswered() {
        const question = QUESTIONS[state.currentQuestionIndex];
        const value = state.answers[question.id];
        if (question.type === 'checkboxes') return Array.isArray(value) && value.length > 0;
        if (question.type === 'slider') return value != null;
        return value != null && value !== '';
    }

    function showValidationAlert() {
        if (!els.validationAlert) return;
        els.validationAlert.textContent = 'Please answer this question before continuing.';
        els.validationAlert.classList.remove('d-none');
    }

    function hideValidationAlert() {
        if (els.validationAlert) els.validationAlert.classList.add('d-none');
    }

    function goToNextQuestion() {
        if (!isCurrentQuestionAnswered()) {
            showValidationAlert();
            return;
        }
        if (state.currentQuestionIndex === QUESTIONS.length - 1) {
            showScreen('summary');
            renderSummary();
            return;
        }
        state.currentQuestionIndex += 1;
        renderQuestion();
    }

    function goToPreviousQuestion() {
        if (state.currentQuestionIndex === 0) return;
        state.currentQuestionIndex -= 1;
        renderQuestion();
    }

    // ---------------------------------------------------------------
    // Summary screen
    // ---------------------------------------------------------------

    function renderSummary() {
        if (!els.summaryList) return;

        const rows = QUESTIONS.map((question, index) => {
            const value = state.answers[question.id];
            let displayValue;
            if (question.type === 'slider') {
                displayValue = value + ' / ' + question.max;
            } else if (question.type === 'checkboxes') {
                displayValue = (value && value.length) ? value.join(', ') : '\u2014';
            } else {
                const option = question.options.find((o) => o.value === value);
                displayValue = option ? option.label : '\u2014';
            }
            return '<div class="d-flex justify-content-between align-items-center summary-row">' +
                '<span class="text-muted small">' + escapeHtml(question.prompt) + '</span>' +
                '<span class="d-flex align-items-center gap-2">' +
                '<strong>' + escapeHtml(String(displayValue)) + '</strong>' +
                '<button type="button" class="btn btn-sm btn-link p-0 summary-jump-btn" data-index="' + index + '" title="Change this answer"><i class="bi bi-pencil" aria-hidden="true"></i></button>' +
                '</span>' +
                '</div>';
        }).join('');

        els.summaryList.innerHTML = rows;

        els.summaryList.querySelectorAll('.summary-jump-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                state.currentQuestionIndex = Number(btn.getAttribute('data-index'));
                showScreen('survey');
                renderQuestion();
            });
        });
    }

    // ---------------------------------------------------------------
    // Results screen
    // ---------------------------------------------------------------

    function findMyGames() {
        showScreen('results');
        if (els.resultsLoadingSpinner) els.resultsLoadingSpinner.classList.remove('d-none');
        if (els.personalityCard) els.personalityCard.classList.add('d-none');
        if (els.topMatchesRow) els.topMatchesRow.innerHTML = '';
        if (els.fullRankedList) els.fullRankedList.innerHTML = '';

        // Brief delay so the spinner is perceptible for this "matchmaking" moment.
        setTimeout(() => {
            state.results = getRankedRecommendations(state.answers);
            state.personality = determinePersonality(state.answers);

            if (els.resultsLoadingSpinner) els.resultsLoadingSpinner.classList.add('d-none');
            renderPersonality();
            renderResults();
            saveToHistory();
        }, 500);
    }

    function renderPersonality() {
        if (!els.personalityCard || !state.personality) return;
        els.personalityCard.classList.remove('d-none');
        els.personalityCard.innerHTML =
            '<span class="display-4">' + state.personality.emoji + '</span>' +
            '<h3 class="h4 mt-2 mb-1">' + escapeHtml(state.personality.name) + '</h3>' +
            '<p class="text-muted mb-0">' + escapeHtml(state.personality.description) + '</p>';
    }

    function renderResults() {
        if (!els.topMatchesRow || !els.fullRankedList) return;

        if (state.results.length === 0) {
            els.topMatchesRow.innerHTML = '<p class="text-muted">No games matched your selected platforms. Try going back and adding another platform.</p>';
            els.fullRankedList.innerHTML = '';
            return;
        }

        const medals = ['\ud83e\udd47 Best Match', '\ud83e\udd48 Great Match', '\ud83e\udd49 Good Match'];
        const topThree = state.results.slice(0, 3);
        const rest = state.results.slice(3);

        els.topMatchesRow.innerHTML = topThree.map((entry, index) => buildResultCard(entry, medals[index], index)).join('');
        bindResultCardEvents(els.topMatchesRow);

        if (rest.length > 0) {
            els.fullRankedList.innerHTML =
                '<h3 class="h5 mb-3">Also Worth a Look</h3>' +
                '<div class="row row-cols-1 row-cols-md-2 g-3">' +
                rest.map((entry, index) => buildResultCard(entry, null, index + 3)).join('') +
                '</div>';
            bindResultCardEvents(els.fullRankedList);
        } else {
            els.fullRankedList.innerHTML = '';
        }

        if (els.compareSelectedBtn) els.compareSelectedBtn.disabled = state.compareList.length < 2;
    }

    function buildResultCard(entry, medalLabel, index) {
        const game = entry.game;
        const isWishlisted = state.wishlist.indexOf(game.id) !== -1;
        const isComparing = state.compareList.indexOf(game.id) !== -1;
        const collapseId = 'why-collapse-' + game.id;
        const traits = ['story', 'action', 'difficulty', 'exploration', 'strategy', 'multiplayer'];

        const traitBars = traits.map((trait) => {
            return '<div class="d-flex align-items-center gap-2 mb-1">' +
                '<span class="small text-muted trait-bar-label">' + trait.charAt(0).toUpperCase() + trait.slice(1) + '</span>' +
                '<div class="progress flex-grow-1" style="height: 6px;"><div class="progress-bar bg-info" role="progressbar" style="width: ' + (game[trait] * 10) + '%;"></div></div>' +
                '<span class="small text-muted">' + game[trait] + '/10</span>' +
                '</div>';
        }).join('');

        const whyList = entry.why.map((reason) => '<li><i class="bi bi-check-circle-fill text-success me-1" aria-hidden="true"></i>' + escapeHtml(reason) + '</li>').join('');
        const gamesPageId = GAMES_PAGE_ID_MAP[game.id];
        const viewInGamesLink = gamesPageId
            ? '<a href="../html/games.html?id=' + encodeURIComponent(gamesPageId) + '" target="_blank" rel="noopener" class="btn btn-sm btn-outline-info w-100 mb-2">' +
              '<i class="bi bi-box-arrow-up-right me-1" aria-hidden="true"></i>View in Games</a>'
            : '';

        return (
            '<div class="col">' +
            '<div class="card result-card h-100" data-game-id="' + game.id + '">' +
            (medalLabel ? '<span class="badge result-medal-badge mb-2">' + medalLabel + '</span>' : '') +
            '<div class="d-flex justify-content-between align-items-start">' +
            '<h3 class="h6 mb-1">' + escapeHtml(game.name) + '</h3>' +
            '<button type="button" class="btn btn-sm btn-link p-0 result-wishlist-btn' + (isWishlisted ? ' active' : '') + '" data-game-id="' + game.id + '" aria-label="Toggle wishlist for ' + escapeHtml(game.name) + '">' +
            '<i class="bi ' + (isWishlisted ? 'bi-heart-fill' : 'bi-heart') + '" aria-hidden="true"></i>' +
            '</button>' +
            '</div>' +
            '<p class="small text-muted mb-2">' + escapeHtml(game.genre) + ' \u00b7 ' + (game.price === 0 ? 'Free' : '$' + game.price.toFixed(2)) + '</p>' +
            '<div class="progress mb-1" style="height: 10px;">' +
            '<div class="progress-bar bg-success" role="progressbar" style="width: ' + entry.score + '%;" aria-valuenow="' + entry.score + '" aria-valuemin="0" aria-valuemax="100"></div>' +
            '</div>' +
            '<p class="small fw-semibold mb-2">' + entry.score + '% Match</p>' +
            viewInGamesLink +
            '<button type="button" class="btn btn-sm btn-outline-secondary w-100 mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#' + collapseId + '" aria-expanded="false">' +
            '\u25bc View Why' +
            '</button>' +
            '<div class="collapse" id="' + collapseId + '">' +
            '<p class="small fw-semibold mb-1">Why this game?</p>' +
            '<ul class="small mb-3 ps-3">' + whyList + '</ul>' +
            '<p class="small fw-semibold mb-1">Trait Breakdown</p>' +
            traitBars +
            '</div>' +
            '<div class="form-check mt-2">' +
            '<input class="form-check-input result-compare-check" type="checkbox" value="' + game.id + '" id="compare-' + game.id + '"' + (isComparing ? ' checked' : '') + '>' +
            '<label class="form-check-label small" for="compare-' + game.id + '">Add to Compare</label>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function bindResultCardEvents(container) {
        container.querySelectorAll('.result-wishlist-btn').forEach((btn) => {
            btn.addEventListener('click', () => toggleWishlist(btn.getAttribute('data-game-id')));
        });
        container.querySelectorAll('.result-compare-check').forEach((checkbox) => {
            checkbox.addEventListener('change', function () {
                toggleCompare(this.value, this.checked);
            });
        });
    }

    function toggleCompare(gameId, shouldAdd) {
        const index = state.compareList.indexOf(gameId);
        if (shouldAdd && index === -1) {
            if (state.compareList.length >= MAX_COMPARE) {
                showToast('You can compare up to ' + MAX_COMPARE + ' games at a time.', 'warning');
                document.querySelectorAll('.result-compare-check[value="' + gameId + '"]').forEach((cb) => { cb.checked = false; });
                return;
            }
            state.compareList.push(gameId);
        } else if (!shouldAdd && index !== -1) {
            state.compareList.splice(index, 1);
        }
        if (els.compareSelectedBtn) els.compareSelectedBtn.disabled = state.compareList.length < 2;
    }

    function openCompareModal() {
        if (state.compareList.length < 2 || !els.compareModalBody) return;
        const games = state.compareList.map(findGame).filter(Boolean);
        const traits = ['story', 'action', 'difficulty', 'exploration', 'strategy', 'multiplayer'];

        const bestPrice = Math.min.apply(null, games.map((g) => g.price));

        const headerCells = games.map((g) => '<th class="text-center">' + escapeHtml(g.name) + '</th>').join('');
        const traitRows = traits.map((trait) => {
            const best = Math.max.apply(null, games.map((g) => g[trait]));
            const cells = games.map((g) => '<td' + (g[trait] === best ? ' class="highlight-best"' : '') + '>' + g[trait] + ' / 10</td>').join('');
            return '<tr><th scope="row">' + trait.charAt(0).toUpperCase() + trait.slice(1) + '</th>' + cells + '</tr>';
        }).join('');
        const priceRow = '<tr><th scope="row">Price</th>' + games.map((g) => '<td' + (g.price === bestPrice ? ' class="highlight-best"' : '') + '>' + (g.price === 0 ? 'Free' : '$' + g.price.toFixed(2)) + '</td>').join('') + '</tr>';
        const platformRow = '<tr><th scope="row">Platforms</th>' + games.map((g) => '<td>' + escapeHtml(g.platforms.join(', ')) + '</td>').join('') + '</tr>';

        els.compareModalBody.innerHTML =
            '<div class="table-responsive">' +
            '<table class="table table-bordered compare-table align-middle">' +
            '<thead><tr><th></th>' + headerCells + '</tr></thead>' +
            '<tbody>' + traitRows + priceRow + platformRow + '</tbody>' +
            '</table>' +
            '</div>' +
            '<p class="small text-muted mb-0"><span class="highlight-best-swatch d-inline-block align-middle"></span> = highest trait rating or lowest price.</p>';

        if (compareModal) compareModal.show();
    }

    function surpriseMe() {
        if (state.results.length === 0) return;
        const pool = state.results.slice(0, Math.min(5, state.results.length));
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const cardEl = document.querySelector('.result-card[data-game-id="' + pick.game.id + '"]');
        if (!cardEl) return;
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cardEl.classList.add('flash-highlight');
        setTimeout(() => cardEl.classList.remove('flash-highlight'), 1600);
        showToast('\ud83c\udfb2 How about ' + pick.game.name + '?', 'success');
    }

    // ---------------------------------------------------------------
    // Wishlist
    // ---------------------------------------------------------------

    function toggleWishlist(gameId) {
        const game = findGame(gameId);
        const index = state.wishlist.indexOf(gameId);
        let justAdded;
        if (index !== -1) {
            state.wishlist.splice(index, 1);
            justAdded = false;
        } else {
            state.wishlist.push(gameId);
            justAdded = true;
        }
        saveToStorage(WISHLIST_KEY, state.wishlist);
        renderWishlist();
        document.querySelectorAll('.result-wishlist-btn[data-game-id="' + gameId + '"]').forEach((btn) => {
            btn.classList.toggle('active', justAdded);
            btn.querySelector('i').className = 'bi ' + (justAdded ? 'bi-heart-fill' : 'bi-heart');
        });
        if (game) showToast((justAdded ? game.name + ' added to wishlist.' : game.name + ' removed from wishlist.'), justAdded ? 'success' : 'secondary');
    }

    function renderWishlist() {
        if (!els.wishlistRow) return;
        if (state.wishlist.length === 0) {
            els.wishlistRow.innerHTML = '<p class="text-muted small mb-0">No wishlisted games yet. Add some from your results.</p>';
            return;
        }
        els.wishlistRow.innerHTML = state.wishlist.map((gameId) => {
            const game = findGame(gameId);
            if (!game) return '';
            return '<div class="col">' +
                '<div class="card wishlist-card h-100">' +
                '<div class="d-flex justify-content-between align-items-start">' +
                '<p class="small fw-semibold mb-1">' + escapeHtml(game.name) + '</p>' +
                '<button type="button" class="btn btn-sm btn-link p-0 text-danger wishlist-remove-btn" data-game-id="' + game.id + '" aria-label="Remove from wishlist"><i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
                '</div>' +
                '<p class="small text-muted mb-0">' + escapeHtml(game.genre) + ' \u00b7 ' + (game.price === 0 ? 'Free' : '$' + game.price.toFixed(2)) + '</p>' +
                '</div>' +
                '</div>';
        }).join('');

        els.wishlistRow.querySelectorAll('.wishlist-remove-btn').forEach((btn) => {
            btn.addEventListener('click', () => toggleWishlist(btn.getAttribute('data-game-id')));
        });
    }

    // ---------------------------------------------------------------
    // Recommendation history
    // ---------------------------------------------------------------

    function saveToHistory() {
        if (state.results.length === 0) return;
        const entry = {
            id: 'history-' + Date.now(),
            topMatchName: state.results[0].game.name,
            topMatchScore: state.results[0].score,
            personalityName: state.personality ? state.personality.name : '',
            answers: Object.assign({}, state.answers),
            createdAt: new Date().toISOString()
        };
        state.history.unshift(entry);
        state.history = state.history.slice(0, MAX_HISTORY);
        saveToStorage(HISTORY_KEY, state.history);
        renderHistory();
    }

    function loadHistoryEntry(entryId) {
        const entry = state.history.find((h) => h.id === entryId);
        if (!entry) return;
        state.answers = Object.assign({}, entry.answers);
        findMyGames();
    }

    function deleteHistoryEntry(entryId) {
        state.history = state.history.filter((h) => h.id !== entryId);
        saveToStorage(HISTORY_KEY, state.history);
        renderHistory();
    }

    function renderHistory() {
        const hasHistory = state.history.length > 0;
        if (els.historyIntroWrap) els.historyIntroWrap.classList.toggle('d-none', !hasHistory);
        if (!els.historyList) return;

        if (!hasHistory) {
            els.historyList.innerHTML = '<p class="text-muted small mb-0">No past results yet. Complete the survey once to start building history.</p>';
            return;
        }

        els.historyList.innerHTML = state.history.map((entry) => {
            const date = new Date(entry.createdAt);
            const dateLabel = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return '<div class="saved-setup-row d-flex justify-content-between align-items-center">' +
                '<div>' +
                '<p class="mb-0 fw-semibold small">' + escapeHtml(entry.topMatchName) + ' \u2014 ' + entry.topMatchScore + '% \u00b7 ' + escapeHtml(entry.personalityName) + '</p>' +
                '<p class="mb-0 text-muted small">' + dateLabel + '</p>' +
                '</div>' +
                '<div class="d-flex gap-2">' +
                '<button type="button" class="btn btn-sm btn-outline-primary history-view-btn" data-history-id="' + entry.id + '">View</button>' +
                '<button type="button" class="btn btn-sm btn-outline-danger history-delete-btn" data-history-id="' + entry.id + '"><i class="bi bi-trash" aria-hidden="true"></i></button>' +
                '</div>' +
                '</div>';
        }).join('');

        els.historyList.querySelectorAll('.history-view-btn').forEach((btn) => {
            btn.addEventListener('click', () => loadHistoryEntry(btn.getAttribute('data-history-id')));
        });
        els.historyList.querySelectorAll('.history-delete-btn').forEach((btn) => {
            btn.addEventListener('click', () => deleteHistoryEntry(btn.getAttribute('data-history-id')));
        });
    }

    // ---------------------------------------------------------------
    // Retake / change answers
    // ---------------------------------------------------------------

    function retakeSurvey() {
        state.answers = Object.assign({}, DEFAULT_ANSWERS, { platforms: [] });
        state.results = [];
        state.personality = null;
        state.compareList = [];
        state.currentQuestionIndex = 0;
        showScreen('survey');
        renderQuestion();
    }

    function editAnswers() {
        state.currentQuestionIndex = 0;
        showScreen('survey');
        renderQuestion();
    }

    // ---------------------------------------------------------------
    // Event bindings
    // ---------------------------------------------------------------

    function bindEvents() {
        if (els.startSurveyBtn) els.startSurveyBtn.addEventListener('click', startSurvey);
        if (els.backBtn) els.backBtn.addEventListener('click', goToPreviousQuestion);
        if (els.nextBtn) els.nextBtn.addEventListener('click', goToNextQuestion);
        if (els.changeAnswersBtn) els.changeAnswersBtn.addEventListener('click', editAnswers);
        if (els.findGamesBtn) els.findGamesBtn.addEventListener('click', findMyGames);
        if (els.retakeSurveyBtn) els.retakeSurveyBtn.addEventListener('click', retakeSurvey);
        if (els.editAnswersBtn) els.editAnswersBtn.addEventListener('click', editAnswers);
        if (els.surpriseMeBtn) els.surpriseMeBtn.addEventListener('click', surpriseMe);
        if (els.compareSelectedBtn) els.compareSelectedBtn.addEventListener('click', openCompareModal);
        if (els.saveResultsBtn) {
            els.saveResultsBtn.addEventListener('click', () => {
                saveToHistory();
                showToast('Results saved to your history.', 'success');
            });
        }
    }

    return { init };
})();