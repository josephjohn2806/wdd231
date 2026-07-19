document.addEventListener("DOMContentLoaded", () => {
    // 1. Core Framework Metrics Tracking
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;

    // 2. Responsive Mobile Drawer Interaction Toggle
    const menuToggle = document.getElementById("menuToggle");
    const closeDrawer = document.getElementById("closeDrawer");
    const navDrawer = document.getElementById("navDrawer");

    if (menuToggle && navDrawer) {
        menuToggle.addEventListener("click", () => navDrawer.classList.add("open"));
    }
    if (closeDrawer && navDrawer) {
        closeDrawer.addEventListener("click", () => navDrawer.classList.remove("open"));
    }

    // 3. OpenWeatherMap API Integration Rules Configuration
    // Target Coordinates: Nairobi, Kenya (Lat: -1.2921, Lon: 36.8219)
    const apiKey = "YOUR_API_KEY_HERE"; // Substitute with actual functional OpenWeatherMap API validation string
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-1.2921&lon=36.8219&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=-1.2921&lon=36.8219&units=metric&appid=${apiKey}`;

    async function fetchWeatherMetrics() {
        try {
            // Fetch Current Weather Dataset
            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) throw new Error("Weather platform service network fault");
            const weatherData = await weatherResponse.json();
            displayCurrentWeather(weatherData);

            // Fetch Extended Forecast Dataset
            const forecastResponse = await fetch(forecastUrl);
            if (!forecastResponse.ok) throw new Error("Forecast platform service network fault");
            const forecastData = await forecastResponse.json();
            displayForecastMetrics(forecastData);
        } catch (error) {
            console.error("Weather Engine Error:", error);
            const fallbackContainers = ["current-weather", "weather-forecast"];
            fallbackContainers.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.innerHTML = `<p class="error-msg">Weather feeds temporarily offline</p>`;
            });
        }
    }

    function displayCurrentWeather(data) {
        const container = document.getElementById("current-weather");
        if (!container) return;

        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase());
        const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        container.innerHTML = `
            <div class="current-weather-display">
                <img src="${iconSrc}" alt="${desc}" class="weather-icon">
                <div class="weather-info">
                    <span class="weather-temp">${temp}°C</span>
                    <span class="weather-desc">${desc}</span>
                </div>
            </div>
        `;
    }

    function displayForecastMetrics(data) {
        const container = document.getElementById("weather-forecast");
        if (!container) return;

        // Filter out a distinct sample item for each subsequent 24-hour block interval timestamp
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
        
        let forecastHTML = `<div class="forecast-grid">`;
        dailyData.forEach(day => {
            const dateObj = new Date(day.dt * 1000);
            const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
            const temp = Math.round(day.main.temp);
            const iconSrc = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

            forecastHTML += `
                <div class="forecast-day-card">
                    <span class="day-title">${dayName}</span>
                    <img src="${iconSrc}" alt="Forecast status icon">
                    <span class="day-temp">${temp}°C</span>
                </div>
            `;
        });
        forecastHTML += `</div>`;
        container.innerHTML = forecastHTML;
    }

    // 4. Asynchronous Filtered Member Spotlight Randomizer
    const membersDataUrl = "data/members.json";

    async function fetchSpotlightMembers() {
        const container = document.getElementById("spotlights-container");
        if (!container) return;

        try {
            const response = await fetch(membersDataUrl);
            if (!response.ok) throw new Error("Database validation mapping error");
            const membersList = await response.json();

            // Rule Filter: Select only 'Gold' or 'Silver' status tiers
            const qualifiedMembers = membersList.filter(member => 
                member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
            );

            // Scramble algorithm pattern array allocation layout
            const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
            // Rule Constraints: Extract exactly 2 or 3 random card representations
            const selectedSpotlights = shuffled.slice(0, 3);

            let spotlightsHTML = "";
            selectedSpotlights.forEach(member => {
                spotlightsHTML += `
                    <div class="spotlight-card border-accent-${member.membershipLevel.toLowerCase()}">
                        <div class="spotlight-badge ${member.membershipLevel.toLowerCase()}">${member.membershipLevel} Member</div>
                        <h3>${member.name}</h3>
                        <p class="spotlight-desc"><em>${member.description || ""}</em></p>
                        <hr class="card-divider">
                        <p><i class="fa-solid fa-location-dot"></i> ${member.address}</p>
                        <p><i class="fa-solid fa-phone"></i> ${member.phone}</p>
                        <a href="${member.website}" target="_blank" rel="noopener"><i class="fa-solid fa-globe"></i> Visit Platform</a>
                    </div>
                `;
            });

            container.innerHTML = spotlightsHTML;
        } catch (error) {
            console.error("Spotlight Processing Error:", error);
            container.innerHTML = `<p class="error-msg">Spotlight listings unavailable at this time.</p>`;
        }
    }

    // Initialize core processes
    fetchWeatherMetrics();
    fetchSpotlightMembers();
});

