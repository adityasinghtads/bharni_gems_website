document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (!name || !mobile || !message) {
        alert("Please fill out all fields before submitting.");
        return;
      }
  
      alert(`Thank you ${name}! 💎 We'll get back to you shortly.`);
      form.reset();
    });
  });
  