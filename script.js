// Explore button action
document.getElementById("exploreBtn").addEventListener("click", () => {
  alert("Welcome to Bharni Jems ✨");
});

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("navbarMenu");
const right = document.querySelector(".navbar-right");

// hamburger.addEventListener("click", () => {
//   hamburger.classList.toggle("active");
//   menu.classList.toggle("active");
//   right.classList.toggle("active");
// });

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

