// --- CONFIGURATION ---
const DISABLED_PATHS = ["", "/", "/index.html"];
const INPUT_IMAGES = {
  "360": "/img/inputs/Arcade-Stick-360.png", "ChargeBack": "/img/inputs/Arcade-Stick-CB.png",
  "ChargeBack_Forward": "/img/inputs/Arcade-Stick-CBF.png", "ChargeDown_Up": "/img/inputs/Arcade-Stick-CDU.png",
  "ChargeDownBack": "/img/inputs/Arcade-Stick-CDb.png", "Delta": "/img/inputs/Arcade-Stick-Delta.png",
  "Down": "/img/inputs/Arcade-Stick-Down.png", "DP": "/img/inputs/Arcade-Stick-Dp.png",
  "HCB": "/img/inputs/Arcade-Stick-Hcb.png", "HCF": "/img/inputs/Arcade-Stick-Hcf.png",
  "Left_Right": "/img/inputs/Arcade-Stick-LR.png", "Left": "/img/inputs/Arcade-Stick-Left.png",
  "QCB": "/img/inputs/Arcade-Stick-Qcb.png", "QCF": "/img/inputs/Arcade-Stick-Qcf.png",
  "Right": "/img/inputs/Arcade-Stick-Right.png", "UpLeft": "/img/inputs/Arcade-Stick-UL.png",
  "UpRight": "/img/inputs/Arcade-Stick-UR.png", "Up": "/img/inputs/Arcade-Stick-Up.png",
  "Air": "/img/inputs/Control-Modifier-Air.png", "Tap": "/img/inputs/Control-Modifier-Tap.png",
  "DownLeft": "/img/inputs/Arcade-Stick-DL.png", "DownRight": "/img/inputs/Arcade-Stick-DR.png"
};

// --- MAIN INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  cleanURL();
  
  // 1. UI & Navigation
  loadContent("header.html", "header-container", () => {
    highlightCurrentNav();
  });

  loadContent("footer.html", "footer-container", () => {
    const yearSpan = document.getElementById("about-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  });

// 2. Management of excluded paths
  const path = window.location.pathname.replace(/\/$/, "");
  if (DISABLED_PATHS.includes(path)) return;

// 3. Specific initializations
  setImageSrc();
  initGlobalLazyLoading();
  initPopups();
  initTabs();
});

// --- FUNCTIONS ---

// Cleaning the URL (Trailing slash)
function cleanURL() {
  if (window.location.pathname.length > 1 && window.location.pathname.endsWith('/')) {
    const newUrl = window.location.pathname.slice(0, -1);
    window.history.replaceState(null, null, newUrl);
  }
}

// Generic Header/Footer loader
function loadContent(file, containerId, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = data;
        if (callback) callback();
      }
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}



// Navigation
function highlightCurrentNav() {
  const currentPath = window.location.pathname;
  const isCharPage = currentPath.startsWith("/characters");

  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (!link.classList.contains("logo") && (currentPath === href || (href?.startsWith("/characters") && isCharPage))) {
      Object.assign(link.style, { backgroundColor: "black", color: "white" });
    }
  });

  const charBtn = document.querySelector(".dropdown-toggle");
  if (charBtn && isCharPage) Object.assign(charBtn.style, { backgroundColor: "black", color: "white" });

  document.querySelectorAll(".dropdown-menu li a").forEach(l => l.style.backgroundColor = "transparent");
}


// Tab management (Info, Movelist, Guide, Combos, Matchups)
function switchTab(targetId, groupSelector, activeElement, activeClass = 'active') {
  document.querySelectorAll(groupSelector).forEach(sec => sec.style.display = sec.id === targetId ? "block" : "none");
  if (activeElement) {
    const parent = activeElement.parentElement.tagName === 'LI' ? activeElement.closest('ul') : activeElement.parentElement;
    parent.querySelectorAll('.' + activeClass + ', .clicked').forEach(el => el.classList.remove(activeClass, 'clicked'));
    activeElement.classList.add(activeElement.tagName === 'A' ? 'clicked' : activeClass);
  }
}

function initTabs() {
  // Character tabs
  const charButtons = document.querySelectorAll("button.color-button");
  if (document.getElementById("button1")) switchTab("infos", "#infos, #movelist, #guide, #combos, #matchups", document.getElementById("button1"));
  
  charButtons.forEach(btn => btn.addEventListener("click", () => {
    const target = btn.textContent.toLowerCase().trim(); 
    const sectionMap = {"infos":"infos", "movelist":"movelist", "guide":"guide", "combos":"combos", "matchups":"matchups"};
  }));

  // Matchups
  const shoLink = document.querySelector("a[onclick*='sho']");
  if (document.getElementById('sho') && shoLink) switchTab('sho', '#saizo, #pielle, #rila, #dao-long, #condor, #sho, #maherl, #tia, #alsion', shoLink);
}

