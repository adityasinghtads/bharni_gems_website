const video = document.getElementById("scrollVideo");

let videoDuration = 0;

// Wait until metadata is available
video.addEventListener("loadedmetadata", () => {
  videoDuration = video.duration;
  console.log("Video duration loaded:", videoDuration);

  // Start the scroll-sync only after we know the duration
  requestAnimationFrame(syncVideoToScroll);
});

function syncVideoToScroll() {
  if (!videoDuration || isNaN(videoDuration)) {
    requestAnimationFrame(syncVideoToScroll);
    return;
  }

  const scrollTop = window.scrollY;
  const scrollHeight = document.body.scrollHeight - window.innerHeight;

  // Normalize scroll to [0, 1]
  let scrollFraction = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);

  // 🌸 Apply easing (nonlinear motion)
  // EaseInOutCubic — starts slow, speeds up, then slows down again
  const easedFraction = easeInOutCubic(scrollFraction);
  console.log("Eased fraction:", easedFraction);

  // Compute video time from eased fraction
  const videoTime = easedFraction * videoDuration;
  console.log("Video time:", videoTime);

  if (!isNaN(videoTime)) {
    video.currentTime = videoTime;
  }

  requestAnimationFrame(syncVideoToScroll);
}

// 🎯 Easing function
function easeInOutCubic(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}
