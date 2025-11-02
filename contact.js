document.addEventListener("DOMContentLoaded", () => {
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
    } catch (error) {
      console.error("Error submitting to Google Form:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
