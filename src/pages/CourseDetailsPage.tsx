import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../styles/CourseDetailsPage.css";
import type { Course } from '../models/course';

// Mock data - in a real app, this would come from an API
const mockCourses: Course[] = [
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
  // Add other courses here...
];

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the course details from an API
    const foundCourse = mockCourses.find(c => c.id === Number(courseId));
    if (foundCourse) {
      setCourse(foundCourse);
    }
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return <div>Loading course details...</div>;
  }

  if (!course) {
    return (
      <div className="course-details-page">
        <div className="page-header">
          <h1 className="page-title">Course Not Found</h1>
          <Link to="/education" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Courses
          </Link>
        </div>
        <div className="not-found-message">The requested course could not be found.</div>
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <div className="page-header">
        <h1 className="page-title">{course.title}</h1>
        <Link to="/education" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Courses
        </Link>
      </div>
      
      <Card className="course-detail-card">
        <CardHeader className="course-header">
          <div className="course-icon-large">{course.icon}</div>
          <div>
            <CardTitle className="course-title">{course.title}</CardTitle>
            <div className="course-meta">
              <span className="level-badge">{course.level}</span>
              <span className="duration">⏱️ {course.duration}</span>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="course-description">
            <h3>About This Course</h3>
            <p>{course.description}</p>
          </div>
          
          <div className="course-lessons">
            <h3>What You'll Learn</h3>
            <ul className="lessons-list">
              {course.lessons.map((lesson, index) => (
                <li key={index} className="lesson-item">
                  <span className="lesson-number">{index + 1}.</span>
                  <span className="lesson-title">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="enroll-section">
            <h3>Ready to Start Learning?</h3>
            <Button themeColor="primary" className="enroll-button">
              Enroll in This Course
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CourseDetailsPage;
