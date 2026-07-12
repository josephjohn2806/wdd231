const jsonURL = "data/members.json";
const container = document.querySelector("#directory-container");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

const menuToggle = document.querySelector("#menuToggle");
const closeDrawer = document.querySelector("#closeDrawer");
const navDrawer = document.querySelector("#navDrawer");

menuToggle.addEventListener("click", () => navDrawer.classList.add("open"));
closeDrawer.addEventListener("click", () => navDrawer.classList.remove("open"));

async function fetchDirectoryData() {
    try {
        const response = await fetch(jsonURL);
        if (response.ok) {
            const data = await response.json();
            renderDirectory(data);
        }
    } catch (error) {
        console.error("Error mapping business profiles: ", error);
    }
}

function renderDirectory(businesses) {
    container.innerHTML = ""; 
    businesses.forEach((business) => {
        const card = document.createElement("section");
        
        // Define human-readable labels for the tier level integers
        let tierLabel = "General Member";
        if (business.membership === 2) tierLabel = "Silver Partner";
        if (business.membership === 3) tierLabel = "Gold Partner";

        card.innerHTML = `
            <div class="card-branding">
                <h3>${business.name}</h3>
                <p class="tagline"><em>${business.tagline}</em></p>
            </div>
            <img src="images/${business.image}" alt="${business.name} branding visual" loading="lazy">
            <div class="card-meta">
                <p><strong>EMAIL:</strong> info@jjcompany.org</p>
                <p><strong>PHONE:</strong> ${business.phone}</p>
                <p><strong>TIER:</strong> ${tierLabel}</p>
                <p><strong>URL:</strong> <a href="${business.website}" target="_blank">visit portal</a></p>
            </div>
        `;
        container.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => {
    container.className = "grid-view";
});

listBtn.addEventListener("click", () => {
    container.className = "list-view";
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

fetchDirectoryData();
