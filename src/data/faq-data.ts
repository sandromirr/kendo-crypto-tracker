import type { FAQItem } from '../models/faq-item';

export const faqs: FAQItem[] = [
  {
    q: 'How often are prices updated?',
    a: 'Prices are updated in real-time using the latest available market data from our provider.'
  },
  {
    q: 'Can I import my portfolio?',
    a: 'Yes — you can manually add holdings today. CSV import is coming soon.'
  },
  {
    q: 'Are alerts available?',
    a: 'You can set up price alerts from the coin details page; push and email alerts will be available later.'
  },
  {
    q: 'Where does your data come from?',
    a: 'We aggregate market data from leading public APIs and exchanges to give broad coverage and redundancy.'
  },
  {
    q: 'Is my data secure?',
    a: 'We follow best practices for data storage and transport. Sensitive data is encrypted in transit. For production use, ensure you follow our security recommendations.'
  },
  {
    q: 'Do you offer an API?',
    a: 'A public API is planned. For now, use the UI. If you need programmatic access, reach out via our contact channels.'
  },
  {
    q: 'Which coins are supported?',
    a: 'We cover the top 10,000 cryptocurrencies by market presence and continuously add more as data sources expand.'
  },
  {
    q: 'Is there a mobile app?',
    a: 'A mobile app is in our roadmap. The web app is mobile-responsive today for on-the-go use.'
  }
];
