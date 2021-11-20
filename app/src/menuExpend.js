const navbarMenu1 = document.querySelector(".navbar__menu__1");
const navbarMenu2 = document.querySelector(".navbar__menu__2");
const navbarMenu3 = document.querySelector(".navbar__menu__3");
const navbarMenu4 = document.querySelector(".navbar__menu__4");
const navbarMenu5 = document.querySelector(".navbar__menu__5");
const lnb = document.querySelector(".lnb");
const lnbHide = document.querySelector(".lnb__hide");

navbarMenu1.addEventListener("mouseenter", () => {
  navbarMenu1.setAttribute("id", "navbar__menu__hover");
  lnb.classList.add("active");
});

navbarMenu2.addEventListener("mouseenter", () => {
  navbarMenu2.setAttribute("id", "navbar__menu__hover");
  lnb.classList.add("active");
});

navbarMenu1.addEventListener("mouseleave", () => {
  navbarMenu1.removeAttribute("id");
  lnb.classList.remove("active");
});

navbarMenu2.addEventListener("mouseleave", () => {
  navbarMenu2.removeAttribute("id");
  lnb.classList.remove("active");
});
