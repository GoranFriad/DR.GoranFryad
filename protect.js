/* Basic client-side deterrents: not a security boundary — only slows casual copying */
(function () {
  // prevent right-click
  document.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false,
  );

  // prevent common developer shortcuts
  document.addEventListener(
    "keydown",
    function (e) {
      // F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+Shift+C
      if (e.key === "F12") e.preventDefault();
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "i" || e.key === "C" || e.key === "c")
      )
        e.preventDefault();
      if (
        e.ctrlKey &&
        (e.key === "U" || e.key === "u" || e.key === "S" || e.key === "s")
      )
        e.preventDefault();
    },
    false,
  );

  // disable selection and copying
  try {
    document.documentElement.style.userSelect = "none";
    document.documentElement.style.webkitUserSelect = "none";
    document.documentElement.style.msUserSelect = "none";
    document.addEventListener("copy", function (e) {
      e.preventDefault();
    });
    document.addEventListener("cut", function (e) {
      e.preventDefault();
    });
  } catch (e) {
    /* ignore */
  }

  // add an invisible overlay to make 'view source' selection slightly harder
  var ov = document.createElement("div");
  ov.style.position = "fixed";
  ov.style.inset = "0";
  ov.style.zIndex = "2147483646";
  ov.style.pointerEvents = "none";
  ov.style.background = "transparent";
  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(ov);
  });
})();
