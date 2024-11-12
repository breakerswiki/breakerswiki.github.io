// Load the footer dynamically and update the year.
function loadFooter() {
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;
      const currentYear = new Date().getFullYear();
      const footerYearElement = document.getElementById("footer-year");
      if (footerYearElement) {
        footerYearElement.textContent = currentYear;
      }
    })
    .catch(error => console.error('Error loading footer:', error));
}
document.addEventListener("DOMContentLoaded", loadFooter);


// Set <img> sources using html classes
const inputImages = {
  "A": "/img/inputs/Arcade-Button-APunch.png",
  "B": "/img/inputs/Arcade-Button-BKick.png",
  "C": "/img/inputs/Arcade-Button-CPunch.png",
  "D": "/img/inputs/Arcade-Button-DKick.png",
  "Kick": "/img/inputs/Arcade-Button-Kick.png",
  "Punch": "/img/inputs/Arcade-Button-Punch.png",
  "360": "/img/inputs/Arcade-Stick-360.png",
  "ChargeBack": "/img/inputs/Arcade-Stick-CB.png",
  "ChargeBack_Forward": "/img/inputs/Arcade-Stick-CBF.png",
  "ChargeDown_Up": "/img/inputs/Arcade-Stick-CDU.png",
  "ChargeDownBack": "/img/inputs/Arcade-Stick-CDb.png",
  "Delta": "/img/inputs/Arcade-Stick-Delta.png",
  "Down": "/img/inputs/Arcade-Stick-Down.png",
  "DP": "/img/inputs/Arcade-Stick-Dp.png",
  "HCB": "/img/inputs/Arcade-Stick-Hcb.png",
  "HCF": "/img/inputs/Arcade-Stick-Hcf.png",
  "Left_Right": "/img/inputs/Arcade-Stick-LR.png",
  "Left": "/img/inputs/Arcade-Stick-Left.png",
  "QCB": "/img/inputs/Arcade-Stick-Qcb.png",
  "QCF": "/img/inputs/Arcade-Stick-Qcf.png",
  "Right": "/img/inputs/Arcade-Stick-Right.png",
  "UpLeft": "/img/inputs/Arcade-Stick-UL.png",
  "UpRight": "/img/inputs/Arcade-Stick-UR.png",
  "Up": "/img/inputs/Arcade-Stick-Up.png",
  "Air": "/img/inputs/Control-Modifier-Air.png",
  "Tap": "/img/inputs/Control-Modifier-Tap.png",
  "DownLeft": "/img/inputs/Arcade-Stick-DL.png",
  "DownRight": "/img/inputs/Arcade-Stick-DR.png"
};

function setImageSrc() {
  for (let className in inputImages) {
    const imgElements = document.getElementsByClassName(className);
    for (let img of imgElements) {
      img.src = inputImages[className];
    }
  }
}
document.addEventListener("DOMContentLoaded", setImageSrc);


// Toggle content visibility on character pages.
function showContent(contentId) {
  const contentSections = document.querySelectorAll("#infos, #movelist, #guide, #combos, #matchups");
  contentSections.forEach(section => {
    section.style.display = "none";
  });
  const selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.style.display = "block";
  }
}

// Display "Infos" by default and maintain active button color when clicked away.
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".color-button");
  document.getElementById('button1')?.classList.add('active');
  showContent('infos');
  // Toggle active state on button click
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".color-button.active")?.classList.remove("active");
      button.classList.add("active");
    });
  });
});

// Toggle Content on matchup section
function toggleContent(contentId) {
  var contents = document.querySelectorAll("#saizo, #pielle, #rila, #dao-long, #condor, #sho, #maherl, #tia, #alsion");
  contents.forEach(content => content.style.display = "none");
  var content = document.getElementById(contentId);
  content.style.display = "block";
}

// Set color filter for selected character in Matchup Section
let lastClickedImg = null;
function toggleFilter(anchor) {
  const img = anchor.querySelector('img');
  if (lastClickedImg && lastClickedImg !== img) {
    lastClickedImg.style.filter = '';
    lastClickedImg.classList.add('filtered');
  }
  img.style.filter = img.classList.contains('filtered') ? '' : 'none';
  img.classList.toggle('filtered');
  lastClickedImg = img;
}

// Light/Dark Mode Theme Switch
document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.querySelector('#modeSwitch');
  const themeColor = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
  // Ensure meta tag is in the head
  if (!themeColor.parentElement) document.head.appendChild(themeColor);
  function setThemeColor(theme) {
    themeColor.setAttribute("content", theme === 'dark' ? "#111111" : "#ffffff");
  }
  // Load saved theme from localStorage
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  toggleSwitch.checked = currentTheme === 'dark';
  setThemeColor(currentTheme);
  // Switch theme and save to localStorage
  toggleSwitch.addEventListener('change', (e) => {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
    setThemeColor(theme);
  });
});

// Clean URL by removing the hash, ".html", and "/index" (GitHub Pages only).
function cleanUrl() {
  let newURL = window.location.href;
  // Remove hash, .html, and /index
  newURL = newURL.replace(window.location.hash, "")
    .replace(/\.html$/, "")
    .replace(/\/index(\/)?$/, "");
  // Update URL if it has changed
  if (newURL !== window.location.href) {
    window.history.replaceState({}, document.title, newURL);
  }
}
window.addEventListener("load", cleanUrl);
window.addEventListener("hashchange", cleanUrl);