(function () {
  "use strict";

  var STORAGE_KEY = "line-order-draft";
  var LANG_KEY = "line-lang";
  var MIN_PLACES = 6;
  var MIN_REQUIRED_PLACES = 4;
  var DEFAULT_PLACES = 4;
  var MAX_PLACES = 10;
  var PRICE = 299;
  var EXTRA_PLACE_COST = 25;
  var NO_FRAME_DISCOUNT = 50;
  var SHIPPING_COST = 7.95;
  var SHIPPING_CARRIER = "PostNL";
  var FRAME_TURNAROUND_DAYS = 10;
  var NO_FRAME_TURNAROUND_DAYS = 5;
  var WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxDMQ3Wachosogg1YbnwtQm663nN-qsmiC_QYolDcv_z5HoMRsJsC3RtBXdxcH6TLaV/exec";
  var STUDIO_EMAIL = "kees.assistant@gmail.com";

  /* ---------- i18n ---------- */
  var I18N = {
    nl: {
      title: "Line",
      brand: { since: "Sinds 2021" },
      nav: { examples: "Voorbeelden", how: "Hoe het werkt", about: "Over", contact: "Contact", menuToggle: "Menu" },
      cta: { start: "Geef een Line" },
      hero: {
        headlinePre: "Een cadeau voor een ",
        headlineEm: "groot moment",
        headlinePost: "",
        lede: "Line tekent elke plek die iemands leven vormde: van eerste woonhuis tot laatste adres. Een persoonlijk kunstwerk voor een verhuizing, afstuderen, huwelijk of afscheid.",
        priceFrom: "Vanaf"
      },
      examples: {
        eyebrow: "Cadeaus die al gegeven zijn",
        heading: "Elke Line vertelt een eigen verhaal",
        captions: [],
        open: "Vergroot deze foto"
      },
      lightbox: { close: "Sluiten", prev: "Vorige foto", next: "Volgende foto" },
      how: {
        eyebrow: "Hoe het werkt",
        steps: [
          { title: "Stel de Line samen", body: "Voeg alle plekken toe en upload foto's." },
          { title: "Wij tekenen hem", body: "De tekenaar gaat aan de slag. Voordat we afdrukken ontvang je het design ter beoordeling via WhatsApp." },
          { title: "Line wordt bezorgd", body: "PostNL bezorgt de Line." }
        ],
        turnaroundNote: "Doorlooptijd is 5 werkdagen zonder lijst, 10 werkdagen met lijst — vanaf het moment van betalen."
      },
      dims: {
        eyebrow: "Afmetingen",
        heading: "Standaard 20 × 60 cm"
      },
      pricing: {
        eyebrow: "Prijs",
        heading: "Vanaf €299",
        lede: "Vanaf €299 voor een ingelijste Line van 20 × 60 cm met 6 plekken — inclusief lijst, verpakking en verzending. Elke plek daarna kost €25 extra.",
        diagram: {
          vat: { name: "BTW (21%)", amount: "€51,89" },
          frame: { name: "Lijst", amount: "€30" },
          print: { name: "Print", amount: "€35" },
          shipping: { name: "Verzending", amount: "€8" },
          packaging: { name: "Verpakking", amount: "€3" },
          labor: { name: "Teken-uren", amount: "€171,11" }
        },
        invite: "Tik of klik op een kleur voor de prijs erachter"
      },
      about: {
        eyebrow: "Over",
        heading: "Met de hand getekend, door één persoon",
        body: "Line is een eenmansstudio. Elk werk begint als een opdracht van jou — vaak voor iemand anders — en eindigt als een originele lijntekening, op dezelfde manier gemaakt als de allereerste voorbeelden: met de hand, met een pen. Geen twee Lines zijn ooit helemaal hetzelfde."
      },
      testimonials: {
        eyebrow: "Reacties na het uitpakken",
        items: [
          { quote: "Ik zag eerst niet goed wat het was — tot ik ons oude studentenhuis zag staan, met zelfs de hangende fietsen aan het balkon." },
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
          { q: "Hoe lang duurt het voordat ik mijn Line ontvang?", a: "De doorlooptijd is 5 werkdagen zonder lijst, of 10 werkdagen met lijst — vanaf het moment dat de betaling is voldaan. Wil je op tijd je Line binnen hebben, wacht dan niet te lang met het plaatsen van je bestelling." },
          { q: "Kan ik een Line voor iemand anders bestellen?", a: "Zeker — de meeste Lines worden besteld als cadeau. Jij bouwt de tijdlijn, wij tekenen 'm, en jij geeft 'm door." },
          { q: "Moet ik referentiefoto's toevoegen?", a: "Ja — voeg per plek een foto van het gebouw toe, zo weten we zeker dat we het juiste pand tekenen." },
          { q: "Kan ik later nog iets wijzigen aan mijn bestelling?", a: "Neem contact op via e-mail zodra je je bestelling hebt verstuurd — we passen het waar mogelijk nog aan." },
          { q: "Welke formaten zijn er?", a: "Op dit moment alleen een ingelijste print van 20 × 60 cm, thuisbezorgd. Vanaf €299 voor 6 plekken, alles inbegrepen (incl. BTW en verzending via PostNL)." },
          { q: "Wat kost een Line?", a: "We hanteren een vanaf-prijs van €299 voor de eerste 6 plekken, inclusief BTW en verzendkosten. Elke plek daarna kost €25 extra." },
          { q: "Kan ik meer dan 6 plekken toevoegen aan mijn tijdlijn?", a: "Ja, tot een maximum van 10. De prijs van €299 is inclusief de eerste 6 plekken; elke plek daarna kost €25 extra. Je ziet de prijs live meebewegen in de configurator." },
          { q: "Kan ik zelf het lijstmateriaal kiezen?", a: "Ja, je kiest tussen grafiet en eikenhout — beide kosten hetzelfde. Je kunt er ook voor kiezen om je Line zonder lijst te ontvangen, voor €50 korting." },
          { q: "Waarom is de levertijd zo lang?", a: "Het kost 1 tot 2 werkdagen om het design af te ronden, printen duurt 2 tot 3 werkdagen, en inlijsten en verzenden nog eens 1 tot 2 werkdagen. Dit is sterk afhankelijk van de drukte, waardoor het soms iets langer kan duren." },
          { q: "Kan ik mijn bestelling annuleren of retourneren als ik van gedachten verander?", a: "Elke Line wordt speciaal voor jou op maat getekend. Voor op maat gemaakte producten geldt geen wettelijk herroepingsrecht, dus een geplaatste en bevestigde bestelling kun je niet kosteloos annuleren of retourneren. Zit er een fout in je Line die aan ons ligt, dan lossen we dat uiteraard wel kosteloos op." },
          { q: "Er zit een fout in mijn Line, wat nu?", a: "Bevat je Line een fout die aan ons te wijten is, bijvoorbeeld een verkeerd getekend gebouw of een productiefout in de print, dan herstellen of vervangen we deze kosteloos. Mail ons via de contactpagina." },
          { q: "Is mijn Line uniek?", a: "Ja. Elke Line wordt met de hand getekend op basis van de plekken die jij aanlevert, en de compositie wordt door de kunstenaar bepaald. Geen twee Lines zijn ooit helemaal hetzelfde." },
          { q: "Wat gebeurt er met de foto's en gegevens die ik upload?", a: "Je gegevens en foto's worden alleen gebruikt om jouw Line te tekenen en te bezorgen, niet gedeeld met derden buiten wat nodig is voor de levering. Het volledige privacybeleid staat op de privacybeleid-pagina." },
          { q: "Wanneer en hoe betaal ik precies?", a: "Na het plaatsen van je bestelling ontvang je een Tikkie-betaalverzoek. Zodra de betaling binnen is, start de doorlooptijd van je Line." }
        ]
      },
      footer: {
        copyright: "© 2026 Line. Alle werken op maat met de hand getekend.",
        terms: "Algemene voorwaarden",
        privacy: "Privacybeleid",
        odr: "Geschillencommissie (ODR)"
      },
      config: {
        closeAria: "Configurator sluiten",
        step0: {
          h2: "Stel je Line samen",
          addBtn: "+ Plek toevoegen",
          needMoreOne: "Nog 1 plek nodig om verder te gaan (minimaal 4).",
          needMoreMany: "Nog {n} plekken nodig om verder te gaan (minimaal 4).",
          maxReached: "Maximum van 10 plekken bereikt.",
          placePh: "Adres of gebouw",
          placeAria: "Adres of gebouw",
          notePh: "Opmerkingen, specifieke wensen",
          noteAria: "Opmerkingen voor deze plek",
          photoAdd: "Foto toevoegen",
          photoChange: "Foto wijzigen",
          needPhoto: "Voeg een foto toe, zodat we het juiste gebouw tekenen.",
          photoMissingLabel: "Foto ontbreekt — tik om toe te voegen",
          dragHandleAria: "Sleep om te herordenen",
          removePlace: "Deze plek verwijderen",
          progressLabel: "{done} van de {min} compleet",
          toggleAria: "Details tonen of verbergen",
          moveUpAria: "Naar boven verplaatsen",
          moveDownAria: "Naar beneden verplaatsen",
          extraPlaceHint: "De eerste 6 plekken zijn inbegrepen. Elke plek daarna kost €25 extra.",
          storageWarning: "Je browser kan je voortgang niet meer opslaan (waarschijnlijk te veel foto's). Rond je bestelling in één keer af, of maak wat plekken leger."
        },
        step1: {
          h2: "Jouw formaat",
          hint: "Elke Line wordt op dit moment op één manier geleverd.",
          sizeLabel: "20 × 60 cm"
        },
        stepFrame: {
          h2: "Kies je lijst",
          hint: "Kies het materiaal van de lijst rondom je Line.",
          grafietLabel: "Grafiet",
          eikenhoutLabel: "Eikenhout",
          geenlijstLabel: "Geen lijst",
          noFrameNote: "Bij deze keuze sturen we de print zonder lijst naar je bezorgadres. Levertijd is daardoor 5 werkdagen."
        },
        stepNotes: {
          h2: "Nog iets kwijt?",
          hint: "Algemene opmerkingen of specifieke wensen voor je Line — los van de losse plekken hierboven.",
          notesPh: "Extra context die helpt bij het tekenen van je Line",
          notesAria: "Algemene opmerkingen"
        },
        step2: {
          h2: "Jouw gegevens",
          hint: "Waar mogen we je Line naartoe sturen?",
          nameLabel: "Naam",
          namePh: "Je volledige naam",
          emailLabel: "E-mail",
          emailPh: "jij@voorbeeld.nl",
          phoneLabel: "Telefoonnummer",
          phonePh: "+31 6 12345678",
          phoneInvalid: "Dit lijkt geen geldig telefoonnummer. Vul je echte nummer in.",
          streetLabel: "Straat en huisnummer",
          streetPh: "Straatnaam + huisnummer",
          cityLabel: "Stad",
          cityPh: "Amsterdam",
          postalLabel: "Postcode",
          postalPh: "1234 AB",
          countryLabel: "Land",
          countryPh: "Nederland",
          dateLabel: "Gewenste ontvangstdatum",
          dateAria: "Gewenste ontvangstdatum",
          dateHint: "Doorlooptijd is 5 werkdagen zonder lijst, 10 werkdagen met lijst.",
          detailsHint: "Vul je naam, telefoonnummer, een geldig e-mailadres, je bezorgadres en gewenste ontvangstdatum in om verder te gaan."
        },
        step3: {
          h2: "Bekijk je bestelling",
          hint: "Nog even checken — je kunt terug naar elke stap om iets aan te passen.",
          labels: { timeline: "Jouw tijdlijn", format: "Formaat", frame: "Lijst", contact: "Contact", address: "Bezorgadres", desiredDate: "Gewenste ontvangstdatum", notes: "Notities", shipping: "Verzending", payment: "Betaalwijze" },
          noPlaces: "Nog geen plekken toegevoegd",
          shippedPrint: "Ingelijste print, 20 × 60 cm",
          shippingIncluded: "inbegrepen in de prijs"
        },
        step4: {
          h2: "Bedankt voor je bestelling!",
          body: "Check je inbox voor de bevestigingsmail.",
          orderNumberLabel: "Je ordernummer: {nummer}",
          steps: [
            { title: "Betaling via Tikkie", body: "Je ontvangt een WhatsApp-bericht van Kees met het Tikkie-verzoek. Zodra je betaalt, gaat de doorlooptijd in." },
            { title: "Review van het ontwerp", body: "Zodra je Line getekend is, stuurt Kees 'm via WhatsApp door ter beoordeling — voordat 'm naar de drukker gaat." },
            { title: "Drukken & bezorging", body: "Na jouw goedkeuring gaat het design naar de drukker. Zodra 'm klaar is, sturen we 'm op via PostNL." }
          ]
        },
        footer: {
          confirm: "Bestel nu",
          sending: "Bezig met versturen…",
          submitError: "Versturen is niet gelukt. Controleer je internetverbinding en probeer het nog eens. Je gegevens zijn niet verloren.",
          mailFallback: "Open e-mail met je bestelling",
          backHome: "Terug naar home",
          priceLabel: "incl. BTW",
          agreeTermsPre: "Door te bestellen ga je akkoord met de",
          agreeTermsLink: "algemene voorwaarden"
        }
      }
    },
    en: {
      title: "Line",
      brand: { since: "Since 2021" },
      nav: { examples: "Examples", how: "How it works", about: "About", contact: "Contact", menuToggle: "Menu" },
      cta: { start: "Give a Line" },
      hero: {
        headlinePre: "A gift for a ",
        headlineEm: "big moment",
        headlinePost: "",
        lede: "Line draws every place that shaped someone's life: from their first home to their most recent address. A personal work of art for a move, a graduation, a wedding, or a loss.",
        priceFrom: "From"
      },
      examples: {
        eyebrow: "Gifts already given",
        heading: "Every Line tells its own story",
        captions: [],
        open: "Enlarge this photo"
      },
      lightbox: { close: "Close", prev: "Previous photo", next: "Next photo" },
      how: {
        eyebrow: "How it works",
        steps: [
          { title: "Put the Line together", body: "Add every place and upload photos." },
          { title: "We draw it", body: "The artist gets to work. Before we print, you'll receive the design for review via WhatsApp." },
          { title: "The Line gets delivered", body: "PostNL delivers the Line." }
        ],
        turnaroundNote: "Turnaround is 5 working days without a frame, 10 working days with a frame — starting from the moment of payment."
      },
      dims: {
        eyebrow: "Dimensions",
        heading: "20 × 60 cm as standard"
      },
      pricing: {
        eyebrow: "Pricing",
        heading: "From €299",
        lede: "From €299 for a framed 20 × 60 cm Line with 6 places — including the frame, packaging, and shipping. Every place after that is an extra €25.",
        diagram: {
          vat: { name: "VAT (21%)", amount: "€51.89" },
          frame: { name: "Frame", amount: "€30" },
          print: { name: "Printing", amount: "€35" },
          shipping: { name: "Shipping", amount: "€8" },
          packaging: { name: "Packaging", amount: "€3" },
          labor: { name: "Drawing hours", amount: "€171.11" }
        },
        invite: "Tap or click a color to see its price"
      },
      about: {
        eyebrow: "About",
        heading: "Drawn by hand, by one person",
        body: "Line is a one-person studio. Every piece starts as a brief from you — often for someone else — and ends as an original line drawing, made the same way the very first examples were: by hand, with a pen. No two Lines are ever quite the same."
      },
      testimonials: {
        eyebrow: "Reactions after unwrapping",
        items: [
          { quote: "I didn't recognize it at first — until I saw our old student house, right down to the bikes hanging off the balcony." },
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
          { q: "How long until I receive my Line?", a: "Turnaround is 5 working days without a frame, or 10 working days with a frame — starting once payment has been received. If you want your Line in time, don't leave it too late to order." },
          { q: "Can I order a Line for someone else?", a: "Absolutely — most Lines are ordered as a gift. You build the timeline, we draw it, you give it." },
          { q: "Do I need to add reference photos?", a: "Yes — add a photo of the building for each place, that way we're sure we draw the right one." },
          { q: "Can I still change something after ordering?", a: "Get in touch by email as soon as you've submitted your order — we'll adjust where we still can." },
          { q: "What formats are available?", a: "Currently just a framed 20 × 60 cm print, shipped to your door. From €299 for 6 places, all-in (incl. VAT and shipping via PostNL)." },
          { q: "What does a Line cost?", a: "We charge from €299 for the first 6 places, including VAT and shipping. Every place after that is an extra €25." },
          { q: "Can I add more than 6 places to my timeline?", a: "Yes, up to a maximum of 10. The €299 price includes the first 6 places; every place after that is an extra €25. You'll see the price update live in the configurator." },
          { q: "Can I choose the frame material myself?", a: "Yes, choose between graphite and oak — both cost the same. You can also choose to receive your Line without a frame for a €50 discount." },
          { q: "Why does delivery take so long?", a: "Finishing the design takes 1 to 2 working days, printing takes 2 to 3 working days, and framing plus shipping takes another 1 to 2 working days. This depends heavily on how busy we are, so it can sometimes take a bit longer." },
          { q: "Can I cancel or return my order if I change my mind?", a: "Every Line is drawn specifically for you. Custom-made products aren't covered by the legal right of withdrawal, so a placed and confirmed order can't be cancelled or returned free of charge. If there's a mistake on our end, we'll fix it at no cost." },
          { q: "There's a mistake in my Line, what now?", a: "If your Line has a mistake on our end — a wrongly drawn building or a print production issue — we'll fix or replace it free of charge. Email us via the contact page." },
          { q: "Is my Line unique?", a: "Yes. Every Line is hand-drawn based on the places you provide, and the composition is determined by the artist. No two Lines are ever quite the same." },
          { q: "What happens to the photos and details I upload?", a: "Your details and photos are only used to draw and deliver your Line, and aren't shared with third parties beyond what's needed for delivery. See the privacy policy page for the full details." },
          { q: "When and how do I pay exactly?", a: "After placing your order you'll receive a Tikkie payment request. Once payment is received, the turnaround time for your Line begins." }
        ]
      },
      footer: {
        copyright: "© 2026 Line. All pieces hand-drawn to order.",
        terms: "Terms & conditions",
        privacy: "Privacy policy",
        odr: "Dispute resolution (ODR)"
      },
      config: {
        closeAria: "Close configurator",
        step0: {
          h2: "Put your Line together",
          addBtn: "+ Add a place",
          needMoreOne: "1 more place needed to continue (minimum 4).",
          needMoreMany: "{n} more places needed to continue (minimum 4).",
          maxReached: "Maximum of 10 places reached.",
          placePh: "Address or building",
          placeAria: "Address or building",
          notePh: "Comments, specific wishes",
          noteAria: "Comments for this place",
          photoAdd: "Add photo",
          photoChange: "Change photo",
          needPhoto: "Add a photo so we draw the right building.",
          photoMissingLabel: "Photo missing — tap to add",
          dragHandleAria: "Drag to reorder",
          removePlace: "Remove this place",
          progressLabel: "{done} of {min} complete",
          toggleAria: "Show or hide details",
          moveUpAria: "Move up",
          moveDownAria: "Move down",
          extraPlaceHint: "The first 6 places are included. Every place after that is an extra €25.",
          storageWarning: "Your browser can no longer save your progress (probably too many photos). Finish your order in one go, or clear a few places."
        },
        step1: {
          h2: "Your format",
          hint: "Every Line currently ships one way.",
          sizeLabel: "20 × 60 cm"
        },
        stepFrame: {
          h2: "Choose your frame",
          hint: "Pick the material for the frame around your Line.",
          grafietLabel: "Graphite",
          eikenhoutLabel: "Oak",
          geenlijstLabel: "No frame",
          noFrameNote: "With this choice we send the print to your delivery address without a frame. Turnaround is therefore 5 working days."
        },
        stepNotes: {
          h2: "Anything else?",
          hint: "General comments or specific wishes for your Line — separate from the individual places above.",
          notesPh: "Any extra context that helps us draw your Line",
          notesAria: "General comments"
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
          phoneInvalid: "That doesn't look like a valid phone number. Please enter your real number.",
          streetLabel: "Street and house number",
          streetPh: "Street name + house number",
          cityLabel: "City",
          cityPh: "Amsterdam",
          postalLabel: "Postcode",
          postalPh: "1234 AB",
          countryLabel: "Country",
          countryPh: "Netherlands",
          dateLabel: "Preferred delivery date",
          dateAria: "Preferred delivery date",
          dateHint: "Turnaround is 5 working days without a frame, 10 working days with a frame.",
          detailsHint: "Add your name, phone number, a valid email, your delivery address, and preferred delivery date to continue."
        },
        step3: {
          h2: "Review your order",
          hint: "Take a last look — you can jump back to any step to make changes.",
          labels: { timeline: "Your timeline", format: "Format", frame: "Frame", contact: "Contact", address: "Delivery address", desiredDate: "Preferred delivery date", notes: "Notes", shipping: "Shipping", payment: "Payment method" },
          noPlaces: "No places added yet",
          shippedPrint: "Framed print, 20 × 60 cm",
          shippingIncluded: "included in the price"
        },
        step4: {
          h2: "Thank you for your order!",
          body: "Check your inbox for the confirmation email.",
          orderNumberLabel: "Your order number: {nummer}",
          steps: [
            { title: "Payment via Tikkie", body: "You'll get a WhatsApp message from Kees with the Tikkie request. Once you pay, the turnaround time starts." },
            { title: "Design review", body: "Once your Line is drawn, Kees sends it over via WhatsApp for review — before it goes to the printer." },
            { title: "Printing & delivery", body: "After your approval, the design goes to the printer. Once it's ready, we ship it via PostNL." }
          ]
        },
        footer: {
          confirm: "Order now",
          sending: "Sending…",
          submitError: "Sending failed. Check your internet connection and try again. Your details haven't been lost.",
          mailFallback: "Open email with your order",
          backHome: "Back to home",
          priceLabel: "incl. VAT",
          agreeTermsPre: "By ordering, you agree to our",
          agreeTermsLink: "terms & conditions"
        }
      }
    }
  };

  /* ---------- countries ---------- */
  var COUNTRIES = [
    ["Nederland", "Netherlands"], ["België", "Belgium"], ["Duitsland", "Germany"],
    ["Frankrijk", "France"], ["Verenigd Koninkrijk", "United Kingdom"], ["Ierland", "Ireland"],
    ["Luxemburg", "Luxembourg"], ["Zwitserland", "Switzerland"], ["Oostenrijk", "Austria"],
    ["Spanje", "Spain"], ["Portugal", "Portugal"], ["Italië", "Italy"],
    ["Denemarken", "Denmark"], ["Zweden", "Sweden"], ["Noorwegen", "Norway"],
    ["Finland", "Finland"], ["IJsland", "Iceland"], ["Polen", "Poland"],
    ["Tsjechië", "Czechia"], ["Slowakije", "Slovakia"], ["Hongarije", "Hungary"],
    ["Roemenië", "Romania"], ["Bulgarije", "Bulgaria"], ["Griekenland", "Greece"],
    ["Kroatië", "Croatia"], ["Slovenië", "Slovenia"], ["Estland", "Estonia"],
    ["Letland", "Latvia"], ["Litouwen", "Lithuania"], ["Malta", "Malta"],
    ["Cyprus", "Cyprus"], ["Monaco", "Monaco"], ["Liechtenstein", "Liechtenstein"],
    ["Andorra", "Andorra"], ["San Marino", "San Marino"],
    ["Verenigde Staten", "United States"], ["Canada", "Canada"], ["Mexico", "Mexico"],
    ["Brazilië", "Brazil"], ["Argentinië", "Argentina"], ["Chili", "Chile"],
    ["Colombia", "Colombia"], ["Peru", "Peru"],
    ["Australië", "Australia"], ["Nieuw-Zeeland", "New Zealand"],
    ["Japan", "Japan"], ["China", "China"], ["Zuid-Korea", "South Korea"],
    ["India", "India"], ["Indonesië", "Indonesia"], ["Thailand", "Thailand"],
    ["Vietnam", "Vietnam"], ["Filipijnen", "Philippines"], ["Maleisië", "Malaysia"],
    ["Singapore", "Singapore"], ["Taiwan", "Taiwan"], ["Hongkong", "Hong Kong"],
    ["Verenigde Arabische Emiraten", "United Arab Emirates"], ["Saoedi-Arabië", "Saudi Arabia"],
    ["Qatar", "Qatar"], ["Koeweit", "Kuwait"], ["Israël", "Israel"],
    ["Turkije", "Turkey"], ["Egypte", "Egypt"], ["Marokko", "Morocco"],
    ["Zuid-Afrika", "South Africa"], ["Nigeria", "Nigeria"], ["Kenia", "Kenya"],
    ["Rusland", "Russia"], ["Oekraïne", "Ukraine"], ["Servië", "Serbia"],
    ["Bosnië en Herzegovina", "Bosnia and Herzegovina"], ["Montenegro", "Montenegro"],
    ["Noord-Macedonië", "North Macedonia"], ["Albanië", "Albania"], ["Moldavië", "Moldova"],
    ["Wit-Rusland", "Belarus"], ["Georgië", "Georgia"], ["Armenië", "Armenia"],
    ["Pakistan", "Pakistan"], ["Bangladesh", "Bangladesh"], ["Sri Lanka", "Sri Lanka"]
  ];
  function countryLabel(entry) {
    return lang === "nl" ? entry[0] : entry[1];
  }
  function countryOptions() {
    return COUNTRIES.slice().sort(function (a, b) {
      return countryLabel(a).localeCompare(countryLabel(b), lang);
    });
  }

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
    for (var i = 0; i < DEFAULT_PLACES; i++) {
      timeline.push({ id: uid(), place: "", note: "", photo: null });
    }
    return {
      submitted: false,
      timeline: timeline,
      format: "shipped",
      frame: "grafiet",
      contact: { name: "", email: "", phone: "", street: "", city: "", postalCode: "", country: lang === "nl" ? "Nederland" : "Netherlands", notes: "", desiredDate: "" }
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
        item.note = item.note || "";
        delete item.mapsLink;
      });
      uidCounter = maxId + 1;
      if (!parsed.contact) parsed.contact = {};
      parsed.contact.name = parsed.contact.name || "";
      parsed.contact.email = parsed.contact.email || "";
      parsed.contact.phone = parsed.contact.phone || "";
      parsed.contact.street = parsed.contact.street || "";
      parsed.contact.city = parsed.contact.city || "";
      parsed.contact.postalCode = parsed.contact.postalCode || "";
      parsed.contact.country = parsed.contact.country || (lang === "nl" ? "Nederland" : "Netherlands");
      parsed.contact.notes = parsed.contact.notes || "";
      parsed.contact.desiredDate = parsed.contact.desiredDate || "";
      parsed.format = "shipped"; // only format currently offered — collapses any old draft (digital/framed/pickup)
      parsed.frame = (parsed.frame === "eikenhout" || parsed.frame === "geenlijst") ? parsed.frame : "grafiet";
      delete parsed.contact.address;
      delete parsed.agreeTerms;
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
      if (storageWarning) storageWarning.hidden = true;
    } catch (e) {
      // Quota exceeded (usually too many/large photos) — the draft still works for this
      // session, but won't survive a reload, so surface it instead of failing silently.
      if (storageWarning) storageWarning.hidden = false;
    }
    renderReview();
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Downscales + re-encodes an uploaded photo before it ever touches state/localStorage/the
  // webhook payload — an unmodified phone photo can be several MB, and with up to MAX_PLACES
  // of them in one order that blows past both localStorage's quota and the webhook's request size.
  function compressImage(file, maxDim, quality, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        var w = Math.max(1, Math.round(img.width * scale));
        var h = Math.max(1, Math.round(img.height * scale));
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        callback(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = function () {
        callback(e.target.result); // fall back to the original if it won't decode as an image
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /* ---------- element refs ---------- */
  var htmlEl = document.documentElement;
  var configurator = document.getElementById("configurator");
  var configClose = document.getElementById("configClose");
  var configScroll = document.querySelector(".config-scroll");
  var configForm = document.getElementById("configForm");
  var configSuccess = document.getElementById("configSuccess");
  var successOrderNumber = document.getElementById("successOrderNumber");
  var configSubmitBar = document.getElementById("configSubmitBar");
  var submitBtn = document.getElementById("submitBtn");
  var successHomeBtn = document.getElementById("successHomeBtn");
  var submitError = document.getElementById("submitError");
  var mailFallbackBtn = document.getElementById("mailFallbackBtn");
  var submitPriceAmount = document.getElementById("submitPriceAmount");

  var tlList = document.getElementById("tlList");
  var addTlBtn = document.getElementById("addTlBtn");
  var tlNextHint = document.getElementById("tlNextHint");
  var storageWarning = document.getElementById("storageWarning");
  var tlProgress = document.getElementById("tlProgress");
  var tlExpanded = {}; // ephemeral UI state keyed by item.id — never persisted to localStorage
  var tlApplyExpandedFns = {}; // per-tile applyExpandedState closures, rebuilt on every renderTimeline()

  var formatGrid = document.getElementById("formatGrid");
  var frameGrid = document.getElementById("frameGrid");
  var noFrameNote = document.getElementById("noFrameNote");

  var contactName = document.getElementById("contactName");
  var contactEmail = document.getElementById("contactEmail");
  var contactPhone = document.getElementById("contactPhone");
  var phoneError = document.getElementById("phoneError");
  var contactStreet = document.getElementById("contactStreet");
  var contactCity = document.getElementById("contactCity");
  var contactPostal = document.getElementById("contactPostal");
  var contactCountry = document.getElementById("contactCountry");
  var contactDate = document.getElementById("contactDate");
  var contactNotes = document.getElementById("contactNotes");

  var summaryList = document.getElementById("summaryList");
  var langButtons = document.querySelectorAll(".lang-btn");

  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  menuToggle.addEventListener("click", function () {
    var open = mobileMenu.hidden;
    mobileMenu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      mobileMenu.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- pricing diagram: hover/tap a color to highlight its price ---------- */
  (function () {
    var segments = document.querySelectorAll(".price-diagram [data-segment]");
    if (!segments.length) return;
    var activeSegment = null;
    function setSegmentHover(name, on) {
      document.querySelectorAll('.price-diagram [data-segment="' + name + '"]').forEach(function (el) {
        el.classList.toggle("price-hover", on);
      });
    }
    segments.forEach(function (el) {
      var seg = el.dataset.segment;
      el.addEventListener("mouseenter", function () { setSegmentHover(seg, true); });
      el.addEventListener("mouseleave", function () { if (activeSegment !== seg) setSegmentHover(seg, false); });
      el.addEventListener("focus", function () { setSegmentHover(seg, true); });
      el.addEventListener("blur", function () { if (activeSegment !== seg) setSegmentHover(seg, false); });
      el.addEventListener("click", function (e) {
        e.preventDefault();
        if (activeSegment === seg) {
          setSegmentHover(seg, false);
          activeSegment = null;
        } else {
          if (activeSegment) setSegmentHover(activeSegment, false);
          activeSegment = seg;
          setSegmentHover(seg, true);
        }
      });
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          el.click();
        }
      });
    });
  })();

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
      if (window.innerWidth <= 700) return; // mobile: gallery is a swipe carousel, no lightbox
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

    document.querySelectorAll(".hero-headline").forEach(function (heroH1) {
      heroH1.innerHTML = escapeHtml(d.hero.headlinePre) + "<em>" + escapeHtml(d.hero.headlineEm) + "</em>" + escapeHtml(d.hero.headlinePost);
    });

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

    document.querySelectorAll(".success-step").forEach(function (stepEl, i) {
      var step = d.config.step4.steps[i];
      if (!step) return;
      var h3 = stepEl.querySelector("h3");
      var p = stepEl.querySelector("p");
      if (h3) h3.textContent = step.title;
      if (p) p.textContent = step.body;
    });

    configClose.setAttribute("aria-label", d.config.closeAria);
    submitBtn.textContent = d.config.footer.confirm;
    successHomeBtn.textContent = d.config.footer.backHome;

    renderAll();
  }

  /* ---------- testimonial horizontal scroll ---------- */
  var testimonialGrid = document.querySelector(".testimonial-grid");
  if (testimonialGrid) {
    var tDragging = false;
    var tDragStartX = 0;
    var tScrollStart = 0;
    var tAutoPaused = false;

    testimonialGrid.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      tDragging = true;
      tAutoPaused = true;
      testimonialGrid.classList.add("dragging");
      tDragStartX = e.clientX;
      tScrollStart = testimonialGrid.scrollLeft;
      testimonialGrid.setPointerCapture(e.pointerId);
    });
    testimonialGrid.addEventListener("pointermove", function (e) {
      if (!tDragging) return;
      testimonialGrid.scrollLeft = tScrollStart - (e.clientX - tDragStartX);
    });
    function endTestimonialDrag() {
      tDragging = false;
      testimonialGrid.classList.remove("dragging");
    }
    testimonialGrid.addEventListener("pointerup", endTestimonialDrag);
    testimonialGrid.addEventListener("pointercancel", endTestimonialDrag);
    testimonialGrid.addEventListener("mouseenter", function () {
      tAutoPaused = true;
    });
    testimonialGrid.addEventListener("mouseleave", function () {
      if (!tDragging) tAutoPaused = false;
    });
    testimonialGrid.addEventListener("touchstart", function () {
      tAutoPaused = true;
    }, { passive: true });

    if (!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      (function autoScrollStep() {
        if (!tAutoPaused) {
          var max = testimonialGrid.scrollWidth - testimonialGrid.clientWidth;
          if (max > 0) {
            testimonialGrid.scrollLeft += 0.4;
            if (testimonialGrid.scrollLeft >= max - 1) testimonialGrid.scrollLeft = 0;
          }
        }
        requestAnimationFrame(autoScrollStep);
      })();
    }
  }

  /* ---------- examples mobile carousel dots ---------- */
  var examplesGrid = document.getElementById("examplesGrid");
  var examplesDots = document.getElementById("examplesDots");
  if (examplesGrid && examplesDots) {
    var exampleCards = Array.prototype.slice.call(examplesGrid.querySelectorAll(".example-card"));
    var dotButtons = exampleCards.map(function (card, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", String(i + 1));
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () {
        card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
      examplesDots.appendChild(dot);
      return dot;
    });
    var dotsTicking = false;
    examplesGrid.addEventListener("scroll", function () {
      if (dotsTicking) return;
      dotsTicking = true;
      requestAnimationFrame(function () {
        var center = examplesGrid.scrollLeft + examplesGrid.clientWidth / 2;
        var closest = 0;
        var closestDist = Infinity;
        exampleCards.forEach(function (card, i) {
          var cardCenter = card.offsetLeft + card.offsetWidth / 2;
          var dist = Math.abs(cardCenter - center);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        dotButtons.forEach(function (dot, i) {
          dot.classList.toggle("active", i === closest);
        });
        dotsTicking = false;
      });
    });
  }

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
      mobileMenu.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
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

  successHomeBtn.addEventListener("click", function () {
    state = defaultState();
    save();
    closeConfigurator();
    window.scrollTo(0, 0);
  });

  function composeAddress(c) {
    var parts = [];
    if (c.street && c.street.trim()) parts.push(c.street.trim());
    var cityPostal = [c.postalCode && c.postalCode.trim(), c.city && c.city.trim()].filter(Boolean).join(" ");
    if (cityPostal) parts.push(cityPostal);
    if (c.country && c.country.trim()) parts.push(c.country.trim());
    return parts.join(", ");
  }

  // Plain-text order summary used as a last-resort fallback (mailto) if the webhook
  // can't be reached or reports failure — so an order is never silently lost, even if
  // the Apps Script backend is down, misconfigured, or not deployed yet.
  function orderToPlainText(payload) {
    var lines = [];
    lines.push("Nieuwe Line-bestelling (fallback, webhook niet bevestigd)");
    lines.push("");
    lines.push("Naam: " + ((payload.contact && payload.contact.name) || "-"));
    lines.push("E-mail: " + ((payload.contact && payload.contact.email) || "-"));
    lines.push("Telefoon: " + ((payload.contact && payload.contact.phone) || "-"));
    lines.push("Bezorgadres: " + ((payload.contact && payload.contact.address) || "-"));
    if (payload.contact && payload.contact.desiredDate) {
      lines.push("Gewenste ontvangstdatum: " + payload.contact.desiredDate);
    }
    lines.push("");
    lines.push("Tijdlijn:");
    payload.timeline.forEach(function (tl, i) {
      if (!tl.place || !tl.place.trim()) return;
      var line = (i + 1) + ". " + tl.place;
      if (tl.note) line += " (" + tl.note + ")";
      line += tl.photo ? " [foto: apart opvragen bij klant]" : " [foto: ontbreekt]";
      lines.push(line);
    });
    lines.push("");
    if (payload.contact && payload.contact.notes) {
      lines.push("Algemene notities: " + payload.contact.notes);
      lines.push("");
    }
    lines.push("Formaat: Ingelijste print, 20 x 60 cm");
    lines.push("Lijst: " + (payload.frame === "eikenhout" ? "Eikenhout" : payload.frame === "geenlijst" ? "Geen lijst" : "Grafiet"));
    lines.push("Prijs: EUR " + payload.price);
    lines.push("Akkoord voorwaarden: " + (payload.agreeTerms ? "Ja" : "Nee"));
    return lines.join("\n");
  }

  function mailtoFallbackUrl(payload) {
    var customerName = (payload.contact && payload.contact.name) || "onbekend";
    var subject = "Line-bestelling (fallback) - " + customerName;
    var body = orderToPlainText(payload);
    return "mailto:" + STUDIO_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  var lastFailedPayload = null;
  var lastOrderNumber = "";

  function renderSuccessOrderNumber() {
    if (!lastOrderNumber) {
      successOrderNumber.hidden = true;
      return;
    }
    successOrderNumber.textContent = t().config.step4.orderNumberLabel.replace("{nummer}", lastOrderNumber);
    successOrderNumber.hidden = false;
  }

  function showSubmitError(payload) {
    lastFailedPayload = payload;
    submitBtn.disabled = false;
    submitBtn.textContent = t().config.footer.confirm;
    submitError.hidden = false;
    mailFallbackBtn.hidden = false;
    // Best-effort automatic attempt — some browsers only allow this from a direct click,
    // so the visible button below is the guaranteed path, not just a backup for this.
    window.location.href = mailtoFallbackUrl(payload);
  }

  mailFallbackBtn.addEventListener("click", function () {
    if (lastFailedPayload) window.location.href = mailtoFallbackUrl(lastFailedPayload);
  });

  function submitOrder() {
    var contactPayload = {
      name: state.contact.name,
      email: state.contact.email,
      phone: state.contact.phone,
      address: composeAddress(state.contact),
      street: state.contact.street,
      city: state.contact.city,
      postalCode: state.contact.postalCode,
      country: state.contact.country,
      notes: state.contact.notes,
      desiredDate: state.contact.desiredDate
    };
    var payload = {
      timeline: state.timeline,
      contact: contactPayload,
      format: state.format,
      frame: state.frame,
      price: currentPrice(),
      shippingCost: SHIPPING_COST,
      shippingCarrier: SHIPPING_CARRIER,
      agreeTerms: true
    };

    function handleSuccess(orderNumber) {
      lastOrderNumber = orderNumber || "";
      submitError.hidden = true;
      mailFallbackBtn.hidden = true;
      state.submitted = true;
      save();
      localStorage.removeItem(STORAGE_KEY);
      renderAll();
      renderSuccessOrderNumber();
    }

    if (!WEBHOOK_URL) {
      handleSuccess();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = t().config.footer.sending;
    submitError.hidden = true;
    mailFallbackBtn.hidden = true;

    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight Apps Script can't answer
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return { ok: false };
          })
          .then(function (json) {
            if (res.ok && json && json.ok) {
              handleSuccess(json.orderNumber);
            } else {
              showSubmitError(payload);
            }
          });
      })
      .catch(function () {
        showSubmitError(payload);
      });
  }

  /* ---------- validation ---------- */
  function isPlaceComplete(tl) {
    return tl.place.trim().length > 0 && !!tl.photo;
  }
  function filledPlacesCount() {
    return state.timeline.filter(isPlaceComplete).length;
  }
  function extraPlacesCount() {
    return Math.max(0, state.timeline.length - MIN_PLACES);
  }

  function isLikelyFakePhone(digits) {
    if (/^(\d)\1+$/.test(digits)) return true;
    if (digits.indexOf("123456789") !== -1 || digits.indexOf("12345678") !== -1) return true;
    if (digits.indexOf("987654321") !== -1 || digits.indexOf("87654321") !== -1) return true;
    return false;
  }
  function isValidPhone(value) {
    var digits = value.replace(/[^\d]/g, "");
    return digits.length >= 9 && digits.length <= 15 && !isLikelyFakePhone(digits);
  }

  function canSubmit() {
    var hasNameEmail = state.contact.name.trim() && /\S+@\S+\.\S+/.test(state.contact.email);
    var hasPhone = isValidPhone(state.contact.phone);
    var hasAddress = !!(state.contact.street.trim() && state.contact.city.trim() && state.contact.postalCode.trim() && state.contact.country.trim());
    var hasDate = !!state.contact.desiredDate;
    return filledPlacesCount() >= MIN_REQUIRED_PLACES && hasNameEmail && hasPhone && hasAddress && hasDate;
  }

  /* ---------- timeline step ---------- */
  function addTimelineEntry() {
    if (state.timeline.length >= MAX_PLACES) return;
    state.timeline.push({ id: uid(), place: "", note: "", photo: null });
    save();
    renderTimeline();
    updateSubmitState();
  }
  function removeTimelineEntry(id) {
    state.timeline = state.timeline.filter(function (tl) {
      return tl.id !== id;
    });
    delete tlExpanded[id];
    save();
    renderTimeline();
    updateSubmitState();
  }
  function moveTimelineEntry(id, dir) {
    var idx = state.timeline.findIndex(function (tl) {
      return tl.id === id;
    });
    if (idx === -1) return;
    var newIdx = dir === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= state.timeline.length) return;
    var tmp = state.timeline[idx];
    state.timeline[idx] = state.timeline[newIdx];
    state.timeline[newIdx] = tmp;
    save();
    renderTimeline();
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
        tileEl.style.transform = "translateY(" + translateY + "px) rotate(3deg)";

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

    if (!(item.id in tlExpanded)) tlExpanded[item.id] = false;

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

    var check = document.createElement("div");
    check.className = "tl-check";
    check.hidden = true;
    check.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l6 6L20 6" /></svg>';

    var dot = document.createElement("div");
    dot.className = "tl-dot";
    dot.hidden = true;
    dot.title = d.photoMissingLabel;
    dot.setAttribute("aria-label", d.photoMissingLabel);

    var placeInput = document.createElement("input");
    placeInput.type = "text";
    placeInput.className = "tl-place";
    placeInput.placeholder = d.placePh;
    placeInput.maxLength = 150;
    placeInput.value = item.place;
    placeInput.setAttribute("aria-label", d.placeAria);

    var chevron = document.createElement("button");
    chevron.type = "button";
    chevron.className = "tl-chevron";
    chevron.setAttribute("aria-label", d.toggleAria);
    chevron.setAttribute("aria-controls", "tl-body-" + item.id);
    chevron.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
    chevron.addEventListener("click", function () {
      toggleExpanded();
    });

    var head = document.createElement("div");
    head.className = "tl-head";
    head.appendChild(handle);
    head.appendChild(badge);
    head.appendChild(placeInput);
    head.appendChild(dot);
    head.appendChild(check);
    head.appendChild(chevron);
    head.addEventListener("click", function (e) {
      if (e.target.closest(".tl-place") || e.target.closest(".drag-handle") || e.target.closest(".tl-chevron")) return;
      toggleExpanded();
    });

    function refreshStatus() {
      var complete = isPlaceComplete(item);
      check.hidden = !complete;
      dot.hidden = complete || !(item.place.trim() || item.photo);
    }
    refreshStatus();

    var body = document.createElement("div");
    body.className = "tl-body";
    body.id = "tl-body-" + item.id;

    function applyExpandedState() {
      var expanded = !!tlExpanded[item.id];
      el.classList.toggle("expanded", expanded);
      body.hidden = !expanded;
      chevron.setAttribute("aria-expanded", String(expanded));
    }
    function toggleExpanded() {
      tlExpanded[item.id] = !tlExpanded[item.id];
      applyExpandedState();
    }
    applyExpandedState();
    tlApplyExpandedFns[item.id] = applyExpandedState;

    placeInput.addEventListener("focus", function () {
      Object.keys(tlExpanded).forEach(function (id) {
        tlExpanded[id] = id === String(item.id);
      });
      Object.keys(tlApplyExpandedFns).forEach(function (id) {
        tlApplyExpandedFns[id]();
      });
    });
    placeInput.addEventListener("input", function () {
      item.place = placeInput.value;
      save();
      updateSubmitState();
      refreshStatus();
      refreshWarn();
    });
    var warn = document.createElement("p");
    warn.className = "tl-warn";
    warn.textContent = d.needPhoto;
    function refreshWarn() {
      var needsPhoto = !!(item.place.trim() && !item.photo);
      warn.hidden = !needsPhoto;
      photoBtn.classList.toggle("needs-photo", needsPhoto);
    }

    var photoIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 20h16"/></svg>';
    function setPhotoBtnLabel(label) {
      photoBtn.innerHTML = photoIcon + "<span>" + label + "</span>";
    }

    var thumb = document.createElement("div");
    thumb.className = "photo-thumb";
    thumb.hidden = !item.photo;
    if (item.photo) thumb.style.backgroundImage = "url(" + item.photo + ")";
    var photoBtn = document.createElement("button");
    photoBtn.type = "button";
    photoBtn.className = "photo-btn";
    setPhotoBtnLabel(item.photo ? d.photoChange : d.photoAdd);
    refreshWarn();
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
          compressImage(file, 1600, 0.8, function (dataUrl) {
            item.photo = dataUrl;
            thumb.style.backgroundImage = "url(" + item.photo + ")";
            thumb.hidden = false;
            setPhotoBtnLabel(t().config.step0.photoChange);
            save();
            updateSubmitState();
            refreshWarn();
            refreshStatus();
            if (isPlaceComplete(item) && tlExpanded[item.id]) {
              tlExpanded[item.id] = false;
              applyExpandedState();
            }
          });
        }
        input.remove();
      });
      input.click();
    });

    var photoWrap = document.createElement("div");
    photoWrap.className = "photo-row";
    photoWrap.appendChild(photoBtn);
    photoWrap.appendChild(thumb);
    photoWrap.appendChild(warn);

    var noteInput = document.createElement("textarea");
    noteInput.className = "tl-note";
    noteInput.rows = 2;
    noteInput.placeholder = d.notePh;
    noteInput.maxLength = 500;
    noteInput.value = item.note;
    noteInput.setAttribute("aria-label", d.noteAria);
    noteInput.addEventListener("input", function () {
      item.note = noteInput.value;
      save();
    });

    var detailRow = document.createElement("div");
    detailRow.className = "tl-verify-row";
    detailRow.appendChild(photoWrap);
    detailRow.appendChild(noteInput);

    var upBtn = document.createElement("button");
    upBtn.type = "button";
    upBtn.className = "tl-move-btn";
    upBtn.setAttribute("aria-label", d.moveUpAria);
    upBtn.disabled = idx === 0;
    upBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>';
    upBtn.addEventListener("click", function () {
      moveTimelineEntry(item.id, "up");
    });

    var downBtn = document.createElement("button");
    downBtn.type = "button";
    downBtn.className = "tl-move-btn";
    downBtn.setAttribute("aria-label", d.moveDownAria);
    downBtn.disabled = idx === state.timeline.length - 1;
    downBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
    downBtn.addEventListener("click", function () {
      moveTimelineEntry(item.id, "down");
    });

    var remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-btn";
    remove.setAttribute("aria-label", d.removePlace);
    remove.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></svg>';
    remove.addEventListener("click", function () {
      removeTimelineEntry(item.id);
    });

    var actions = document.createElement("div");
    actions.className = "tl-actions";
    actions.appendChild(upBtn);
    actions.appendChild(downBtn);
    actions.appendChild(remove);

    body.appendChild(detailRow);
    body.appendChild(actions);

    el.appendChild(head);
    el.appendChild(body);
    return el;
  }

  function renderTimeline() {
    tlList.innerHTML = "";
    tlApplyExpandedFns = {};
    state.timeline.forEach(function (item, idx) {
      tlList.appendChild(buildTlItem(item, idx));
    });
    addTlBtn.disabled = state.timeline.length >= MAX_PLACES;
    var d = t().config.step0;
    var nextIsExtra = state.timeline.length >= MIN_PLACES;
    if (nextIsExtra) {
      addTlBtn.innerHTML = escapeHtml(d.addBtn) + ' <span class="extra-badge">+€' + EXTRA_PLACE_COST + "</span>";
    } else {
      addTlBtn.textContent = d.addBtn;
    }
    addTlBtn.title = nextIsExtra ? d.extraPlaceHint : "";
  }

  addTlBtn.addEventListener("click", addTimelineEntry);

  /* ---------- format step ---------- */
  function currentPrice() {
    var discount = state.frame === "geenlijst" ? NO_FRAME_DISCOUNT : 0;
    return PRICE + extraPlacesCount() * EXTRA_PLACE_COST - discount;
  }
  function renderFormat() {
    submitPriceAmount.textContent = "€" + currentPrice();
  }

  /* ---------- frame step ---------- */
  function selectFrame(material) {
    state.frame = material;
    save();
    renderFrame();
    renderFormat();
    refreshDateMin();
  }
  frameGrid.querySelectorAll(".frame-swatch img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.display = "none";
    });
  });
  frameGrid.addEventListener("click", function (e) {
    var card = e.target.closest(".format-card");
    if (!card) return;
    selectFrame(card.dataset.frame);
  });
  frameGrid.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var card = e.target.closest(".format-card");
    if (!card) return;
    e.preventDefault();
    selectFrame(card.dataset.frame);
  });
  function renderFrame() {
    frameGrid.querySelectorAll(".format-card").forEach(function (card) {
      card.setAttribute("aria-pressed", String(card.dataset.frame === state.frame));
    });
    if (noFrameNote) noFrameNote.hidden = state.frame !== "geenlijst";
  }

  /* ---------- details step ---------- */
  // Nudge the scroll container up on focus so the next field is already visible.
  // Relying on the browser's own scroll-into-view-on-focus was inconsistent between
  // fields (worked for name, weaker for email, stopped for phone) — doing it ourselves
  // gives every field in this step the same behavior. The delay lets a mobile on-screen
  // keyboard finish opening (which resizes the viewport) before we measure position.
  [contactName, contactEmail, contactPhone, contactStreet, contactCity, contactPostal, contactCountry, contactDate, contactNotes].forEach(function (el) {
    el.addEventListener("focus", function () {
      setTimeout(function () {
        if (!configScroll) return;
        var margin = 24;
        var offset = el.getBoundingClientRect().top - configScroll.getBoundingClientRect().top - margin;
        if (offset !== 0) configScroll.scrollBy({ top: offset, behavior: "smooth" });
      }, 300);
    });
  });
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
    refreshPhoneError();
  });
  function refreshPhoneError() {
    var value = state.contact.phone.trim();
    phoneError.hidden = !value || isValidPhone(value);
  }
  contactStreet.addEventListener("input", function () {
    state.contact.street = contactStreet.value;
    save();
    updateSubmitState();
  });
  contactCity.addEventListener("input", function () {
    state.contact.city = contactCity.value;
    save();
    updateSubmitState();
  });
  contactPostal.addEventListener("input", function () {
    state.contact.postalCode = contactPostal.value;
    save();
    updateSubmitState();
  });
  contactCountry.addEventListener("change", function () {
    state.contact.country = contactCountry.value;
    save();
    updateSubmitState();
  });
  function populateCountryOptions() {
    var selected = contactCountry.value || state.contact.country;
    contactCountry.innerHTML = "";
    countryOptions().forEach(function (entry) {
      var label = countryLabel(entry);
      var opt = document.createElement("option");
      opt.value = label;
      opt.textContent = label;
      contactCountry.appendChild(opt);
    });
    contactCountry.value = selected;
  }
  // Walks forward day-by-day skipping Sat/Sun — used to compute the earliest
  // selectable delivery date, which depends on whether a frame was chosen.
  function addWorkingDays(date, n) {
    var result = new Date(date);
    var added = 0;
    while (added < n) {
      result.setDate(result.getDate() + 1);
      var day = result.getDay();
      if (day !== 0 && day !== 6) added++;
    }
    return result;
  }
  function toDateInputValue(d) {
    var m = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    return d.getFullYear() + "-" + m + "-" + day;
  }
  function refreshDateMin() {
    var days = state.frame === "geenlijst" ? NO_FRAME_TURNAROUND_DAYS : FRAME_TURNAROUND_DAYS;
    var min = toDateInputValue(addWorkingDays(new Date(), days));
    contactDate.min = min;
    if (contactDate.value && contactDate.value < min) {
      contactDate.value = "";
      state.contact.desiredDate = "";
      save();
      updateSubmitState();
    }
  }
  contactDate.addEventListener("focus", function () {
    if (contactDate.showPicker) {
      try {
        contactDate.showPicker();
      } catch (err) {
        /* unsupported in this browser context, field still works normally */
      }
    }
  });
  contactDate.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" && e.key !== "Escape") e.preventDefault();
  });
  contactDate.addEventListener("change", function () {
    state.contact.desiredDate = contactDate.value;
    save();
    updateSubmitState();
  });
  contactNotes.addEventListener("input", function () {
    state.contact.notes = contactNotes.value;
    save();
  });
  function renderDetails() {
    contactName.value = state.contact.name;
    contactEmail.value = state.contact.email;
    contactPhone.value = state.contact.phone;
    refreshPhoneError();
    contactStreet.value = state.contact.street;
    contactCity.value = state.contact.city;
    contactPostal.value = state.contact.postalCode;
    populateCountryOptions();
    contactDate.value = state.contact.desiredDate;
    refreshDateMin();
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
      d.labels.frame,
      state.frame === "eikenhout" ? t().config.stepFrame.eikenhoutLabel : state.frame === "geenlijst" ? t().config.stepFrame.geenlijstLabel : t().config.stepFrame.grafietLabel
    ]);
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
    rows.push([d.labels.address, escapeHtml(composeAddress(state.contact) || "—")]);
    if (state.contact.desiredDate) {
      var dateObj = new Date(state.contact.desiredDate + "T00:00:00");
      var dateLocale = lang === "nl" ? "nl-NL" : "en-GB";
      rows.push([d.labels.desiredDate, escapeHtml(dateObj.toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" }))]);
    }
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
    var remaining = MIN_REQUIRED_PLACES - filledPlacesCount();
    if (remaining > 0) {
      return remaining === 1 ? d.needMoreOne : d.needMoreMany.replace("{n}", remaining);
    }
    if (state.timeline.length >= MAX_PLACES) return d.maxReached;
    return "";
  }

  function renderTimelineProgress() {
    var d = t().config.step0;
    tlProgress.textContent = d.progressLabel.replace("{done}", filledPlacesCount()).replace("{min}", MIN_REQUIRED_PLACES);
  }

  function updateSubmitState() {
    var ok = canSubmit();
    submitBtn.disabled = !ok;
    renderTimelineProgress();
    renderFormat();

    var tlHint = timelineHintText();
    tlNextHint.textContent = tlHint;
    tlNextHint.hidden = !tlHint;
  }

  function renderAll() {
    configForm.hidden = state.submitted;
    configSuccess.hidden = !state.submitted;
    configSubmitBar.hidden = state.submitted;
    // configForm and configSuccess share one scrolling container (.config-scroll) — on submit
    // the tall form collapses to the short success message, but the scroll position doesn't
    // reset on its own, so without this the customer stays scrolled past it into blank space.
    if (state.submitted && configScroll) configScroll.scrollTop = 0;
    renderTimeline();
    renderFormat();
    renderFrame();
    renderDetails();
    renderReview();
    updateSubmitState();
    renderSuccessOrderNumber();
  }

  applyLang();
})();
