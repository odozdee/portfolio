const stickyNav = document.querySelector(".navcontainer");
const sectionLinks = [...stickyNav.querySelectorAll('#navbar a[href^="#"]')].map(link => ({
    link,
    section: document.getElementById(link.hash.slice(1))
}));
let activeLink = null;

function updateActiveLink() {
    const navBottom = stickyNav.getBoundingClientRect().bottom + 1;
    const page = document.scrollingElement;
    const maxScroll = page.scrollHeight - page.clientHeight;
    let nextLink = sectionLinks[0].link;

    for (const { link, section } of sectionLinks) {
        if (section.getBoundingClientRect().top <= navBottom) {
            nextLink = link;
        }
    }

    if (maxScroll > 0 && page.scrollTop >= maxScroll - 1) {
        nextLink = sectionLinks.at(-1).link;
    }

    if (nextLink !== activeLink) {
        activeLink?.removeAttribute("aria-current");
        nextLink.setAttribute("aria-current", "location");
        activeLink = nextLink;
    }
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
window.addEventListener("load", updateActiveLink);
document.addEventListener("toggle", updateActiveLink, true);
updateActiveLink();
