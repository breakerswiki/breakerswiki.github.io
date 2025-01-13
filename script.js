// Header - Footer
// Reusable function to load a file into a specified container
function loadContent(file, containerId, callback) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
      if (callback) callback(); // Optional callback for additional operations
    })
    .catch(error => console.error(`Error loading ${file}:`, error));
}
// Function to handle additional logic for the footer (e.g., updating the year)
function updateFooterYear() {
  const currentYear = new Date().getFullYear();
  const footerYearElement = document.getElementById("footer-year");
  if (footerYearElement) {
    footerYearElement.textContent = currentYear;
  }
}
// Load header and footer dynamically when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadContent('header.html', 'header-container');
  loadContent('footer.html', 'footer-container', updateFooterYear);
});




// Function to add "current" class to the clicked link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
      // Remove "current" class from all links
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('current'));
      // Add "current" class to the clicked link
      this.classList.add('current');
  });
});

// On page load, highlight the current link based on the URL
window.addEventListener('load', function() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
      if (path.includes(link.getAttribute('href'))) {
          link.classList.add('current');
      }
  });
});



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


// Gameplay - Carousel arrow navigation
document.addEventListener("DOMContentLoaded", () => {
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const items = [...document.querySelectorAll('.carousel-item')];
  
  // Only initialize the carousel if the necessary elements exist
  if (prev && next && items.length > 0) {
    let currentIndex = 0;

    const updateCarousel = (index) => {
      items.forEach(item => item.classList.toggle('highlighted', item === items[index]));
      items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    const changeIndex = (step) => {
      currentIndex = (currentIndex + step + items.length) % items.length;
      updateCarousel(currentIndex);
    };

    prev.addEventListener('click', () => changeIndex(-1));
    next.addEventListener('click', () => changeIndex(1));
    updateCarousel(currentIndex);
  }
});

// Wiki - Toggle the visibility of text and set the active year
function toggleText(index) {
  const texts = document.querySelectorAll('.text');
  const years = document.querySelectorAll('.year');

  if (texts.length && years.length) {
    texts.forEach(text => text.classList.remove('visible'));
    years.forEach(year => year.classList.remove('active'));

    texts[index]?.classList.add('visible');
    years[index]?.classList.add('active');
  }
}

// Initialize the default state on page load
document.addEventListener('DOMContentLoaded', () => toggleText(0));


// Toggle content menu visibility on character pages.
function showContent(contentId) {
  document.querySelectorAll("#infos, #movelist, #guide, #combos, #matchups").forEach(section => {
    section.style.display = section.id === contentId ? "block" : "none";
  });
}

// Display "Infos" by default and maintain active button color when clicked.
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".color-button");
  const defaultButton = document.getElementById('button1');
  if (defaultButton) {
    defaultButton.classList.add('active');
    showContent('infos');
  }
  
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