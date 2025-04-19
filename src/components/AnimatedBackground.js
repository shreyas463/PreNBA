import React from 'react';
import '../styles/AnimatedBackground.css';

const AnimatedBackground = () => {
  // Generate random sports icons
  const generateIcons = () => {
    const icons = ['⚽', '🏀', '🏈', '⚾', '🎾'];
    const elements = [];
    
    for (let i = 0; i < 30; i++) {
      const icon = icons[Math.floor(Math.random() * icons.length)];
      const size = Math.random() * 30 + 20;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 20 + 10;
      const animationDelay = Math.random() * 5;
      
      elements.push(
        <div 
          key={i}
          className="floating-icon"
          style={{
            left: `${left}%`,
            fontSize: `${size}px`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`
          }}
        >
          {icon}
        </div>
      );
    }
    
    return elements;
  };

  return (
    <div className="animated-background">
      <div className="gradient-overlay"></div>
      {generateIcons()}
    </div>
  );
};

export default AnimatedBackground;
