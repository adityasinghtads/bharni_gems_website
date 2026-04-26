// Hide loader when page is fully loaded
window.addEventListener('load', () => {
  const video = document.getElementById('bg-video');
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

// document.addEventListener("scroll", (e) => {
//   console.log("WINDOW SCROLL:", window.scrollY);
// }, true);

// document.querySelectorAll("*").forEach(el => {
//   el.addEventListener("scroll", () => {
//     console.log("SCROLLING ELEMENT:", el.className,  el.tagName, el.scrollTop);
//   }, true);
// });


document.addEventListener("DOMContentLoaded", () => {
  // Hide/show vertical line based on scroll position
  const scrollHint = document.querySelector(".scroll-hint");
  
  if (scrollHint) {
    const handleScroll = () => {
      const scrollTop = 
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
      console.log(scrollTop)
      
      // Show line when at the top, hide when scrolled
      if (scrollTop <= 2) {
        scrollHint.style.opacity = "1";
        scrollHint.style.visibility = "visible";
        scrollHint.style.transition = "opacity 0.3s ease";
      } else {
        scrollHint.style.opacity = "0";
        scrollHint.style.visibility = "hidden";
        scrollHint.style.transition = "opacity 0.3s ease";
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Also handle wheel and touch events
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();
  }

  // Contact Sheet functionality
  const contactBtn = document.getElementById("contactUsBtn");
  const contactSheet = document.getElementById("contactSheet");
  const sheetClose = document.getElementById("sheetClose");
  const sheetOverlay = document.getElementById("sheetOverlay");

  // Open contact sheet
  if (contactBtn && contactSheet) {
    contactBtn.addEventListener("click", () => {
      contactSheet.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close contact sheet
  const closeSheet = () => {
    if (contactSheet) {
      contactSheet.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    }
  };

  if (sheetClose) {
    sheetClose.addEventListener("click", closeSheet);
  }

  if (sheetOverlay) {
    sheetOverlay.addEventListener("click", closeSheet);
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactSheet && contactSheet.classList.contains("active")) {
      closeSheet();
    }
  });

  // Form submission
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !mobile || !message) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    // ✅ Your Google Form POST URL (formResponse, not viewform)
    const googleFormURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSeqx_VOqDA24oINzWZTEQEEi17gZxcbjesYE0k2ZnVM4CI7mA/formResponse";

    // ✅ Map your website form fields to Google Form entry IDs
    const formData = new FormData();
    formData.append("entry.762877825", name);     // Full Name
    formData.append("entry.392424059", mobile);   // Mobile Number
    formData.append("entry.285850701", message);  // Message

    try {
      await fetch(googleFormURL, {
        method: "POST",
        mode: "no-cors", // Google Forms requires this
        body: formData,
      });

      alert(`Thank you ${name}! 💎 We'll get back to you shortly.`);
      form.reset();
      
      // Close the sheet after successful submission
      if (contactSheet) {
        setTimeout(() => {
          closeSheet();
        }, 500);
      }
    } catch (error) {
      console.error("Error submitting to Google Form:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
