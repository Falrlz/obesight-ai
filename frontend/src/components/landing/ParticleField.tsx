import React, { useEffect, useRef } from 'react';

/**
 * ParticleField Component.
 * Renders an interactive 2D HTML5 canvas particle background.
 *
 * Optimization Details:
 * 1. Animation states (particles, mouse positions, dimensions) are stored in React `useRef`s 
 *    instead of React state. This prevents React re-render cycles, ensuring stable 60 FPS performance.
 * 2. Canvas mouse event tracking is bound to the parent `<section>` (Hero section) 
 *    instead of the canvas itself. Combined with `pointer-events: none`, this guarantees 
 *    the background will not intercept mouse click events on layout buttons.
 * 3. Opacity formatting inside the O(N^2) connection lines drawing loop avoids slow 
 *    `.toFixed(3)` string parsing, which significantly reduces CPU scripting garbage collection.
 */
export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Keep animation state in refs to prevent triggering React re-renders at 60fps
  const mouseRef = useRef({ x: -9999, y: -9999, active: false, down: false });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    c: string;
  }>>([]);
  const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use parent element (the Hero section) to capture mouse/touch events
    // This allows the canvas to have pointer-events: none and not block clicks on UI elements
    const parent = canvas.closest('section') || canvas.parentElement || window;

    const palette = ['#065f46']; // Green like the button (secondary)
    const mode = 1; // Default to attract mode

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      dimensionsRef.current = { width, height, dpr };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      resize();
      const { width, height } = dimensionsRef.current;
      
      // Responsive particle count based on canvas area (increased density for a richer feel)
      const count = Math.round((width * height) / 7500);
      const newParticles = [];

      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 1,
          c: palette[Math.floor(Math.random() * palette.length)]
        });
      }
      particlesRef.current = newParticles;
    };

    const step = () => {
      const { width, height } = dimensionsRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      const linkDist = 95; // Slightly reduced distance to keep network clean and improve performance

      // Update particle positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Interactive mouse force
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          const range = mouse.down ? 200 : 150;

          if (d2 < range * range && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / range) * 0.6 * mode;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        // Friction / deceleration
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Drift speed floor to keep them moving
        const sp = Math.hypot(p.vx, p.vy);
        if (sp < 0.15) {
          const a = Math.random() * Math.PI * 2;
          p.vx += Math.cos(a) * 0.05;
          p.vy += Math.sin(a) * 0.05;
        }

        // Speed limit
        if (sp > 3) {
          p.vx *= 0.7;
          p.vy *= 0.7;
        }
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < linkDist * linkDist) {
            const al = (1 - Math.sqrt(d2) / linkDist) * 0.3; // slightly reduced opacity for subtle background
            ctx.strokeStyle = `rgba(0, 0, 0, ${al})`; // Avoid slow .toFixed(3) formatting inside render loop
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw mouse cursor range indicator (subtle grey ring for white background)
      if (mouse.active) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6, 95, 70, 0.04)'; // extremely subtle green outline matching the button
        ctx.lineWidth = 0.8;
        ctx.arc(mouse.x, mouse.y, mouse.down ? 200 : 150, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestRef.current = requestAnimationFrame(step);
    };

    // Event handlers
    const updateMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      
      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      mouseRef.current.x = clientX - rect.left;
      mouseRef.current.y = clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMousePos(e);
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.down = true;
      updateMousePos(e);
    };

    const handleMouseUp = () => {
      mouseRef.current.down = false;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      updateMousePos(e);
    };

    const handleTouchStart = (e: TouchEvent) => {
      mouseRef.current.down = true;
      updateMousePos(e);
    };

    const handleTouchEnd = () => {
      mouseRef.current.down = false;
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      resize();
      // Keep particles constrained to new dimensions without re-initializing everything
      const { width, height } = dimensionsRef.current;
      particlesRef.current.forEach(p => {
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      });
    };

    // Attach listeners to the parent element for full-screen interaction coverage
    parent.addEventListener('mousemove', handleMouseMove as EventListener);
    parent.addEventListener('mousedown', handleMouseDown as EventListener);
    window.addEventListener('mouseup', handleMouseUp);
    parent.addEventListener('mouseleave', handleMouseLeave);
    parent.addEventListener('touchmove', handleTouchMove as EventListener, { passive: true });
    parent.addEventListener('touchstart', handleTouchStart as EventListener, { passive: true });
    parent.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    // Initial setup
    initParticles();
    step();

    // Clean up all resources when unmounted
    return () => {
      parent.removeEventListener('mousemove', handleMouseMove as EventListener);
      parent.removeEventListener('mousedown', handleMouseDown as EventListener);
      window.removeEventListener('mouseup', handleMouseUp);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('touchmove', handleTouchMove as EventListener);
      parent.removeEventListener('touchstart', handleTouchStart as EventListener);
      parent.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Prevents blocking clicks on links/buttons
      }}
    />
  );
};

export default ParticleField;
