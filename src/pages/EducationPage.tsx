import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import Header from '../components/Header';
import courses from '../data/courses-data';
import './EducationPage.styles.css';

const levelOptions = [
  { text: 'All Levels', value: 'all' },
  { text: 'Beginner', value: 'Beginner' },
  { text: 'Intermediate', value: 'Intermediate' },
  { text: 'Advanced', value: 'Advanced' },
];

const sortOptions = [
  { text: 'Recommended', value: 'recommended' },
  { text: 'Level: Easy to Hard', value: 'level-asc' },
  { text: 'Level: Hard to Easy', value: 'level-desc' },
  { text: 'Duration: Shortest First', value: 'duration-asc' },
  { text: 'Duration: Longest First', value: 'duration-desc' },
];


const EducationPage: React.FC = () => {
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = React.useMemo(() => {
    let result = [...courses];
    
    // Apply level filter
    if (levelFilter !== 'all') {
      result = result.filter(course => course.level === levelFilter);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(term) || 
        course.description.toLowerCase().includes(term) ||
        course.lessons.some((lesson: string) => lesson.toLowerCase().includes(term))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'level-asc':
        const levelOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return [...result].sort((a, b) => levelOrder[a.level as keyof typeof levelOrder] - levelOrder[b.level as keyof typeof levelOrder]);
      case 'level-desc':
        const levelOrderDesc = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return [...result].sort((a, b) => levelOrderDesc[b.level as keyof typeof levelOrderDesc] - levelOrderDesc[a.level as keyof typeof levelOrderDesc]);
      case 'duration-asc':
        return [...result].sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      case 'duration-desc':
        return [...result].sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
      default:
        return result;
    }
  }, [levelFilter, sortBy, searchTerm]);

  return (
    <div className="education-page">
      <Header />
      <div className="container">
        <div className="education-header">
          <h1 className="education-title">Crypto Education Center</h1>
          <p className="education-subtitle">Master blockchain technology and cryptocurrency trading with our expert-led courses</p>
        </div>
        
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search courses..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filter-controls">
            <DropDownList
              data={levelOptions}
              textField="text"
              dataItemKey="value"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="level-filter"
            />
            <DropDownList
              data={sortOptions}
              textField="text"
              dataItemKey="value"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-options"
            />
          </div>
        </div>

        <div className="course-grid">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="course-card">
              <div className="course-icon">
                {course.icon}
              </div>
              <CardBody className="course-body">
                <div className="course-header">
                  <CardTitle className="course-title">{course.title}</CardTitle>
                </div>
                <CardSubtitle className="course-subtitle">
                  {course.duration} • {course.lessons.length} lessons
                </CardSubtitle>
                <p className="course-description">{course.description}</p>
                <div className="lessons-section">
                  <h4>What you'll learn:</h4>
                  <ul className="lessons-list">
                    {course.lessons.slice(0, 3).map((lesson: string, idx: number) => (
                      <li key={idx}>{lesson}</li>
                    ))}
                    {course.lessons.length > 3 && (
                      <li className="more-lessons">+{course.lessons.length - 3} more</li>
                    )}
                  </ul>
                </div>
              </CardBody>
              <CardActions className="course-actions">
                <Button themeColor="primary" className="enroll-button">
                  Enroll Now
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No courses found</h3>
            <p className="empty-state-description">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationPage;
