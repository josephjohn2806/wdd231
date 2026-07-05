document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', () => {
        // Toggle open layouts for both the link block panel container and button state changes
        menuToggle.classList.toggle('open');
        mainNav.classList.toggle('open');
    });
});

