import React, { useEffect, useRef } from 'react';

const P5Background = () => {
  const containerRef = useRef(null);
  const sketchRef = useRef(null);

  useEffect(() => {
    // Define the p5 sketch
    const sketch = (p) => {
      // Sports-themed particles
      let particles = [];
      const numParticles = 50;
      
      // Sports icons/shapes
      const icons = ['⚽', '🏀', '🏈', '⚾', '🎾'];
      
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
        
        // Create initial particles
        for (let i = 0; i < numParticles; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(15, 40),
            speedX: p.random(-1, 1),
            speedY: p.random(-1, 1),
            icon: icons[Math.floor(p.random(icons.length))],
            rotation: p.random(0, 360),
            rotationSpeed: p.random(-0.02, 0.02)
          });
        }
      };

      p.draw = () => {
        p.clear();
        
        // Update and display particles
        particles.forEach(particle => {
          // Move
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          particle.rotation += particle.rotationSpeed;
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > p.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > p.height) particle.speedY *= -1;
          
          // Draw with slight transparency
          p.push();
          p.translate(particle.x, particle.y);
          p.rotate(particle.rotation);
          p.fill(234, 115, 141, 50); // Using the app's pink color with transparency
          p.text(particle.icon, 0, 0);
          p.pop();
        });
      };
      
      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    // Create a new p5 instance
    // Dynamically import p5 to avoid module issues
    import('p5').then(p5Module => {
      const p5 = p5Module.default;
      sketchRef.current = new p5(sketch, containerRef.current);
    });

    // Cleanup function
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default P5Background;
