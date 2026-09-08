const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Mamá Mía Luxury Dresses",
  url: "https://mamamialuxury.com",
  image: "https://mamamialuxury.com/og-image.png",
  logo: "https://mamamialuxury.com/images/mama_mia_black.png",
  telephone: "+52 351 121 2452",
  email: "contacto@mamamialuxury.com",
  description:
    "Renta y venta de vestidos de fiesta en Zamora de Hidalgo, Michoacán. Encuentra vestidos para eventos y ocasiones especiales, además de bolsas y asesoría personalizada.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Virrey de Mendoza Ote. 614",
    addressLocality: "Zamora de Hidalgo",
    addressRegion: "Michoacán",
    postalCode: "59698",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.972881,
    longitude: -102.279174,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:30",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "17:00",
      closes: "20:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "11:00",
      closes: "15:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/mamamia.337/",
    "https://www.facebook.com/share/1DDERdkv6z/?mibextid=wwXIfr",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Mamá Mía Luxury Dresses",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Renta de vestidos" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Venta de vestidos" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Renta de bolsas" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Asesoría personalizada" },
      },
    ],
  },
};

export const LocalBusinessJsonLd = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(businessJsonLd),
    }}
    type="application/ld+json"
  />
);