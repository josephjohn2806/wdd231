// URLs and Selectors
const jsonURL = "data/members.json";
const container = document.querySelector("#directory-container");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

// 1. Fetch JSON Data
async function getMembers() {
    try {
        const response = await fetch(jsonURL);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("Could not fetch data");
        }
    } catch (error) {
        console.error("Error parsing data: ", error);
    }
}

// 2. Build Cards dynamically
function displayMembers(members) {
    container.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        let card = document.createElement("section");
        
        // Setup card structure with template literals
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <span class="membership-badge">Level: ${member.membershipLevel}</span>
        `;
        container.appendChild(card);
    });
}

// 3. View Selection Event Listeners
gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
});

// 4. Footer Date and Last Modified values
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Initialize
getMembers();
