export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicAcademy",
    "name": "Sri Veena Vani Sangeetha Vidyalaya",
    "image": "https://veena-vaani-sangeet-vidyalaya.vercel.app/profile/profile.jpeg",
    "@id": "https://veena-vaani-sangeet-vidyalaya.vercel.app",
    "url": "https://veena-vaani-sangeet-vidyalaya.vercel.app",
    "telephone": "9449533852",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "New Court Behind Ganesh Nagar",
      "addressLocality": "Muddebihal",
      "postalCode": "586212",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 16.335956,
      "longitude": 76.1313369
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "16:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.instagram.com/veena_vaani_sangeet_vidyalaya",
      "http://www.youtube.com/@SVVSVIDYALAYA2019"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
