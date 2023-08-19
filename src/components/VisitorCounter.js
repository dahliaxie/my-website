import React, { useState, useEffect } from 'react';
import '../styles/VisitorCounter.css'; // Import the CSS file

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Fetch the visitor count from the backend API
    fetch('http://localhost:5000/api/visitor-count') 
      .then(response => response.json())
      .then(data => {
        setVisitorCount(data.count);
      })
      .catch(error => {
        console.error('Error fetching visitor count:', error);
      });
  }, []);

  return (
    <div className="visitor-counter"> {/* Apply the 'visitor-counter' class */}
      <div className="visitor-count">{visitorCount}</div> {/* Apply the 'visitor-count' class */}
      <div className="visitor-label">Total Visitors</div> {/* Apply the 'visitor-label' class */}
    </div>
  );
};

export default VisitorCounter;
