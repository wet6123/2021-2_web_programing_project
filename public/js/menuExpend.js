const navbarMenuSubs = document.querySelectorAll(".navbar__menu__sub");
const lnb = document.querySelector(".lnb");

for (const navbarMenuSub of navbarMenuSubs) {
  navbarMenuSub.addEventListener("mouseover", () => {
    navbarMenuSub.setAttribute("id", "navbar__menu__hover");
    lnb.classList.add("active");
  });

  navbarMenuSub.addEventListener("mouseleave", () => {
    navbarMenuSub.removeAttribute("id");
    lnb.classList.remove("active");
  });
}

lnb.addEventListener("mouseenter", () => {
  lnb.classList.add("active");
});

lnb.addEventListener("mouseleave", () => {
  lnb.classList.remove("active");
});
