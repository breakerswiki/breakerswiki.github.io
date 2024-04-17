
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
/* window.onload = function() {
  if(window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
      var titleElement = document.getElementById('title');
      if(titleElement) {
          titleElement.scrollIntoView({ behavior: 'smooth' });
          // Remove the '#title' fragment from the URL
          history.replaceState(null, null, window.location.pathname);
      }
  }
}; */




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
      // Add more image URLs as needed
  ];

  var randomIndex = Math.floor(Math.random() * images.length);
  var selectedImage = images[randomIndex];
  
  var backgroundDiv = document.querySelector(".page-header");
  backgroundDiv.style.backgroundImage = "linear-gradient(120deg, #158399e9, #154e99ea), url('" + selectedImage + "')";
});


// Loading GIFs
window.addEventListener('DOMContentLoaded', function() {
  const gifImages = document.querySelectorAll('img[src*=".gif"]');

  gifImages.forEach(function(image) {
    // Create loading text element
    const loadingText = document.createElement('span');
    loadingText.classList.add('loading-text');  
    image.parentNode.insertBefore(loadingText, image); 

    image.style.opacity = 0;  // Hide GIF image initially
    image.addEventListener('load', function() {
      loadingText.remove();  // Remove loading text on image load
      image.style.opacity = 1;  // Show loaded GIF image
    });
  });
});