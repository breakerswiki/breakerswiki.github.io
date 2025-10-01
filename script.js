// Remove trailing slash from the current URL if it exists
if (window.location.pathname.endsWith('/')) {
  const newUrl = window.location.pathname.slice(0, -1);
  window.history.replaceState(null, null, newUrl); // Update the URL without reloading the page
}


// Header - Footer loader
function loadContent(file, containerId, callback) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
      if (callback) callback(); // Run callback after content is loaded
    })
    .catch(error => console.error(`Error loading ${file}:`, error));
}

// Update footer year
function updateFooterYear() {
  const currentYear = new Date().getFullYear();
  const footerYearElement = document.getElementById("footer-year");
  if (footerYearElement) {
    footerYearElement.textContent = currentYear;
  }
}

// Highlight the current page link in the navigation bar
function highlightCurrentNav() {
  const currentPath = window.location.pathname;

  document.querySelectorAll(".nav-links li a").forEach(link => {
    const href = link.getAttribute("href");

    // Exact match (Gameplay, About, etc.)
    if (currentPath === href) {
      link.style.fontWeight = "bold";
      link.style.textDecoration = "underline";
      link.style.textUnderlineOffset = "10px";
    }

    // Parent Characters link stays bold for any /characters/... subpage
    if (href.startsWith("/characters") && currentPath.startsWith("/characters")) {
      link.style.fontWeight = "bold";
      link.style.textDecoration = "underline";
      link.style.textUnderlineOffset = "10px";
    }
  });
}

// Load header + footer once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadContent("header.html", "header-container", highlightCurrentNav);
  loadContent("footer.html", "footer-container", updateFooterYear);
});


// Set <img> sources for stick inputs using html classes
const inputImages = {
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
  const buttons = document.querySelectorAll("button.color-button"); // only target .color-button
  const defaultButton = document.getElementById("button1");
  
  if (defaultButton) {
    defaultButton.classList.add("active");
    showContent("infos");
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

  // Remove .clicked from all links
  document.querySelectorAll('#charselect a').forEach(a => {
    a.classList.remove('clicked');
  });

  // Add .clicked to the selected link
  if (clickedLink) {
    clickedLink.classList.add('clicked');
  }
}


// Simulate click on #sho matchup when the page loads, if it exists
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

// Lazy-loads <img> elements with the class "lazy-image" when they enter the viewport
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll('img.lazy-image');
  const lazyVideos = document.querySelectorAll('video[data-poster]');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // Handle <img>
      if (el.tagName === 'IMG' && el.dataset.src) {
        el.src = el.dataset.src;
        el.classList.remove('lazy-image');
      }

      // Handle <video>
      if (el.tagName === 'VIDEO' && el.dataset.poster) {
        el.poster = el.dataset.poster;
        el.removeAttribute('data-poster');
      }

      observer.unobserve(el);
    });
  }, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.01
  });

  lazyImages.forEach(img => observer.observe(img));
  lazyVideos.forEach(video => observer.observe(video));
});



