/**
 * Central route configuration for all transfer routes.
 * To add a new route — just add an entry to ROUTES array.
 * The [slug] page, sitemap, footer, and internal links all read from here.
 */

export interface RouteData {
  /** URL slug, e.g. "warsaw-budapest" */
  slug: string
  from: { en: string; pl: string }
  to: { en: string; pl: string }
  fromCountry: string
  toCountry: string
  /** Distance in km */
  distanceKm: number
  /** Approximate drive time label */
  duration: { en: string; pl: string }
  /** Hero image path (reuse city images) */
  heroImage: string
  /** Route description paragraphs — rich SEO content */
  description: { en: string; pl: string }
  /** 6 route advantages */
  advantages: { en: string[]; pl: string[] }
  /** 5 FAQ items specific to this route */
  faq: { q: { en: string; pl: string }; a: { en: string; pl: string } }[]
  /** Nearby/related route slugs (for "Other Routes" section) */
  relatedSlugs: string[]
}

/* ─── Fleet data (shared across all route pages) ────────────── */
export const FLEET_VEHICLES = [
  {
    id: "passat-b8",
    name: "VW Passat B8",
    classKey: "comfort" as const,
    pax: 4,
    luggage: 3,
    image: "/images/cars/passat-b8.png",
  },
  {
    id: "skoda-superb",
    name: "Škoda Superb L&K",
    classKey: "comfort" as const,
    pax: 4,
    luggage: 3,
    image: "/images/cars/skoda-superb.png",
  },
  {
    id: "mercedes-eclass",
    name: "Mercedes-Benz E-Class",
    classKey: "business" as const,
    pax: 3,
    luggage: 3,
    image: "/images/cars/mercedes-eclass.png",
  },
  {
    id: "audi-a6",
    name: "Audi A6 S Line",
    classKey: "business" as const,
    pax: 3,
    luggage: 3,
    image: "/images/cars/audi-a6.png",
  },
  {
    id: "mercedes-vclass",
    name: "Mercedes-Benz V-Class",
    classKey: "premium" as const,
    pax: 7,
    luggage: 6,
    image: "/images/cars/mercedes-vclass.png",
  },
  {
    id: "mercedes-sclass",
    name: "Mercedes-Benz S-Class",
    classKey: "premium" as const,
    pax: 3,
    luggage: 3,
    image: "/images/cars/mercedes-sclass.png",
  },
]

