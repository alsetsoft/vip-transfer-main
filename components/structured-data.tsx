export function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://movitransfer.eu/#business",
    name: "Movi Transfer",
    description:
      "Premium private international transfer between Ukraine and Europe. Business-class door-to-door chauffeur service with Mercedes-Benz fleet for 1-4 passengers.",
    url: "https://movitransfer.eu",
    telephone: "+380-XX-XXX-XXXX",
    email: "reservations@movitransfer.eu",
    image: "https://movitransfer.eu/images/hero-sedan.jpg",
    priceRange: "$$$",
    currenciesAccepted: "EUR, UAH, PLN, USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, PayPal",
    areaServed: [
      { "@type": "Country", name: "Ukraine" },
      { "@type": "Country", name: "Poland" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Czech Republic" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Hungary" },
      { "@type": "Country", name: "Slovakia" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "UA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "50.4501",
      longitude: "30.5234",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [],
  }

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://movitransfer.eu/#service",
    name: "Private International Chauffeur Transfer",
    description:
      "Premium door-to-door private transfer service between Ukraine and European countries. Business-class Mercedes-Benz vehicles, professional multilingual drivers, VIP border crossing assistance.",
    provider: {
      "@type": "LocalBusiness",
      name: "Movi Transfer",
    },
    serviceType: "Private Chauffeur Transfer",
    areaServed: [
      { "@type": "Country", name: "Ukraine" },
      { "@type": "Country", name: "Poland" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Czech Republic" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Hungary" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Transfer Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Door-to-Door International Transfer",
            description:
              "Complete pickup and drop-off at any address across Europe with Mercedes-Benz S-Class, E-Class, V-Class or GLS.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "VIP Border Crossing Assistance",
            description:
              "Full document preparation, priority lane approach, checkpoint assistance, customs support, and seamless continuation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Business Travel",
            description:
              "Tailored corporate packages with dedicated account management, priority booking, and monthly invoicing.",
          },
        },
      ],
    },
  }

  const reviews = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Movi Transfer",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Oleksandr K." },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Exceptional service from Kyiv to Warsaw. The driver was punctual, professional, and the S-Class made a 10-hour journey feel effortless.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Iryna S." },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "As someone who travels between Lviv and Milan regularly, comfort and reliability are non-negotiable. Movi Transfer exceeds expectations every single time.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Dmytro V." },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "The border crossing assistance alone is worth every penny. Our team of six traveled from Odesa to Vienna with zero stress.",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does private border crossing work with a luxury transfer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our experienced drivers handle all border crossing procedures. We assist with document preparation, use priority lanes where available, communicate with border officers in local languages, provide customs and declaration support, and ensure seamless continuation of your journey. Average crossing time is 15 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "What countries do private international transfers operate in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Movi Transfer operates across all EU countries and partner states including Ukraine, Poland, Germany, Czech Republic, Austria, Hungary, Slovakia, Switzerland, and the United Kingdom. Custom routes to any European destination can be arranged upon request.",
        },
      },
      {
        "@type": "Question",
        name: "Can I travel with pets in a premium transfer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we accommodate pet-friendly transfers upon request. Please inform us when booking so we can prepare the appropriate vehicle with protective covers and ensure all cross-border pet documentation requirements are met.",
        },
      },
      {
        "@type": "Question",
        name: "What vehicles are used for private international transfers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our fleet consists exclusively of current-year Mercedes-Benz models: S-Class (3 passengers, 530L trunk), E-Class (3 passengers, 540L trunk), V-Class (6 passengers, 1030L trunk), and GLS SUV (4 passengers, 680L trunk). All equipped with Wi-Fi, multi-zone climate control, and premium amenities.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a private transfer from Ukraine to Europe cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pricing depends on the route, vehicle chosen, and number of passengers. We provide personalized quotes within 2 hours of your booking request. Our service includes door-to-door delivery, border crossing assistance, refreshments, and Wi-Fi -- all included in the quoted price with no hidden fees.",
        },
      },
      {
        "@type": "Question",
        name: "How far in advance should I book a private international transfer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend booking at least 48 hours in advance for standard routes and 72 hours for custom itineraries. However, our 24/7 concierge team can accommodate last-minute bookings, often within just a few hours, subject to availability.",
        },
      },
      {
        "@type": "Question",
        name: "Are the drivers multilingual?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all our chauffeurs speak a minimum of three languages. Most are fluent in English, Polish, German, and Ukrainian. Drivers with French, Italian, or other language proficiency can be arranged upon request.",
        },
      },
      {
        "@type": "Question",
        name: "What payment methods are accepted for international transfers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept all major credit and debit cards, bank transfers, and PayPal. Corporate clients can arrange invoice-based payment with net-30 terms. Payment is processed securely after your journey is confirmed.",
        },
      },
    ],
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://movitransfer.eu",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviews) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}
