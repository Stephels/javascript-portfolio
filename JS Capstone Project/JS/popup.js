// Function to open the popup
function openPopup() {
  const popup = document.getElementById("custom-popup");
  popup.style.display = "flex"; // Show the popup overlay
  document.body.classList.add("popup-active"); // Prevent scrolling on the main page
}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById("custom-popup");
  popup.style.display = "none"; // Hide the popup overlay
  document.body.classList.remove("popup-active"); // Re-enable scrolling
}

// Function to proceed to the application
function proceedToApp() {
  window.location.href = "/HTML/app.html"; // Update the URL path to your actual app page
}
