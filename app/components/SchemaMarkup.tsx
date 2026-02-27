import React from 'react';

interface ArticleSchemaProps {
  type: 'Article';
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  image?: string;
}

interface FAQSchemaProps {
  type: 'FAQ';
  questions: { q: string; a: string }[];
}

type SchemaProps = ArticleSchemaProps | FAQSchemaProps;

export default function SchemaMarkup(props: SchemaProps) {
  let schemaData = {};

  if (props.type === 'Article') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": props.headline,
      "description": props.description,
      "author": {
        "@type": "Person",
        "name": props.author
      },
      "datePublished": props.datePublished,
      "publisher": {
        "@type": "Organization",
        "name": "polutek.pl",
        "logo": {
          "@type": "ImageObject",
          "url": "https://polutek.pl/logo.png"
        }
      }
    };
  } else if (props.type === 'FAQ') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": props.questions.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
