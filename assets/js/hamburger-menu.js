let hamburgerIsOpen = false;
function openHamberger() {
  let hamburgerNav = document.getElementById("hamburger-nav");
  if (!hamburgerIsOpen) {
    hamburgerNav.style.display = "flex";
    hamburgerIsOpen = true;
  } else {
    hamburgerNav.style.display = "none";
    hamburgerIsOpen = false;
  }
}
