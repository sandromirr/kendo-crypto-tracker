import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList, type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import Header from '../components/Header';
import courses from '../data/courses-data';
import { levelOptions, durationOptions } from '../data/filter-options';
import type { FilterOption } from '../models/filter-option';
import '../styles/EducationPage.css';

const EducationPage: React.FC = () => {
  const [levelFilter, setLevelFilter] = useState<FilterOption>(levelOptions[0]);
  const [durationFilter, setDurationFilter] = useState<FilterOption>(durationOptions[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCourses = React.useMemo(() => {
    let result = [...courses];
    
    // Apply level filter
    if (levelFilter.value !== 'all') {
      result = result.filter(course => course.level === levelFilter.value);
    }
    
    // Apply duration filter
    if (durationFilter.value !== 'any') {
      const [min, max] = durationFilter.value.split('-').map(Number);
      result = result.filter(course => {
        const duration = parseInt(course.duration);
        if (durationFilter.value.endsWith('+')) {
          return duration >= parseInt(durationFilter.value);
        }
        return duration >= min && duration <= max;
      });
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
    
    return result;
  }, [levelFilter, durationFilter, searchTerm]);

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
              onChange={(e: DropDownListChangeEvent) => {
                const selected = levelOptions.find(opt => opt.value === e.target.value);
                if (selected) setLevelFilter(selected);
              }}
              className="level-filter"
            />
            <DropDownList
              data={durationOptions}
              textField="text"
              dataItemKey="value"
              value={durationFilter}
              onChange={(e: DropDownListChangeEvent) => {
                const selected = durationOptions.find(opt => opt.value === e.target.value);
                if (selected) setDurationFilter(selected);
              }}
              className="duration-filter"
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
