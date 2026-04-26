// Hide loader when page is fully loaded
window.addEventListener('load', () => {
  const video = document.getElementById('bg-video');
  const loader = document.getElementById('pageLoader');
  
  // Wait for video to be ready or timeout after 2 seconds
  const hideLoader = () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hidden');
        // Remove loader from DOM after animation
        setTimeout(() => {
          loader.remove();
        }, 500);
      }
    }, 500); // Small delay to ensure smooth transition
  };
  
  if (video) {
    if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
      hideLoader();
    } else {
      video.addEventListener('canplaythrough', hideLoader, { once: true });
      // Fallback timeout
      setTimeout(hideLoader, 2000);
    }
  } else {
    hideLoader();
  }
});

// Explore button action
document.getElementById("exploreBtn").addEventListener("click", () => {
  window.location.href = "./collections.html";
});

// Hamburger menu code is now in nav.js

const words = ["creatives", "designers", "innovators", "artists", "dreamers"];
let index = 0;
const changingWord = document.getElementById("changingWord");
const box = document.querySelector(".changing-word-box");

function changeWord() {
  changingWord.classList.remove("show");

  setTimeout(() => {
    index = (index + 1) % words.length;
    changingWord.textContent = words[index];

    // Dynamically resize box to fit new word
    const temp = document.createElement("span");
    temp.style.visibility = "hidden";
    temp.style.position = "absolute";
    temp.style.whiteSpace = "nowrap";
    temp.style.font = window.getComputedStyle(changingWord).font;
    temp.textContent = words[index];
    document.body.appendChild(temp);
    const newWidth = temp.offsetWidth + 32; // padding offset
    document.body.removeChild(temp);

    box.style.width = newWidth + "px";

    // Show new word
    requestAnimationFrame(() => {
      changingWord.classList.add("show");
    });
  }, 400);
}

setInterval(changeWord, 2000);
changingWord.classList.add("show");

