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
  
  var backgroundDiv = document.querySelector(".page-header");
  backgroundDiv.style.backgroundImage = "linear-gradient(120deg, #158399e9, #154e99ea), url('" + selectedImage + "')";
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




