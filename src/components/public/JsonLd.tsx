export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'Desa Surorejo',
    alternateName: 'Pemerintah Desa Surorejo',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://surorejo.desa.id',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/images/logo-banyuurip.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kantor Kepala Desa Surorejo',
      addressLocality: 'Banyuurip',
      addressRegion: 'Jawa Tengah',
      postalCode: '54171',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-123-4567-8900',
      contactType: 'customer service',
      email: 'admin@surorejo.desa.id',
    },
    sameAs: [
      'https://www.facebook.com/DesaSurorejo',
      'https://www.instagram.com/DesaSurorejo',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
