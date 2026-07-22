/**
 * Organization structured data (JSON-LD).
 *
 * This is machine-readable metadata for search engines only. It is NOT
 * visible anywhere on the page and does not affect layout. It helps Google
 * associate iCat Studios with its founder and official profiles so the site
 * can surface for related searches.
 */
export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "iCat Studios",
    url: "https://icatstudios.com",
    logo: "https://icatstudios.com/icon-512.png",
    foundingDate: "2015",
    founder: {
      "@type": "Person",
      name: "Musab Sevgi",
      sameAs: ["https://www.linkedin.com/in/musabsevgi"],
    },
    sameAs: [
      "https://www.instagram.com/icatstudios",
      "https://www.x.com/icatstudios",
      "https://www.youtube.com/channel/UCpIBOh7O5_tI5vCdYF8vfnQ",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
