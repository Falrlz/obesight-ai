import React, { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
};

const LINK_DIST = 95;
const MAX_LINK_ALPHA = 0.3;
/** Connection lines are grouped into this many alpha buckets so they can be stroked
 *  in a handful of batched paths instead of one canvas call per line. */
const ALPHA_BUCKETS = 32;

/**
 * ParticleField Component.
 * Renders an interactive 2D HTML5 canvas particle background.
 *
 * Performance notes:
 * 1. Animation state lives in refs, never React state, so nothing re-renders at 60fps.
 * 2. Connection lines are found with a uniform spatial grid (cell size = LINK_DIST) instead
 *    of comparing every pair of particles. Output is identical to the naive O(N^2) scan,
 *    but each particle only tests its own cell plus four neighbours.
 * 3. Lines and dots are batched into Path2D objects (bucketed by alpha) rather than issuing
 *    a beginPath/stroke per line, which is what actually dominated canvas time.
 * 4. The loop is paused whenever the canvas is scrolled out of view or the tab is hidden,
 *    and is skipped entirely when the user prefers reduced motion.
 */
export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouseRef = useRef({ x: -9999, y: -9999, active: false, down: false });
  const particlesRef = useRef<Particle[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });
  const requestRef = useRef<number | null>(null);
  const inViewRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use parent element (the Hero section) to capture mouse/touch events, so the canvas
    // itself can keep pointer-events: none and never block clicks on UI elements.
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

      // Responsive particle count based on canvas area (density intentionally unchanged)
      const count = Math.round((width * height) / 7500);
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 1,
          c: palette[Math.floor(Math.random() * palette.length)],
        });
      }
      particlesRef.current = newParticles;
    };

    const updateParticles = () => {
      const { width, height } = dimensionsRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

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
    };

    /** Draw connection lines using a uniform spatial grid, batched by alpha bucket. */
    const drawLinks = () => {
      const { width, height } = dimensionsRef.current;
      const particles = particlesRef.current;
      const linkDist2 = LINK_DIST * LINK_DIST;

      const cols = Math.max(1, Math.ceil(width / LINK_DIST));
      const rows = Math.max(1, Math.ceil(height / LINK_DIST));

      // Bucket particle indices into grid cells
      const cells: number[][] = new Array(cols * rows);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(p.x / LINK_DIST)));
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(p.y / LINK_DIST)));
        const key = cy * cols + cx;
        (cells[key] ||= []).push(i);
      }

      const paths: (Path2D | undefined)[] = new Array(ALPHA_BUCKETS);

      const addLine = (a: Particle, b: Particle, d2: number) => {
        const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * MAX_LINK_ALPHA;
        let bucket = Math.floor((alpha / MAX_LINK_ALPHA) * ALPHA_BUCKETS);
        if (bucket < 0) bucket = 0;
        else if (bucket >= ALPHA_BUCKETS) bucket = ALPHA_BUCKETS - 1;

        const path = (paths[bucket] ||= new Path2D());
        path.moveTo(a.x, a.y);
        path.lineTo(b.x, b.y);
      };

      // Each unordered pair is visited exactly once: same-cell pairs (forward only) plus
      // four of the eight neighbouring cells.
      const neighbourOffsets = [
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ];

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const cell = cells[cy * cols + cx];
          if (!cell) continue;

          // Pairs within the same cell
          for (let m = 0; m < cell.length; m++) {
            const a = particles[cell[m]];
            for (let n = m + 1; n < cell.length; n++) {
              const b = particles[cell[n]];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < linkDist2) addLine(a, b, d2);
            }
          }

          // Pairs spanning into neighbouring cells
          for (let k = 0; k < neighbourOffsets.length; k++) {
            const nx = cx + neighbourOffsets[k][0];
            const ny = cy + neighbourOffsets[k][1];
            if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;

            const other = cells[ny * cols + nx];
            if (!other) continue;

            for (let m = 0; m < cell.length; m++) {
              const a = particles[cell[m]];
              for (let n = 0; n < other.length; n++) {
                const b = particles[other[n]];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < linkDist2) addLine(a, b, d2);
              }
            }
          }
        }
      }

      ctx.lineWidth = 0.5;
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const path = paths[b];
        if (!path) continue;
        const alpha = ((b + 0.5) / ALPHA_BUCKETS) * MAX_LINK_ALPHA;
        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.stroke(path);
      }
    };

    /** Draw the particles themselves, batched into one path per colour. */
    const drawParticles = () => {
      const particles = particlesRef.current;
      const byColor = new Map<string, Path2D>();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let path = byColor.get(p.c);
        if (!path) {
          path = new Path2D();
          byColor.set(p.c, path);
        }
        path.moveTo(p.x + p.r, p.y);
        path.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }

      byColor.forEach((path, color) => {
        ctx.fillStyle = color;
        ctx.fill(path);
      });
    };

    const drawFrame = () => {
      const { width, height } = dimensionsRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      drawLinks();
      drawParticles();

      // Mouse cursor range indicator (subtle green ring)
      if (mouse.active) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6, 95, 70, 0.04)';
        ctx.lineWidth = 0.8;
        ctx.arc(mouse.x, mouse.y, mouse.down ? 200 : 150, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    let running = false;

    const step = () => {
      if (!running) return;
      updateParticles();
      drawFrame();
      requestRef.current = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || prefersReducedMotion) return;
      running = true;
      requestRef.current = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };

    /** Only animate while the canvas is on screen and the tab is actually visible. */
    const syncRunState = () => {
      if (inViewRef.current && !document.hidden) start();
      else stop();
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

    const handleMouseMove = (e: MouseEvent) => updateMousePos(e);
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
    const handleTouchMove = (e: TouchEvent) => updateMousePos(e);
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
      particlesRef.current.forEach((p) => {
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      });
      // Repaint immediately so a resize is reflected even while paused / reduced-motion
      if (!running) drawFrame();
    };

    // Interaction only matters when the field is actually animating
    if (!prefersReducedMotion) {
      parent.addEventListener('mousemove', handleMouseMove as EventListener);
      parent.addEventListener('mousedown', handleMouseDown as EventListener);
      window.addEventListener('mouseup', handleMouseUp);
      parent.addEventListener('mouseleave', handleMouseLeave);
      parent.addEventListener('touchmove', handleTouchMove as EventListener, { passive: true });
      parent.addEventListener('touchstart', handleTouchStart as EventListener, { passive: true });
      parent.addEventListener('touchend', handleTouchEnd);
    }
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', syncRunState);

    const observer = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries[0]?.isIntersecting ?? true;
        syncRunState();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Initial setup
    initParticles();

    if (prefersReducedMotion) {
      // Render a single static frame and never spin up the animation loop
      drawFrame();
    } else {
      syncRunState();
    }

    // Clean up all resources when unmounted
    return () => {
      if (!prefersReducedMotion) {
        parent.removeEventListener('mousemove', handleMouseMove as EventListener);
        parent.removeEventListener('mousedown', handleMouseDown as EventListener);
        window.removeEventListener('mouseup', handleMouseUp);
        parent.removeEventListener('mouseleave', handleMouseLeave);
        parent.removeEventListener('touchmove', handleTouchMove as EventListener);
        parent.removeEventListener('touchstart', handleTouchStart as EventListener);
        parent.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', syncRunState);
      observer.disconnect();
      stop();
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
