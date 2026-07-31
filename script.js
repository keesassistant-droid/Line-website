(function () {
  "use strict";

  var STORAGE_KEY = "line-order-draft";
  var LANG_KEY = "line-lang";
  var MIN_PLACES = 6;
  var MAX_PLACES = 10;
  var PRICE = 299;
  var SHIPPING_COST = 7.95;
  var SHIPPING_CARRIER = "PostNL";
  var WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxDMQ3Wachosogg1YbnwtQm663nN-qsmiC_QYolDcv_z5HoMRsJsC3RtBXdxcH6TLaV/exec";

  /* ---------- i18n ---------- */
  var I18N = {
    nl: {
      title: "Line — het cadeau voor een groot moment",
      nav: { examples: "Voorbeelden", how: "Hoe het werkt", about: "Over" },
      cta: { start: "Geef een Line" },
      hero: {
        eyebrow: "Persoonlijke lijntekening, met de hand getekend",
        headlinePre: "Het cadeau voor een ",
        headlineEm: "groot moment",
        headlinePost: "",
        lede: "Line is het cadeau voor iemands grote moment — een verhuizing, een afstuderen, een nieuwe baan, een kindje. Hun reis wordt één met de hand getekende tekening, klaar om te geven.",
        seeExamples: "Bekijk voorbeelden"
      },
      examples: {
        eyebrow: "Cadeaus die al gegeven zijn",
        heading: "Elke Line vertelt een verhaal",
        lede: "Een kleine selectie van Lines die eerder gegeven zijn — elk gemaakt voor iemands grote moment.",
        captions: [],
        open: "Vergroot deze foto"
      },
      lightbox: { close: "Sluiten", prev: "Vorige foto", next: "Volgende foto" },
      how: {
        eyebrow: "Hoe het werkt",
        heading: "Van hun verhaal naar jouw cadeau",
        lede: "Geen live preview, geen algoritme — elke Line wordt van begin tot eind met de hand getekend.",
        steps: [
          { title: "Bouw de Line", body: "Voeg de plekken en persoonlijke details toe die hun verhaal vertellen." },
          { title: "Wij tekenen 'm", body: "De tekenaar gaat aan de slag — je krijgt één reviewmoment om de schets te bekijken voordat we doorgaan naar de afwerking." },
          { title: "Hij landt in je mailbox", body: "Binnen 3 werkdagen ontvang je de afgeronde Line per e-mail, klaar om te geven." }
        ]
      },
      dims: {
        eyebrow: "Afmetingen",
        heading: "Standaard 20 × 60 cm",
        body: "Elke Line wordt standaard getekend op 20 bij 60 centimeter — ongeveer zo breed als een A4'tje, en twee keer zo lang."
      },
      pricing: {
        eyebrow: "Prijs",
        heading: "€299 all-in",
        lede: "Één vaste prijs voor een ingelijste Line van 20 × 60 cm — inclusief lijst, verpakking en verzending. Geen verrassingen bij het afrekenen.",
        legend: {
          vat: "BTW (21%) — €51,89",
          costs: "Lijst, verpakking & verzending — €42 (lijst €30 · verzending €8 · doos €3 · bubbeltjesplastic €1)",
          margin: "Ontwerp, printen & marge — €205,11 (nog niet losgesplitst per onderdeel)"
        },
        caption: "Printkosten en het uurtarief voor het tekenwerk zijn nog niet apart uitgesplitst — dat volgt zodra dat bekend is."
      },
      about: {
        eyebrow: "Over",
        heading: "Met de hand getekend, door één persoon",
        body: "Line is een eenmansstudio. Elk werk begint als een opdracht van jou — vaak voor iemand anders — en eindigt als een originele lijntekening, op dezelfde manier gemaakt als de allereerste voorbeelden: met de hand, met een pen. Geen twee Lines zijn ooit helemaal hetzelfde."
      },
      testimonials: {
        eyebrow: "In hun eigen woorden",
        heading: "Reacties na het uitpakken",
        lede: "Een paar berichten van mensen die een Line cadeau kregen.",
        items: [
          { quote: "Ik dacht dat het een grap was — tot ik ons oude studentenhuis zag staan, gat in de muur incluis." },
          { quote: "Ik moest huilen toen ik het huis van mijn oma zag. Precies zoals ik het me herinner." },
          { quote: "Ze hebben zelfs onze hond erin verwerkt — inclusief zijn eeuwige ruzie met de postbode." },
          { quote: "Drie huizen, twee landen, één leven. Hing binnen tien minuten aan de muur." },
          { quote: "Mijn man snapte niet waarom ik moest lachen — tot hij het bordje \"geen idee waar we heen gaan\" bij ons eerste huis zag." },
          { quote: "Het mooiste cadeau dat we ooit hebben gekregen bij de geboorte van onze zoon." }
        ]
      },
      faq: {
        eyebrow: "Vragen",
        heading: "Veelgestelde vragen",
        items: [
          { q: "Hoe lang duurt het voordat ik mijn Line ontvang?", a: "Binnen 3 werkdagen na je bestelling ontvang je de tekening per e-mail." },
          { q: "Kan ik een Line voor iemand anders bestellen?", a: "Zeker — de meeste Lines worden besteld als cadeau. Jij bouwt de tijdlijn, wij tekenen 'm, en jij geeft 'm door." },
          { q: "Moet ik referentiefoto's toevoegen?", a: "Per plek vragen we een Google Maps-link of een foto van het gebouw — zo weten we zeker dat we het juiste pand tekenen." },
          { q: "Kan ik later nog iets wijzigen aan mijn bestelling?", a: "Neem contact op via e-mail zodra je je bestelling hebt verstuurd — we passen het waar mogelijk nog aan." },
          { q: "Welke formaten zijn er?", a: "Op dit moment alleen een ingelijste print van 20 × 60 cm, thuisbezorgd. €299, alles inbegrepen (incl. BTW en verzending via PostNL)." },
          { q: "Wat kost een Line?", a: "Prijzen volgen binnenkort. Neem voor nu even contact op voor de actuele tarieven." }
        ]
      },
      footer: {
        copyright: "© 2026 Line. Alle werken op maat met de hand getekend.",
        terms: "Algemene voorwaarden",
        privacy: "Privacybeleid",
        odr: "Geschillencommissie (ODR)",
        cookieSettings: "Cookie-instellingen"
      },
      cookies: {
        body: "We gebruiken alleen analytics-cookies om te zien hoe bezoekers de site gebruiken. Deze worden pas geplaatst als je akkoord gaat.",
        decline: "Weigeren",
        accept: "Accepteren"
      },
      config: {
        closeAria: "Configurator sluiten",
        steps: ["Tijdlijn", "Formaat", "Jouw gegevens", "Overzicht", "Bevestiging"],
        step0: {
          h2: "Bouw je Line",
          hint: "Voeg tussen de 6 en 10 plekken toe die hun reis markeren, in de volgorde waarin het gebeurde. Sleep een tegel aan de handgreep om de volgorde aan te passen.",
          addBtn: "+ Plek toevoegen",
          needMoreOne: "Nog 1 plek nodig om verder te gaan (minimaal 6).",
          needMoreMany: "Nog {n} plekken nodig om verder te gaan (minimaal 6).",
          maxReached: "Maximum van 10 plekken bereikt.",
          placePh: "Plek of gebouw, bijv. Amsterdam",
          placeAria: "Plek of gebouw",
          mapsLinkPh: "Google Maps-link",
          mapsLinkAria: "Google Maps-link naar het gebouw",
          notePh: "Notitie of grapje voor deze plek (optioneel)",
          noteAria: "Notitie voor deze plek",
          photoAdd: "Foto toevoegen",
          photoChange: "Foto wijzigen",
          needMapsOrPhoto: "Voeg een Google Maps-link of een foto toe, zodat we het juiste gebouw tekenen.",
          dragHandleAria: "Sleep om te herordenen",
          removePlace: "Deze plek verwijderen"
        },
        step1: {
          h2: "Jouw formaat",
          hint: "Elke Line wordt op dit moment op één manier geleverd.",
          shippedTitle: "Ingelijste print",
          shippedDesc: "20 × 60 cm, met de hand getekend en thuisbezorgd. €299, alles inbegrepen."
        },
        step2: {
          h2: "Jouw gegevens",
          hint: "Waar mogen we je Line naartoe sturen?",
          nameLabel: "Naam",
          namePh: "Je volledige naam",
          emailLabel: "E-mail",
          emailPh: "jij@voorbeeld.nl",
          phoneLabel: "Telefoonnummer",
          phonePh: "06 12345678",
          addressLabel: "Bezorgadres",
          addressPh: "Straat, stad, postcode, land",
          notesLabel: "Nog iets? (optioneel)",
          notesPh: "Extra context die helpt bij het tekenen van je Line",
          detailsHint: "Vul je naam, telefoonnummer, een geldig e-mailadres en je bezorgadres in om verder te gaan."
        },
        step3: {
          h2: "Bekijk je bestelling",
          hint: "Nog even checken — je kunt terug naar elke stap om iets aan te passen.",
          labels: { timeline: "Jouw tijdlijn", format: "Formaat", contact: "Contact", address: "Bezorgadres", notes: "Notities", shipping: "Verzending", payment: "Betaalwijze" },
          noPlaces: "Nog geen plekken toegevoegd",
          shippedPrint: "Ingelijste print, 20 × 60 cm",
          shippingIncluded: "inbegrepen in de prijs"
        },
        step4: {
          h2: "Je Line is onderweg",
          body: "Bedankt — je bestelling is ontvangen. Je met de hand getekende Line landt binnen 3 werkdagen in je inbox, klaar om te geven."
        },
        footer: {
          confirm: "Bestel nu",
          restart: "Nieuwe Line starten",
          priceLabel: "incl. BTW",
          agreeTermsPre: "Ik ga akkoord met de",
          agreeTermsLink: "algemene voorwaarden",
          termsRequired: "Vink de algemene voorwaarden aan om te bestellen."
        }
      }
    },
    en: {
      title: "Line — the gift for a big moment",
      nav: { examples: "Examples", how: "How it works", about: "About" },
      cta: { start: "Give a Line" },
      hero: {
        eyebrow: "Personalized line-art, hand-drawn",
        headlinePre: "The gift for a ",
        headlineEm: "big moment",
        headlinePost: "",
        lede: "Line is the gift for someone's big moment — a move, a graduation, a new job, a new baby. Their journey becomes one hand-drawn piece, ready to give.",
        seeExamples: "See examples"
      },
      examples: {
        eyebrow: "Gifts already given",
        heading: "Every Line tells a story",
        lede: "A small selection of Lines given so far — each one made for someone's big moment.",
        captions: [],
        open: "Enlarge this photo"
      },
      lightbox: { close: "Close", prev: "Previous photo", next: "Next photo" },
      how: {
        eyebrow: "How it works",
        heading: "From their story to your gift",
        lede: "No live preview, no algorithm — every Line is drawn by hand, start to finish.",
        steps: [
          { title: "Build the Line", body: "Add the places and personal touches that tell their story." },
          { title: "We draw it", body: "The artist gets to work — you'll get one review moment to check the sketch before we move on to finishing it." },
          { title: "It lands in your inbox", body: "Within 3 working days you'll receive the finished Line by email, ready to give." }
        ]
      },
      dims: {
        eyebrow: "Dimensions",
        heading: "20 × 60 cm as standard",
        body: "Every Line is drawn at 20 by 60 centimeters by default — about as wide as a sheet of A4 paper, and twice as long."
      },
      pricing: {
        eyebrow: "Pricing",
        heading: "€299 all-in",
        lede: "One flat price for a framed 20 × 60 cm Line — including the frame, packaging, and shipping. No surprises at checkout.",
        legend: {
          vat: "VAT (21%) — €51.89",
          costs: "Frame, packaging & shipping — €42 (frame €30 · shipping €8 · box €3 · bubble wrap €1)",
          margin: "Design, printing & margin — €205.11 (not yet split out further)"
        },
        caption: "Printing cost and the hourly design rate aren't broken out separately yet — that'll follow once they're known."
      },
      about: {
        eyebrow: "About",
        heading: "Drawn by hand, by one person",
        body: "Line is a one-person studio. Every piece starts as a brief from you — often for someone else — and ends as an original line drawing, made the same way the very first examples were: by hand, with a pen. No two Lines are ever quite the same."
      },
      testimonials: {
        eyebrow: "In their own words",
        heading: "Reactions after unwrapping",
        lede: "A few messages from people who received a Line as a gift.",
        items: [
          { quote: "I thought it was a joke — until I saw our old student house, hole in the wall included." },
          { quote: "I cried when I saw my grandma's house. Exactly how I remember it." },
          { quote: "They even worked our dog into it — eternal feud with the mailman included." },
          { quote: "Three houses, two countries, one life. Was on the wall within ten minutes." },
          { quote: "My husband didn't get why I was laughing — until he saw the sign that says \"no idea where we're headed\" by our first house." },
          { quote: "The most beautiful gift we've ever received for our son's birth." }
        ]
      },
      faq: {
        eyebrow: "Questions",
        heading: "Frequently asked questions",
        items: [
          { q: "How long until I receive my Line?", a: "You'll receive the drawing by email within 3 working days of ordering." },
          { q: "Can I order a Line for someone else?", a: "Absolutely — most Lines are ordered as a gift. You build the timeline, we draw it, you give it." },
          { q: "Do I need to add reference photos?", a: "For each place we ask for a Google Maps link or a photo of the building — that way we're sure we draw the right one." },
          { q: "Can I still change something after ordering?", a: "Get in touch by email as soon as you've submitted your order — we'll adjust where we still can." },
          { q: "What formats are available?", a: "Currently just a framed 20 × 60 cm print, shipped to your door. €299, all-in (incl. VAT and shipping via PostNL)." },
          { q: "What does a Line cost?", a: "Pricing is coming soon. Get in touch for current rates in the meantime." }
        ]
      },
      footer: {
        copyright: "© 2026 Line. All pieces hand-drawn to order.",
        terms: "Terms & conditions",
        privacy: "Privacy policy",
        odr: "Dispute resolution (ODR)",
        cookieSettings: "Cookie settings"
      },
      cookies: {
        body: "We only use analytics cookies to see how visitors use the site. These are only set once you agree.",
        decline: "Decline",
        accept: "Accept"
      },
      config: {
        closeAria: "Close configurator",
        steps: ["Timeline", "Format", "Your details", "Review", "Confirmation"],
        step0: {
          h2: "Build your Line",
          hint: "Add between 6 and 10 places that mark their journey, in the order it happened. Drag a tile by its handle to reorder.",
          addBtn: "+ Add a place",
          needMoreOne: "1 more place needed to continue (minimum 6).",
          needMoreMany: "{n} more places needed to continue (minimum 6).",
          maxReached: "Maximum of 10 places reached.",
          placePh: "Place or building, e.g. Amsterdam",
          placeAria: "Place or building",
          mapsLinkPh: "Google Maps link",
          mapsLinkAria: "Google Maps link to the building",
          notePh: "Note or inside joke for this place (optional)",
          noteAria: "Note for this place",
          photoAdd: "Add photo",
          photoChange: "Change photo",
          needMapsOrPhoto: "Add a Google Maps link or a photo so we draw the right building.",
          dragHandleAria: "Drag to reorder",
          removePlace: "Remove this place"
        },
        step1: {
          h2: "Your format",
          hint: "Every Line currently ships one way.",
          shippedTitle: "Framed print",
          shippedDesc: "20 × 60 cm, hand-drawn and shipped to your door. €299, all-in."
        },
        step2: {
          h2: "Your details",
          hint: "Where should we send your Line?",
          nameLabel: "Name",
          namePh: "Your full name",
          emailLabel: "Email",
          emailPh: "you@example.com",
          phoneLabel: "Phone number",
          phonePh: "+1 555 0123",
          addressLabel: "Delivery address",
          addressPh: "Street, city, postcode, country",
          notesLabel: "Anything else? (optional)",
          notesPh: "Any extra context that helps us draw your Line",
          detailsHint: "Add your name, phone number, a valid email, and your delivery address to continue."
        },
        step3: {
          h2: "Review your order",
          hint: "Take a last look — you can jump back to any step to make changes.",
          labels: { timeline: "Your timeline", format: "Format", contact: "Contact", address: "Delivery address", notes: "Notes", shipping: "Shipping", payment: "Payment method" },
          noPlaces: "No places added yet",
          shippedPrint: "Framed print, 20 × 60 cm",
          shippingIncluded: "included in the price"
        },
        step4: {
          h2: "Your Line is on its way",
          body: "Thank you — your order has been received. Your hand-drawn Line will arrive in your inbox within 3 working days, ready to give."
        },
        footer: {
          confirm: "Order now",
          restart: "Start a new Line",
          priceLabel: "incl. VAT",
          agreeTermsPre: "I agree to the",
          agreeTermsLink: "terms & conditions",
          termsRequired: "Check the terms & conditions to place your order."
        }
      }
    }
  };

  var lang = localStorage.getItem(LANG_KEY) || "nl";
  function t() {
    return I18N[lang];
  }

  var uidCounter = 1;
  function uid() {
    return "id" + uidCounter++;
  }

  function defaultState() {
    var timeline = [];
    for (var i = 0; i < MIN_PLACES; i++) {
      timeline.push({ id: uid(), place: "", mapsLink: "", note: "", photo: null });
    }
    return {
      submitted: false,
      timeline: timeline,
      format: "shipped",
      agreeTerms: false,
      contact: { name: "", email: "", phone: "", address: "", notes: "" }
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.timeline)) return defaultState();
      var maxId = 0;
      parsed.timeline.forEach(function (item) {
        var n = parseInt(String(item.id).replace("id", ""), 10);
        if (!isNaN(n) && n > maxId) maxId = n;
        item.place = item.place || "";
        item.mapsLink = item.mapsLink || "";
        item.note = item.note || "";
      });
      uidCounter = maxId + 1;
      if (!parsed.contact) parsed.contact = {};
      parsed.contact.name = parsed.contact.name || "";
      parsed.contact.email = parsed.contact.email || "";
      parsed.contact.phone = parsed.contact.phone || "";
      parsed.contact.address = parsed.contact.address || "";
      parsed.contact.notes = parsed.contact.notes || "";
      parsed.format = "shipped"; // only format currently offered — collapses any old draft (digital/framed/pickup)
      parsed.agreeTerms = !!parsed.agreeTerms;
      delete parsed.touches;
      delete parsed.size;
      return parsed;
    } catch (e) {
      return defaultState();
    }
  }

  var state = loadState();

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage unavailable — degrade silently, still works within the session */
    }
    renderReview();
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------- element refs ---------- */
  var htmlEl = document.documentElement;
  var configurator = document.getElementById("configurator");
  var configClose = document.getElementById("configClose");
  var configForm = document.getElementById("configForm");
  var configSuccess = document.getElementById("configSuccess");
  var configSubmitBar = document.getElementById("configSubmitBar");
  var submitBtn = document.getElementById("submitBtn");
  var restartBtn = document.getElementById("restartBtn");
  var agreeTermsBox = document.getElementById("agreeTerms");
  var submitPriceAmount = document.getElementById("submitPriceAmount");

  var tlList = document.getElementById("tlList");
  var addTlBtn = document.getElementById("addTlBtn");
  var tlNextHint = document.getElementById("tlNextHint");

  var formatGrid = document.getElementById("formatGrid");

  var contactName = document.getElementById("contactName");
  var contactEmail = document.getElementById("contactEmail");
  var contactPhone = document.getElementById("contactPhone");
  var contactAddress = document.getElementById("contactAddress");
  var contactNotes = document.getElementById("contactNotes");

  var summaryList = document.getElementById("summaryList");
  var langButtons = document.querySelectorAll(".lang-btn");

  var cookieBanner = document.getElementById("cookieBanner");
  var cookieAccept = document.getElementById("cookieAccept");
  var cookieDecline = document.getElementById("cookieDecline");
  var cookieSettingsBtn = document.getElementById("cookieSettingsBtn");

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");
  var lightboxCount = document.getElementById("lightboxCount");
  var galleryThumbs = Array.prototype.slice.call(document.querySelectorAll(".example-thumb"));
  var lightboxIndex = 0;

  function openLightbox(i) {
    if (!galleryThumbs.length) return;
    lightboxIndex = (i + galleryThumbs.length) % galleryThumbs.length;
    var img = galleryThumbs[lightboxIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCount.textContent = (lightboxIndex + 1) + " / " + galleryThumbs.length;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      lightbox.classList.add("open");
    });
    lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(function () {
      lightbox.hidden = true;
    }, 250);
  }
  function showLightbox(delta) {
    openLightbox(lightboxIndex + delta);
  }

  galleryThumbs.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      openLightbox(i);
    });
  });
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", function () {
    showLightbox(-1);
  });
  lightboxNext.addEventListener("click", function () {
    showLightbox(1);
  });
  lightboxImg.addEventListener("click", function () {
    showLightbox(1);
  });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target === lightboxImg.parentElement) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showLightbox(-1);
    if (e.key === "ArrowRight") showLightbox(1);
  });

  /* ---------- language ---------- */
  function setLang(next) {
    lang = next;
    localStorage.setItem(LANG_KEY, lang);
    applyLang();
  }
  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.dataset.lang);
    });
  });

  function applyLang() {
    var d = t();
    htmlEl.lang = lang;
    document.title = d.title;
    langButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var path = el.getAttribute("data-i18n").split(".");
      var val = d;
      for (var i = 0; i < path.length; i++) val = val && val[path[i]];
      if (typeof val === "string") el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var path = el.getAttribute("data-i18n-ph").split(".");
      var val = d;
      for (var i = 0; i < path.length; i++) val = val && val[path[i]];
      if (typeof val === "string") el.placeholder = val;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var path = el.getAttribute("data-i18n-aria").split(".");
      var val = d;
      for (var i = 0; i < path.length; i++) val = val && val[path[i]];
      if (typeof val === "string") el.setAttribute("aria-label", val);
    });

    var heroH1 = document.getElementById("heroHeadline");
    if (heroH1) {
      heroH1.innerHTML = escapeHtml(d.hero.headlinePre) + "<em>" + escapeHtml(d.hero.headlineEm) + "</em>" + escapeHtml(d.hero.headlinePost);
    }

    document.querySelectorAll(".example-card").forEach(function (card, i) {
      var capEl = card.querySelector(".cap span");
      if (capEl && d.examples.captions[i]) capEl.textContent = d.examples.captions[i];
      var img = card.querySelector("img");
      if (img && d.examples.captions[i]) img.alt = d.examples.captions[i];
    });

    document.querySelectorAll(".hiw-step").forEach(function (stepEl, i) {
      var step = d.how.steps[i];
      if (!step) return;
      var h3 = stepEl.querySelector("h3");
      var p = stepEl.querySelector("p");
      if (h3) h3.textContent = step.title;
      if (p) p.textContent = step.body;
    });

    configClose.setAttribute("aria-label", d.config.closeAria);
    submitBtn.textContent = d.config.footer.confirm;
    restartBtn.textContent = d.config.footer.restart;
    ["shipped"].forEach(function (fmt) {
      var card = formatGrid.querySelector('[data-format="' + fmt + '"]');
      if (!card) return;
      card.querySelector("strong").textContent = d.config.step1[fmt + "Title"];
      card.querySelector("span").textContent = d.config.step1[fmt + "Desc"];
    });

    renderAll();
  }

  /* ---------- cookie consent + analytics ---------- */
  var CONSENT_KEY = "line-cookie-consent";
  var GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: replace with your real GA4 measurement ID

  function loadGoogleAnalytics() {
    if (window.__gaLoaded || GA_MEASUREMENT_ID.indexOf("XXXX") !== -1) {
      if (GA_MEASUREMENT_ID.indexOf("XXXX") !== -1) {
        console.warn("Line: Google Analytics consent given, but GA_MEASUREMENT_ID is still a placeholder — add your real GA4 ID in script.js.");
      }
      return;
    }
    window.__gaLoaded = true;
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function showCookieBanner() {
    cookieBanner.hidden = false;
  }
  function hideCookieBanner() {
    cookieBanner.hidden = true;
  }

  var consentChoice = localStorage.getItem(CONSENT_KEY);
  if (consentChoice === "accepted") {
    loadGoogleAnalytics();
  } else if (consentChoice !== "declined") {
    showCookieBanner();
  }

  cookieAccept.addEventListener("click", function () {
    localStorage.setItem(CONSENT_KEY, "accepted");
    hideCookieBanner();
    loadGoogleAnalytics();
  });
  cookieDecline.addEventListener("click", function () {
    localStorage.setItem(CONSENT_KEY, "declined");
    hideCookieBanner();
  });
  cookieSettingsBtn.addEventListener("click", function () {
    showCookieBanner();
  });

  /* ---------- stage slideshow ---------- */
  var stageImgs = Array.prototype.slice.call(document.querySelectorAll("#configStage img"));
  var stageIdx = 0;
  var stageTimer = null;
  function advanceStage() {
    if (stageImgs.length < 2) return;
    stageImgs[stageIdx].classList.remove("active");
    stageIdx = (stageIdx + 1) % stageImgs.length;
    stageImgs[stageIdx].classList.add("active");
  }
  function startStage() {
    if (stageTimer || stageImgs.length < 2) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stageTimer = setInterval(advanceStage, 4500);
  }
  function stopStage() {
    if (stageTimer) {
      clearInterval(stageTimer);
      stageTimer = null;
    }
  }

  /* ---------- overlay open/close ---------- */
  function openConfigurator() {
    configurator.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      configurator.classList.add("open");
    });
    renderAll();
    startStage();
  }
  function closeConfigurator() {
    configurator.classList.remove("open");
    document.body.style.overflow = "";
    stopStage();
    setTimeout(function () {
      configurator.hidden = true;
    }, 350);
  }
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest(".js-open-config");
    if (trigger) {
      e.preventDefault();
      openConfigurator();
    }
  });
  configClose.addEventListener("click", closeConfigurator);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !configurator.hidden) closeConfigurator();
  });

  /* ---------- submit / restart ---------- */
  submitBtn.addEventListener("click", function () {
    if (!canSubmit()) return;
    submitOrder();
  });

  restartBtn.addEventListener("click", function () {
    state = defaultState();
    save();
    renderAll();
  });

  function submitOrder() {
    if (WEBHOOK_URL) {
      var payload = {
        timeline: state.timeline,
        contact: state.contact,
        format: state.format,
        price: PRICE,
        shippingCost: SHIPPING_COST,
        shippingCarrier: SHIPPING_CARRIER,
        agreeTerms: state.agreeTerms
      };
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight Apps Script can't answer
        body: JSON.stringify(payload)
      }).catch(function () {
        /* fire-and-forget for now — no error UI yet, see backend/SETUP.md known limits */
      });
    }
    state.submitted = true;
    save();
    localStorage.removeItem(STORAGE_KEY);
    renderAll();
  }

  /* ---------- validation ---------- */
  function isPlaceComplete(tl) {
    return tl.place.trim().length > 0 && (tl.mapsLink.trim().length > 0 || !!tl.photo);
  }
  function filledPlacesCount() {
    return state.timeline.filter(isPlaceComplete).length;
  }

  function canSubmit() {
    var hasNameEmail = state.contact.name.trim() && /\S+@\S+\.\S+/.test(state.contact.email);
    var hasPhone = state.contact.phone.trim().length > 0;
    var hasAddress = state.contact.address.trim().length > 0;
    return filledPlacesCount() >= MIN_PLACES && hasNameEmail && hasPhone && hasAddress && state.agreeTerms;
  }

  /* ---------- timeline step ---------- */
  function addTimelineEntry() {
    if (state.timeline.length >= MAX_PLACES) return;
    state.timeline.push({ id: uid(), place: "", mapsLink: "", note: "", photo: null });
    save();
    renderTimeline();
    updateSubmitState();
  }
  function removeTimelineEntry(id) {
    state.timeline = state.timeline.filter(function (tl) {
      return tl.id !== id;
    });
    save();
    renderTimeline();
    updateSubmitState();
  }

  /* drag-to-reorder via Pointer Events (works with mouse + touch) */
  function attachDrag(handle, tileEl) {
    handle.addEventListener("pointerdown", function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();

      var startClientY = e.clientY;
      var startRect = tileEl.getBoundingClientRect();
      var grabOffsetY = startClientY - startRect.top;
      tileEl.classList.add("dragging");

      function naturalRect() {
        var prev = tileEl.style.transform;
        tileEl.style.transform = "";
        var r = tileEl.getBoundingClientRect();
        tileEl.style.transform = prev;
        return r;
      }

      function onMove(ev) {
        var natural = naturalRect();
        var desiredTop = ev.clientY - grabOffsetY;
        var translateY = desiredTop - natural.top;
        tileEl.style.transform = "translateY(" + translateY + "px)";

        var center = desiredTop + natural.height / 2;
        var siblings = Array.prototype.slice.call(tlList.children).filter(function (el) {
          return el !== tileEl;
        });
        siblings.forEach(function (sib) {
          var sr = sib.getBoundingClientRect();
          var sc = sr.top + sr.height / 2;
          var idxTile = Array.prototype.indexOf.call(tlList.children, tileEl);
          var idxSib = Array.prototype.indexOf.call(tlList.children, sib);
          if (idxTile < idxSib && center > sc) {
            tlList.insertBefore(sib, tileEl);
          } else if (idxTile > idxSib && center < sc) {
            tlList.insertBefore(tileEl, sib);
          }
        });
      }

      function onUp() {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointercancel", onUp);
        tileEl.classList.remove("dragging");
        tileEl.style.transform = "";
        var newOrder = Array.prototype.map.call(tlList.children, function (el) {
          return el.dataset.id;
        });
        state.timeline.sort(function (a, b) {
          return newOrder.indexOf(a.id) - newOrder.indexOf(b.id);
        });
        save();
        renderTimeline();
      }

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
      document.addEventListener("pointercancel", onUp);
    });
  }

  function buildTlItem(item, idx) {
    var d = t().config.step0;
    var el = document.createElement("div");
    el.className = "tl-item";
    el.dataset.id = item.id;

    var handle = document.createElement("button");
    handle.type = "button";
    handle.className = "drag-handle";
    handle.setAttribute("aria-label", d.dragHandleAria);
    handle.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/>' +
      '<circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>';
    attachDrag(handle, el);

    var badge = document.createElement("div");
    badge.className = "badge-index";
    badge.textContent = String(idx + 1);

    var placeInput = document.createElement("input");
    placeInput.type = "text";
    placeInput.className = "tl-place";
    placeInput.placeholder = d.placePh;
    placeInput.value = item.place;
    placeInput.setAttribute("aria-label", d.placeAria);

    var remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-btn";
    remove.setAttribute("aria-label", d.removePlace);
    remove.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></svg>';
    remove.addEventListener("click", function () {
      removeTimelineEntry(item.id);
    });

    var head = document.createElement("div");
    head.className = "tl-head";
    head.appendChild(handle);
    head.appendChild(badge);
    head.appendChild(placeInput);
    head.appendChild(remove);

    var warn = document.createElement("p");
    warn.className = "tl-warn";
    warn.textContent = d.needMapsOrPhoto;

    function refreshWarn() {
      warn.hidden = !(item.place.trim() && !item.mapsLink.trim() && !item.photo);
    }
    refreshWarn();

    var reveal = document.createElement("div");
    reveal.className = "tl-reveal";
    function refreshReveal() {
      reveal.hidden = !item.place.trim();
    }
    refreshReveal();

    var mapsEditedByUser = !!item.mapsLink;

    placeInput.addEventListener("input", function () {
      item.place = placeInput.value;
      if (!mapsEditedByUser) {
        item.mapsLink = item.place.trim()
          ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(item.place.trim())
          : "";
        mapsInput.value = item.mapsLink;
      }
      save();
      updateSubmitState();
      refreshWarn();
      refreshReveal();
    });

    var mapsInput = document.createElement("input");
    mapsInput.type = "url";
    mapsInput.className = "tl-maps";
    mapsInput.placeholder = d.mapsLinkPh;
    mapsInput.value = item.mapsLink;
    mapsInput.setAttribute("aria-label", d.mapsLinkAria);
    mapsInput.addEventListener("input", function () {
      mapsEditedByUser = true;
      item.mapsLink = mapsInput.value;
      save();
      updateSubmitState();
      refreshWarn();
    });

    var photoIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 20h16"/></svg>';
    function setPhotoBtnLabel(label) {
      photoBtn.innerHTML = photoIcon + "<span>" + label + "</span>";
    }

    var thumb = document.createElement("div");
    thumb.className = "photo-thumb";
    if (item.photo) thumb.style.backgroundImage = "url(" + item.photo + ")";
    var photoBtn = document.createElement("button");
    photoBtn.type = "button";
    photoBtn.className = "photo-btn";
    setPhotoBtnLabel(item.photo ? d.photoChange : d.photoAdd);
    photoBtn.addEventListener("click", function () {
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.style.position = "fixed";
      input.style.top = "-1000px";
      input.style.left = "-1000px";
      document.body.appendChild(input);
      input.addEventListener("change", function () {
        var file = input.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function (e) {
            item.photo = e.target.result;
            thumb.style.backgroundImage = "url(" + item.photo + ")";
            setPhotoBtnLabel(t().config.step0.photoChange);
            save();
            updateSubmitState();
            refreshWarn();
          };
          reader.readAsDataURL(file);
        }
        input.remove();
      });
      input.click();
    });

    var photoWrap = document.createElement("div");
    photoWrap.className = "photo-row";
    photoWrap.appendChild(thumb);
    photoWrap.appendChild(photoBtn);

    var verifyRow = document.createElement("div");
    verifyRow.className = "tl-verify-row";
    verifyRow.appendChild(mapsInput);
    verifyRow.appendChild(photoWrap);

    var noteInput = document.createElement("textarea");
    noteInput.className = "tl-note";
    noteInput.rows = 2;
    noteInput.placeholder = d.notePh;
    noteInput.value = item.note;
    noteInput.setAttribute("aria-label", d.noteAria);
    noteInput.addEventListener("input", function () {
      item.note = noteInput.value;
      save();
    });

    reveal.appendChild(verifyRow);
    reveal.appendChild(warn);
    reveal.appendChild(noteInput);

    el.appendChild(head);
    el.appendChild(reveal);
    return el;
  }

  function renderTimeline() {
    tlList.innerHTML = "";
    state.timeline.forEach(function (item, idx) {
      tlList.appendChild(buildTlItem(item, idx));
    });
    addTlBtn.disabled = state.timeline.length >= MAX_PLACES;
  }

  addTlBtn.addEventListener("click", addTimelineEntry);

  /* ---------- format step ---------- */
  function renderFormat() {
    submitPriceAmount.textContent = "€" + PRICE;
  }

  /* ---------- details step ---------- */
  contactName.addEventListener("input", function () {
    state.contact.name = contactName.value;
    save();
    updateSubmitState();
  });
  contactEmail.addEventListener("input", function () {
    state.contact.email = contactEmail.value;
    save();
    updateSubmitState();
  });
  contactPhone.addEventListener("input", function () {
    state.contact.phone = contactPhone.value;
    save();
    updateSubmitState();
  });
  contactAddress.addEventListener("input", function () {
    state.contact.address = contactAddress.value;
    save();
    updateSubmitState();
  });
  contactNotes.addEventListener("input", function () {
    state.contact.notes = contactNotes.value;
    save();
  });
  agreeTermsBox.addEventListener("change", function () {
    state.agreeTerms = agreeTermsBox.checked;
    save();
    updateSubmitState();
  });
  function renderDetails() {
    contactName.value = state.contact.name;
    contactEmail.value = state.contact.email;
    contactPhone.value = state.contact.phone;
    contactAddress.value = state.contact.address;
    contactNotes.value = state.contact.notes;
  }

  /* ---------- review step ---------- */
  function renderReview() {
    var d = t().config.step3;
    summaryList.innerHTML = "";
    var rows = [];

    var placesHtml =
      "<ol>" +
      state.timeline
        .filter(function (tl) {
          return tl.place.trim();
        })
        .map(function (tl) {
          return "<li>" + escapeHtml(tl.place) + (tl.note.trim() ? " — " + escapeHtml(tl.note) : "") + "</li>";
        })
        .join("") +
      "</ol>";
    rows.push([d.labels.timeline, placesHtml || "<em>" + d.noPlaces + "</em>"]);

    rows.push([d.labels.format, d.shippedPrint]);
    rows.push([
      d.labels.shipping,
      '<span class="v-inline"><img class="carrier-logo" src="logos/postnl-logo.png" alt="' +
        SHIPPING_CARRIER +
        '" onerror="this.style.display=\'none\'">' +
        SHIPPING_CARRIER +
        " — " + d.shippingIncluded + "</span>"
    ]);
    rows.push([
      d.labels.payment,
      '<span class="v-inline"><img class="carrier-logo" src="logos/tikkie-logo.png" alt="Tikkie" onerror="this.style.display=\'none\'">Tikkie</span>'
    ]);
    rows.push([
      d.labels.contact,
      escapeHtml(state.contact.name || "—") + " · " + escapeHtml(state.contact.email || "—") + " · " + escapeHtml(state.contact.phone || "—")
    ]);
    rows.push([d.labels.address, escapeHtml(state.contact.address || "—")]);
    if (state.contact.notes.trim()) {
      rows.push([d.labels.notes, escapeHtml(state.contact.notes)]);
    }

    rows.forEach(function (pair) {
      var li = document.createElement("li");
      li.innerHTML = '<span class="k">' + pair[0] + '</span><span class="v">' + pair[1] + "</span>";
      summaryList.appendChild(li);
    });
  }

  /* ---------- footer state ---------- */
  function timelineHintText() {
    var d = t().config.step0;
    var remaining = MIN_PLACES - filledPlacesCount();
    if (remaining > 0) {
      return remaining === 1 ? d.needMoreOne : d.needMoreMany.replace("{n}", remaining);
    }
    if (state.timeline.length >= MAX_PLACES) return d.maxReached;
    return "";
  }

  function updateSubmitState() {
    var ok = canSubmit();
    submitBtn.disabled = !ok;

    var tlHint = timelineHintText();
    tlNextHint.textContent = tlHint;
    tlNextHint.hidden = !tlHint;
  }

  function renderAll() {
    configForm.hidden = state.submitted;
    configSuccess.hidden = !state.submitted;
    configSubmitBar.hidden = state.submitted;
    agreeTermsBox.checked = state.agreeTerms;
    renderTimeline();
    renderFormat();
    renderDetails();
    renderReview();
    updateSubmitState();
  }

  applyLang();
})();
