
// Retrive inputs images
// Define an array of local image paths
const images = [
  "/img/inputs/Arcade-Button-APunch.png", // images[0] - class A
  "/img/inputs/Arcade-Button-BKick.png",  // images[1] - class B
  "/img/inputs/Arcade-Button-CPunch.png", // images[2] - class C
  "/img/inputs/Arcade-Button-DKick.png",  // images[3] - class D
  "/img/inputs/Arcade-Button-Kick.png",   // images[4] - class Kick
  "/img/inputs/Arcade-Button-Punch.png",  // images[5] - class Punch
  "/img/inputs/Arcade-Stick-360.png",     // images[6] - class 360
  "/img/inputs/Arcade-Stick-CB.png",      // images[7] - class ChargeBack
  "/img/inputs/Arcade-Stick-CBF.png",     // images[8] - class ChargeBack_Forward
  "/img/inputs/Arcade-Stick-CDU.png",     // images[9] - class ChargeDown_Up
  "/img/inputs/Arcade-Stick-CDb.png",     // images[10] - class ChargeDownBack
  "/img/inputs/Arcade-Stick-Delta.png",   // images[11] - class Delta
  "/img/inputs/Arcade-Stick-Down.png",    // images[12] - class Down
  "/img/inputs/Arcade-Stick-Dp.png",      // images[13] - class DP
  "/img/inputs/Arcade-Stick-Hcb.png",     // images[14] - class HCB
  "/img/inputs/Arcade-Stick-Hcf.png",     // images[15] - class HCF
  "/img/inputs/Arcade-Stick-LR.png",      // images[16] - class Left_Right
  "/img/inputs/Arcade-Stick-Left.png",    // images[17] - class Left
  "/img/inputs/Arcade-Stick-Qcb.png",     // images[18] - class QCB
  "/img/inputs/Arcade-Stick-Qcf.png",     // images[19] - class QCF
  "/img/inputs/Arcade-Stick-Right.png",   // images[20] - class Right
  "/img/inputs/Arcade-Stick-UL.png",      // images[21] - class UpLeft
  "/img/inputs/Arcade-Stick-UR.png",      // images[22] - class UpRight
  "/img/inputs/Arcade-Stick-Up.png",      // images[23] - class Up
  "/img/inputs/Control-Modifier-Air.png", // images[24] - class Air
  "/img/inputs/Control-Modifier-Tap.png", // images[25] - class Tap
  "/img/inputs/Arcade-Stick-DL.png",      // images[26] - class DownLeft
  "/img/inputs/Arcade-Stick-DR.png"       // images[27] - class DownRight
];
// Function to set image sources
function setImageSrc() {
  // Set source for each class, looping through elements of that class
  const classNames = [
    "A", "B", "C", "D", "Kick", "Punch", "360",
    "ChargeBack", "ChargeBack_Forward", "ChargeDown_Up",
    "ChargeDownBack", "Delta", "Down", "DP",
    "HCB", "HCF", "Left_Right", "Left",
    "QCB", "QCF", "Right", "UpLeft",
    "UpRight", "Up", "Air", "Tap",
    "DownLeft", "DownRight"
  ];

  classNames.forEach((className, index) => {
    const imgElements = document.getElementsByClassName(className);
    for (let i = 0; i < imgElements.length; i++) {
      if (imgElements[i] && images[index]) {
        imgElements[i].src = images[index]; // Set src for each element of that class
      }
    }
  });
}
// Call the function to set image sources
document.addEventListener("DOMContentLoaded", function () {
  setImageSrc();
});





// Toggle Content on all charaters pages
function showContent(contentId) {
  // Hide all content sections first
  var contents = document.querySelectorAll("#infos, #movelist, #guide, #combos, #matchups");
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
  // Then show the clicked content section
  var content = document.getElementById(contentId);
  content.style.display = "block";
}

// Toggle Content on all matchup pages
function toggleContent(contentId) {
  // Hide all content sections first
  var contents = document.querySelectorAll("#saizo, #pielle, #rila, #dao-long, #condor, #sho, #maherl, #tia, #alsion");
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
  // Then show the clicked content section
  var content = document.getElementById(contentId);
  content.style.display = "block";
}

