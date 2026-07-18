// ==========================
// JJ COMPANY Home Page
// index.js
// ==========================

// Current Year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Last Modified
document.getElementById("lastModified").textContent = document.lastModified;

// ==========================
// Mobile Navigation
// ==========================

const menuButton = document.getElementById("menuToggle");
const navDrawer = document.getElementById("navDrawer");
const closeButton = document.getElementById("closeDrawer");

if (menuButton && navDrawer) {
    menuButton.addEventListener("click", () => {
        navDrawer.classList.toggle("show");
    });
}

if (closeButton) {
    closeButton.addEventListener("click", () => {
        navDrawer.classList.remove("show");
    });
}

// ==========================
// Weather
// Replace YOUR_API_KEY with your OpenWeather API key
// ==========================

const apiKey = "YOUR_API_KEY";
const city = "Nairobi";
const units = "metric";

const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

async function getWeather() {

    try {

        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Weather data unavailable");
        }

        const data = await response.json();

        document.getElementById("weather-temp").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("weather-desc").textContent =
            data.weather[0].description;

    } catch (error) {

        document.getElementById("weather-temp").textContent =
            "Weather unavailable";

        console.error(error);

    }

}

getWeather();

// ==========================
// Member Spotlights
// ==========================

async function loadSpotlights() {

    try {

        const response = await fetch("data/members.json");

        const members = await response.json();

        const premiumMembers =
            members.filter(member => member.membership >= 2);

        premiumMembers.sort(() => 0.5 - Math.random());

        const selected = premiumMembers.slice(0, 3);

        const container = document.getElementById("spotlights");

        container.innerHTML = "";

        selected.forEach(member => {

            container.innerHTML += `
                <div class="spotlight">
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p>${member.website}</p>
                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

loadSpotlights();
