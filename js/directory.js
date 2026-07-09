document.addEventListener("DOMContentLoaded", () => {
    // Inject current files timestamp update values onto document view matching criteria
    const lastModifiedSpan = document.getElementById("last-modified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Capture specific interactive layout node components
    const gridBtn = document.getElementById("grid-view-btn");
    const listBtn = document.getElementById("list-view-btn");
    const displayContainer = document.getElementById("directory-container");

    if (gridBtn && listBtn && displayContainer) {
        // Enforce smooth grid modification structures
        gridBtn.addEventListener("click", () => {
            displayContainer.classList.add("grid-layout");
            displayContainer.classList.remove("list-layout");
            gridBtn.classList.add("active-view");
            listBtn.classList.remove("active-view");
        });

        // Enforce smooth flat row alignment modifications
        listBtn.addEventListener("click", () => {
            displayContainer.classList.add("list-layout");
            displayContainer.classList.remove("grid-layout");
            listBtn.classList.add("active-view");
            gridBtn.classList.remove("active-view");
        });
    }
});
