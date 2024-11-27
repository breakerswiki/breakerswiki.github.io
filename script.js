// Carousel arrow navigation (gameplay)
document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  const scrollToItem = (index) => {
    if (!items.length) return;

    items.forEach(item => item.classList.remove('highlighted'));
    items[index].classList.add('highlighted');
    items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const changeIndex = (increment) => {
    if (!items.length) return;
    currentIndex = (currentIndex + increment + items.length) % items.length;
    scrollToItem(currentIndex);
  };

  prevButton?.addEventListener('click', () => changeIndex(-1));
  nextButton?.addEventListener('click', () => changeIndex(1));

  scrollToItem(currentIndex);
});



// Wiki - Function to toggle the visibility of the text and change the active year
function toggleText(index) {
  const texts = document.querySelectorAll('.text');
  const years = document.querySelectorAll('.year');

  if (texts.length === 0 || years.length === 0) return;

  texts.forEach(text => {
    text.classList.remove('visible');
  });

  years.forEach(year => {
    year.classList.remove('active');
  });

  const text = document.getElementById(`text-${index}`);
  if (text) {
    text.classList.add('visible');
  }

  const year = years[index];
  if (year) {
    year.classList.add('active');
  }
}

// By default, show the first text and mark the first year as active
document.addEventListener('DOMContentLoaded', function () {
  const texts = document.querySelectorAll('.text');
  const years = document.querySelectorAll('.year');

  // Ensure there are both texts and years before modifying
  if (texts.length > 0 && years.length > 0) {
    texts[0].classList.add('visible');
    years[0].classList.add('active');
  }
});





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


// Set <img> sources for stick/button inputs using html classes
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
function toggleContent(contentId, clickedLink) {
  // Hide content of all sections
  document.querySelectorAll("#saizo, #pielle, #rila, #dao-long, #condor, #sho, #maherl, #tia, #alsion").forEach(content => {
    content.style.display = "none";
  });
  // Show the specified content if it exists
  const contentElement = document.getElementById(contentId);
  if (contentElement) {
    contentElement.style.display = "block";
  }
  // Update the clicked link's image to show it is selected
  document.querySelectorAll('#charselect img').forEach(img => {
    img.classList.remove('clicked');
  });
  if (clickedLink && clickedLink.querySelector('img')) {
    clickedLink.querySelector('img').classList.add('clicked');
  }
}
// Simulate click on #sho when the page loads, if it exists
document.addEventListener("DOMContentLoaded", () => {
  const shoLink = document.querySelector("a[onclick*='sho']");
  if (document.getElementById('sho') && shoLink) {
    toggleContent('sho', shoLink);
  }
});



// Light/Dark Mode Theme Switch
document.addEventListener('DOMContentLoaded', () => {
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
  setThemeColor(currentTheme);
  // If the page has a theme switcher, set up its functionality
  const toggleSwitch = document.querySelector('#modeSwitch');
  if (toggleSwitch) {
    toggleSwitch.checked = currentTheme === 'dark';
    // Switch theme and save to localStorage
    toggleSwitch.addEventListener('change', (e) => {
      const theme = e.target.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.body.classList.toggle('dark-mode', theme === 'dark');
      localStorage.setItem('theme', theme);
      setThemeColor(theme);
    });
  }
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