window.addEventListener('error', function (event) {
  if (event.message.includes('404') || event.message.toLowerCase().includes('error')) {
    displayErrorHeader();
  }
}, true);

function displayErrorHeader() {
  const alertMsg = document.getElementById("js-alert");
  alertMsg.textContent = "An error has occurred. Please try again later.";
  alertMsg.style.display = 'block';
}