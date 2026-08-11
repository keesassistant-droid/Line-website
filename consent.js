(function () {
  "use strict";

  // Consent banner temporarily removed (Kees's call, 2026-08-11) — analytics load for
  // everyone now, no opt-out UI. This is a deliberate, known trade-off against Dutch
  // cookie-law/GDPR consent requirements, not an oversight. Revisit before this matters.
  var GA_MEASUREMENT_ID = "G-ZDT3T5T51M";
  var CLARITY_PROJECT_ID = "xy732gapbk";

  function loadAnalytics() {
    if (GA_MEASUREMENT_ID.indexOf("XXXX") === -1) {
      var gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
    }

    if (CLARITY_PROJECT_ID.indexOf("XXXX") === -1) {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
    }
  }

  function trackEvent(name, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    }
  }
  window.lineTrackEvent = trackEvent;

  document.addEventListener("DOMContentLoaded", loadAnalytics);
})();
