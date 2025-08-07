// Remove trailing slash from the current URL if it exists
if (window.location.pathname.endsWith('/')) {
  const newUrl = window.location.pathname.slice(0, -1);
  window.history.replaceState(null, null, newUrl); // Update the URL without reloading the page
}


// Header - Footer
function loadContent(file, containerId, callback) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
      if (callback) callback(); // Optional callback for additional operations
    })
    .catch(error => console.error(`Error loading ${file}:`, error));
}
// updating the year
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

// add underline decoration to the current page link in the nav bar
document.addEventListener("DOMContentLoaded", () => {
  loadContent('header.html', 'header-container', highlightCurrentLink);
});

function highlightCurrentLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");

    if (linkPath === currentPath || 
        (linkPath.startsWith("/characters") && currentPath.startsWith("/characters"))) {
      link.classList.add("current");
    }
  });
}



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

// Lazy-loads <video> elements when they enter the viewport
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        const src = target.dataset.src;
        if (src) {
          target.querySelector('source').src = src;
          target.load();
          obs.unobserve(target);
        }
      }
    });
  });

  document.querySelectorAll('video[data-src]').forEach(v => observer.observe(v));
});