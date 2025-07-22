<script>
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const response = document.getElementById("response");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: form.elements["name"].value,
      email: form.elements["email"].value,
      message: form.elements["message"].value
    };

    fetch("https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycby1kILasUXJHwRZAHOT5BJ09k6dPBEEc98PDW8nrcDbVg6FfKy27wmoD7Pu_BG1-01B/exec", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.result === "success") {
        response.style.color = "lightgreen";
        response.textContent = "Form submitted successfully!";
        form.reset();

        setTimeout(() => {
          const popup = document.createElement("div");
          popup.className = "confirmation-popup";

          const msg = document.createElement("p");
          msg.textContent = "Would you like to submit another response?";
          popup.appendChild(msg);

          const btnYes = document.createElement("button");
          const btnHome = document.createElement("button");

          btnYes.textContent = "Yes";
          btnYes.className = "popup-btn popup-btn-yes";
          popup.appendChild(btnYes);

          btnHome.textContent = "Go home";
          btnHome.className = "popup-btn popup-btn-home";
          popup.appendChild(btnHome);

          document.body.appendChild(popup);

          btnYes.addEventListener("click", () => {
            popup.remove();
            response.textContent = "";
          });

          btnHome.addEventListener("click", () => {
            window.location.href = "/index.html";
          });
        }, 500);
      } else {
        response.style.color = "red";
        response.textContent = "Submission failed: " + data.message;
      }
    })
    .catch(error => {
      response.style.color = "red";
      response.textContent = "Error submitting form.";
      console.error("Error:", error);
    });
  });
});
</script>


