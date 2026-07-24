// ===========================================================
// Join page behavior:
//   1. Stamp the hidden "timestamp" field with the current
//      date/time when the page loads.
//   2. Wire up the four membership modals (native <dialog>).
// Card entrance animation is handled entirely in CSS
// (see .tier-card / @keyframes card-rise in join.css) so it
// runs on page load rather than depending on JS.
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
  stampTimestamp();
  wireUpModals();
});

function stampTimestamp() {
  const timestampField = document.getElementById("timestamp");
  if (!timestampField) return;

  const now = new Date();
  // Human-readable value shown/passed along; adjust format as needed.
  timestampField.value = now.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function wireUpModals() {
  const openButtons = document.querySelectorAll("[data-modal]");

  openButtons.forEach((button) => {
    const dialogId = button.getAttribute("data-modal");
    const dialog = document.getElementById(dialogId);
    if (!dialog) return;

    button.addEventListener("click", () => {
      dialog.showModal();
    });

    dialog.querySelectorAll("[data-close]").forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => dialog.close());
    });

    // Close when clicking on the backdrop (outside modal-inner)
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });
}
