import type { Course } from '../models/course';

const courses: Course[] = [
  {
    id: 1,
    title: 'Blockchain Fundamentals',
    description: 'Learn the core concepts of blockchain technology and how it powers cryptocurrencies.',
    icon: '🔗',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: [
      'Introduction to Blockchain',
      'How Blockchain Works',
      'Consensus Mechanisms',
      'Smart Contracts 101'
    ]
  },
  {
    id: 2,
    title: 'Cryptocurrency Trading',
    description: 'Master the art of trading cryptocurrencies with technical analysis and risk management.',
    icon: '📈',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: [
      'Market Analysis',
      'Trading Strategies',
      'Risk Management',
      'Technical Indicators'
    ]
  },
  {
    id: 3,
    title: 'DeFi Deep Dive',
    description: 'Explore the world of Decentralized Finance and its various protocols.',
    icon: '🏦',
    level: 'Advanced',
    duration: '8 weeks',
    lessons: [
      'Lending & Borrowing',
      'Yield Farming',
      'Smart Contract Basics',
      'Security Best Practices'
    ]
  },
  {
    id: 4,
    title: 'NFT Masterclass',
    description: 'Create, buy, and sell Non-Fungible Tokens like a pro.',
    icon: '🖼️',
    level: 'Intermediate',
    duration: '5 weeks',
    lessons: [
      'NFT Basics',
      'Creating Your First NFT',
      'NFT Marketplaces',
      'Royalties and Licensing'
    ]
  },
  {
    id: 5,
    title: 'Smart Contract Development',
    description: 'Learn to write secure smart contracts with Solidity.',
    icon: '📝',
    level: 'Advanced',
    duration: '10 weeks',
    lessons: [
      'Solidity Basics',
      'Smart Contract Security',
      'Testing and Deployment',
      'Gas Optimization'
    ]
  },
  {
    id: 6,
    title: 'Crypto Security Essentials',
    description: 'Protect your digital assets from common threats and scams.',
    icon: '🔒',
    level: 'Beginner',
    duration: '3 weeks',
    lessons: [
      'Wallet Security',
      '2FA and Multi-sig',
      'Phishing Awareness',
      'Cold Storage Solutions'
    ]
  },
  {
    id: 7,
    title: 'Web3 Development',
    description: 'Build decentralized applications on the blockchain.',
    icon: '🌐',
    level: 'Advanced',
    duration: '12 weeks',
    lessons: [
      'Ethereum Development',
      'IPFS Integration',
      'Web3.js & Ethers.js',
      'dApp Architecture'
    ]
  },
  {
    id: 8,
    title: 'Crypto Tax & Accounting',
    description: 'Navigate the complex world of cryptocurrency taxation.',
    icon: '💰',
    level: 'Intermediate',
    duration: '4 weeks',
    lessons: [
      'Taxable Events',
      'FIFO vs LIFO',
      'Reporting Requirements',
      'Tax Software Tools'
    ]
  },
  {
    id: 9,
    title: 'Layer 2 Solutions',
    description: 'Explore scaling solutions for blockchain networks.',
    icon: '⚡',
    level: 'Advanced',
    duration: '6 weeks',
    lessons: [
      'Rollups Explained',
      'Sidechains',
      'State Channels',
      'Zero-Knowledge Proofs'
    ]
  },
  {
    id: 10,
    title: 'Crypto Mining 101',
    description: 'Learn how cryptocurrency mining works and how to get started.',
    icon: '⛏️',
    level: 'Beginner',
    duration: '5 weeks',
    lessons: [
      'Proof of Work vs Proof of Stake',
      'Mining Hardware',
      'Mining Pools',
      'Profitability Calculations'
    ]
  },
  {
    id: 11,
    title: 'Stablecoins & CBDCs',
    description: 'Understand stable digital currencies and central bank digital currencies.',
    icon: '🏛️',
    level: 'Intermediate',
    duration: '4 weeks',
    lessons: [
      'Fiat-backed Stablecoins',
      'Algorithmic Stablecoins',
      'CBDC Development',
      'Regulatory Landscape'
    ]
  },
  {
    id: 12,
    title: 'Metaverse & Web3 Gaming',
    description: 'Explore the intersection of blockchain and virtual worlds.',
    icon: '🎮',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: [
      'Play-to-Earn Mechanics',
      'Virtual Real Estate',
      'In-Game Assets as NFTs',
      'Building in the Metaverse'
    ]
  }
];

export default courses;
