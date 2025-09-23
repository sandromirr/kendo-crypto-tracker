import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardActions } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Dialog } from '@progress/kendo-react-dialogs';
import { type Course } from '../models/course';
import { levelOptions, durationOptions } from '../models/filter-options';
import courses from '../data/courses-data';
import '../styles/EducationPage.css';

const EducationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showEnrollDialog, setShowEnrollDialog] = useState<boolean>(false);

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    setShowEnrollDialog(true);
  };

  const closeEnrollDialog = () => {
    setShowEnrollDialog(false);
    setSelectedCourse(null);
  };

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

  function handleDetails(course: Course): void {
    navigate(`/courses/${course.id}`);
  }

  return (
    <div className="education-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Cryptocurrency Education Hub</h1>
          <p className="subtitle">Expand your knowledge with our comprehensive courses</p>
        </div>
      </div>
      
      <div className="filters-container">
        <div className="filters">
          <div className="filter-group">
            <label>Filter by level</label>
            <DropDownList
              data={levelOptions}
              textField="text"
              dataItemKey="value"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Filter by duration</label>
            <DropDownList
              data={durationOptions}
              textField="text"
              dataItemKey="value"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.value)}
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
                <div className="course-meta">
                  <span className="level-badge" data-level={course.level}>{course.level}</span>
                  <span className="duration">⏱️ {course.duration}</span>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="course-description">{course.description}</p>
            </CardBody>
            <CardActions className="card-actions">
              <Button
                  themeColor="primary"
                  onClick={() => handleDetails(course)}
              >
                  Details
                </Button>
              <Button 
                themeColor='primary' 
                onClick={() => handleEnrollClick(course)}
              >
                Enroll Now
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      {showEnrollDialog && selectedCourse && (
        <Dialog 
          title={`Enroll in ${selectedCourse.title}`} 
          onClose={closeEnrollDialog}
          className="enroll-dialog"
        >
          <div className="dialog-content">
            <p>You are about to enroll in: <strong>{selectedCourse.title}</strong></p>
            <p>Level: {selectedCourse.level}</p>
            <p>Duration: {selectedCourse.duration}</p>
            <p>This course includes:</p>
            <ul>
              {selectedCourse.lessons.map((lesson, index) => (
                <li key={index}>{lesson}</li>
              ))}
            </ul>
            <div className="dialog-actions">
              <Button onClick={closeEnrollDialog}>Cancel</Button>
              <Button 
                themeColor="primary" 
                onClick={() => {
                  alert(`Successfully enrolled in ${selectedCourse.title}!`);
                  closeEnrollDialog();
                }}
              >
                Confirm Enrollment
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default EducationPage;
