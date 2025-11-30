// Hide loader when page is fully loaded
window.addEventListener('load', () => {
  const video = document.getElementById("scrollVideo");
  const loader = document.getElementById('pageLoader');
  
  const hideLoader = () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
          loader.remove();
        }, 500);
      }
    }, 500);
  };
  
  if (video) {
    if (video.readyState >= 3) {
      hideLoader();
    } else {
      video.addEventListener('canplaythrough', hideLoader, { once: true });
      setTimeout(hideLoader, 2000);
    }
  } else {
    hideLoader();
  }
});

const video = document.getElementById("scrollVideo");

let videoDuration = 0;
let isScrolling = false;
let scrollTimeout;
let lastScrollTop = 0;

// Pause video initially to prevent autoplay issues on mobile
if (video) {
  video.pause();
  video.currentTime = 0;
}

// Wait until metadata is available
video.addEventListener("loadedmetadata", () => {
  videoDuration = video.duration;
  console.log("Video duration loaded:", videoDuration);
  
  // Ensure video is paused
  video.pause();
  video.currentTime = 0;

  // Start the scroll-sync only after we know the duration
  syncVideoToScroll();
});

// Use scroll event instead of continuous requestAnimationFrame for better mobile performance
let lastVideoTime = -1;
function syncVideoToScroll() {
  if (!videoDuration || isNaN(videoDuration)) {
    return;
  }

  const scrollTop = window.scrollY;
  const scrollHeight = document.body.scrollHeight - window.innerHeight;

  // Normalize scroll to [0, 1]
  let scrollFraction = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);

  // 🌸 Apply easing (nonlinear motion)
  // EaseInOutCubic — starts slow, speeds up, then slows down again
  const easedFraction = easeInOutCubic(scrollFraction);

  // Compute video time from eased fraction
  const videoTime = easedFraction * videoDuration;

  // Only update if the time has changed significantly (prevents unnecessary updates)
  if (!isNaN(videoTime) && Math.abs(videoTime - lastVideoTime) > 0.1) {
    // Pause video to prevent autoplay, then set time
    video.pause();
    video.currentTime = videoTime;
    lastVideoTime = videoTime;
  }
}

// Throttled scroll handler for better mobile performance
window.addEventListener('scroll', () => {
  isScrolling = true;
  syncVideoToScroll();
  
  // Clear existing timeout
  clearTimeout(scrollTimeout);
  
  // After scrolling stops, ensure video is paused
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    if (video) {
      video.pause();
    }
  }, 150);
}, { passive: true });

// 🎯 Easing function
function easeInOutCubic(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}
