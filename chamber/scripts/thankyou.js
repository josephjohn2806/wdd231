// ===========================================================
// Thank-you page: reads the values submitted from join.html
// (form uses method="get", so they arrive as a query string)
// and displays the required fields back to the applicant.
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const firstName = params.get("firstName") || "";
  const lastName = params.get("lastName") || "";
  const email = params.get("email") || "—";
  const mobile = params.get("mobile") || "—";
  const businessName = params.get("businessName") || "—";
  const timestamp = params.get("timestamp") || "—";

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";

  setText("ty-firstName", firstName || "there");
  setText("ty-fullName", fullName);
  setText("ty-email", email);
  setText("ty-mobile", mobile);
  setText("ty-businessName", businessName);
  setText("ty-timestamp", timestamp);
});

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
