# SEO & AI-vindbaarheid: aanbevelingen voor Line

Gebaseerd op een audit van de huidige site (`index.html`, `script.js`, `style.css`, GitHub Pages deploy zonder eigen domein). Ingedeeld op impact. "AI-zoekresultaten" hieronder = ChatGPT, Perplexity, Google AI Overviews, Claude, etc. wanneer ze antwoorden bouwen op basis van wat ze crawlen of citeren.

---

## 0. Het grootste structurele probleem: geen eigen domein

De site draait nu op `keesassistant-droid.github.io/Line-website`. Dat is voor zoekmachines en AI-crawlers een subpad van een GitHub-account, geen eigen merk-domein. Gevolgen:
- Weegt zwaar mee in ranking (domeinautoriteit start op nul en wordt nooit echt "van jou").
- Oogt minder betrouwbaar in zoekresultaten en bij AI-citaties (bron = "github.io" ipv "line.nl" of vergelijkbaar).
- Kan niet gekoppeld worden aan een Google Business Profile op een geloofwaardige manier.

**Aanbeveling:** koop een domein (bijv. `wijzijnline.nl`, `line-cadeau.nl`, iets met "line" + een onderscheidend woord, want "Line" alleen is een generiek woord waar je nooit op zult ranken, zie punt 5) en koppel dat aan GitHub Pages (gratis, alleen een CNAME-record nodig). Dit is de investering met het hoogste rendement van alles hieronder, en de meeste andere aanbevelingen (canonical URLs, structured data, sitemap) werken pas echt goed zodra er een stabiel domein is.

---

## 1. Technische basis die volledig ontbreekt (lage moeite, hoge impact)

Gecontroleerd in de `<head>`: er is alleen een `<title>` en één `<meta description>`. Dit ontbreekt allemaal:

| Ontbrekend | Waarom het uitmaakt |
|---|---|
| `<title>` is nu simpelweg "Line" | Extreem generiek, geen zoekwoord, geen contextsignaal. Moet iets zijn als "Line — Persoonlijke lijntekening als cadeau \| Handgetekend" |
| Open Graph tags (`og:title`, `og:image`, `og:description`) | Zonder deze ziet een gedeelde link op WhatsApp/LinkedIn/Facebook er kaal uit (geen preview-afbeelding), wat CTR en shares kost |
| Twitter/X card tags | Zelfde probleem specifiek voor X |
| `<link rel="canonical">` | Voorkomt duplicate-content verwarring, vooral belangrijk zodra je varianten met/zonder trailing slash of query-params krijgt |
| `robots.txt` | Bestaat nog niet. Zonder dit bestand is er geen expliciete uitnodiging voor AI-crawlers (zie punt 4) |
| `sitemap.xml` | Helpt crawlers (inclusief AI-crawlers) alle pagina's vinden, ook `voorwaarden.html` en `privacybeleid.html` die nu nergens vanuit gelinkt worden buiten de footer |
| Favicon / `apple-touch-icon` | Ontbreekt volledig. Kleine impact op ranking maar directe impact op merkherkenning in tabbladen, bookmarks en zoekresultaten |
| `width`/`height` op alle `<img>`-tags | Geen enkele afbeelding heeft expliciete afmetingen, wat layout shift (CLS) veroorzaakt tijdens laden. Dit is een directe Core Web Vitals ranking-factor |
| `loading="lazy"` staat óók op de hero-header-foto | Dat is het grootste zichtbare element bij binnenkomst (de LCP-afbeelding). Lazy-loaden vertraagt 'm juist; dit zou als enige afbeelding juist prioriteit moeten krijgen (`fetchpriority="high"`, geen lazy) |

Dit zijn allemaal risicoloze, geen-smaak-vereisende technische fixes. Ik kan deze zo doorvoeren als je akkoord geeft.

---

## 2. Structured data (schema.org / JSON-LD) — dit is de kern van AI-vindbaarheid

