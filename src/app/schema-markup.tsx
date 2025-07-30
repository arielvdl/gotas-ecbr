export const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "WEB3 ARENA - Sistema de Gotas",
  "description": "Sistema de gamificação onde participantes coletam gotas em palestras e concorrem a prêmios premium como Ledger Stax, Ledger Flex, FuseLabs e OneKey.",
  "startDate": "2025-01-01T09:00:00-03:00",
  "endDate": "2025-01-31T17:00:00-03:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "WEB3 ARENA",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "WEB3 ARENA",
    "url": "https://web3arena.com.br"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "1º Lugar - Ledger Stax",
      "description": "Ledger Stax + Recovery Key + Voucher BTC $40 + Concierge",
      "price": "5124.28",
      "priceCurrency": "BRL"
    },
    {
      "@type": "Offer",
      "name": "2º Lugar - Ledger Flex",
      "description": "Ledger Flex + Recovery Key + Voucher BTC $20 + Concierge",
      "price": "3334.13",
      "priceCurrency": "BRL"
    },
    {
      "@type": "Offer",
      "name": "3º Lugar - FuseLabs",
      "description": "Crédito de R$ 3.000,00 para e-commerce FuseLabs",
      "price": "3000.00",
      "priceCurrency": "BRL"
    },
    {
      "@type": "Offer",
      "name": "4º Lugar - OneKey Classic 1S",
      "description": "Hardware wallet OneKey Classic 1S + Curso Completo",
      "price": "897.00",
      "priceCurrency": "BRL"
    }
  ]
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que são gotas no WEB3 ARENA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gotas são pontos de gamificação que você coleta ao participar das palestras do evento WEB3 ARENA. Cada palestra oferece gotas através de QR codes exclusivos."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona o ranking de gotas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O ranking é atualizado em tempo real baseado na quantidade de gotas coletadas. No dia 31 às 17h, os participantes com mais gotas ganham os prêmios de acordo com sua posição."
      }
    },
    {
      "@type": "Question",
      "name": "Quais são os prêmios do ranking de gotas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1º lugar: Ledger Stax + extras (R$ 5.124,28), 2º lugar: Ledger Flex + extras (R$ 3.334,13), 3º lugar: Crédito FuseLabs (R$ 3.000,00), 4º lugar: OneKey Classic 1S + curso (R$ 897,00)."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona o desempate no ranking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em caso de empate na quantidade de gotas, o desempate será feito por ordem de claim - quem solicitar primeiro o prêmio no site garantirá a melhor colocação."
      }
    }
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Gotas ECBR",
  "url": "https://gotas-ecbr.vercel.app",
  "description": "Sistema oficial de ranking e prêmios do evento WEB3 ARENA",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://gotas-ecbr.vercel.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};