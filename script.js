
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



// Show / Hide image
function toggleImage(imageId) {
  var img = document.getElementById(imageId);
  if (img.style.display === 'none') {
      img.style.display = 'block'; // Show the image
  } else {
      img.style.display = 'none'; // Hide the image
  }
}

// Auto Scroll
window.onload = function() {
  if(window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
      var titleElement = document.getElementById('title');
      if(titleElement) {
          titleElement.scrollIntoView({ behavior: 'smooth' });
          // Remove the '#title' fragment from the URL
          history.replaceState(null, null, window.location.pathname);
      }
  }
};

// Loading Overlay
window.addEventListener('load', function() {
  // Hide the loading animation when the page is fully loaded
  var loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.style.display = 'none';
});


