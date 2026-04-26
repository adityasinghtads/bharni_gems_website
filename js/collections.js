const cards = [
    {
      id: 1,
      name: "Necklaces",
      image: "https://picsum.photos/id/1011/400/250",
      gallery: [
        "https://picsum.photos/id/1023/500/500",
        "https://picsum.photos/id/1033/500/500",
        "https://picsum.photos/id/1043/500/500",
        "https://picsum.photos/id/1053/500/500",
        "https://picsum.photos/id/1063/500/500",
      ]
    },
    {
      id: 2,
      name: "Earrings",
      image: "https://picsum.photos/id/1063/400/250",
      gallery: [
        "https://picsum.photos/id/1073/500/500",
        "https://picsum.photos/id/1083/500/500",
        "https://picsum.photos/id/1093/500/500",
        "https://picsum.photos/id/1103/500/500",
        "https://picsum.photos/id/1113/500/500",
      ]
    },
    {
      id: 3,
      name: "Bracelets",
      image: "https://picsum.photos/id/1113/400/250",
      gallery: [
        "https://picsum.photos/id/1123/500/500",
        "https://picsum.photos/id/1133/500/500",
        "https://picsum.photos/id/1143/500/500"
      ]
    },
    {
      id: 4,
      name: "Rings",
      image: "https://picsum.photos/id/1153/400/250",
      gallery: [
        "https://picsum.photos/id/1163/500/500",
        "https://picsum.photos/id/1173/500/500",
        "https://picsum.photos/id/1183/500/500"
      ]
    }
  ];
  
  const cardContainer = document.getElementById("cardContainer");
  const imageSection = document.getElementById("imageSection");
  const subTitle = document.getElementById("subTitle");
  
  function setActiveCard(activeEl) {
    document.querySelectorAll(".card.is-active").forEach((el) => el.classList.remove("is-active"));
    if (activeEl) activeEl.classList.add("is-active");
  }

  function showGallery(images, title, shouldScroll = true) {
    imageSection.innerHTML = "";
    subTitle.innerHTML = title;
   
    images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      imageSection.appendChild(img);
    });
    imageSection.classList.add("show");
    if (shouldScroll) {
      imageSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  function showAllJewelry(shouldScroll = false) {
    setActiveCard(null);
    const allImages = cards.flatMap((c) => c.gallery);
    showGallery(allImages, "Jewelry", shouldScroll);
  }

  cards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerHTML = `
      <div class="card-media">
        <img class="card-image" src="${card.image}" alt="${card.name}" />
      </div>
      <div class="card-label">${card.name}</div>
    `;
    cardEl.setAttribute("role", "button");
    cardEl.setAttribute("tabindex", "0");
    cardEl.setAttribute("aria-label", `Open ${card.name}`);
    const open = () => {
      setActiveCard(cardEl);
      showGallery(card.gallery, card.name, true);
    };
    cardEl.addEventListener("click", open);
    cardEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
    cardContainer.appendChild(cardEl);
  });

  // Default: show all jewelry
  showAllJewelry(false);
  
  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 500);
    }
  });

  