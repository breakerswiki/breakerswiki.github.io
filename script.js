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


// menu button color
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".color-button");

  buttons.forEach(button => {
      button.addEventListener("click", function() {
          buttons.forEach(btn => btn.classList.remove("active"));
          this.classList.add("active");
      });
  });
});



// matchups charselect color
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