AI-zoekmachines en Google's AI Overviews lezen bij voorkeur gestructureerde data in plaats van vrije tekst te interpreteren. Dit is precies waarom sommige bedrijven wél en andere niet in "beste cadeau-ideeën"-lijstjes en AI-antwoorden verschijnen: de AI kan feiten (prijs, wat het is, hoe het werkt) er direct uit halen.

Concreet toe te voegen (allemaal puur technisch, geen ontwerpwerk):

1. **Organization / LocalBusiness schema** — met de gegevens die al in de footer staan: "Kees Design & Consultancy", KVK 76246930, Amsterdam, telefoonnummer. Dit is direct bruikbaar, niets verzonnen.
2. **Product/Service schema** — naam ("Line"), beschrijving, prijs (vanaf €299), wat erbij zit (lijst, formaat 20×60cm), doorlooptijd (2-3 weken).
3. **FAQPage schema** — je hebt al een echte FAQ-sectie met goede vraag/antwoord-content. Dit is de makkelijkste winst: FAQPage schema wordt zowel door Google (rich snippets) als door AI-antwoordmachines veel gebruikt om directe antwoorden te tonen, vaak met een link naar jouw site als bron.
4. **BreadcrumbList** — minder relevant zolang het een one-pager is, lage prioriteit.

