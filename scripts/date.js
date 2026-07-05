document.addEventListener('DOMContentLoaded', () => {
    // Inject the current year dynamically into your footer copyright block
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Capture and display the document's last modified timestamp
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
});
