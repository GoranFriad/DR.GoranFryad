(function () {
  var DATA_URL = "./data/site.json";

  function setText(selector, value, options) {
    if (!value && value !== 0) return;

    var settings = options || {};
    var nodes = settings.all
      ? document.querySelectorAll(selector)
      : [document.querySelector(selector)];

    nodes.forEach(function (node) {
      if (node) node.textContent = String(value);
    });
  }

  function applyContent(data) {
    setText(".hero-greeting", data.heroGreeting);
    setText(".hero-name", data.heroName);
    setText(".hero-suffix", data.heroSuffix);
    setText(".hero-subtitle", data.heroSubtitle);
    setText("#about .section-title", data.aboutTitle);
    setText("#blog h2", data.blogHeading);
    setText("#blog p", data.blogDescription);
    setText("#blog .btn span", data.blogButtonText);
    setText("#contact .contact-item:first-child p", data.contactPhone);
    setText(".logo-name", data.siteName, { all: true });
    setText(".footer-bottom p", data.footerCopyright, { all: true });

    if (data.heroName) {
      document.title = "Home - " + data.heroName + " MD";
    }
  }

  fetch(DATA_URL + "?v=" + Date.now(), { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load CMS data");
      }
      return response.json();
    })
    .then(applyContent)
    .catch(function (error) {
      console.warn("CMS loader warning:", error.message);
    });
})();
