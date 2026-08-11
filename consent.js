(function () {
  "use strict";

  // TODO: vul in zodra je de accounts hebt aangemaakt (zie analytics.google.com / clarity.microsoft.com)
  var GA_MEASUREMENT_ID = "G-ZDT3T5T51M";
  var CLARITY_PROJECT_ID = "xy732gapbk";

  var CONSENT_KEY = "line-cookie-consent"; // "accepted" | "declined"
  var LANG_KEY = "line-lang";

  var TEXT = {
    nl: {
      body: "We gebruiken alleen analytics-cookies om te zien hoe bezoekers de site gebruiken. Deze worden pas geplaatst als je akkoord gaat.",
      decline: "Weigeren",
      accept: "Accepteren",
      settings: "Cookie-instellingen"
    },
    en: {
      body: "We only use analytics cookies to see how visitors use the site. These are only placed once you agree.",
      decline: "Decline",
      accept: "Accept",
      settings: "Cookie settings"
    }
  };

  function lang() {
    var stored = localStorage.getItem(LANG_KEY);
    return stored === "en" ? "en" : "nl";
  }

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

  function buildBanner() {
    var t = TEXT[lang()];
    var banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", t.settings);
    banner.innerHTML =
      '<p class="cookie-banner-text"></p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="btn ghost small js-cookie-decline"></button>' +
      '<button type="button" class="btn small js-cookie-accept"></button>' +
      "</div>";
    banner.querySelector(".cookie-banner-text").textContent = t.body;
    banner.querySelector(".js-cookie-decline").textContent = t.decline;
    banner.querySelector(".js-cookie-accept").textContent = t.accept;
    document.body.appendChild(banner);

    banner.querySelector(".js-cookie-accept").addEventListener("click", function () {
      localStorage.setItem(CONSENT_KEY, "accepted");
      banner.remove();
      loadAnalytics();
    });
    banner.querySelector(".js-cookie-decline").addEventListener("click", function () {
      localStorage.setItem(CONSENT_KEY, "declined");
      banner.remove();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted") {
      loadAnalytics();
    } else if (consent !== "declined") {
      buildBanner();
    }
  });
})();