/* ─── All routes ─────────────────────────────────────────────── */
export const ROUTES: RouteData[] = [
  {
    slug: "warsaw-budapest",
    from: { en: "Warsaw", pl: "Warszawa" },
    to: { en: "Budapest", pl: "Budapeszt" },
    fromCountry: "PL",
    toCountry: "HU",
    distanceKm: 690,
    duration: { en: "~7.5 h", pl: "~7,5 godz." },
    heroImage: "/images/city-budapest.jpg",
    description: {
      en: "The private transfer from Warsaw to Budapest covers approximately 690 km through southern Poland, Slovakia, and into Hungary. The route follows the A1 and E75 motorways, passing through the scenic Tatra Mountain region. With Movi Transfer you travel in a premium Mercedes-Benz with a professional chauffeur, enjoying complimentary Wi-Fi, bottled water, and climate-controlled comfort throughout the journey. This door-to-door service eliminates the need for flights with layovers or crowded train connections between the two capitals.",
      pl: "Prywatny transfer z Warszawy do Budapesztu to około 690 km przez południową Polskę, Słowację i Węgry. Trasa prowadzi autostradami A1 i E75, przechodząc przez malowniczy region Tatr. Z Movi Transfer podróżujesz premium Mercedesem-Benz z profesjonalnym kierowcą, korzystając z bezpłatnego Wi-Fi, wody butelkowanej i klimatyzacji przez całą podróż. Ta usługa door-to-door eliminuje potrzebę lotów z przesiadkami czy zatłoczonych połączeń kolejowych między obiema stolicami.",
    },
    advantages: {
      en: [
        "Direct door-to-door service — no transfers, no waiting at stations",
        "Professional multilingual chauffeur fluent in English, Polish, and German",
        "Premium Mercedes-Benz fleet with Wi-Fi, charging ports, and refreshments",
        "Flexible departure time — travel when it suits your schedule, 24/7",
        "Fixed price with no hidden fees — tolls, fuel, and parking included",
        "Free cancellation up to 24 hours before departure",
      ],
      pl: [
        "Bezpośrednia usługa door-to-door — bez przesiadek, bez czekania na stacjach",
        "Profesjonalny wielojęzyczny kierowca mówiący po angielsku, polsku i niemiecku",
        "Flota premium Mercedes-Benz z Wi-Fi, portami do ładowania i napojami",
        "Elastyczny czas odjazdu — podróżuj kiedy Ci pasuje, 24/7",
        "Stała cena bez ukrytych opłat — opłaty drogowe, paliwo i parking w cenie",
        "Bezpłatna anulacja do 24 godzin przed wyjazdem",
      ],
    },
    faq: [
      {
        q: { en: "How long does a private transfer from Warsaw to Budapest take?", pl: "Ile trwa prywatny transfer z Warszawy do Budapesztu?" },
        a: { en: "The journey takes approximately 7–8 hours depending on traffic and road conditions. Your chauffeur selects the optimal route in real time.", pl: "Podróż trwa około 7–8 godzin w zależności od ruchu i warunków drogowych. Twój kierowca wybiera optymalną trasę w czasie rzeczywistym." },
      },
      {
        q: { en: "What is the price of a private transfer Warsaw to Budapest?", pl: "Jaka jest cena prywatnego transferu Warszawa — Budapeszt?" },
        a: { en: "Pricing depends on the vehicle class chosen. We provide a personalized quote within 2 hours of your booking request. The price includes door-to-door service, tolls, fuel, and refreshments — no hidden fees.", pl: "Cena zależy od wybranej klasy pojazdu. Przedstawiamy spersonalizowaną wycenę w ciągu 2 godzin od zapytania. Cena obejmuje usługę door-to-door, opłaty drogowe, paliwo i napoje — bez ukrytych kosztów." },
      },
      {
        q: { en: "Can I make stops along the way?", pl: "Czy mogę się zatrzymać po drodze?" },
        a: { en: "Yes, comfort stops are included and you can request additional stops — for example in Kraków or the Slovak Tatras. Just let us know when booking.", pl: "Tak, przerwy komfortowe są wliczone i możesz poprosić o dodatkowe przystanki — na przykład w Krakowie lub na Słowackich Tatrach. Wystarczy nas poinformować przy rezerwacji." },
      },
      {
        q: { en: "What vehicles are available for this route?", pl: "Jakie pojazdy są dostępne na tę trasę?" },
        a: { en: "We offer three classes: Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class), and Premium (Mercedes V-Class, S-Class). All vehicles are late-model, air-conditioned, and equipped with Wi-Fi.", pl: "Oferujemy trzy klasy: Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class) i Premium (Mercedes V-Class, S-Class). Wszystkie pojazdy są z ostatnich roczników, klimatyzowane i wyposażone w Wi-Fi." },
      },
      {
        q: { en: "Is the transfer available at night or on weekends?", pl: "Czy transfer jest dostępny w nocy lub w weekendy?" },
        a: { en: "Absolutely. We operate 24 hours a day, 7 days a week, 365 days a year. Night and weekend transfers are available at the same rate.", pl: "Oczywiście. Działamy 24 godziny na dobę, 7 dni w tygodniu, 365 dni w roku. Transfery nocne i weekendowe są dostępne w tej samej cenie." },
      },
    ],
    relatedSlugs: ["warsaw-krakow", "warsaw-berlin", "warsaw-vienna", "warsaw-bratislava", "krakow-budapest"],
  },
  {
    slug: "warsaw-gdansk",
    from: { en: "Warsaw", pl: "Warszawa" },
    to: { en: "Gdańsk", pl: "Gdańsk" },
    fromCountry: "PL",
    toCountry: "PL",
    distanceKm: 340,
    duration: { en: "~4 h", pl: "~4 godz." },
    heroImage: "/images/city-warsaw.jpg",
    description: {
      en: "The private transfer from Warsaw to Gdańsk covers approximately 340 km along the S7 expressway, one of Poland's best-maintained highways. The journey takes around 4 hours, making it a comfortable alternative to domestic flights or train travel. Movi Transfer provides premium door-to-door service with a professional chauffeur, complimentary Wi-Fi, and refreshments. Whether you're heading to the Tri-City area for business or to explore the Baltic coast, we ensure a smooth, punctual ride.",
      pl: "Prywatny transfer z Warszawy do Gdańska to około 340 km drogą ekspresową S7, jedną z najlepiej utrzymanych tras w Polsce. Podróż trwa około 4 godzin, co stanowi komfortową alternatywę dla lotów krajowych czy podróży pociągiem. Movi Transfer zapewnia usługę premium door-to-door z profesjonalnym kierowcą, bezpłatnym Wi-Fi i napojami. Niezależnie czy jedziesz do Trójmiasta w sprawach biznesowych, czy na wypoczynek nad Bałtykiem, gwarantujemy płynną i punktualną podróż.",
    },
    advantages: {
      en: [
        "Direct door-to-door service — no transfers, no waiting at stations",
        "Professional multilingual chauffeur fluent in English, Polish, and German",
        "Premium Mercedes-Benz fleet with Wi-Fi, charging ports, and refreshments",
        "Flexible departure time — travel when it suits your schedule, 24/7",
        "Fixed price with no hidden fees — tolls, fuel, and parking included",
        "Free cancellation up to 24 hours before departure",
      ],
      pl: [
        "Bezpośrednia usługa door-to-door — bez przesiadek, bez czekania na stacjach",
        "Profesjonalny wielojęzyczny kierowca mówiący po angielsku, polsku i niemiecku",
        "Flota premium Mercedes-Benz z Wi-Fi, portami do ładowania i napojami",
        "Elastyczny czas odjazdu — podróżuj kiedy Ci pasuje, 24/7",
        "Stała cena bez ukrytych opłat — opłaty drogowe, paliwo i parking w cenie",
        "Bezpłatna anulacja do 24 godzin przed wyjazdem",
      ],
    },
    faq: [
      {
        q: { en: "How long does a private transfer from Warsaw to Gdańsk take?", pl: "Ile trwa prywatny transfer z Warszawy do Gdańska?" },
        a: { en: "The drive takes approximately 4 hours via the S7 expressway. Door-to-door travel time may vary slightly depending on your pickup and drop-off locations.", pl: "Jazda trwa około 4 godzin drogą ekspresową S7. Czas podróży door-to-door może się nieznacznie różnić w zależności od miejsc odbioru i docelowych." },
      },
      {
        q: { en: "What is the price of a Warsaw to Gdańsk private transfer?", pl: "Jaka jest cena prywatnego transferu Warszawa — Gdańsk?" },
        a: { en: "Pricing depends on the vehicle class. We provide a personalized quote within 2 hours. The price includes door-to-door service, tolls, fuel, and refreshments.", pl: "Cena zależy od klasy pojazdu. Przedstawiamy spersonalizowaną wycenę w ciągu 2 godzin. Cena obejmuje usługę door-to-door, opłaty drogowe, paliwo i napoje." },
      },
      {
        q: { en: "Can you pick me up from Warsaw Chopin Airport?", pl: "Czy możecie odebrać mnie z lotniska Chopina w Warszawie?" },
        a: { en: "Yes, airport pickups are our speciality. Your chauffeur will meet you in the arrivals hall with a name sign and assist with luggage. We monitor flight arrivals in real time.", pl: "Tak, odbiory z lotniska to nasza specjalność. Kierowca spotka Cię w hali przylotów z tabliczką i pomoże z bagażem. Monitorujemy przyloty w czasie rzeczywistym." },
      },
      {
        q: { en: "What vehicles are available for this route?", pl: "Jakie pojazdy są dostępne na tę trasę?" },
        a: { en: "We offer Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class), and Premium (Mercedes V-Class, S-Class). All vehicles are late-model and fully equipped.", pl: "Oferujemy Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class) i Premium (Mercedes V-Class, S-Class). Wszystkie pojazdy z ostatnich roczników, w pełni wyposażone." },
      },
      {
        q: { en: "Is the transfer available 24/7?", pl: "Czy transfer jest dostępny 24/7?" },
        a: { en: "Yes, we operate around the clock, 365 days a year. Early morning, late night, weekends, and holidays — same price, same quality.", pl: "Tak, działamy całodobowo, 365 dni w roku. Wczesny ranek, późna noc, weekendy i święta — ta sama cena, ta sama jakość." },
      },
    ],
    relatedSlugs: ["gdansk-warsaw", "warsaw-krakow", "warsaw-berlin", "gdansk-berlin", "gdansk-poznan"],
  },
  {
    slug: "warsaw-krakow",
    from: { en: "Warsaw", pl: "Warszawa" },
    to: { en: "Kraków", pl: "Kraków" },
    fromCountry: "PL",
    toCountry: "PL",
    distanceKm: 295,
    duration: { en: "~3.5 h", pl: "~3,5 godz." },
    heroImage: "/images/city-prague.jpg",
    description: {
      en: "The private transfer from Warsaw to Kraków covers approximately 295 km along the A1 and A4 motorways, Poland's primary north-south corridor. The journey takes around 3.5 hours — faster and more comfortable than the train, with the added convenience of door-to-door pickup. Movi Transfer provides a professional chauffeur, premium Mercedes-Benz vehicle, complimentary Wi-Fi, and refreshments. This is the most popular domestic route in our network, connecting Poland's capital with its cultural capital.",
      pl: "Prywatny transfer z Warszawy do Krakowa to około 295 km autostradami A1 i A4, głównym korytarzem północ-południe Polski. Podróż trwa około 3,5 godziny — szybciej i wygodniej niż pociągiem, z dodatkową zaletą odbioru door-to-door. Movi Transfer zapewnia profesjonalnego kierowcę, premium Mercedesa-Benz, bezpłatne Wi-Fi i napoje. To najpopularniejsza trasa krajowa w naszej sieci, łącząca stolicę Polski z jej kulturalną stolicą.",
    },
    advantages: {
      en: [
        "Direct door-to-door service — no transfers, no waiting at stations",
        "Professional multilingual chauffeur fluent in English, Polish, and German",
        "Premium Mercedes-Benz fleet with Wi-Fi, charging ports, and refreshments",
        "Flexible departure time — travel when it suits your schedule, 24/7",
        "Fixed price with no hidden fees — tolls, fuel, and parking included",
        "Free cancellation up to 24 hours before departure",
      ],
      pl: [
        "Bezpośrednia usługa door-to-door — bez przesiadek, bez czekania na stacjach",
        "Profesjonalny wielojęzyczny kierowca mówiący po angielsku, polsku i niemiecku",
        "Flota premium Mercedes-Benz z Wi-Fi, portami do ładowania i napojami",
        "Elastyczny czas odjazdu — podróżuj kiedy Ci pasuje, 24/7",
        "Stała cena bez ukrytych opłat — opłaty drogowe, paliwo i parking w cenie",
        "Bezpłatna anulacja do 24 godzin przed wyjazdem",
      ],
    },
    faq: [
      {
        q: { en: "How long does a private transfer from Warsaw to Kraków take?", pl: "Ile trwa prywatny transfer z Warszawy do Krakowa?" },
        a: { en: "The journey takes approximately 3–3.5 hours via the A1 and A4 motorways. Exact time depends on traffic and your specific addresses.", pl: "Podróż trwa około 3–3,5 godziny autostradami A1 i A4. Dokładny czas zależy od ruchu i Twoich konkretnych adresów." },
      },
      {
        q: { en: "Is a private transfer faster than the train?", pl: "Czy prywatny transfer jest szybszy niż pociąg?" },
        a: { en: "The fastest trains take about 2.5 hours city centre to city centre, but you need to add travel time to and from stations. Our door-to-door service often matches or beats the total journey time while offering superior comfort.", pl: "Najszybsze pociągi jadą około 2,5 godziny z centrum do centrum, ale trzeba doliczyć dojazd na stację. Nasza usługa door-to-door często dorównuje lub bije całkowity czas podróży, oferując przy tym wyższy komfort." },
      },
      {
        q: { en: "Can I make a stop along the way?", pl: "Czy mogę się zatrzymać po drodze?" },
        a: { en: "Yes, comfort stops are included. You can also request a stop in Częstochowa, Radom, or any other location along the route at no extra cost.", pl: "Tak, przerwy komfortowe są wliczone. Możesz także poprosić o przystanek w Częstochowie, Radomiu lub innym miejscu na trasie bez dodatkowych kosztów." },
      },
      {
        q: { en: "What vehicles are available?", pl: "Jakie pojazdy są dostępne?" },
        a: { en: "Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class), and Premium (Mercedes V-Class, S-Class). All late-model, air-conditioned, with Wi-Fi.", pl: "Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class) i Premium (Mercedes V-Class, S-Class). Wszystkie z ostatnich roczników, klimatyzowane, z Wi-Fi." },
      },
      {
        q: { en: "Do you offer return transfers Kraków to Warsaw?", pl: "Czy oferujecie transfer powrotny Kraków — Warszawa?" },
        a: { en: "Yes, we operate both directions. You can book a one-way or round-trip transfer. See our Kraków → Warsaw route page for details.", pl: "Tak, obsługujemy oba kierunki. Możesz zarezerwować transfer w jedną stronę lub w obie. Zobacz naszą stronę trasy Kraków → Warszawa po szczegóły." },
      },
    ],
    relatedSlugs: ["krakow-warsaw", "warsaw-budapest", "warsaw-berlin", "krakow-vienna", "krakow-wroclaw"],
  },
  {
    slug: "warsaw-berlin",
    from: { en: "Warsaw", pl: "Warszawa" },
    to: { en: "Berlin", pl: "Berlin" },
    fromCountry: "PL",
    toCountry: "DE",
    distanceKm: 570,
    duration: { en: "~6 h", pl: "~6 godz." },
    heroImage: "/images/city-berlin.jpg",
    description: {
      en: "The private transfer from Warsaw to Berlin spans approximately 570 km along the A2 motorway, one of Europe's busiest east-west corridors. The 6-hour journey crosses the Schengen border seamlessly — no passport control, no delays. Movi Transfer offers premium door-to-door service connecting Poland's capital with Germany's, featuring a professional chauffeur, Mercedes-Benz vehicles, Wi-Fi, and refreshments. Ideal for business travellers and families seeking a hassle-free alternative to flights.",
      pl: "Prywatny transfer z Warszawy do Berlina to około 570 km autostradą A2, jednym z najruchliwszych korytarzy wschód-zachód w Europie. 6-godzinna podróż przebiega przez granicę Schengen bezproblemowo — bez kontroli paszportowej, bez opóźnień. Movi Transfer oferuje usługę premium door-to-door łączącą stolicę Polski ze stolicą Niemiec, z profesjonalnym kierowcą, pojazdami Mercedes-Benz, Wi-Fi i napojami. Idealna dla podróżnych biznesowych i rodzin szukających bezstresowej alternatywy dla lotów.",
    },
    advantages: {
      en: [
        "Direct door-to-door service — no transfers, no waiting at stations",
        "Professional multilingual chauffeur fluent in English, Polish, and German",
        "Premium Mercedes-Benz fleet with Wi-Fi, charging ports, and refreshments",
        "Seamless Schengen crossing — no border formalities or delays",
        "Fixed price with no hidden fees — tolls, fuel, and parking included",
        "Free cancellation up to 24 hours before departure",
      ],
      pl: [
        "Bezpośrednia usługa door-to-door — bez przesiadek, bez czekania na stacjach",
        "Profesjonalny wielojęzyczny kierowca mówiący po angielsku, polsku i niemiecku",
        "Flota premium Mercedes-Benz z Wi-Fi, portami do ładowania i napojami",
        "Bezproblemowe przekroczenie granicy Schengen — bez formalności i opóźnień",
        "Stała cena bez ukrytych opłat — opłaty drogowe, paliwo i parking w cenie",
        "Bezpłatna anulacja do 24 godzin przed wyjazdem",
      ],
    },
    faq: [
      {
        q: { en: "How long does a private transfer from Warsaw to Berlin take?", pl: "Ile trwa prywatny transfer z Warszawy do Berlina?" },
        a: { en: "The journey takes approximately 5.5–6.5 hours via the A2 motorway, depending on traffic conditions. The border crossing within the Schengen zone is seamless.", pl: "Podróż trwa około 5,5–6,5 godziny autostradą A2, w zależności od warunków drogowych. Przekroczenie granicy w strefie Schengen jest bezproblemowe." },
      },
      {
        q: { en: "Do I need a passport for a Warsaw to Berlin transfer?", pl: "Czy potrzebuję paszportu na transfer Warszawa — Berlin?" },
        a: { en: "Both Poland and Germany are in the Schengen zone, so EU citizens need only a valid ID card. Non-EU travellers should carry their passport.", pl: "Zarówno Polska, jak i Niemcy są w strefie Schengen, więc obywatele UE potrzebują jedynie ważnego dowodu osobistego. Podróżni spoza UE powinni mieć przy sobie paszport." },
      },
      {
        q: { en: "What is the price of a Warsaw to Berlin private transfer?", pl: "Jaka jest cena prywatnego transferu Warszawa — Berlin?" },
        a: { en: "Pricing depends on the vehicle class. We provide a personalized quote within 2 hours. All-inclusive — tolls, fuel, refreshments, and door-to-door service.", pl: "Cena zależy od klasy pojazdu. Wycenę przedstawiamy w ciągu 2 godzin. Wszystko wliczone — opłaty drogowe, paliwo, napoje i usługa door-to-door." },
      },
      {
        q: { en: "Can I be picked up from the airport?", pl: "Czy mogę być odebrany z lotniska?" },
        a: { en: "Yes, we offer pickups from Warsaw Chopin, Warsaw Modlin, and Berlin Brandenburg airports. Your chauffeur will meet you in the arrivals hall.", pl: "Tak, oferujemy odbiory z lotnisk Chopina, Modlina i Berlin Brandenburg. Kierowca spotka Cię w hali przylotów." },
      },
      {
        q: { en: "Is the transfer available 24/7?", pl: "Czy transfer jest dostępny 24/7?" },
        a: { en: "Yes, we operate around the clock, every day of the year. Night, weekend, and holiday transfers — same quality, same price.", pl: "Tak, działamy całą dobę, każdego dnia roku. Transfery nocne, weekendowe i świąteczne — ta sama jakość, ta sama cena." },
      },
    ],
    relatedSlugs: ["warsaw-budapest", "warsaw-prague", "warsaw-gdansk", "gdansk-berlin", "wroclaw-berlin"],
  },
  {
    slug: "warsaw-bratislava",
    from: { en: "Warsaw", pl: "Warszawa" },
    to: { en: "Bratislava", pl: "Bratysława" },
    fromCountry: "PL",
    toCountry: "SK",
    distanceKm: 660,
    duration: { en: "~7 h", pl: "~7 godz." },
    heroImage: "/images/city-vienna.jpg",
    description: {
      en: "The private transfer from Warsaw to Bratislava covers approximately 660 km through southern Poland and Slovakia. The route follows the A1 motorway south through Kraków before crossing into Slovakia via the scenic Tatra region. At around 7 hours, this premium service provides a comfortable alternative to multi-leg flights or train connections. Enjoy door-to-door luxury with Movi Transfer's Mercedes-Benz fleet, professional chauffeur, and complimentary amenities.",
      pl: "Prywatny transfer z Warszawy do Bratysławy to około 660 km przez południową Polskę i Słowację. Trasa prowadzi autostradą A1 na południe przez Kraków, a następnie do Słowacji przez malowniczy region Tatr. Około 7-godzinna podróż premium stanowi komfortową alternatywę dla wieloetapowych lotów czy połączeń kolejowych. Ciesz się luksusem door-to-door z flotą Mercedes-Benz Movi Transfer, profesjonalnym kierowcą i bezpłatnymi udogodnieniami.",
    },
    advantages: {
      en: [
        "Direct door-to-door service — no transfers, no waiting at stations",
        "Professional multilingual chauffeur fluent in English, Polish, and German",
        "Premium Mercedes-Benz fleet with Wi-Fi, charging ports, and refreshments",
        "Scenic route through the Tatra Mountains with optional stops",
        "Fixed price with no hidden fees — tolls, fuel, and parking included",
        "Free cancellation up to 24 hours before departure",
      ],
      pl: [
        "Bezpośrednia usługa door-to-door — bez przesiadek, bez czekania na stacjach",
        "Profesjonalny wielojęzyczny kierowca mówiący po angielsku, polsku i niemiecku",
        "Flota premium Mercedes-Benz z Wi-Fi, portami do ładowania i napojami",
        "Malownicza trasa przez Tatry z możliwością przystanków",
        "Stała cena bez ukrytych opłat — opłaty drogowe, paliwo i parking w cenie",
        "Bezpłatna anulacja do 24 godzin przed wyjazdem",
      ],
    },
    faq: [
      {
        q: { en: "How long does a private transfer from Warsaw to Bratislava take?", pl: "Ile trwa prywatny transfer z Warszawy do Bratysławy?" },
        a: { en: "Approximately 7 hours via the A1 motorway through Kraków and Slovakia. Your chauffeur selects the optimal route based on real-time traffic.", pl: "Około 7 godzin autostradą A1 przez Kraków i Słowację. Kierowca wybiera optymalną trasę na podstawie aktualnego ruchu." },
      },
      {
        q: { en: "Can I stop in Kraków on the way?", pl: "Czy mogę zatrzymać się w Krakowie po drodze?" },
        a: { en: "Absolutely. Kraków is directly on the route and a popular stop for lunch or sightseeing. Just let us know when booking.", pl: "Oczywiście. Kraków leży bezpośrednio na trasie i jest popularnym przystankiem na lunch lub zwiedzanie. Wystarczy poinformować nas przy rezerwacji." },
      },
      {
        q: { en: "What is the price?", pl: "Jaka jest cena?" },
        a: { en: "Pricing depends on vehicle class. We provide a quote within 2 hours. All-inclusive pricing — no hidden fees.", pl: "Cena zależy od klasy pojazdu. Wycenę przedstawiamy w ciągu 2 godzin. Cena all-inclusive — bez ukrytych kosztów." },
      },
      {
        q: { en: "What vehicles are available?", pl: "Jakie pojazdy są dostępne?" },
        a: { en: "Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class), and Premium (Mercedes V-Class, S-Class).", pl: "Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class) i Premium (Mercedes V-Class, S-Class)." },
      },
      {
        q: { en: "Is a passport required?", pl: "Czy paszport jest wymagany?" },
        a: { en: "Both countries are in the Schengen zone. EU citizens need only a valid ID card. Non-EU travellers should carry their passport.", pl: "Oba kraje są w strefie Schengen. Obywatele UE potrzebują jedynie ważnego dowodu osobistego. Podróżni spoza UE powinni mieć paszport." },
      },
    ],
    relatedSlugs: ["warsaw-vienna", "warsaw-budapest", "warsaw-krakow", "krakow-vienna", "katowice-vienna"],
  },
  {
    slug: "krakow-wroclaw",
    from: { en: "Kraków", pl: "Kraków" },
    to: { en: "Wrocław", pl: "Wrocław" },
    fromCountry: "PL",
    toCountry: "PL",
    distanceKm: 270,
    duration: { en: "~3 h", pl: "~3 godz." },
    heroImage: "/images/city-prague.jpg",
    description: {
      en: "The private transfer from Kraków to Wrocław covers approximately 270 km along the A4 motorway, Poland's primary east-west highway. The 3-hour journey connects two of Poland's most vibrant cities — Kraków's historic Old Town and Wrocław's picturesque riverside. Movi Transfer provides premium door-to-door service with professional chauffeur, Mercedes-Benz fleet, Wi-Fi, and refreshments.",
      pl: "Prywatny transfer z Krakowa do Wrocławia to około 270 km autostradą A4, główną trasą wschód-zachód w Polsce. 3-godzinna podróż łączy dwa z najprężniejszych miast Polski — historyczne Stare Miasto Krakowa i malownicze wrocławskie nadrzecze. Movi Transfer zapewnia usługę premium door-to-door z profesjonalnym kierowcą, flotą Mercedes-Benz, Wi-Fi i napojami.",
    },
    advantages: {
      en: [
        "Direct door-to-door service with no transfers needed",
        "Professional multilingual chauffeur",
        "Premium Mercedes-Benz fleet with Wi-Fi and refreshments",
        "Flexible 24/7 departure — travel on your schedule",
        "Fixed all-inclusive price — tolls, fuel, parking included",
        "Free cancellation up to 24 hours before departure",
      ],
      pl: [
        "Bezpośrednia usługa door-to-door bez przesiadek",
        "Profesjonalny wielojęzyczny kierowca",
        "Flota premium Mercedes-Benz z Wi-Fi i napojami",
        "Elastyczny wyjazd 24/7 — podróżuj według własnego planu",
        "Stała cena all-inclusive — opłaty, paliwo, parking w cenie",
        "Bezpłatna anulacja do 24 godzin przed wyjazdem",
      ],
    },
    faq: [
      {
        q: { en: "How long is a private transfer from Kraków to Wrocław?", pl: "Ile trwa prywatny transfer z Krakowa do Wrocławia?" },
        a: { en: "Approximately 3 hours via the A4 motorway.", pl: "Około 3 godziny autostradą A4." },
      },
      {
        q: { en: "What is the price?", pl: "Jaka jest cena?" },
        a: { en: "Pricing depends on vehicle class. Personalized quote within 2 hours. All-inclusive — no hidden fees.", pl: "Cena zależy od klasy pojazdu. Wycena w ciągu 2 godzin. All-inclusive — bez ukrytych opłat." },
      },
      {
        q: { en: "What vehicles are available?", pl: "Jakie pojazdy są dostępne?" },
        a: { en: "Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class), and Premium (Mercedes V-Class, S-Class).", pl: "Comfort (VW Passat, Škoda Superb), Business (Audi A6, Mercedes E-Class) i Premium (Mercedes V-Class, S-Class)." },
      },
      {
        q: { en: "Can I request a stop along the route?", pl: "Czy mogę poprosić o przystanek na trasie?" },
        a: { en: "Yes, comfort stops are included. You can also request a stop in Katowice or Opole at no extra cost.", pl: "Tak, przerwy są wliczone. Możesz poprosić o przystanek w Katowicach lub Opolu bez dodatkowych kosztów." },
      },
      {
        q: { en: "Is the service available at night?", pl: "Czy usługa jest dostępna w nocy?" },
        a: { en: "Yes, we operate 24/7, 365 days a year.", pl: "Tak, działamy 24/7, 365 dni w roku." },
      },
    ],
    relatedSlugs: ["krakow-warsaw", "krakow-vienna", "krakow-katowice", "wroclaw-berlin", "wroclaw-poznan"],
  },
  {
    slug: "krakow-vienna",
    from: { en: "Kraków", pl: "Kraków" },
    to: { en: "Vienna", pl: "Wiedeń" },
    fromCountry: "PL",
    toCountry: "AT",
    distanceKm: 460,
    duration: { en: "~5 h", pl: "~5 godz." },
    heroImage: "/images/city-vienna.jpg",
    description: {
      en: "The private transfer from Kraków to Vienna covers approximately 460 km through southern Poland, the Czech Republic, and into Austria. The 5-hour journey passes through beautiful Central European landscapes, crossing Schengen borders seamlessly. This route is extremely popular among business travellers and tourists connecting two of Europe's most culturally rich cities.",
      pl: "Prywatny transfer z Krakowa do Wiednia to około 460 km przez południową Polskę, Czechy i dalej do Austrii. 5-godzinna podróż prowadzi przez piękne krajobrazy Europy Środkowej, bezproblemowo przekraczając granice Schengen. Ta trasa jest niezwykle popularna wśród podróżnych biznesowych i turystów łączących dwa z najbogatszych kulturowo miast Europy.",
    },
    advantages: {
      en: [
        "Direct door-to-door service — Kraków hotel to Vienna address",
        "Professional multilingual chauffeur",
        "Premium Mercedes-Benz fleet with Wi-Fi and refreshments",
        "Seamless Schengen crossing — no border delays",
        "Fixed all-inclusive price — tolls, fuel, parking included",
        "Free cancellation up to 24 hours before departure",
      ],
      pl: [
        "Bezpośrednia usługa door-to-door — z hotelu w Krakowie pod adres w Wiedniu",
        "Profesjonalny wielojęzyczny kierowca",
        "Flota premium Mercedes-Benz z Wi-Fi i napojami",
        "Bezproblemowe przekroczenie granicy Schengen — bez opóźnień",
        "Stała cena all-inclusive — opłaty, paliwo, parking w cenie",
        "Bezpłatna anulacja do 24 godzin przed wyjazdem",
      ],
    },
    faq: [
      {
        q: { en: "How long does a private transfer Kraków to Vienna take?", pl: "Ile trwa prywatny transfer Kraków — Wiedeń?" },
        a: { en: "Approximately 5 hours. Route options include via Czech Republic or Slovakia.", pl: "Około 5 godzin. Opcje trasy obejmują przejazd przez Czechy lub Słowację." },
      },
      {
        q: { en: "What is the price?", pl: "Jaka jest cena?" },
        a: { en: "We provide a personalized quote within 2 hours. All-inclusive pricing — tolls, fuel, refreshments included.", pl: "Wycenę przedstawiamy w ciągu 2 godzin. Cena all-inclusive — opłaty, paliwo, napoje w cenie." },
      },
      {
        q: { en: "Do I need a passport?", pl: "Czy potrzebuję paszportu?" },
        a: { en: "EU citizens need only a valid ID. Non-EU travellers should carry their passport.", pl: "Obywatele UE potrzebują ważnego dowodu. Podróżni spoza UE powinni mieć paszport." },
      },
      {
        q: { en: "Can I stop in Brno or Bratislava?", pl: "Czy mogę się zatrzymać w Brnie lub Bratysławie?" },
        a: { en: "Yes, stops along the route are available at no extra charge.", pl: "Tak, przystanki na trasie są dostępne bez dodatkowych opłat." },
      },
      {
        q: { en: "What vehicles are available?", pl: "Jakie pojazdy są dostępne?" },
        a: { en: "Comfort, Business, and Premium classes. All Mercedes-Benz, late-model, fully equipped.", pl: "Klasy Comfort, Business i Premium. Wszystkie Mercedes-Benz, z ostatnich roczników, w pełni wyposażone." },
      },
    ],
    relatedSlugs: ["krakow-budapest", "krakow-prague", "warsaw-vienna", "katowice-vienna", "krakow-wroclaw"],
  },
  {
    slug: "krakow-budapest",
    from: { en: "Kraków", pl: "Kraków" },
    to: { en: "Budapest", pl: "Budapeszt" },
    fromCountry: "PL",
    toCountry: "HU",
    distanceKm: 400,
    duration: { en: "~5 h", pl: "~5 godz." },
    heroImage: "/images/city-budapest.jpg",
    description: {
      en: "The private transfer from Kraków to Budapest covers approximately 400 km through Slovakia's stunning mountain scenery. The 5-hour journey connects two Central European gems — Kraków's medieval Old Town and Budapest's iconic Danube waterfront. Travel in premium comfort with Movi Transfer's professional chauffeur service.",
      pl: "Prywatny transfer z Krakowa do Budapesztu to około 400 km przez malownicze góry Słowacji. 5-godzinna podróż łączy dwa klejnoty Europy Środkowej — średniowieczne Stare Miasto Krakowa i ikoniczny nadduński Budapeszt. Podróżuj w premium komforcie z profesjonalną usługą kierowcy Movi Transfer.",
    },
    advantages: {
      en: ["Direct door-to-door service", "Professional multilingual chauffeur", "Premium Mercedes-Benz fleet with Wi-Fi", "Scenic Slovak mountain route with optional stops", "Fixed all-inclusive price", "Free cancellation up to 24h before departure"],
      pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny wielojęzyczny kierowca", "Flota premium Mercedes-Benz z Wi-Fi", "Malownicza trasa przez góry Słowacji z opcjonalnymi przystankami", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h przed wyjazdem"],
    },
    faq: [
      { q: { en: "How long is a Kraków to Budapest transfer?", pl: "Ile trwa transfer Kraków — Budapeszt?" }, a: { en: "Approximately 5 hours via Slovakia.", pl: "Około 5 godzin przez Słowację." } },
      { q: { en: "What is the price?", pl: "Jaka jest cena?" }, a: { en: "Personalized quote within 2 hours. All-inclusive pricing.", pl: "Spersonalizowana wycena w ciągu 2 godzin. Cena all-inclusive." } },
      { q: { en: "Can I stop in the Tatras?", pl: "Czy mogę zatrzymać się w Tatrach?" }, a: { en: "Yes, stops in Zakopane or Slovak Tatras available at no extra cost.", pl: "Tak, przystanki w Zakopanem lub Tatrach Słowackich bez dodatkowych kosztów." } },
      { q: { en: "What vehicles are available?", pl: "Jakie pojazdy są dostępne?" }, a: { en: "Comfort, Business, and Premium classes — all Mercedes-Benz.", pl: "Klasy Comfort, Business i Premium — wszystkie Mercedes-Benz." } },
      { q: { en: "Is a passport needed?", pl: "Czy potrzebuję paszportu?" }, a: { en: "EU citizens need a valid ID. Non-EU travellers need a passport.", pl: "Obywatele UE — ważny dowód. Podróżni spoza UE — paszport." } },
    ],
    relatedSlugs: ["krakow-vienna", "krakow-prague", "warsaw-budapest", "krakow-wroclaw", "krakow-zakopane"],
  },
  {
    slug: "krakow-prague",
    from: { en: "Kraków", pl: "Kraków" },
    to: { en: "Prague", pl: "Praga" },
    fromCountry: "PL",
    toCountry: "CZ",
    distanceKm: 535,
    duration: { en: "~5.5 h", pl: "~5,5 godz." },
    heroImage: "/images/city-prague.jpg",
    description: {
      en: "The private transfer from Kraków to Prague spans approximately 535 km through the Czech Republic's rolling countryside. The 5.5-hour journey connects two of Central Europe's most visited cities. Cross Schengen borders seamlessly and arrive refreshed at your Prague destination.",
      pl: "Prywatny transfer z Krakowa do Pragi to około 535 km przez falisty krajobraz Czech. 5,5-godzinna podróż łączy dwa z najczęściej odwiedzanych miast Europy Środkowej. Przekrocz granicę Schengen bezproblemowo i dotrzyj wypoczęty do celu w Pradze.",
    },
    advantages: {
      en: ["Direct door-to-door service", "Professional multilingual chauffeur", "Premium Mercedes-Benz fleet with Wi-Fi", "Seamless Schengen crossing", "Fixed all-inclusive price", "Free cancellation up to 24h"],
      pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny wielojęzyczny kierowca", "Flota premium Mercedes-Benz z Wi-Fi", "Bezproblemowe przekroczenie Schengen", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"],
    },
    faq: [
      { q: { en: "How long is a Kraków to Prague transfer?", pl: "Ile trwa transfer Kraków — Praga?" }, a: { en: "Approximately 5.5 hours via Katowice and Ostrava.", pl: "Około 5,5 godziny przez Katowice i Ostrawę." } },
      { q: { en: "What is the price?", pl: "Jaka jest cena?" }, a: { en: "Personalized quote within 2 hours. All-inclusive.", pl: "Wycena w ciągu 2 godzin. All-inclusive." } },
      { q: { en: "Can I stop in Ostrava?", pl: "Czy mogę zatrzymać się w Ostrawie?" }, a: { en: "Yes, stops along the route at no extra charge.", pl: "Tak, przystanki na trasie bez dodatkowych opłat." } },
      { q: { en: "What vehicles are available?", pl: "Jakie pojazdy?" }, a: { en: "Comfort, Business, and Premium — all Mercedes-Benz.", pl: "Comfort, Business i Premium — Mercedes-Benz." } },
      { q: { en: "Is a passport needed?", pl: "Czy potrzebuję paszportu?" }, a: { en: "EU citizens need a valid ID only.", pl: "Obywatele UE — ważny dowód osobisty." } },
    ],
    relatedSlugs: ["krakow-vienna", "krakow-wroclaw", "warsaw-prague", "krakow-budapest", "krakow-gdansk"],
  },
  {
    slug: "krakow-gdansk",
    from: { en: "Kraków", pl: "Kraków" },
    to: { en: "Gdańsk", pl: "Gdańsk" },
    fromCountry: "PL",
    toCountry: "PL",
    distanceKm: 590,
    duration: { en: "~6.5 h", pl: "~6,5 godz." },
    heroImage: "/images/city-warsaw.jpg",
    description: {
      en: "The private transfer from Kraków to Gdańsk covers approximately 590 km, traversing Poland from south to north. The 6.5-hour journey follows the A1 motorway through the heart of the country. Ideal for travellers connecting Kraków's cultural heritage with the Baltic coast's resort towns.",
      pl: "Prywatny transfer z Krakowa do Gdańska to około 590 km, przemierzając Polskę z południa na północ. 6,5-godzinna podróż prowadzi autostradą A1 przez serce kraju. Idealna dla podróżnych łączących dziedzictwo kulturowe Krakowa z nadmorskimi kurortami Bałtyku.",
    },
    advantages: {
      en: ["Direct door-to-door service", "Professional chauffeur", "Premium Mercedes-Benz fleet", "Flexible 24/7 scheduling", "Fixed all-inclusive price", "Free cancellation up to 24h"],
      pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium Mercedes-Benz", "Elastyczne planowanie 24/7", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"],
    },
    faq: [
      { q: { en: "How long is the transfer?", pl: "Ile trwa transfer?" }, a: { en: "Approximately 6.5 hours via the A1 motorway.", pl: "Około 6,5 godziny autostradą A1." } },
      { q: { en: "What is the price?", pl: "Jaka jest cena?" }, a: { en: "Quote within 2 hours. All-inclusive pricing.", pl: "Wycena w 2 godziny. Cena all-inclusive." } },
      { q: { en: "Can I stop in Warsaw?", pl: "Czy mogę zatrzymać się w Warszawie?" }, a: { en: "Yes, Warsaw is on the route. Stops at no extra cost.", pl: "Tak, Warszawa leży na trasie. Przystanki bez dodatkowych kosztów." } },
      { q: { en: "What vehicles?", pl: "Jakie pojazdy?" }, a: { en: "Comfort, Business, Premium — Mercedes-Benz fleet.", pl: "Comfort, Business, Premium — flota Mercedes-Benz." } },
      { q: { en: "Available 24/7?", pl: "Dostępny 24/7?" }, a: { en: "Yes, 365 days a year.", pl: "Tak, 365 dni w roku." } },
    ],
    relatedSlugs: ["krakow-warsaw", "gdansk-krakow", "gdansk-warsaw", "krakow-wroclaw", "warsaw-gdansk"],
  },
  { slug: "gdansk-berlin", from: { en: "Gdańsk", pl: "Gdańsk" }, to: { en: "Berlin", pl: "Berlin" }, fromCountry: "PL", toCountry: "DE", distanceKm: 510, duration: { en: "~5.5 h", pl: "~5,5 godz." }, heroImage: "/images/city-berlin.jpg", description: { en: "Private transfer from Gdańsk to Berlin — approximately 510 km via the A6 and A11 motorways. A 5.5-hour direct route connecting Poland's Baltic coast with Germany's capital. Seamless Schengen crossing, premium comfort, and professional chauffeur service throughout.", pl: "Prywatny transfer z Gdańska do Berlina — około 510 km autostradami A6 i A11. 5,5-godzinna bezpośrednia trasa łącząca polskie wybrzeże Bałtyku ze stolicą Niemiec. Bezproblemowe przekroczenie Schengen, komfort premium i profesjonalna obsługa kierowcy." }, advantages: { en: ["Direct door-to-door service", "Professional multilingual chauffeur", "Premium Mercedes-Benz fleet", "Seamless Schengen crossing", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny wielojęzyczny kierowca", "Flota premium Mercedes-Benz", "Bezproblemowe przekroczenie Schengen", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~5.5 hours via A6/A11 motorways.", pl: "~5,5 godz. autostradami A6/A11." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Personalized quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Passport needed?", pl: "Potrzebny paszport?" }, a: { en: "EU citizens — valid ID only. Non-EU — passport.", pl: "Obywatele UE — dowód. Spoza UE — paszport." } }, { q: { en: "Airport pickup?", pl: "Odbiór z lotniska?" }, a: { en: "Yes, from Gdańsk Lech Wałęsa or Berlin Brandenburg.", pl: "Tak, z Gdańska Lecha Wałęsy lub Berlin Brandenburg." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes, every day of the year.", pl: "Tak, każdego dnia roku." } }], relatedSlugs: ["gdansk-poznan", "gdansk-warsaw", "warsaw-berlin", "wroclaw-berlin", "poznan-berlin"] },
  { slug: "gdansk-poznan", from: { en: "Gdańsk", pl: "Gdańsk" }, to: { en: "Poznań", pl: "Poznań" }, fromCountry: "PL", toCountry: "PL", distanceKm: 310, duration: { en: "~3.5 h", pl: "~3,5 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private transfer from Gdańsk to Poznań — approximately 310 km via the S5 expressway. A comfortable 3.5-hour journey connecting Poland's Baltic coast with one of its major business hubs.", pl: "Prywatny transfer z Gdańska do Poznania — około 310 km drogą ekspresową S5. Komfortowa 3,5-godzinna podróż łącząca polskie wybrzeże Bałtyku z jednym z głównych centrów biznesowych." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium Mercedes-Benz fleet", "Flexible 24/7 scheduling", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium Mercedes-Benz", "Elastyczne planowanie 24/7", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~3.5 hours via S5.", pl: "~3,5 godz. drogą S5." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium classes.", pl: "Klasy Comfort, Business, Premium." } }, { q: { en: "Stops?", pl: "Przystanki?" }, a: { en: "Yes, at no extra charge.", pl: "Tak, bez dodatkowych opłat." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes, 365 days a year.", pl: "Tak, 365 dni w roku." } }], relatedSlugs: ["gdansk-berlin", "gdansk-warsaw", "poznan-berlin", "gdansk-krakow", "warsaw-poznan"] },
  { slug: "gdansk-warsaw", from: { en: "Gdańsk", pl: "Gdańsk" }, to: { en: "Warsaw", pl: "Warszawa" }, fromCountry: "PL", toCountry: "PL", distanceKm: 340, duration: { en: "~4 h", pl: "~4 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private transfer from Gdańsk to Warsaw — approximately 340 km via the S7 expressway. A 4-hour journey connecting the Tri-City metropolitan area with Poland's capital. The ideal alternative to flights or train travel, with door-to-door convenience.", pl: "Prywatny transfer z Gdańska do Warszawy — około 340 km drogą ekspresową S7. 4-godzinna podróż łącząca Trójmiasto ze stolicą Polski. Idealna alternatywa dla lotów czy podróży pociągiem, z wygodą door-to-door." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium Mercedes-Benz fleet", "Flexible 24/7 scheduling", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium Mercedes-Benz", "Elastyczne planowanie 24/7", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~4 hours via S7.", pl: "~4 godz. drogą S7." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Airport?", pl: "Lotnisko?" }, a: { en: "Pickups from Gdańsk Wałęsa Airport available.", pl: "Odbiór z lotniska Gdańsk Wałęsa." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["warsaw-gdansk", "gdansk-berlin", "gdansk-poznan", "gdansk-krakow", "warsaw-krakow"] },
  { slug: "gdansk-krakow", from: { en: "Gdańsk", pl: "Gdańsk" }, to: { en: "Kraków", pl: "Kraków" }, fromCountry: "PL", toCountry: "PL", distanceKm: 590, duration: { en: "~6.5 h", pl: "~6,5 godz." }, heroImage: "/images/city-prague.jpg", description: { en: "Private transfer from Gdańsk to Kraków — 590 km via the A1 motorway. A 6.5-hour north-to-south journey across Poland, connecting the Baltic coast with Kraków's historic Old Town. Premium comfort and professional chauffeur service throughout.", pl: "Prywatny transfer z Gdańska do Krakowa — 590 km autostradą A1. 6,5-godzinna podróż z północy na południe Polski, łącząca wybrzeże Bałtyku z historycznym Starym Miastem Krakowa. Komfort premium i profesjonalny kierowca przez całą trasę." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium Mercedes-Benz fleet", "Optional stop in Warsaw", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium Mercedes-Benz", "Opcjonalny przystanek w Warszawie", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~6.5 hours via A1.", pl: "~6,5 godz. autostradą A1." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Stop in Warsaw?", pl: "Przystanek w Warszawie?" }, a: { en: "Yes, Warsaw is on the route — free stop.", pl: "Tak, Warszawa na trasie — bezpłatny przystanek." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["krakow-gdansk", "gdansk-warsaw", "gdansk-poznan", "krakow-warsaw", "warsaw-gdansk"] },
  { slug: "wroclaw-berlin", from: { en: "Wrocław", pl: "Wrocław" }, to: { en: "Berlin", pl: "Berlin" }, fromCountry: "PL", toCountry: "DE", distanceKm: 350, duration: { en: "~3.5 h", pl: "~3,5 godz." }, heroImage: "/images/city-berlin.jpg", description: { en: "Private transfer from Wrocław to Berlin — approximately 350 km via the A18 and A15 motorways. At just 3.5 hours, this is one of the fastest cross-border routes in our network. Seamless Schengen crossing and premium door-to-door service.", pl: "Prywatny transfer z Wrocławia do Berlina — około 350 km autostradami A18 i A15. Zaledwie 3,5 godziny — jedna z najszybszych tras transgranicznych w naszej sieci. Bezproblemowe przekroczenie Schengen i usługa premium door-to-door." }, advantages: { en: ["Direct door-to-door service", "Professional multilingual chauffeur", "Premium Mercedes-Benz fleet", "Seamless Schengen crossing", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny wielojęzyczny kierowca", "Flota premium Mercedes-Benz", "Bezproblemowe Schengen", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~3.5 hours.", pl: "~3,5 godz." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Passport?", pl: "Paszport?" }, a: { en: "EU citizens — ID only. Non-EU — passport.", pl: "UE — dowód. Spoza UE — paszport." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["wroclaw-dresden", "wroclaw-poznan", "poznan-berlin", "warsaw-berlin", "gdansk-berlin"] },
  { slug: "warsaw-vilnius", from: { en: "Warsaw", pl: "Warszawa" }, to: { en: "Vilnius", pl: "Wilno" }, fromCountry: "PL", toCountry: "LT", distanceKm: 580, duration: { en: "~6 h", pl: "~6 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private transfer from Warsaw to Vilnius — approximately 580 km northeast through the Podlasie region into Lithuania. A 6-hour journey connecting two capitals with deep historical ties. Seamless Schengen border crossing and premium Mercedes-Benz service.", pl: "Prywatny transfer z Warszawy do Wilna — około 580 km na północny wschód przez Podlasie do Litwy. 6-godzinna podróż łącząca dwie stolice o głębokich więzach historycznych. Bezproblemowe przekroczenie Schengen i usługa premium Mercedes-Benz." }, advantages: { en: ["Direct door-to-door service", "Professional multilingual chauffeur", "Premium Mercedes-Benz fleet", "Seamless Schengen crossing", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny wielojęzyczny kierowca", "Flota premium Mercedes-Benz", "Bezproblemowe Schengen", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~6 hours.", pl: "~6 godz." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Passport?", pl: "Paszport?" }, a: { en: "EU — ID only. Non-EU — passport.", pl: "UE — dowód. Spoza UE — paszport." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["warsaw-berlin", "warsaw-gdansk", "warsaw-budapest", "warsaw-krakow", "warsaw-vienna"] },
  { slug: "krakow-zurich", from: { en: "Kraków", pl: "Kraków" }, to: { en: "Zürich", pl: "Zurych" }, fromCountry: "PL", toCountry: "CH", distanceKm: 1100, duration: { en: "~11 h", pl: "~11 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private long-distance transfer from Kraków to Zürich — approximately 1,100 km through the Czech Republic, Germany, and into Switzerland. An 11-hour premium journey for travellers who prefer ground transport with maximum comfort and flexibility.", pl: "Prywatny transfer dalekobieżny z Krakowa do Zurychu — około 1100 km przez Czechy, Niemcy i do Szwajcarii. 11-godzinna podróż premium dla podróżnych preferujących transport lądowy z maksymalnym komfortem i elastycznością." }, advantages: { en: ["Direct door-to-door — no airports, no layovers", "Professional chauffeur for the entire journey", "Premium Mercedes-Benz with Wi-Fi", "Comfort stops included", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednie door-to-door — bez lotnisk, bez przesiadek", "Profesjonalny kierowca na całą trasę", "Premium Mercedes-Benz z Wi-Fi", "Przerwy komfortowe w cenie", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~11 hours with comfort stops.", pl: "~11 godz. z przerwami." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Can I stop overnight?", pl: "Czy mogę zatrzymać się na noc?" }, a: { en: "Yes, we can arrange an overnight stop en route.", pl: "Tak, możemy zorganizować nocleg na trasie." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["warsaw-zurich", "krakow-vienna", "krakow-prague", "krakow-budapest", "krakow-wroclaw"] },
  { slug: "warsaw-zurich", from: { en: "Warsaw", pl: "Warszawa" }, to: { en: "Zürich", pl: "Zurych" }, fromCountry: "PL", toCountry: "CH", distanceKm: 1200, duration: { en: "~12 h", pl: "~12 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private long-distance transfer from Warsaw to Zürich — approximately 1,200 km through Germany and into Switzerland. A 12-hour premium journey with professional chauffeur, Mercedes-Benz comfort, Wi-Fi, and refreshments throughout.", pl: "Prywatny transfer dalekobieżny z Warszawy do Zurychu — około 1200 km przez Niemcy do Szwajcarii. 12-godzinna podróż premium z profesjonalnym kierowcą, komfortem Mercedes-Benz, Wi-Fi i napojami." }, advantages: { en: ["Direct door-to-door — no airports", "Professional chauffeur", "Premium Mercedes-Benz with Wi-Fi", "Comfort stops included", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednie door-to-door — bez lotnisk", "Profesjonalny kierowca", "Premium Mercedes-Benz z Wi-Fi", "Przerwy w cenie", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~12 hours with comfort stops.", pl: "~12 godz. z przerwami." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Overnight stop?", pl: "Nocleg po drodze?" }, a: { en: "Yes, available upon request.", pl: "Tak, na życzenie." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["krakow-zurich", "warsaw-berlin", "warsaw-vienna", "warsaw-prague", "warsaw-budapest"] },
  { slug: "poznan-berlin", from: { en: "Poznań", pl: "Poznań" }, to: { en: "Berlin", pl: "Berlin" }, fromCountry: "PL", toCountry: "DE", distanceKm: 270, duration: { en: "~3 h", pl: "~3 godz." }, heroImage: "/images/city-berlin.jpg", description: { en: "Private transfer from Poznań to Berlin — just 270 km via the A2 motorway. At only 3 hours, this is one of the shortest international transfers in our network. Seamless Schengen crossing and door-to-door premium service.", pl: "Prywatny transfer z Poznania do Berlina — zaledwie 270 km autostradą A2. Tylko 3 godziny — jeden z najkrótszych transferów międzynarodowych w naszej sieci. Bezproblemowe Schengen i usługa premium door-to-door." }, advantages: { en: ["Direct door-to-door service", "Professional multilingual chauffeur", "Premium Mercedes-Benz fleet", "One of the fastest international routes", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny wielojęzyczny kierowca", "Flota premium Mercedes-Benz", "Jedna z najszybszych tras międzynarodowych", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~3 hours via A2.", pl: "~3 godz. autostradą A2." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Passport?", pl: "Paszport?" }, a: { en: "EU — ID only.", pl: "UE — dowód." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["warsaw-berlin", "wroclaw-berlin", "gdansk-berlin", "gdansk-poznan", "warsaw-poznan"] },
  { slug: "wroclaw-dresden", from: { en: "Wrocław", pl: "Wrocław" }, to: { en: "Dresden", pl: "Drezno" }, fromCountry: "PL", toCountry: "DE", distanceKm: 310, duration: { en: "~3 h", pl: "~3 godz." }, heroImage: "/images/city-berlin.jpg", description: { en: "Private transfer from Wrocław to Dresden — approximately 310 km through Lower Silesia into Saxony. A 3-hour premium journey connecting two historic European cities across the Polish-German border. Seamless Schengen crossing.", pl: "Prywatny transfer z Wrocławia do Drezna — około 310 km przez Dolny Śląsk do Saksonii. 3-godzinna podróż premium łącząca dwa historyczne miasta europejskie. Bezproblemowe Schengen." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium fleet", "Seamless Schengen crossing", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium", "Bezproblemowe Schengen", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~3 hours.", pl: "~3 godz." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Passport?", pl: "Paszport?" }, a: { en: "EU — ID only.", pl: "UE — dowód." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["wroclaw-berlin", "wroclaw-poznan", "krakow-wroclaw", "warsaw-berlin", "poznan-berlin"] },
  { slug: "katowice-vienna", from: { en: "Katowice", pl: "Katowice" }, to: { en: "Vienna", pl: "Wiedeń" }, fromCountry: "PL", toCountry: "AT", distanceKm: 440, duration: { en: "~4.5 h", pl: "~4,5 godz." }, heroImage: "/images/city-vienna.jpg", description: { en: "Private transfer from Katowice to Vienna — approximately 440 km via the Czech Republic or Slovakia. A 4.5-hour premium journey through Central Europe's heartland, with seamless Schengen crossing and door-to-door service.", pl: "Prywatny transfer z Katowic do Wiednia — około 440 km przez Czechy lub Słowację. 4,5-godzinna podróż premium przez serce Europy Środkowej, z bezproblemowym Schengen i usługą door-to-door." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium Mercedes-Benz fleet", "Seamless Schengen crossing", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium Mercedes-Benz", "Bezproblemowe Schengen", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~4.5 hours.", pl: "~4,5 godz." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Route options?", pl: "Opcje trasy?" }, a: { en: "Via Czech Republic or Slovakia — we choose the fastest.", pl: "Przez Czechy lub Słowację — wybieramy najszybszą." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["krakow-vienna", "warsaw-vienna", "krakow-budapest", "krakow-katowice", "krakow-wroclaw"] },
  { slug: "warsaw-vienna", from: { en: "Warsaw", pl: "Warszawa" }, to: { en: "Vienna", pl: "Wiedeń" }, fromCountry: "PL", toCountry: "AT", distanceKm: 680, duration: { en: "~7 h", pl: "~7 godz." }, heroImage: "/images/city-vienna.jpg", description: { en: "Private transfer from Warsaw to Vienna — approximately 680 km through southern Poland and the Czech Republic into Austria. A 7-hour premium journey connecting two European capitals with seamless Schengen crossing.", pl: "Prywatny transfer z Warszawy do Wiednia — około 680 km przez południową Polskę i Czechy do Austrii. 7-godzinna podróż premium łącząca dwie europejskie stolice z bezproblemowym Schengen." }, advantages: { en: ["Direct door-to-door service", "Professional multilingual chauffeur", "Premium Mercedes-Benz fleet", "Seamless Schengen crossing", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny wielojęzyczny kierowca", "Flota premium Mercedes-Benz", "Bezproblemowe Schengen", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~7 hours via Kraków and Czech Republic.", pl: "~7 godz. przez Kraków i Czechy." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Stop in Kraków?", pl: "Przystanek w Krakowie?" }, a: { en: "Yes, Kraków is on the route.", pl: "Tak, Kraków leży na trasie." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["warsaw-budapest", "warsaw-prague", "krakow-vienna", "katowice-vienna", "warsaw-bratislava"] },
  { slug: "warsaw-prague", from: { en: "Warsaw", pl: "Warszawa" }, to: { en: "Prague", pl: "Praga" }, fromCountry: "PL", toCountry: "CZ", distanceKm: 680, duration: { en: "~7 h", pl: "~7 godz." }, heroImage: "/images/city-prague.jpg", description: { en: "Private transfer from Warsaw to Prague — approximately 680 km via Wrocław and the Czech border. A 7-hour premium journey connecting two of Central Europe's most visited capitals.", pl: "Prywatny transfer z Warszawy do Pragi — około 680 km przez Wrocław i czeską granicę. 7-godzinna podróż premium łącząca dwie z najczęściej odwiedzanych stolic Europy Środkowej." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium Mercedes-Benz fleet", "Seamless Schengen crossing", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium Mercedes-Benz", "Bezproblemowe Schengen", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~7 hours via Wrocław.", pl: "~7 godz. przez Wrocław." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Stop in Wrocław?", pl: "Przystanek we Wrocławiu?" }, a: { en: "Yes, available at no extra cost.", pl: "Tak, bez dodatkowych opłat." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["krakow-prague", "warsaw-berlin", "warsaw-vienna", "warsaw-budapest", "warsaw-wroclaw"] },
  { slug: "warsaw-wroclaw", from: { en: "Warsaw", pl: "Warszawa" }, to: { en: "Wrocław", pl: "Wrocław" }, fromCountry: "PL", toCountry: "PL", distanceKm: 350, duration: { en: "~3.5 h", pl: "~3,5 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private transfer from Warsaw to Wrocław — approximately 350 km via the A8 and A1 motorways. A 3.5-hour domestic route connecting Poland's capital with its fourth-largest city. Premium door-to-door service with Movi Transfer.", pl: "Prywatny transfer z Warszawy do Wrocławia — około 350 km autostradami A8 i A1. 3,5-godzinna trasa krajowa łącząca stolicę z czwartym co do wielkości miastem Polski. Usługa premium door-to-door z Movi Transfer." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium Mercedes-Benz fleet", "Flexible 24/7 scheduling", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium Mercedes-Benz", "Elastyczne planowanie 24/7", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~3.5 hours.", pl: "~3,5 godz." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Stops?", pl: "Przystanki?" }, a: { en: "Yes, at no extra charge.", pl: "Tak, bez dodatkowych opłat." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["warsaw-krakow", "wroclaw-berlin", "wroclaw-poznan", "wroclaw-dresden", "warsaw-berlin"] },
  { slug: "warsaw-poznan", from: { en: "Warsaw", pl: "Warszawa" }, to: { en: "Poznań", pl: "Poznań" }, fromCountry: "PL", toCountry: "PL", distanceKm: 310, duration: { en: "~3 h", pl: "~3 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private transfer from Warsaw to Poznań — approximately 310 km via the A2 motorway. A swift 3-hour journey connecting Poland's capital with its western business hub.", pl: "Prywatny transfer z Warszawy do Poznania — około 310 km autostradą A2. Szybka 3-godzinna podróż łącząca stolicę z zachodnim centrum biznesowym Polski." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium fleet", "Flexible 24/7", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium", "Elastyczne 24/7", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~3 hours via A2.", pl: "~3 godz. autostradą A2." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "Stops?", pl: "Przystanki?" }, a: { en: "Yes, at no extra cost.", pl: "Tak, bez dodatkowych opłat." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["poznan-berlin", "warsaw-berlin", "warsaw-gdansk", "gdansk-poznan", "warsaw-wroclaw"] },
  { slug: "krakow-zakopane", from: { en: "Kraków", pl: "Kraków" }, to: { en: "Zakopane", pl: "Zakopane" }, fromCountry: "PL", toCountry: "PL", distanceKm: 105, duration: { en: "~1.5 h", pl: "~1,5 godz." }, heroImage: "/images/city-prague.jpg", description: { en: "Private transfer from Kraków to Zakopane — just 105 km along the Zakopianka expressway. A 1.5-hour scenic drive to Poland's premier mountain resort in the Tatra Mountains. Perfect for ski trips and mountain getaways.", pl: "Prywatny transfer z Krakowa do Zakopanego — zaledwie 105 km Zakopianką. 1,5-godzinna malownicza jazda do najważniejszego polskiego kurortu górskiego w Tatrach. Idealny na wypady narciarskie i górskie." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium fleet", "Scenic Tatra mountain route", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium", "Malownicza trasa tatrzańska", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~1.5 hours.", pl: "~1,5 godz." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Airport pickup?", pl: "Odbiór z lotniska?" }, a: { en: "Yes, from Kraków Balice Airport.", pl: "Tak, z lotniska Kraków Balice." } }, { q: { en: "Ski equipment?", pl: "Sprzęt narciarski?" }, a: { en: "Yes, we accommodate ski gear in our vehicles.", pl: "Tak, przewozimy sprzęt narciarski." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["krakow-katowice", "krakow-vienna", "krakow-budapest", "krakow-warsaw", "krakow-wroclaw"] },
  { slug: "krakow-katowice", from: { en: "Kraków", pl: "Kraków" }, to: { en: "Katowice", pl: "Katowice" }, fromCountry: "PL", toCountry: "PL", distanceKm: 80, duration: { en: "~1 h", pl: "~1 godz." }, heroImage: "/images/city-prague.jpg", description: { en: "Private transfer from Kraków to Katowice — just 80 km via the A4 motorway. A quick 1-hour premium ride connecting Kraków with the Silesian capital. Popular for business travellers and concert/event transfers.", pl: "Prywatny transfer z Krakowa do Katowic — zaledwie 80 km autostradą A4. Szybki 1-godzinny przejazd premium łączący Kraków ze stolicą Śląska. Popularny wśród podróżnych biznesowych i na koncerty/eventy." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium fleet", "One of our shortest routes", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium", "Jedna z najkrótszych tras", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~1 hour via A4.", pl: "~1 godz. autostradą A4." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "Airport transfer?", pl: "Transfer lotniskowy?" }, a: { en: "Yes, from Kraków Balice or Katowice Pyrzowice.", pl: "Tak, z Krakowa Balice lub Katowic Pyrzowice." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["krakow-wroclaw", "krakow-zakopane", "katowice-vienna", "krakow-vienna", "krakow-warsaw"] },
  { slug: "krakow-rzeszow", from: { en: "Kraków", pl: "Kraków" }, to: { en: "Rzeszów", pl: "Rzeszów" }, fromCountry: "PL", toCountry: "PL", distanceKm: 170, duration: { en: "~2 h", pl: "~2 godz." }, heroImage: "/images/city-prague.jpg", description: { en: "Private transfer from Kraków to Rzeszów — approximately 170 km along the A4 motorway. A 2-hour journey connecting Kraków with southeastern Poland's largest city. Premium comfort and professional chauffeur service.", pl: "Prywatny transfer z Krakowa do Rzeszowa — około 170 km autostradą A4. 2-godzinna podróż łącząca Kraków z największym miastem południowo-wschodniej Polski. Komfort premium i profesjonalny kierowca." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium fleet", "Flexible 24/7", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium", "Elastyczne 24/7", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~2 hours via A4.", pl: "~2 godz. autostradą A4." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Airport?", pl: "Lotnisko?" }, a: { en: "Yes, from Kraków Balice or Rzeszów Jasionka.", pl: "Tak, z Krakowa Balice lub Rzeszowa Jasionka." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["krakow-katowice", "krakow-zakopane", "krakow-warsaw", "krakow-wroclaw", "krakow-vienna"] },
  { slug: "wroclaw-poznan", from: { en: "Wrocław", pl: "Wrocław" }, to: { en: "Poznań", pl: "Poznań" }, fromCountry: "PL", toCountry: "PL", distanceKm: 185, duration: { en: "~2 h", pl: "~2 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private transfer from Wrocław to Poznań — approximately 185 km via the S5 expressway. A quick 2-hour ride connecting two of western Poland's key business cities.", pl: "Prywatny transfer z Wrocławia do Poznania — około 185 km drogą ekspresową S5. Szybki 2-godzinny przejazd łączący dwa kluczowe miasta biznesowe zachodniej Polski." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium fleet", "Flexible 24/7", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium", "Elastyczne 24/7", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~2 hours via S5.", pl: "~2 godz. drogą S5." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "Stops?", pl: "Przystanki?" }, a: { en: "Yes, at no extra cost.", pl: "Tak, bez dodatkowych opłat." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["wroclaw-berlin", "wroclaw-dresden", "poznan-berlin", "gdansk-poznan", "warsaw-poznan"] },
  { slug: "lodz-warsaw", from: { en: "Łódź", pl: "Łódź" }, to: { en: "Warsaw", pl: "Warszawa" }, fromCountry: "PL", toCountry: "PL", distanceKm: 135, duration: { en: "~1.5 h", pl: "~1,5 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private transfer from Łódź to Warsaw — just 135 km via the A2 motorway. A 1.5-hour express ride between Poland's third-largest city and the capital. Ideal for business day-trips and airport transfers.", pl: "Prywatny transfer z Łodzi do Warszawy — zaledwie 135 km autostradą A2. 1,5-godzinny ekspresowy przejazd między trzecim co do wielkości miastem Polski a stolicą. Idealny na jednodniowe podróże biznesowe i transfery lotniskowe." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium fleet", "Express 1.5-hour route", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium", "Ekspresowa trasa 1,5 godz.", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~1.5 hours via A2.", pl: "~1,5 godz. autostradą A2." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h.", pl: "Wycena w 2h." } }, { q: { en: "Airport?", pl: "Lotnisko?" }, a: { en: "Yes, direct to Warsaw Chopin or Modlin.", pl: "Tak, bezpośrednio na Chopina lub Modlin." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["warsaw-krakow", "warsaw-poznan", "warsaw-wroclaw", "warsaw-berlin", "warsaw-gdansk"] },
  { slug: "krakow-warsaw", from: { en: "Kraków", pl: "Kraków" }, to: { en: "Warsaw", pl: "Warszawa" }, fromCountry: "PL", toCountry: "PL", distanceKm: 295, duration: { en: "~3.5 h", pl: "~3,5 godz." }, heroImage: "/images/city-warsaw.jpg", description: { en: "Private transfer from Kraków to Warsaw — approximately 295 km via the A1 and A4 motorways. The reverse of Poland's most popular domestic transfer route. A 3.5-hour premium ride from the cultural capital to the political capital, with door-to-door convenience.", pl: "Prywatny transfer z Krakowa do Warszawy — około 295 km autostradami A1 i A4. Odwrotność najpopularniejszej krajowej trasy transferowej w Polsce. 3,5-godzinny premium przejazd z kulturalnej stolicy do stolicy politycznej, z wygodą door-to-door." }, advantages: { en: ["Direct door-to-door service", "Professional chauffeur", "Premium Mercedes-Benz fleet", "Poland's most popular route", "Fixed all-inclusive price", "Free cancellation up to 24h"], pl: ["Bezpośrednia usługa door-to-door", "Profesjonalny kierowca", "Flota premium Mercedes-Benz", "Najpopularniejsza trasa w Polsce", "Stała cena all-inclusive", "Bezpłatna anulacja do 24h"] }, faq: [{ q: { en: "How long?", pl: "Ile trwa?" }, a: { en: "~3.5 hours via A1/A4.", pl: "~3,5 godz. autostradami A1/A4." } }, { q: { en: "Price?", pl: "Cena?" }, a: { en: "Quote within 2h. All-inclusive.", pl: "Wycena w 2h. All-inclusive." } }, { q: { en: "Stop options?", pl: "Przystanki?" }, a: { en: "Yes — Częstochowa, Radom or others at no extra cost.", pl: "Tak — Częstochowa, Radom lub inne bez dodatkowych kosztów." } }, { q: { en: "Vehicles?", pl: "Pojazdy?" }, a: { en: "Comfort, Business, Premium.", pl: "Comfort, Business, Premium." } }, { q: { en: "24/7?", pl: "24/7?" }, a: { en: "Yes.", pl: "Tak." } }], relatedSlugs: ["warsaw-krakow", "krakow-wroclaw", "krakow-vienna", "krakow-gdansk", "krakow-budapest"] },
]

/* ─── Helpers ─────────────────────────────────────────────────── */
export function getRouteBySlug(slug: string): RouteData | undefined {
  return ROUTES.find(r => r.slug === slug)
}

export function getAllSlugs(): string[] {
  return ROUTES.map(r => r.slug)
}