// Lazy Loading (Images, Posters, VideoJS)
function initGlobalLazyLoading() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const el = entry.target;

      // Case 1 : VideoJS (Lazy initialization)
      if (el.tagName === 'VIDEO' && el.closest('.main-content')) {
        ensureVideoAssets(() => initSingleVideoJS(el));
      } 

      // Case 2 : Lazy-image
      else if (el.dataset.src) {
        if (el.tagName === 'IMG') {
          el.src = el.dataset.src;
          el.classList.remove('lazy-image');
        }
        if (el.tagName === 'VIDEO') { 
          const source = el.querySelector('source');
          if (source) {
            source.src = el.dataset.src;
            el.load();
          }
        }
      }

      // Case 3 : Videos posters
      if (el.dataset.poster) {
        el.poster = el.dataset.poster;
        el.removeAttribute('data-poster');
      }

      // Stop observing once the element is loaded
      obs.unobserve(el);
    });
  }, { 
    rootMargin: '0px 0px 200px 0px', 
    threshold: 0.01 
  });

  const targets = document.querySelectorAll('.main-content video, img.lazy-image, video[data-src], video[data-poster]');
  targets.forEach(el => observer.observe(el));
}

// VideoJS Core
function ensureVideoAssets(callback) {
  if (window.videojs) return callback();
  const css = document.createElement("link");
  css.rel = "stylesheet"; css.href = "https://vjs.zencdn.net/8.10.0/video-js.css";
  document.head.appendChild(css);
  const script = document.createElement("script");
  script.src = "https://vjs.zencdn.net/8.10.0/video.min.js";
  script.onload = callback;
  document.body.appendChild(script);
}

function initSingleVideoJS(video) {
  if (video.classList.contains("video-js")) return;
  video.id = video.id || "vjs-lazy-" + Math.random().toString(36).substr(2, 9);
  video.classList.add("video-js", "vjs-default-skin", "vjs-big-play-centered", "vjs-arcade");
  videojs(video.id, { fluid: true, aspectRatio: "4:3", controls: true, preload: video.getAttribute("preload") || "none" });
}

// Popups & Inputs
function initPopups() {
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup-text');
  if (!popup) return;

  const close = () => { popup.classList.remove('show'); popupText.innerHTML = ''; };
  
  document.querySelectorAll('.move, .item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      popupText.innerHTML = item.getAttribute('data-text');
      
      const scale = window.innerWidth >= 1500 ? 1.32 : 1;
      const content = popup.querySelector('.popup-content');

      Object.assign(content.style, { 
        left: `${e.pageX / scale}px`, 
        top: `${e.pageY / scale}px` 
      });

      popup.classList.add('show');

      content.scrollIntoView({ behavior: 'smooth', block: 'center' });

      popupText.querySelector('video')?.play();
    });
  });

  document.querySelector('.close')?.addEventListener('click', close);
  window.addEventListener('click', (e) => e.target === popup && close());
}
function setImageSrc() {
  for (let className in INPUT_IMAGES) {
    Array.from(document.getElementsByClassName(className)).forEach(img => img.src = INPUT_IMAGES[className]);
  }
}

// Bridge for legacy HTML onclick events
window.showContent = (id) => switchTab(id, "#infos, #movelist, #guide, #combos, #matchups", document.querySelector(`button[onclick*="${id}"]`));
window.toggleContent = (id, link) => switchTab(id, "#saizo, #pielle, #rila, #dao-long, #condor, #sho, #maherl, #tia, #alsion", link);

// Character Button function
function goToCharacters() {
    sessionStorage.setItem("scrollToCharacters", "true");
    window.location.href = "/";
}

// Scroll with offset (for sticky header)
function scrollToCharacterSection() {
    const section = document.getElementById("character-section");
    if (!section) return;

    const offset = 80; // Adjust for your header height
    const top = section.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
}

// Homepage scroll after navigation
window.addEventListener("load", function () {
    if (sessionStorage.getItem("scrollToCharacters") === "true") {
        sessionStorage.removeItem("scrollToCharacters");
        // Slight delay to ensure mobile layout is fully rendered
        setTimeout(scrollToCharacterSection, 50);
    }
});