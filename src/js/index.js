document.querySelectorAll('.header__logo-img, .header__logo-link').forEach(function(element) {
    element.addEventListener('mouseover', function() {
        document.querySelector('.header__logo').src = "dist/img/header__logo-hover.svg";
        document.querySelector('.header__logo-link').style.color = "#8D81AC";
    });

    element.addEventListener('mouseout', function() {
        document.querySelector('.header__logo').src = "dist/img/header-logo.svg";
        document.querySelector('.header__logo-link').style.color = "#fff"; // Здесь указываете цвет ссылки по умолчанию
    });
});

const hamburger = document.querySelector(".hamburger");
const menuItems = document.querySelectorAll(".nav__links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menuItems.forEach((menu) => {
        menu.classList.toggle("active");
    });
});
