
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
document.addEventListener("DOMContentLoaded", function() {
  setImageSrc();
});





// Toggle Content on all charaters pages
function showContent(contentId) {
  // Hide all content sections first
  var contents = document.querySelectorAll("#infos, #movelist, #strategy, #combos, #matchups");
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

// Random background for page header.
document.addEventListener("DOMContentLoaded", function() {
  var images = [
      "img/assets/maherl_stage_bg.webp",
      "img/assets/sho_stage_bg.webp",
      "img/assets/pielle_stage_bg.webp",
      "img/assets/tia_stage_bg.webp",
      "img/assets/saizo_stage_bg.webp",
      "img/assets/condor_stage_bg.webp",
      "img/assets/dao-long_stage_bg.webp",
      "img/assets/rila_stage_bg.webp",
      "img/assets/alsion_stage_bg.webp",
      "img/assets/bai-hu_stage_bg.webp"
  ];
  var randomIndex = Math.floor(Math.random() * images.length);
  var selectedImage = images[randomIndex];
  var backgroundDiv = document.querySelector(".navbar");
  backgroundDiv.style.backgroundImage = "linear-gradient(120deg, rgba(21, 131, 153, 0.79), rgb(21 78 153 / 91%)), url('" + selectedImage + "')";
});



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
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".color-button");

  buttons.forEach(button => {
      button.addEventListener("click", function() {
          buttons.forEach(btn => btn.classList.remove("active"));
          this.classList.add("active");
      });
  });
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


