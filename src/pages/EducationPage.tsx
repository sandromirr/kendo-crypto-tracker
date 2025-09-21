import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardActions } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import './EducationPage.css';

interface Course {
  id: number;
  title: string;
  description: string;
  icon: string;
  level: string;
  duration: string;
  lessons: string[];
}

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
  },
  {
    id: 13,
    title: 'Crypto Regulation & Compliance',
    description: 'Navigate the legal landscape of digital assets.',
    icon: '⚖️',
    level: 'Advanced',
    duration: '5 weeks',
    lessons: [
      'Global Regulatory Frameworks',
      'KYC/AML Requirements',
      'Security Token Offerings',
      'Compliance Best Practices'
    ]
  }
];

const levelOptions = [
  { text: 'All Levels', value: 'all' },
  { text: 'Beginner', value: 'Beginner' },
  { text: 'Intermediate', value: 'Intermediate' },
  { text: 'Advanced', value: 'Advanced' },
];

const durationOptions = [
  { text: 'Any Duration', value: 'all' },
  { text: '1-4 weeks', value: 'short' },
  { text: '5-8 weeks', value: 'medium' },
  { text: '9+ weeks', value: 'long' },
];


const EducationPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    let matchesDuration = true;
    if (selectedDuration !== 'all') {
      const weeks = parseInt(course.duration);
      if (selectedDuration === 'short') {
        matchesDuration = weeks <= 4;
      } else if (selectedDuration === 'medium') {
        matchesDuration = weeks > 4 && weeks <= 8;
      } else if (selectedDuration === 'long') {
        matchesDuration = weeks > 8;
      }
    }
    
    return matchesLevel && matchesDuration;
  });

  const toggleCourseExpand = (courseId: number) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="education-page">
      <div className="page-header">
        <h1>Cryptocurrency Education Hub</h1>
        <p className="subtitle">Expand your knowledge with our comprehensive courses</p>
        
        <div className="filters">
          <div className="filter-group">
            <DropDownList
              data={levelOptions}
              textField="text"
              dataItemKey="value"
              value={levelOptions.find(opt => opt.value === selectedLevel) || levelOptions[0]}
              onChange={(e) => setSelectedLevel(e.target.value.value)}
              style={{ width: '200px' }}
            />
          </div>
          <div className="filter-group">
            <DropDownList
              data={durationOptions}
              textField="text"
              dataItemKey="value"
              value={durationOptions.find(opt => opt.value === selectedDuration) || durationOptions[0]}
              onChange={(e) => setSelectedDuration(e.target.value.value)}
              style={{ width: '200px' }}
            />
          </div>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="course-card">
            <CardHeader className="course-header">
              <div className="course-icon">{course.icon}</div>
              <div>
                <CardTitle className="course-title">{course.title}</CardTitle>
                <CardSubtitle className="course-meta">
                  <span className="duration">⏱️ {course.duration}</span>
                </CardSubtitle>
              </div>
            </CardHeader>
            <CardBody>
              <p className="course-description">{course.description}</p>
              
              {expandedCourse === course.id && (
                <div className="lessons-list">
                  <h4>Course Outline:</h4>
                  <ul>
                    {course.lessons.map((lesson, index) => (
                      <li key={index} className="lesson-item">
                        <span className="lesson-number">{index + 1}.</span>
                        <span className="lesson-title">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardBody>
            <CardActions className="card-actions">
              <Button
                themeColor="primary"
                onClick={() => toggleCourseExpand(course.id)}
              >
                {expandedCourse === course.id ? 'Hide Details' : 'View Details'}
              </Button>
              <Button>Enroll Now</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducationPage;
