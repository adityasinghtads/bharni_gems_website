const cards = [
    {
      id: 1,
      name: "Necklace",
      avatar: "https://i.pravatar.cc/100?img=5",
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
      avatar: "https://i.pravatar.cc/100?img=8",
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
      name: "Bridal Set",
      avatar: "https://i.pravatar.cc/100?img=12",
      image: "https://picsum.photos/id/1113/400/250",
      gallery: [
        "https://picsum.photos/id/1123/500/500",
        "https://picsum.photos/id/1133/500/500",
        "https://picsum.photos/id/1143/500/500"
      ]
    },
    {
      id: 4,
      name: "Ring",
      avatar: "https://i.pravatar.cc/100?img=15",
      image: "https://picsum.photos/id/1153/400/250",
      gallery: [
        "https://picsum.photos/id/1163/500/500",
        "https://picsum.photos/id/1173/500/500",
        "https://picsum.photos/id/1183/500/500"
      ]
    },
    {
        id: 5,
        name: "Bracelet",
      avatar: "https://i.pravatar.cc/100?img=5",
      image: "https://picsum.photos/id/1011/400/250",
      gallery: [
        "https://picsum.photos/id/1023/500/500",
        "https://picsum.photos/id/1033/500/500",
        "https://picsum.photos/id/1043/500/500",
        "https://picsum.photos/id/1053/500/500",
      ]
      },
      {
        id: 6,
        name: "Bangles",
      avatar: "https://i.pravatar.cc/100?img=5",
      image: "https://picsum.photos/id/1011/400/250",
      gallery: [
        "https://picsum.photos/id/1023/500/500",
        "https://picsum.photos/id/1033/500/500",
        "https://picsum.photos/id/1043/500/500",
        "https://picsum.photos/id/1053/500/500"
      ]
      }
  ];
  
  const cardContainer = document.getElementById("cardContainer");
  const imageSection = document.getElementById("imageSection");
  const subTitle = document.getElementById("subTitle");
  
  cards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerHTML = `
      <img class="card-image" src="${card.image}" alt="${card.name}" />
      <div class="card-info">
        <div class="meta">
          <h4>${card.name}</h4>
        </div>
      </div>
    `;
    cardEl.addEventListener("click", () => showGallery(card.gallery, card.name));
    cardContainer.appendChild(cardEl);
   
  });
  
  function showGallery(images, name, shouldScroll = true) {
    imageSection.innerHTML = "";
    subTitle.innerHTML = `Gallery of ${name}`;
   
    images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      imageSection.appendChild(img);
    });
    imageSection.classList.add("show");
    if (shouldScroll) {
      imageSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Show gallery of first card by default
  if (cards.length > 0) {
    showGallery(cards[0].gallery, cards[0].name, false);
  }
  
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

  