Dit alles is 100% grondig te baseren op bestaande, echte content op de site. Ik zou hier geen testimonial/Review-schema aan toevoegen tenzij je kunt bevestigen dat de testimonials van echte, traceerbare klanten zijn: nepdata of niet-verifieerbare reviews in structured data zetten is riskant (Google's richtlijnen tegen misleidende markup) en dat wil ik niet zomaar doen zonder het met je te checken.

---

## 3. AI-crawlers specifiek toelaten en voeden

Naast klassieke SEO crawlen aparte bots specifiek voor AI-modellen en AI-zoekmachines. Zonder `robots.txt` is er geen enkel signaal naar ze. Aan te bevelen om expliciet toe te staan:

- `GPTBot` (OpenAI / ChatGPT search)
- `ChatGPT-User`
- `PerplexityBot`
- `Google-Extended` (voedt Google's Gemini/AI Overviews, los van de gewone Googlebot-indexering)
- `anthropic-ai` / `ClaudeBot`
- `CCBot` (Common Crawl, waar veel modellen mee trainen)

Verder relevant, meer inhoudelijk dan technisch:
- **Zorg dat feitelijke claims in platte tekst staan, niet alleen visueel in een SVG-diagram.** Het prijs-diagram in de "Pricing"-sectie is een SVG met tekst erin die crawlers slecht tot niet kunnen lezen als los feit ("vanaf €299, inclusief BTW en verzending"). Zet die kernprijs ook als gewone tekst ernaast of eronder, puur voor leesbaarheid door bots (en mensen met screenreaders, wat ook al een gat is).
- **Eén losstaand, quote-baar zinnetje** over wat Line is en voor wie, in gewone `<p>`-tekst hoog op de pagina, helpt AI-modellen om je correct samen te vatten. De huidige hero-tekst is hier al best geschikt voor.
- Overweeg een `llms.txt` bestand in de root: een opkomende (nog niet universeel gesteunde) conventie waarin je in platte tekst samenvat wat de site is, voor AI-agents die daarnaar zoeken. Lage zekerheid dat het nu al gebruikt wordt, maar kost bijna niets om toe te voegen.

---

## 4. De Engelse versie is voor zoekmachines onzichtbaar

De taalwissel (NL/EN) gebeurt volledig client-side via JavaScript (`applyLang()`), zonder aparte URL's. Dat betekent:
- Er bestaat geen `/en/` of `?lang=en` variant die een crawler kan vinden en indexeren.
- Engelstalige zoekopdrachten ("personalized line drawing gift", "hand drawn map of your life") kunnen deze site nooit tonen, ook al is de content er wél (achter een taalknop).
- Er is geen `hreflang` markup, dus zelfs als er wel een aparte URL was, zou Google niet weten dat het dezelfde pagina in twee talen is.

**Aanbeveling:** als internationale klanten (of Nederlandse expats die in het Engels zoeken) een doelgroep zijn, is een losse `/en/` URL met de Engelse content en wederzijdse `hreflang`-tags de juiste oplossing. Dit is een grotere wijziging (aparte pagina genereren of een build-stap toevoegen) en wil ik niet zomaar doen zonder jouw akkoord, want het raakt de architectuur van de site (nu single-page, geen build-proces).

---

## 5. Contentstrategie: waarom in "cadeau-ideeën"-lijstjes komen

Dit is het punt waar techniek ophoudt en contentwerk begint. Wat AI-modellen en Google daadwerkelijk citeren in "beste persoonlijke cadeaus"-lijstjes zijn meestal:
1. Sites die zelf al zulke lijstjes/gidsen publiceren (bijv. een eigen pagina "10 ideeën voor een persoonlijk cadeau bij een verhuizing"), waardoor je zelf in de zoekresultaten verschijnt voor die brede zoektermen, niet alleen voor je merknaam.
2. Sites die ergens anders al genoemd worden: cadeaugidsen van derden, Pinterest, Etsy-achtige marktplaatsen, lokale Amsterdamse gift-guides, bruiloftsblogs. AI-antwoordmachines wegen zwaar mee wat al elders als betrouwbaar aangemerkt is; een gloednieuwe site zonder externe vermeldingen wordt zelden spontaan aanbevolen.
3. Een Google Business Profile (gratis), zeker met de KVK-registratie die je al hebt. Dit voedt zowel de lokale "in de buurt"-resultaten als Google's Knowledge Graph, wat weer AI Overviews voedt.

Concrete stappen, in volgorde van makkelijk naar lastig:
- Google Business Profile aanmaken (gratis, ~15 minuten).
- Een paar pagina's/secties toevoegen die zoekintentie targeten die breder is dan je merknaam: "cadeau voor verhuizing", "afscheidscadeau", "persoonlijk huwelijkscadeau" als eigen secties of losse landingspagina's met eigen `<title>`/meta description.
- Zelf een plek in 1-2 externe cadeaugidsen of lokale ondernemersoverzichten proberen te krijgen (contact/PR, geen technische taak).
- Overwegen om zelf aanwezig te zijn op een plek waar mensen al naar dit soort cadeaus zoeken (Etsy, Pinterest) al is het maar voor de backlink en zichtbaarheid, ook als je daar niet primair verkoopt.

Dit onderdeel gaat verder dan code en is een keuze die bij jou ligt (tijd/moeite vs. verwachte opbrengst). Ik geef het als context, niet als iets wat ik nu ga bouwen.

---

## 6. Kleinere observaties

- Alle 7 voorbeeldfoto's in de gallery hebben identieke alt-tekst ("Line, met de hand getekend"). Unieke, beschrijvende alt-teksten per foto (bijv. wat de tijdlijn voorstelt) helpen zowel Google Images als AI-modellen die afbeeldingen proberen te begrijpen.
- De merknaam "Line" is een doodgewoon Engels woord. Dat maakt het vrijwel onmogelijk om op de merknaam zelf te ranken (te veel concurrentie van niet-gerelateerde resultaten). Geen actie nodig nu, maar goed om te weten: naamsbekendheid zal via andere kanalen moeten komen dan "mensen googelen toevallig 'Line'".
- `voorwaarden.html` en `privacybeleid.html` bestaan maar worden nergens door interne links vanaf de homepage naar gelinkt behalve in de footer/configurator. Dat is prima voor gebruikers maar zorg dat ze wel in de sitemap staan zodat ze gecrawld worden.

---

## Wat wil je dat ik nu oppak?

Puur technisch en risicoloos (geen smaak- of architectuurkeuzes nodig): **punt 1 (meta tags, robots.txt, sitemap.xml, favicon, image dimensions, LCP-fix) en punt 2 (JSON-LD structured data op basis van bestaande content)**. Kan ik direct implementeren.

Grotere keuzes die eerst input van jou nodig hebben: eigen domein (punt 0), Engelse URL-structuur (punt 4), en de contentstrategie (punt 5).
