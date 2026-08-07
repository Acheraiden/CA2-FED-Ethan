// ReadyPlayer3 - games.html interactions

document.addEventListener('DOMContentLoaded', function () {
    initChatWidget();
    GamesPage.init();
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
 * GamesPage controller.
 *
 * Drives the unified Games page (games.html): every game from every genre
 * in one grid, with genre available as just another filter alongside
 * price, platform, rating, mode, and difficulty. Favorites persist
 * globally via localStorage; the compare tray only allows comparing
 * games of the same genre, since the comparison table's rows depend on
 * genre-appropriate traits (open world, replayability, etc. read the
 * same across genres here, so the rule is mainly about keeping
 * comparisons meaningful rather than a technical requirement).
 *
 * Kept as small, named functions grouped by responsibility so any one
 * piece (favorites, compare, filters) can be read or changed on its own.
 */
var GamesPage = (function () {
    var FAVORITES_KEY = 'rp3-favorite-games';
    var MAX_COMPARE = 4;

    var state = {
        filters: {
            search: '',
            genre: 'all',
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
        state.favorites = loadFavorites();

        cacheElements();
        renderEditorsPicks();
        populateFilterOptions();
        bindFilterEvents();
        bindCompareTrayEvents();
        bindRandomPickEvent();
        renderGrid();
        renderCompareTray();
    }

    function cacheElements() {
        els.editorsPicksRow = document.getElementById('editorsPicksRow');

        els.searchInput = document.getElementById('searchInput');
        els.genreFilter = document.getElementById('genreFilterOptions');
        els.priceFilter = document.getElementById('priceFilter');
        els.platformFilter = document.getElementById('platformFilter');
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
    // Editor's picks (one per genre, shown as a compact strip in the hero)
    // ---------------------------------------------------------------

    function renderEditorsPicks() {
        if (!els.editorsPicksRow) return;

        var picks = GAMES_DATA.filter(function (g) { return g.editorsPick; });

        els.editorsPicksRow.innerHTML = picks.map(function (game) {
            return '<div class="editors-pick-card" data-view-details="' + game.id + '">' +
                '<span class="badge editors-pick-badge mb-2"><i class="bi bi-award-fill me-1" aria-hidden="true"></i>' + escapeHtml(GENRE_META[game.genre].shortLabel) + '</span>' +
                '<div class="d-flex gap-3 align-items-center">' +
                '<img src="' + game.screenshots[0] + '" alt="' + escapeHtml(game.title) + '" class="editors-pick-thumb" />' +
                '<div>' +
                '<h3 class="h6 mb-1">' + escapeHtml(game.title) + '</h3>' +
                '<p class="mb-2 small text-muted">' + buildStars(game.rating) + ' ' + game.rating.toFixed(1) + '</p>' +
                '<button type="button" class="btn btn-sm btn-primary">View Details</button>' +
                '</div>' +
                '</div>' +
                '</div>';
        }).join('');

        els.editorsPicksRow.querySelectorAll('[data-view-details]').forEach(function (card) {
            card.addEventListener('click', function () {
                openDetailsModal(card.getAttribute('data-view-details'));
            });
        });
    }

    // ---------------------------------------------------------------
    // Filters
    // ---------------------------------------------------------------

    function populateFilterOptions() {
        if (els.genreFilter) {
            els.genreFilter.innerHTML = Object.keys(GENRE_META).map(function (key) {
                return '<button type="button" class="btn genre-toggle-btn" data-genre="' + key + '" aria-pressed="false">' +
                    escapeHtml(GENRE_META[key].shortLabel) +
                    '</button>';
            }).join('');
        }

        var platforms = uniqueValues(GAMES_DATA, 'platform').sort();
        if (els.platformFilter) {
            platforms.forEach(function (platform) {
                var option = document.createElement('option');
                option.value = platform;
                option.textContent = platform;
                els.platformFilter.appendChild(option);
            });
        }

        var modes = uniqueValues(GAMES_DATA, 'mode').sort();
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
        if (els.genreFilter) {
            els.genreFilter.addEventListener('click', function (event) {
                var btn = event.target.closest('.genre-toggle-btn');
                if (!btn) return;
                var isActive = btn.classList.toggle('active');
                btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                var active = Array.prototype.slice.call(
                    els.genreFilter.querySelectorAll('.genre-toggle-btn.active')
                ).map(function (b) { return b.getAttribute('data-genre'); });
                state.filters.genre = active.length ? active : 'all';
                renderGrid();
            });
        }
        if (els.priceFilter) {
            els.priceFilter.addEventListener('change', function () {
                state.filters.price = this.value;
                renderGrid();
            });
        }
        if (els.platformFilter) {
            els.platformFilter.addEventListener('change', function () {
                state.filters.platform = this.value;
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
        state.filters = { search: '', genre: 'all', price: 'all', platform: 'all', rating: 'all', mode: 'all', difficulty: 'all', favoritesOnly: false };
        if (els.searchInput) els.searchInput.value = '';
        if (els.priceFilter) els.priceFilter.value = 'all';
        if (els.ratingFilter) els.ratingFilter.value = 'all';
        if (els.modeFilter) els.modeFilter.value = 'all';
        if (els.difficultyFilter) els.difficultyFilter.value = 'all';
        if (els.favoritesOnlyToggle) els.favoritesOnlyToggle.checked = false;
        if (els.genreFilter) {
            els.genreFilter.querySelectorAll('.genre-toggle-btn').forEach(function (btn) {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
        }
        if (els.platformFilter) els.platformFilter.value = 'all';
        renderGrid();
    }

    function getFilteredSortedGames() {
        var filtered = GAMES_DATA.filter(function (game) {
            if (state.filters.search && game.title.toLowerCase().indexOf(state.filters.search) === -1) {
                return false;
            }
            if (Array.isArray(state.filters.genre) && state.filters.genre.indexOf(game.genre) === -1) {
                return false;
            }
            if (state.filters.price === 'free' && game.price !== 0) return false;
            if (state.filters.price === 'paid' && game.price === 0) return false;
            if (state.filters.platform !== 'all' && game.platform.indexOf(state.filters.platform) === -1) {
                return false;
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
        if (Array.isArray(state.filters.genre)) {
            chips.push({ label: state.filters.genre.map(function (g) { return GENRE_META[g].shortLabel; }).join(', '), clear: function () {
                state.filters.genre = 'all';
                if (els.genreFilter) {
                    els.genreFilter.querySelectorAll('.genre-toggle-btn').forEach(function (btn) {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-pressed', 'false');
                    });
                }
            } });
        }
        if (state.filters.price !== 'all') chips.push({ label: state.filters.price === 'free' ? 'Free' : 'Paid', clear: function () { state.filters.price = 'all'; if (els.priceFilter) els.priceFilter.value = 'all'; } });
        if (state.filters.platform !== 'all') {
            chips.push({ label: state.filters.platform, clear: function () {
                state.filters.platform = 'all';
                if (els.platformFilter) els.platformFilter.value = 'all';
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
            els.resultsCount.textContent = 'Showing ' + results.length + ' of ' + GAMES_DATA.length + ' games';
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
            '<div class="game-card-image-wrap position-relative overflow-hidden">' +
            '<img src="' + game.screenshots[0] + '" class="card-img-top" alt="Cover art for ' + escapeHtml(game.title) + '" />' +
            '<span class="badge genre-badge genre-badge-overlay position-absolute">' + escapeHtml(GENRE_META[game.genre].shortLabel) + '</span>' +
            '<button type="button" class="favorite-btn position-absolute rounded-circle border-0 d-flex align-items-center justify-content-center' + (isFavorite ? ' active' : '') + '" aria-pressed="' + isFavorite + '" aria-label="Toggle favorite for ' + escapeHtml(game.title) + '">' +
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
            '<span class="badge genre-badge">' + escapeHtml(GENRE_META[game.genre].shortLabel) + '</span>' +
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
            var currentGenre = getTrayGenre();
            if (currentGenre && game && game.genre !== currentGenre) {
                showToast('You can only compare games from the same genre. Clear the tray first to compare ' + GENRE_META[game.genre].shortLabel + ' titles instead.', 'warning');
                return;
            }
            state.compareList.push(id);
        }

        renderCompareTray();
        renderGrid();
        if (game) updateModalCompareButton(game.id);
    }

    function getTrayGenre() {
        if (state.compareList.length === 0) return null;
        var first = findById(state.compareList[0]);
        return first ? first.genre : null;
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
                return '<div class="game-compare-tray-item position-relative" data-id="' + game.id + '">' +
                    '<img src="' + game.screenshots[0] + '" alt="" />' +
                    '<button type="button" class="remove-btn position-absolute rounded-circle d-flex align-items-center justify-content-center" aria-label="Remove ' + escapeHtml(game.title) + ' from comparison">&times;</button>' +
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
                '<img src="' + game.screenshots[0] + '" alt="' + escapeHtml(game.title) + '" class="w-100" />' +
                '<div class="small fw-semibold mt-2">' + escapeHtml(game.title) + '</div>' +
                '</th>';
        }).join('');

        function row(label, cellFn) {
            var cells = games.map(cellFn).join('');
            return '<tr><th scope="row">' + label + '</th>' + cells + '</tr>';
        }

        var rowsHtml =
            row('Genre', function (g) { return '<td>' + escapeHtml(GENRE_META[g.genre].shortLabel) + '</td>'; }) +
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
            '<p class="small text-muted mb-0"><span class="highlight-best-swatch d-inline-block align-middle"></span> = highest rated, lowest price, or best replayability.</p>';

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