// // Random background for page header.
// document.addEventListener("DOMContentLoaded", function () {
//   var images = [
//     "img/assets/maherl_stage_bg.webp",
//     "img/assets/sho_stage_bg.webp",
//     "img/assets/pielle_stage_bg.webp",
//     "img/assets/tia_stage_bg.webp",
//     "img/assets/saizo_stage_bg.webp",
//     "img/assets/condor_stage_bg.webp",
//     "img/assets/dao-long_stage_bg.webp",
//     "img/assets/rila_stage_bg.webp",
//     "img/assets/alsion_stage_bg.webp",
//     "img/assets/bai-hu_stage_bg.webp"
//   ];
//   var randomIndex = Math.floor(Math.random() * images.length);
//   var selectedImage = images[randomIndex];
//   var backgroundDiv = document.querySelector(".navbar");
//   // backgroundDiv.style.backgroundImage =  "linear-gradient(120deg, rgba(21, 131, 153, 0.79), rgb(21 78 153 / 45%)), url('" + selectedImage + "')";
//   backgroundDiv.style.backgroundImage =  "linear-gradient(120deg, rgba(21, 131, 153, 0.6), rgb(21 78 153 / 75%)), url('" + selectedImage + "')";

// });



// Remove everything after # in URL
function removeHash() {
  if (window.location.hash) {
    var newURL = window.location.href.replace(window.location.hash, "");
    window.history.replaceState({}, document.title, newURL);
  }
}
// Run the function when the page loads
window.addEventListener("load", removeHash);
// Run the function when the hash changes
window.addEventListener("hashchange", removeHash);

// Remove ".html" and "/index" from URL
// Note: Refreshing a page locally without the .html may cause an error. 
// This function is specifically used because the code is meant to be published 
// on GitHub Pages, which handles this exception.
function removeHtmlExtension() {
  var newURL = window.location.href.replace(/\.html$/, "").replace(/\/index(\/)?$/, "");
  if (newURL !== window.location.href) {
    window.history.replaceState({}, document.title, newURL);
  }
}
// Run the function when the page loads
window.addEventListener("load", removeHtmlExtension);




// Set menu button color when it is active
document.addEventListener("DOMContentLoaded", function () {
  const button1 = document.getElementById('button1');

  // Run the following code only if button1 exists
  if (button1) {
    const buttons = document.querySelectorAll(".color-button");

    // Set the initial active state for "Infos"
    button1.classList.add('active');

    buttons.forEach(button => {
      button.addEventListener("click", function () {
        buttons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Ensure the correct content is shown when the page loads
    showContent('infos');
  }
});




// Set matchups caracter select color when it is active
var lastClickedImg = null; // Variable to store the last clicked <img> element

function toggleFilter(anchor) {
  var img = anchor.querySelector('img'); // Find the <img> tag inside the <a> tag

  if (img !== lastClickedImg && lastClickedImg !== null) {
    // If a different image is clicked and there's a previously clicked image
    lastClickedImg.style.filter = '';  // Remove filter from the previously clicked image
    lastClickedImg.classList.add('filtered');  // Add 'filtered' class back if necessary
  }

  if (img.classList.contains('filtered')) {
    img.style.filter = 'none';  // Apply filter: none;
    img.classList.remove('filtered');  // Remove the 'filtered' class
  } else {
    img.style.filter = '';  // Remove the inline filter style
    img.classList.add('filtered');  // Add the 'filtered' class back
  }

  lastClickedImg = img; // Update the last clicked <img> element
}


// Random Image for Footer
const imagesFooter = [
  'img/assets/condor_SD.gif',
  'img/assets/sho_SD.gif',
  'img/assets/tia_SD.gif',
  'img/assets/pielle_SD.gif'
];

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * imagesFooter.length); // Generate random index
  const selectedImage = imagesFooter[randomIndex]; // Select random image
  document.querySelector('.footer-background').style.backgroundImage = `url('${selectedImage}')`; // Set background
}
// Call the function to set background on page load
window.onload = setRandomBackground;




// Dark mode
document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.querySelector('#modeSwitch');
  
  // Set initial theme color based on current theme
  function setThemeColor(theme) {
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      // Create meta tag if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    themeColor.setAttribute("content", theme === 'dark' ? "#111111" : "#ffffff");
  }

  // Check for saved theme in localStorage
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    setThemeColor(currentTheme); // Set initial theme color
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleSwitch.checked = true; // Set the toggle to match the saved theme
    }
  }

  // Toggle theme and save preference to localStorage
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark'); // Save theme as dark
      setThemeColor('dark'); // Update theme color for dark mode
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light'); // Save theme as light
      setThemeColor('light'); // Update theme color for light mode
    }
  }

  toggleSwitch.addEventListener('change', switchTheme, false);
});
