import { Organization, WebApplication, FAQPage, Article } from "schema-dts"

export function StructuredData() {
  const organization: Organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Free Tools Platform",
    url: "https://freetoolsplatform.com",
    logo: "https://freetoolsplatform.com/logo.png",
    sameAs: [
      "https://twitter.com/freetoolsplatform",
      "https://facebook.com/freetoolsplatform",
      "https://linkedin.com/company/freetoolsplatform",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-XXX-XXX-XXXX",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
  }

  const webApplication: WebApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Online File Converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Image conversion (JPG, PNG, WEBP)",
      "Audio conversion (MP3, WAV, OGG)",
      "Video conversion (MP4, WEBM, AVI)",
      "Document conversion (PDF, DOCX, TXT)",
      "Archive conversion (ZIP, RAR, 7Z)",
    ],
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0.0",
    screenshot: "https://freetoolsplatform.com/screenshot1.png",
    url: "https://freetoolsplatform.com",
  }

  const faqPage: FAQPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What file formats can I convert?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our converter supports multiple file formats including images (JPG, PNG, WEBP), audio (MP3, WAV, OGG), video (MP4, WEBM, AVI), documents (PDF, DOCX, TXT), and archives (ZIP, RAR, 7Z).",
        },
      },
      {
        "@type": "Question",
        name: "Is the file converter free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our file converter is completely free to use. There are no hidden charges or premium features.",
        },
      },
      {
        "@type": "Question",
        name: "How secure is my data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We take your privacy seriously. All file conversions are done locally in your browser. We don't store or transmit your files to our servers.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum file size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The maximum file size varies by converter: Images (10MB), Audio (50MB), Video (100MB), Documents (20MB), and Archives (100MB).",
        },
      },
    ],
  }

  const article: Article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Convert Files Online: A Complete Guide",
    description: "Learn how to convert various file formats online using our free file converter tool. Convert images, audio, video, documents, and archives instantly.",
    image: "https://freetoolsplatform.com/blog/how-to-convert-files.jpg",
    datePublished: "2024-03-20",
    dateModified: "2024-03-20",
    author: {
      "@type": "Organization",
      name: "Free Tools Platform",
    },
    publisher: {
      "@type": "Organization",
      name: "Free Tools Platform",
      logo: {
        "@type": "ImageObject",
        url: "https://freetoolsplatform.com/logo.png",
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
    </>
  )
} 