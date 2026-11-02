/* Quiet scroll-reveal. Elements are only hidden after this script tags
   them with .sn-reveal, so content stays visible if JS never runs. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  var targets = document.querySelectorAll(
    [
      ".md-content .grid.cards",
      ".md-content h2",
      ".md-content .md-post--excerpt",
      ".md-content table:not([class])",
      ".md-content .admonition",
    ].join(", ")
  );

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("sn-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );

  targets.forEach(function (el) {
    // Skip anything already in the viewport on load so the page
    // doesn't flicker; only below-the-fold content animates in.
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    el.classList.add("sn-reveal");

    // Stagger card children via a CSS variable index
    if (el.classList.contains("grid")) {
      var items = el.querySelectorAll(":scope > ul > li");
      items.forEach(function (li, i) {
        li.style.setProperty("--sn-i", i);
      });
    }

    observer.observe(el);
  });
})();
