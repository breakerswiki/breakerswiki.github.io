// =============================
// WIKI MODULE
// =============================
const Wiki = (() => {

    // =============================
    // ÉTAT INTERNE
    // =============================
    let currentCharacterSections = {};
    let currentMatchupOpponents = {};
    let videoObserver = null;

    // Characters excluded from the matchup list
    const EXCLUDED_FROM_MATCHUPS = ['bai-hu'];


    // =============================
    // FOOTER YEAR
    // =============================
    function initFooterYear() {
        const yearSpan = document.getElementById("about-year");
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }


    // =============================
    // NAVIGATION
    // =============================
    function showSection(sectionId, triggerBtn = null) {
        document.querySelectorAll('.wiki-section').forEach(sec => sec.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));

        const targetSection = document.getElementById(sectionId);
        if (targetSection) targetSection.classList.add('active');

        const hero = document.getElementById('hero-welcome');
        if (hero) hero.style.display = (sectionId === 'home') ? 'block' : 'none';

        if (triggerBtn) {
            triggerBtn.classList.add('active');
        } else {
            // Fallback : recherche par data-section
            const fallbackBtn = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
            if (fallbackBtn) fallbackBtn.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (sectionId === 'characters') {
            const activeCharBtn = document.querySelector('.char-btn.active');
            if (activeCharBtn) activeCharBtn.click();
        }
    }

    // =============================
    // LOAD CHARACTER
    // =============================
    async function loadCharacter(charFileName, triggerBtn = null) {
        document.querySelectorAll('.char-btn').forEach(btn => btn.classList.remove('active'));

        if (triggerBtn) {
            triggerBtn.classList.add('active');
        } else {
            const fallbackBtn = document.querySelector(`.char-btn[data-char="${charFileName}"]`);
            if (fallbackBtn) fallbackBtn.classList.add('active');
        }

        const renderArea = document.getElementById('markdown-render');
        if (!renderArea) return;

        renderArea.innerHTML = '<p class="text-muted">Loading...</p>';

        try {
            const response = await fetch(`characters/${charFileName}.md`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const markdownText = await response.text();
            const rawSections = markdownText.split(/\n## /);
            const headerContent = renderMarkdown(rawSections[0]);

            currentCharacterSections = {
                infos: '',
                moves: '',
                guide: '',
                combos: '',
                matchups: ''
            };

            rawSections.slice(1).forEach(section => {
                const lines = section.split('\n');
                const title = lines[0].trim().toLowerCase();
                const body = lines.slice(1).join('\n');

                if (Object.prototype.hasOwnProperty.call(currentCharacterSections, title)) {
                    currentCharacterSections[title] = body;
                }
            });

            renderArea.innerHTML = `
                <div class="char-header">${headerContent}</div>

                <div class="sub-nav">
                    <button class="sub-link active" data-subsection="infos" onclick="Wiki.switchSubSection('infos', this)">Infos</button>
                    <button class="sub-link" data-subsection="moves" onclick="Wiki.switchSubSection('moves', this)">Moves</button>
                    <button class="sub-link" data-subsection="guide" onclick="Wiki.switchSubSection('guide', this)">Guide</button>
                    <button class="sub-link" data-subsection="combos" onclick="Wiki.switchSubSection('combos', this)">Combos</button>
                    <button class="sub-link" data-subsection="matchups" onclick="Wiki.switchSubSection('matchups', this)">Matchups</button>
                </div>

                <div id="sub-content" class="sub-content">
                    ${renderMarkdown(currentCharacterSections.infos)}
                </div>
            `;

            scheduleVideoInit();

        } catch (err) {
            console.error(`[Wiki] Failed to load character "${charFileName}":`, err);
            renderArea.innerHTML = `<p class="text-error">Error loading character. Please try again.</p>`;
        }
    }


    // =============================
    // SWITCH SUB SECTION
    // =============================
    function switchSubSection(category, triggerBtn = null) {
        document.querySelectorAll('.sub-link').forEach(btn => btn.classList.remove('active'));

        if (triggerBtn) {
            triggerBtn.classList.add('active');
        } else {
            const fallbackBtn = document.querySelector(`.sub-link[data-subsection="${category}"]`);
            if (fallbackBtn) fallbackBtn.classList.add('active');
        }

        const contentArea = document.getElementById('sub-content');
        if (!contentArea) return;

        if (category === 'matchups') {
            setupMatchupsSection(contentArea);
        } else {
            contentArea.innerHTML = renderMarkdown(currentCharacterSections[category] || '');
            scheduleVideoInit();
        }
    }


    // =============================
    // MATCHUPS SUB-SYSTEM
    // =============================
    function setupMatchupsSection(contentArea) {
        const rawMatchupText = currentCharacterSections.matchups || '';

        const rawOpponents = rawMatchupText.split(/\n### /);
        currentMatchupOpponents = {};

        rawOpponents.slice(1).forEach(oppSection => {
            const lines = oppSection.split('\n');
            const opponentId = lines[0].trim().toLowerCase();
            const opponentBody = lines.slice(1).join('\n');
            currentMatchupOpponents[opponentId] = opponentBody;
        });

        const mainSidebarButtons = document.querySelectorAll('.char-sidebar .char-btn');

        let matchupSidebarHtml = '';
        mainSidebarButtons.forEach(btn => {
            const charFile = btn.dataset.char;
            if (!charFile || EXCLUDED_FROM_MATCHUPS.includes(charFile)) return;

            const imgHtml = btn.querySelector('img')?.outerHTML ?? charFile;

            matchupSidebarHtml += `
                <button
                    class="char-btn matchup-opp-btn"
                    data-opp="${charFile}"
                    onclick="Wiki.loadOpponentMatchup('${charFile}', this)"
                >
                    ${imgHtml}
                </button>
            `;
        });

        contentArea.innerHTML = `
            <div class="char-layout matchup-layout">
                <aside class="char-sidebar matchup-sidebar">
                    ${matchupSidebarHtml}
                </aside>
                <div id="matchup-data-display" class="matchup-data-display">
                    <p class="text-muted">Select an opponent to view matchup strategies.</p>
                </div>
            </div>
        `;

        const firstOpponentBtn = contentArea.querySelector('.matchup-opp-btn');
        if (firstOpponentBtn) firstOpponentBtn.click();
    }

    function loadOpponentMatchup(opponentId, triggerBtn = null) {
        document.querySelectorAll('.matchup-opp-btn').forEach(btn => btn.classList.remove('active'));

        if (triggerBtn) {
            triggerBtn.classList.add('active');
        } else {
            const fallbackBtn = document.querySelector(`.matchup-opp-btn[data-opp="${opponentId}"]`);
            if (fallbackBtn) fallbackBtn.classList.add('active');
        }

        const displayArea = document.getElementById('matchup-data-display');
        if (!displayArea) return;

        const content = currentMatchupOpponents[opponentId.toLowerCase()];

        if (!content) {
            displayArea.innerHTML = '<p class="text-muted">No matchup data available for this opponent.</p>';
            return;
        }

        displayArea.innerHTML = renderMarkdown(content);
        scheduleVideoInit();
    }


    // =============================
    // MOVES TABLE RENDERER
    // =============================
    function renderMovesSection(md) {
        return md.replace(/### (Normals|Commands|Specials|Supers|Throws)([\s\S]*?)(?=\n### |\n## |$)/gi, (match, category, body) => {
            const catLower = category.toLowerCase();
            const lines = body.trim().split('\n').filter(l => l.trim());
            let movesHtml = '';

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                // If it is an isolated description line, we pass it (already processed)
                if (line.startsWith('>')) continue;

                const parts = line.split('|');
                const name = parts[0].trim();
                const input = parts[1] ? parts[1].trim() : '';

                // Gather ALL consecutive description lines
                let detailsArray = [];
                while (lines[i + 1] && lines[i + 1].trim().startsWith('>')) {
                    // Extract the text after the ">" and move on to the next line
                    detailsArray.push(lines[i + 1].trim().substring(1).trim());
                    i++;
                }

                if (detailsArray.length > 0) {
                    // We join the lines with an HTML line break <br> or paragraphs
                    const detailsContent = detailsArray.map(line => `<span>${line}</span>`).join('<br>');

                    movesHtml += `
                <details class="move-details">
                    <summary class="move">
                        <span>${name}</span>
                        <span>${input}</span>
                    </summary>
                    <div class="move-content">
                        ${detailsContent}
                    </div>
                </details>`;
                } else {
                    movesHtml += `
                <div class="move no-click">
                    <span>${name}</span>
                    <span>${input}</span>
                </div>`;
                }
            }

            return `<div class="command-list"><h2 class="${catLower}">${category}</h2>${movesHtml}</div>`;
        });
    }


    // =============================
    // MARKDOWN LINKS CONFIGURATION
    // =============================
    marked.use({
        renderer: {
            link({ href, title, text }) {
                const titleAttr = title ? `title="${title}"` : '';
                return `<a href="${href}" target="_blank" rel="noopener noreferrer" ${titleAttr}>${text}</a>`;
            }
        }
    });


    // =============================
    // MARKDOWN ENGINE
    // =============================
    function renderMarkdown(md) {
        if (!md) return '<p class="text-muted">No data available.</p>';

        let processed = renderMovesSection(md);
        let html = marked.parse(processed);
        html = replaceInputs(html);

        return html;
    }


    // =============================
    // INPUT SYSTEM ([QCF], [DP], etc.)
    // =============================
    const INPUT_IMAGES = {
        "QCF": '<img class="input-icon" src="/media/inputs/Arcade-Stick-Qcf.png" alt="QCF">',
        "HCF": '<img class="input-icon" src="/media/inputs/Arcade-Stick-Hcf.png" alt="HCF">',
        "QCB": '<img class="input-icon" src="/media/inputs/Arcade-Stick-Qcb.png" alt="QCB">',
        "DP": '<img class="input-icon" src="/media/inputs/Arcade-Stick-Dp.png" alt="DP">',
        "P": '<img class="input-icon" src="/media/inputs/Arcade-Stick-P.png" alt="P">',
        "K": '<img class="input-icon" src="/media/inputs/Arcade-Stick-K.png" alt="K">',
        "A": '<img class="input-icon" src="/media/inputs/Arcade-Stick-A.png" alt="A">',
        "B": '<img class="input-icon" src="/media/inputs/Arcade-Stick-B.png" alt="B">',
        "C": '<img class="input-icon" src="/media/inputs/Arcade-Stick-C.png" alt="C">',
        "D": '<img class="input-icon" src="/media/inputs/Arcade-Stick-D.png" alt="D">',
        "AIR": '<img class="input-icon" src="/media/inputs/Control-Modifier-Air.png" alt="AIR">',
        "DOWN": '<img class="input-icon" src="/media/inputs/Arcade-Stick-Down.png" alt="DOWN">',
        "UP": '<img class="input-icon" src="/media/inputs/Arcade-Stick-Up.png" alt="UP">',
        "LEFT": '<img class="input-icon" src="/media/inputs/Arcade-Stick-Left.png" alt="LEFT">',
        "RIGHT": '<img class="input-icon" src="/media/inputs/Arcade-Stick-Right.png" alt="RIGHT">',
        "DOWN-LEFT": '<img class="input-icon" src="/media/inputs/Arcade-Stick-DL.png" alt="DOWN-LEFT">',
        "DOWN-RIGHT": '<img class="input-icon" src="/media/inputs/Arcade-Stick-DR.png" alt="DOWN-RIGHT">',
        "UP-LEFT": '<img class="input-icon" src="/media/inputs/Arcade-Stick-UL.png" alt="UP-LEFT">',
        "UP-RIGHT": '<img class="input-icon" src="/media/inputs/Arcade-Stick-UR.png" alt="UP-RIGHT">',
        "360": '<img class="input-icon" src="/media/inputs/Arcade-Stick-360.png" alt="360">',
        "360R": '<img class="input-icon" src="/media/inputs/Arcade-Stick-360-R.png" alt="360R">',
        "CHARGE": '<img class="input-icon" src="/media/inputs/Arcade-Stick-CDb.png" alt="CHARGE">',
        "TAP": '<img class="input-icon" src="/media/inputs/Control-Modifier-Tap.png" alt="TAP">',
        "CBF": '<img class="input-icon" src="/media/inputs/Arcade-Stick-CBF.png" alt="CBF">',
        "DELTA": '<img class="input-icon" src="/media/inputs/Arcade-Stick-Delta.png" alt="DELTA">',
        "CDU": '<img class="input-icon" src="/media/inputs/Arcade-Stick-CDU.png" alt="CDU">',
        "LR": '<img class="input-icon" src="/media/inputs/Arcade-Stick-LR.png" alt="LR">',

        "LOW": '<span class="move-tag" style="background-color:#d75a56">Low</span>',
        "MID": '<span class="move-tag" style="background-color:#f4a261">Mid</span>',
        "HIGH": '<span class="move-tag" style="background-color:#d75a56">High</span>',
        "SPECIAL": '<span class="move-tag" style="background-color:#8a7fbe">Special</span>',
        "SUPER": '<span class="move-tag" style="background-color:#cd7aac">Super</span>',
        "HKD": '<span class="move-tag" style="background-color:#9c9c9c">Hard Knockdown</span>',
        "THROW": '<span class="move-tag" style="background-color:#a66816">Throw</span>',
        "REVERSAL": '<span class="move-tag" style="background-color:#02aaaa">Reversal</span>',
        "LAUNCHER": '<span class="move-tag" style="background-color:#51b0e7">Launcher</span>'
    };

    function replaceInputs(html) {
        return html.replace(/\[([^\]]+)\]/g, (match, key) => {
            const replacement = INPUT_IMAGES[key.trim().toUpperCase()];
            return replacement ? replacement : match;
        });
    }


    // =============================
    // VIDEO.JS & LAZY-LOADING ENGINE
    // =============================

    function scheduleVideoInit() {
        requestAnimationFrame(() => applyLazyVideoJS());
    }

    function initVideoJS(videoElement) {
        if (typeof videojs === 'undefined') {
            console.warn('[Wiki] videojs not ready, retrying...');
            setTimeout(() => initVideoJS(videoElement), 100);
            return;
        }

        if (videoElement.classList.contains('vjs-tech') || videoElement.hasAttribute('data-vjs-player')) return;

        videoElement.querySelectorAll('source[data-src]').forEach(source => {
            source.setAttribute('src', source.getAttribute('data-src'));
            source.removeAttribute('data-src');
        });
        videoElement.load();


        const posterSrc = videoElement.getAttribute('data-poster');
        if (posterSrc) videoElement.setAttribute('poster', posterSrc);

        videoElement.classList.add('video-js', 'vjs-default-skin', 'vjs-big-play-centered');

        const player = videojs(videoElement, {
            controls: true,
            autoplay: videoElement.hasAttribute('autoplay'),
            loop: true,
            muted: true,
            html5: {
                nativeAudioTracks: false,
                nativeVideoTracks: false,
                vhs: { overrideNative: true }
            },
            playsinline: true,
            preload: 'metadata'
        });

        player.one('loadedmetadata', () => {
            player.currentTime(2); // ← seek at 2 seconds as preview
        });

        player.ready(() => {
            if (videoElement.hasAttribute('autoplay')) {
                player.play().catch(err => console.warn("[Wiki] Autoplay blocked:", err));
            }
        });
    }

    function applyLazyVideoJS() {
        const videos = document.querySelectorAll(
            '#markdown-render video:not(.video-js), video.card-video:not(.video-js)'
        );

        if (!videos.length) return;

        // Disconnect the old observer to avoid memory leaks
        if (videoObserver) {
            videoObserver.disconnect();
            videoObserver = null;
        }

        if ('IntersectionObserver' in window) {
            videoObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        initVideoJS(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: "200px 0px" });

            videos.forEach(video => {
                video.setAttribute('preload', 'none');
                videoObserver.observe(video);
            });
        } else {
            // Fallback browsers without IntersectionObserver
            videos.forEach(video => initVideoJS(video));
        }
    }


    // =============================
    // INIT
    // =============================
    function init() {
        initFooterYear();
        scheduleVideoInit();
    }

    return {
        init,
        showSection,
        loadCharacter,
        switchSubSection,
        loadOpponentMatchup,
    };

})();


// =============================
// STARTUP
// =============================
document.addEventListener('DOMContentLoaded', () => Wiki.init());