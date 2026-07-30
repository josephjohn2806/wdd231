import { items } from '../data/items.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Footer Metadata Setup
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    // 2. Mobile Nav Drawer Handlers
    const menuToggle = document.getElementById("menuToggle");
    const closeDrawer = document.getElementById("closeDrawer");
    const navDrawer = document.getElementById("navDrawer");

    if (menuToggle && navDrawer) {
        menuToggle.addEventListener("click", () => navDrawer.classList.add("open"));
        closeDrawer.addEventListener("click", () => navDrawer.classList.remove("open"));
    }

    // 3. Requirement 11: LocalStorage Visit Tracker
    const visitText = document.getElementById("visitText");
    const lastVisit = localStorage.getItem("lastVisitTimestamp");
    const now = Date.now();

    if (!lastVisit) {
        visitText.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const daysDifference = Math.floor((now - parseInt(lastVisit, 10)) / msPerDay);

        if (daysDifference < 1) {
            visitText.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitText.textContent = "You last visited 1 day ago.";
        } else {
            visitText.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }
    localStorage.setItem("lastVisitTimestamp", now.toString());

    // 4. Requirement 9: Build 8 Cards dynamically
    const container = document.getElementById("cardsContainer");
    if (container) {
        items.forEach(item => {
            const card = document.createElement("article");
            card.className = "discover-card";

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure class="card-image-wrapper">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
                </figure>
                <figcaption>${item.address}</figcaption>
                <p>${item.description}</p>
                <button type="button" class="btn-learn">Learn More</button>
            `;
            container.appendChild(card);
        });
    }
});
