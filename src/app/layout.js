import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";

export const metadata = {
  title: {
    default: "FWB+ Event Organizer Profesional Jogja & Semarang",
    template: "%s | FWB+ Professional Event Organizer",
  },
  description:
    "FWB+ Event Organizer profesional di Jogja & Semarang. Jasa EO terpercaya untuk corporate events, pameran, konser, dan acara perusahaan.",
  keywords: [
    // Brand
    "FWB+",
    "FWB+ event organizer",
    "FWB+ professional event",
    "FWB+ corporate events",
    "FWB+ acara professional",
    "fwbplus.id",

    // Primary Keywords
    "event organizer",
    "jasa event organizer",
    "event organizer professional",
    "penyelenggara acara",
    "jasa EO",
    "EO terpercaya",
    "event planner",
    "corporate events",
    "corporate event organizer",
    "corporate gathering",

    // Location-Based Keywords (volume tinggi Indonesia)
    "event organizer jogja",
    "event organizer yogyakarta", 
    "event organizer semarang",
    "EO jogja",
    "EO yogyakarta",
    "EO semarang", 
    "jasa EO jogja",
    "jasa EO semarang",
    "penyelenggara acara jogja",
    "penyelenggara acara semarang",
    "corporate event jogja",
    "corporate event semarang",

    // Corporate & Business Events
    "corporate gathering",
    "corporate event",
    "team building",
    "family gathering",
    "company event",
    "employee gathering",
    "customer appreciation event",
    "corporate meeting",
    "corporate retreat",
    "annual company gathering",
    "corporate anniversary",
    "corporate celebration",

    // Exhibition & Trade Events
    "pameran",
    "exhibition",
    "exhibition organizer jogja",
    "penyelenggara pameran",
    "trade show organizer",
    "expo organizer",
    "booth exhibition",
    "stand pameran",

    // Concerts & Entertainment 
    "konser musik",
    "festival",
    "festival musik jogja",
    "konser organizer",
    "event musik jogja",
    "live music event",
    "outdoor concert",
    "music festival organizer",

    // Product Launch & Marketing Events
    "grand opening event",
    "launching produk",
    "product launch event",
    "brand activation",
    "roadshow event",
    "marketing event",
    "promotional event",
    "brand event jogja",

    // Seminar & Conference
    "seminar organizer",
    "workshop organizer",
    "conference organizer",
    "meeting organizer",
    "mice organizer",
    "business conference",
    "training event",
    "educational event",

    // Popular Long-tail Keywords  
    "jasa event organizer terpercaya",
    "event organizer terbaik jogja",
    "event organizer profesional jogja",
    "corporate event organizer jogja",
    "jasa EO corporate jogja",
    "event organizer semarang terpercaya",
    "penyelenggara acara corporate",
    "organizer pameran jogja",

    // Equipment & Services (high search volume)
    "sewa alat event",
    "rental sound system",
    "sewa lighting event",
    "sewa panggung",
    "sewa tenda event",
    "jasa dokumentasi event",
    "MC event jogja",
    "host acara jogja",
    "crew event jogja",
    "manpower event",

    // Industry-Specific Keywords
    "event management",
    "event production",
    "event coordination", 
    "event planning services",
    "full service event organizer",
    "one stop event organizer",
    "vendor event jogja",
    "jasa event management",

    // Business Events Specific
    "mice organizer jogja",
    "exhibition organizer jogja",
    "trade show organizer",
    "corporate event planner",
    "business event organizer",
    "professional event services",

    // Community & Social Events
    "community event",
    "social gathering",
    "charity event",
    "fundraising event",
    "volunteer event",

    // Seasonal & Special Events
    "event organizer lebaran",
    "event organizer ramadan",
    "event organizer natal", 
    "event organizer tahun baru",
    "event organizer kemerdekaan",
    "event organizer hari raya",
    "corporate new year event",

    // Question-Based Keywords (voice search trend)
    "event organizer jogja yang bagus",
    "rekomendasi event organizer jogja", 
    "event organizer jogja terpercaya",
    "cara memilih event organizer",
    "harga jasa event organizer",
    "paket event organizer",
    "event organizer terdekat",
    "jasa EO terbaik jogja",

    // Comparison Keywords
    "event organizer terbaik indonesia",
    "daftar event organizer jogja",
    "review event organizer jogja",
    "testimoni event organizer",
    "event organizer vs event planner",
    "pilihan event organizer jogja",

    // Additional Location Combinations
    "event organizer jogja semarang",
    "EO jawa tengah",
    "event organizer jawa tengah",
    "jasa EO jawa tengah",
    "corporate event jawa tengah",
  ],

  authors: [{ name: "FWB Plus Event Organizer" }],
  creator: "FWB Plus Event Organizer",
  publisher: "FWB Plus Event Organizer",
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  verification: {
    google: "tIa2nolQD7wEqpUaWXrJF2f4iemReF_5CixemmZntjk",
  },
  
  alternates: {
    canonical: "https://fwbplus.id",
  },
  
  openGraph: {
    title: "FWB+ Event Organizer Professional Corporate Jogja & Semarang",
    description:     "FWB+ professional event organizer yang didirikan 4 Juli 2024 dengan kantor di Jogja dan Semarang. Jasa EO terpercaya untuk corporate events, pameran, konser, dan acara perusahaan.",
    type: "website",
    locale: "id_ID",
    url: "https://fwbplus.id",
    siteName: "FWB+ Professional Event Corporate Organizer",
    images: [
      {
        url: "https://fwbplus.id/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FWB+ Event Organizer Professional Corporate Jogja Semarang",
      },
    ],
  },
  
  instagram: {
    site: "@fwbplus.organizer",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fwbplus.id/#organization",
      "name": "FWB+ Event Organizer",
      "alternateName": ["FWB Plus", "FWB+ Professional Event"],
      "url": "https://fwbplus.id",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fwbplus.id/assets/logo/Logo FWB PNG.png",
        "width": 300,
        "height": 100
      },
      "description": "Professional event organizer yang didirikan 4 Juli 2024 untuk corporate events, pameran, konser, dan acara perusahaan di Jogja dan Semarang",
      "foundingDate": "2024-07-04",
      "sameAs": [
        "https://instagram.com/fwbplus.organizer"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+62-819-4407-4542",
          "contactType": "customer service",
          "areaServed": ["ID"],
          "availableLanguage": ["Indonesian", "English"]
        }
      ],
      "email": "fwbplus.eo@gmail.com",
      "areaServed": [
        {
          "@type": "City",
          "name": "Yogyakarta"
        },
        {
          "@type": "City", 
          "name": "Semarang"
        },
        {
          "@type": "State",
          "name": "Jawa Tengah"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Event Organizer Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Events",
              "description": "Jasa penyelenggaraan acara corporate, team building, gathering perusahaan"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Exhibition & Trade Show",
              "description": "Penyelenggara pameran, exhibition, dan trade show professional"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Concerts & Festivals",
              "description": "Organizer konser musik, festival, dan event entertainment"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Product Launch",
              "description": "Jasa grand opening, launching produk, dan brand activation"
            }
          }
        ]
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://fwbplus.id/#localbusiness-jogja", 
      "name": "FWB+ Event Organizer Jogja",
      "image": "https://fwbplus.id/assets/logo/Logo FWB PNG.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Sidorejo No.5, Rejodadi, Nggobayan, Ngestiharjo, Kec. Kasihan",
        "addressLocality": "Bantul",
        "addressRegion": "D.I Yogyakarta", 
        "postalCode": "55182",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -7.8352,
        "longitude": 110.3283
      },
      "telephone": "+62-819-4407-4542",
      "priceRange": "$$",
      "openingHours": "Mo-Fr 08:00-17:00, Sa 08:00-15:00",
      "sameAs": "https://fwbplus.id"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://fwbplus.id/#localbusiness-semarang",
      "name": "FWB+ Event Organizer Semarang", 
      "image": "https://fwbplus.id/assets/logo/Logo FWB PNG.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Sinar Waluyo Raya No.523, Kedungmundu, Kec. Tembalang",
        "addressLocality": "Semarang",
        "addressRegion": "Jawa Tengah",
        "postalCode": "50273", 
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates", 
        "latitude": -7.0519,
        "longitude": 110.4376
      },
      "telephone": "+62-819-4407-4542",
      "priceRange": "$$",
      "openingHours": "Mo-Fr 08:00-17:00, Sa 08:00-15:00",
      "sameAs": "https://fwbplus.id"
    },
    {
      "@type": "WebSite",
      "@id": "https://fwbplus.id/#website",
      "url": "https://fwbplus.id",
      "name": "FWB+ Event Organizer",
      "description": "Professional event organizer yang didirikan 4 Juli 2024 untuk corporate events, pameran, konser, dan acara perusahaan di Jogja dan Semarang",
      "inLanguage": "id-ID",
      "isPartOf": {
        "@id": "https://fwbplus.id/#organization"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="google-site-verification" content="" />
        <meta name="geo.region" content="ID-YO" />
        <meta name="geo.placename" content="Bantul, Semarang" />
        <meta name="geo.position" content="-7.8352;110.3283" />
        <meta name="ICBM" content="-7.8352, 110.3283" />
        
        {/* Hreflang untuk multi-location */}
        <link rel="alternate" hrefLang="id" href="https://fwbplus.id" />
        <link rel="alternate" hrefLang="id-ID" href="https://fwbplus.id" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Preconnect untuk performa */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch untuk third-party domains */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>
      <body>
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}